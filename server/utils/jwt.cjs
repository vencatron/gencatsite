"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.decodeToken = decodeToken;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_in_production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_in_production';
const ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';
function generateAccessToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role || 'client',
    };
    return jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRATION,
    });
}
function generateRefreshToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role || 'client',
        isRefreshToken: true,
    };
    return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRATION,
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
}
function verifyRefreshToken(token) {
    const payload = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
    if (!payload.isRefreshToken) {
        throw new Error('Invalid refresh token');
    }
    return payload;
}
function decodeToken(token) {
    return jsonwebtoken_1.default.decode(token);
}
//# sourceMappingURL=jwt.js.map