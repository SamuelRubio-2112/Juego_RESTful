function stripIdSuffixes(data) {
  if (data && typeof data.toJSON === 'function') {
    data = data.toJSON();
  }

  if (Array.isArray(data)) return data.map(stripIdSuffixes);
  
  if (data && typeof data === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.endsWith('_id')) continue;
      cleaned[key] = stripIdSuffixes(value);
    }
    return cleaned;
  }
  return data;
}

module.exports = (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (body) => originalJson(stripIdSuffixes(body));
    next();
};