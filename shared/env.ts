const sanitizeValue = (value: string | undefined): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const sanitizeKey = (key: string): void => {
  const sanitized = sanitizeValue(process.env[key]);
  if (sanitized !== undefined) {
    process.env[key] = sanitized;
  } else {
    // Preserve explicit empty so downstream code can detect missing values
    process.env[key] = undefined;
  }
};

export const sanitizeEnvVars = (keys?: string[]): void => {
  if (Array.isArray(keys) && keys.length > 0) {
    keys.forEach(sanitizeKey);
    return;
  }

  Object.keys(process.env).forEach(sanitizeKey);
};

export const getEnvVar = (name: string): string | undefined => {
  const value = sanitizeValue(process.env[name]);
  if (value) {
    process.env[name] = value;
  }
  return value;
};

export const getRequiredEnvVar = (name: string): string => {
  const value = getEnvVar(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};
