
function encode(key, mapping, offset, ch) {
  const code = key.indexOf(ch);
  if (code === -1) return ch;
  const codeWithOffset = (code + offset + key.length) % key.length;
  return mapping[codeWithOffset];
}

module.exports = {
  encode,
};
