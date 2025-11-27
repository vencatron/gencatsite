const normalizeValue = (value: string | undefined): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const clearEnvVar = (name: string): void => {
  delete process.env[name];
};

export const getEnvVar = (name: string): string | undefined => {
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

export const sanitizeEnvVars = (keys?: string[]): void => {
  const targetKeys = Array.isArray(keys) && keys.length > 0 ? keys : Object.keys(process.env);
  targetKeys.forEach((key) => {
    const value = getEnvVar(key);
    if (value === undefined) {
      clearEnvVar(key);
    }
  });
};

export const getRequiredEnvVar = (name: string): string => {
  const value = getEnvVar(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};
