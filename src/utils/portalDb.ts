// Minimal IndexedDB wrapper for portal data
export type DocRecord = {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: number
  tags?: string[]
}

export type MessageRecord = {
  id: string
  from: 'user' | 'support'
  text: string
  createdAt: number
  read?: boolean
}

export type InvoiceRecord = {
  id: string
  number: string
  amount: number
  status: 'due' | 'paid'
  dueDate: string
  createdAt: number
}

const DB_NAME = 'gencat-portal'
const DB_VERSION = 1

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('documents')) {
        const store = db.createObjectStore('documents', { keyPath: 'id' })
        store.createIndex('uploadedAt', 'uploadedAt')
      }
      if (!db.objectStoreNames.contains('document_blobs')) {
        db.createObjectStore('document_blobs', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('invoices')) {
        db.createObjectStore('invoices', { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore<T = unknown>(storeName: string, mode: IDBTransactionMode, fn: (store: IDBObjectStore, db: IDBDatabase) => Promise<T> | T): Promise<T> {
  const db = await openDb()
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, mode)
    const store = tx.objectStore(storeName)
    Promise.resolve(fn(store, db))
      .then((res) => {
        tx.oncomplete = () => resolve(res)
      })
      .catch((err) => reject(err))
    tx.onerror = () => reject(tx.error)
  })
}

export async function addDocument(file: File, tags?: string[]): Promise<DocRecord> {
  const id = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const rec: DocRecord = {
    id,
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    uploadedAt: Date.now(),
  }
  if (tags) (rec as any).tags = tags
  await withStore('documents', 'readwrite', (s) => s.put(rec))
  await withStore('document_blobs', 'readwrite', (s) => s.put({ id, blob: file }))
  return rec
}

export function listDocuments(): Promise<DocRecord[]> {
  return withStore('documents', 'readonly', (s) => {
    return new Promise<DocRecord[]>((resolve) => {
      const out: DocRecord[] = []
      const cursor = s.index('uploadedAt').openCursor(null, 'prev')
      cursor!.onsuccess = () => {
        const c = cursor!.result
        if (c) {
          out.push(c.value as DocRecord)
          c.continue()
        } else {
          resolve(out)
        }
      }
      cursor!.onerror = () => resolve(out)
    })
  })
}

export function getDocumentBlob(id: string): Promise<Blob | null> {
  return withStore('document_blobs', 'readonly', (s) => {
    return new Promise<Blob | null>((resolve) => {
      const req = s.get(id)
      req.onsuccess = () => resolve(req.result ? (req.result as any).blob as Blob : null)
      req.onerror = () => resolve(null)
    })
  })
}

export async function deleteDocument(id: string): Promise<void> {
  await withStore('documents', 'readwrite', (s) => s.delete(id))
  await withStore('document_blobs', 'readwrite', (s) => s.delete(id))
}

export async function renameDocument(id: string, newName: string): Promise<void> {
  await withStore('documents', 'readwrite', async (s) => {
    const rec = await new Promise<DocRecord | undefined>((resolve) => {
      const req = s.get(id)
      req.onsuccess = () => resolve(req.result as DocRecord | undefined)
      req.onerror = () => resolve(undefined)
    })
    if (rec) {
      rec.name = newName
      s.put(rec)
    }
  })
}

export function addMessage(msg: Omit<MessageRecord, 'id' | 'createdAt'> & Partial<Pick<MessageRecord, 'id' | 'createdAt'>>): Promise<MessageRecord> {
  const rec: MessageRecord = {
    id: msg.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    from: msg.from,
    text: msg.text,
    createdAt: msg.createdAt || Date.now(),
    read: msg.read ?? (msg.from === 'support'),
  }
  return withStore('messages', 'readwrite', (s) => {
    s.put(rec)
    return rec
  })
}

export function listMessages(): Promise<MessageRecord[]> {
  return withStore('messages', 'readonly', (s) => {
    return new Promise<MessageRecord[]>((resolve) => {
      const out: MessageRecord[] = []
      const req = s.openCursor()
      req.onsuccess = () => {
        const c = req.result
        if (c) {
          out.push(c.value as MessageRecord)
          c.continue()
        } else {
          out.sort((a, b) => a.createdAt - b.createdAt)
          resolve(out)
        }
      }
      req.onerror = () => resolve(out)
    })
  })
}

export function seedInvoicesIfEmpty(): Promise<void> {
  return withStore('invoices', 'readwrite', async (s) => {
    const count = await new Promise<number>((resolve) => {
      const req = s.count()
      req.onsuccess = () => resolve(req.result || 0)
      req.onerror = () => resolve(0)
    })
    if (count > 0) return
    const base: InvoiceRecord[] = [
      { id: 'inv_1001', number: 'INV-1001', amount: 799, status: 'due', dueDate: new Date(Date.now() + 7 * 86400000).toISOString(), createdAt: Date.now() },
      { id: 'inv_1002', number: 'INV-1002', amount: 2499, status: 'paid', dueDate: new Date(Date.now() - 10 * 86400000).toISOString(), createdAt: Date.now() - 14 * 86400000 },
    ]
    base.forEach((i) => s.put(i))
  })
}

export function listInvoices(): Promise<InvoiceRecord[]> {
  return withStore('invoices', 'readonly', (s) => {
    return new Promise<InvoiceRecord[]>((resolve) => {
      const out: InvoiceRecord[] = []
      const req = s.openCursor()
      req.onsuccess = () => {
        const c = req.result
        if (c) {
          out.push(c.value as InvoiceRecord)
          c.continue()
        } else {
          out.sort((a, b) => b.createdAt - a.createdAt)
          resolve(out)
        }
      }
      req.onerror = () => resolve(out)
    })
  })
}

export function setInvoiceStatus(id: string, status: InvoiceRecord['status']): Promise<void> {
  return withStore('invoices', 'readwrite', async (s) => {
    const rec = await new Promise<InvoiceRecord | undefined>((resolve) => {
      const req = s.get(id)
      req.onsuccess = () => resolve(req.result as InvoiceRecord | undefined)
      req.onerror = () => resolve(undefined)
    })
    if (rec) {
      rec.status = status
      s.put(rec)
    }
  })
}
