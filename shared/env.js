"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnvVar = exports.getEnvVar = exports.sanitizeEnvVars = void 0;
const sanitizeValue = (value) => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};
const sanitizeKey = (key) => {
    const sanitized = sanitizeValue(process.env[key]);
    if (sanitized !== undefined) {
        process.env[key] = sanitized;
    }
    else {
        // Preserve explicit empty so downstream code can detect missing values
        process.env[key] = undefined;
    }
};
const sanitizeEnvVars = (keys) => {
    if (Array.isArray(keys) && keys.length > 0) {
        keys.forEach(sanitizeKey);
        return;
    }
    Object.keys(process.env).forEach(sanitizeKey);
};
exports.sanitizeEnvVars = sanitizeEnvVars;
const getEnvVar = (name) => {
    const value = sanitizeValue(process.env[name]);
    if (value) {
        process.env[name] = value;
    }
    return value;
};
exports.getEnvVar = getEnvVar;
const getRequiredEnvVar = (name) => {
    const value = (0, exports.getEnvVar)(name);
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};
exports.getRequiredEnvVar = getRequiredEnvVar;
//# sourceMappingURL=env.js.map