"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
exports.uploadToS3 = uploadToS3;
exports.getSignedDownloadUrl = getSignedDownloadUrl;
exports.deleteFromS3 = deleteFromS3;
require("dotenv/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_2 = require("@aws-sdk/client-s3");
const env_1 = require("../../shared/env");
const REQUIRED_S3_VARS = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET_NAME',
    'AWS_REGION'
];
(0, env_1.sanitizeEnvVars)(REQUIRED_S3_VARS);
// Initialize S3 client
exports.s3Client = new client_s3_1.S3Client({
    region: (0, env_1.getRequiredEnvVar)('AWS_REGION'),
    credentials: {
        accessKeyId: (0, env_1.getRequiredEnvVar)('AWS_ACCESS_KEY_ID'),
        secretAccessKey: (0, env_1.getRequiredEnvVar)('AWS_SECRET_ACCESS_KEY'),
    },
});
const BUCKET_NAME = (0, env_1.getRequiredEnvVar)('AWS_S3_BUCKET_NAME');
/**
 * Upload file to S3
 * @param file - Multer file object
 * @param userId - User ID for organizing files
 * @param folder - Base folder in S3 (default: "documents")
 * @returns S3 key (path) of the uploaded file
 */
async function uploadToS3(file, userId, folder = "documents") {
    // Generate unique key: documents/{userId}/{timestamp}-{filename}
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `${folder}/${userId}/${timestamp}-${sanitizedFilename}`;
    console.log('Starting S3 upload:', {
        bucket: BUCKET_NAME,
        key,
        size: file.size,
        type: file.mimetype
    });
    const upload = new lib_storage_1.Upload({
        client: exports.s3Client,
        params: {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ServerSideEncryption: "AES256",
        },
    });
    await upload.done();
    console.log('S3 upload completed:', key);
    return key; // Return S3 key (path), not full URL
}
/**
 * Generate temporary signed download URL
 * @param key - S3 key (path) of the file
 * @returns Signed URL valid for 1 hour
 */
async function getSignedDownloadUrl(key) {
    const command = new client_s3_2.GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, command, { expiresIn: 3600 });
    console.log('Generated signed URL for:', key);
    return url;
}
/**
 * Delete file from S3
 * @param key - S3 key (path) of the file to delete
 */
async function deleteFromS3(key) {
    const command = new client_s3_2.DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    });
    await exports.s3Client.send(command);
    console.log('Deleted from S3:', key);
}
//# sourceMappingURL=s3.js.map