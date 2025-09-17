import { useEffect, useRef, useState } from 'react'
import { addDocument, deleteDocument, getDocumentBlob, listDocuments, renameDocument, DocRecord } from '@/utils/portalDb'

const PortalDocuments = () => {
  const [docs, setDocs] = useState<DocRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function refresh() {
    const list = await listDocuments()
    setDocs(list)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setLoading(true)
    try {
      for (const f of Array.from(files)) {
        await addDocument(f)
      }
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload(id: string, name: string) {
    const blob = await getDocumentBlob(id)
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  async function handleDelete(id: string) {
    await deleteDocument(id)
    await refresh()
  }

  async function submitRename() {
    if (renamingId && newName.trim()) {
      await renameDocument(renamingId, newName.trim())
      setRenamingId(null)
      setNewName('')
      await refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-neutral-900">Documents</h2>
        <div className="flex gap-2">
          <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          <button className="btn-primary" onClick={() => inputRef.current?.click()} disabled={loading}>
            {loading ? 'Uploading…' : 'Upload Files'}
          </button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center text-neutral-600 hover:border-primary-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
      >
        Drag & drop files here, or use the Upload button.
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Size</th>
              <th className="py-2 pr-4">Uploaded</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 pr-4">
                  {renamingId === d.id ? (
                    <div className="flex items-center gap-2">
                      <input value={newName} onChange={(e) => setNewName(e.target.value)} className="px-2 py-1 border rounded" />
                      <button className="btn-primary text-xs" onClick={submitRename}>Save</button>
                      <button className="btn-ghost text-xs" onClick={() => setRenamingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <span className="text-neutral-900">{d.name}</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-neutral-600">{d.type || '—'}</td>
                <td className="py-3 pr-4 text-neutral-600">{Math.round(d.size / 1024)} KB</td>
                <td className="py-3 pr-4 text-neutral-600">{new Date(d.uploadedAt).toLocaleString()}</td>
                <td className="py-3 pr-4">
                  <div className="flex gap-2">
                    <button className="btn-outline text-xs" onClick={() => handleDownload(d.id, d.name)}>Download</button>
                    <button className="btn-ghost text-xs" onClick={() => { setRenamingId(d.id); setNewName(d.name) }}>Rename</button>
                    <button className="btn-ghost text-xs text-red-600" onClick={() => handleDelete(d.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-500">No documents yet. Upload files to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PortalDocuments

