# Document Display Name & Type Fix - 2025-11-05

## Problem
Uploaded documents were displaying as "Unknown" for both name and type in the frontend.

## Root Cause
The backend API endpoints were returning raw database objects with `fileName` and `fileType` fields, but the frontend expected `name` and `type` fields.

## Solution
Added response transformation in backend routes to map database field names to frontend expected format.

### Changes Made

**File: `server/routes/documents.ts`**

1. **GET /api/documents** (list endpoint) - Lines 91-103
   ```typescript
   // Transform to match frontend expected format
   const transformedDocs = activeDocuments.map(doc => ({
     id: doc.id,
     userId: doc.userId,
     name: doc.fileName,        // DB: fileName → Frontend: name
     type: doc.fileType,        // DB: fileType → Frontend: type
     size: doc.fileSize,
     uploadedAt: doc.createdAt,
     category: doc.category,
     description: doc.description,
     tags: doc.tags,
     status: doc.status
   }));
   ```

2. **GET /api/documents/:id** (single document endpoint) - Lines 209-221
   ```typescript
   // Transform to match frontend expected format
   const transformedDoc = {
     id: document.id,
     userId: document.userId,
     name: document.fileName,
     type: document.fileType,
     size: document.fileSize,
     uploadedAt: document.createdAt,
     category: document.category,
     description: document.description,
     tags: document.tags,
     status: document.status
   };
   ```

## Result
- Documents now display with their original uploaded file names
- File types show the actual MIME type (or can be formatted to show user-friendly type)
- Consistent data format across all document endpoints
- No frontend changes required

## Frontend Display
The frontend (`src/pages/portal/PortalDocuments.tsx`) displays:
- **Name column**: Shows `d.name` (original filename)
- **Type column**: Shows `d.type` (MIME type like "application/pdf", "text/plain", etc.)
- **Size column**: Shows `d.size` converted to KB
- **Uploaded column**: Shows `d.uploadedAt` formatted as locale string
