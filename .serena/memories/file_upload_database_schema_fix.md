# File Upload Database Schema Fix - 2025-11-05

## Problem
File uploads were failing with error: "value too long for type character varying(50)"

## Root Cause
Multiple database columns had varchar length constraints that were too short:
1. `storage_url` was varchar(50) - file paths were ~91 characters
2. `file_type` was varchar(50) - MIME types like `application/vnd.openxmlformats-officedocument.wordprocessingml.document` are 74 characters
3. `category` was varchar(50) - unnecessarily restrictive

## Solution
Updated database schema to support longer values:

### Changes Made
```sql
-- Fix storage_url to support full file paths
ALTER TABLE documents ALTER COLUMN storage_url TYPE TEXT;

-- Fix file_type to support long MIME types
ALTER TABLE documents ALTER COLUMN file_type TYPE VARCHAR(200);

-- Fix category for flexibility
ALTER TABLE documents ALTER COLUMN category TYPE TEXT;
```

### Final Schema
- `storage_url`: TEXT (unlimited length)
- `file_type`: VARCHAR(200) (supports longest MIME types)
- `category`: TEXT (unlimited length)
- `file_name`: VARCHAR(255) (sufficient for filenames)

## Testing
After schema changes, file uploads work correctly with:
- Long file paths (91+ characters)
- Long MIME types (74+ characters)
- All supported file types (PDF, Word, Excel, images, etc.)

## Notes
- Schema was manually migrated using direct SQL (drizzle-kit was outdated)
- No data loss occurred during migration
- Server continues running normally with updated schema
