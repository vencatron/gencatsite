"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.sanitizeInput = sanitizeInput;
exports.validateUsername = validateUsername;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    return {
        valid: errors.length === 0,
        errors,
    };
}
function sanitizeInput(input) {
    // Remove any potential SQL injection patterns
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/['";]/g, '') // Remove quotes and semicolons
        .trim();
}
function validateUsername(username) {
    if (username.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters long' };
    }
    if (username.length > 30) {
        return { valid: false, error: 'Username must be less than 30 characters' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return { valid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }
    return { valid: true };
}
//# sourceMappingURL=validation.js.map