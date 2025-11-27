"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnvVar = exports.sanitizeEnvVars = exports.getEnvVar = void 0;
const normalizeValue = (value) => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};
const clearEnvVar = (name) => {
    delete process.env[name];
};
const getEnvVar = (name) => {
    const raw = process.env[name];
    const normalized = normalizeValue(raw);
    if (normalized === undefined) {
        clearEnvVar(name);
        return undefined;
    }
    if (raw !== normalized) {
        process.env[name] = normalized;
    }
    return normalized;
};
exports.getEnvVar = getEnvVar;
const sanitizeEnvVars = (keys) => {
    const targetKeys = Array.isArray(keys) && keys.length > 0 ? keys : Object.keys(process.env);
    targetKeys.forEach((key) => {
        const value = (0, exports.getEnvVar)(key);
        if (value === undefined) {
            clearEnvVar(key);
        }
    });
};
exports.sanitizeEnvVars = sanitizeEnvVars;
const getRequiredEnvVar = (name) => {
    const value = (0, exports.getEnvVar)(name);
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};
exports.getRequiredEnvVar = getRequiredEnvVar;
//# sourceMappingURL=env.js.map