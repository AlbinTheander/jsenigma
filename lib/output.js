class Output {
  constructor() {
    this.data = '';
  }

  receive(ch) {
    this.data += ch;
  }

  get text() {
    const lines = chunk(this.data, 25);
    const chunkedLines = lines.map(line => chunk(line, 5).join(' '));
    return chunkedLines.join('\n');
  }
}

const chunk = (s, n) => {
  const chunker = new RegExp(`.{${n}}|.+`, 'g');
  return s.match(chunker);
}

module.exports = Output;
