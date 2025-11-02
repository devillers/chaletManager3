const buckets = new Map();

export function applyRateLimit(identifier, { limit, windowMs }) {
  if (!identifier) {
    return { allowed: true, remaining: limit, reset: Date.now() + windowMs };
  }

  const now = Date.now();
  const entry = buckets.get(identifier);

  if (!entry || entry.reset <= now) {
    buckets.set(identifier, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, reset: entry.reset };
  }

  entry.count += 1;
  buckets.set(identifier, entry);
  return { allowed: true, remaining: limit - entry.count, reset: entry.reset };
}
