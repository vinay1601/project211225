module.exports = function toNumber(val, defaultValue = null) {
  const num = Number(val);
  return Number.isFinite(num) ? num : defaultValue;
};
