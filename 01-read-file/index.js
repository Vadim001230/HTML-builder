const path = require('path');
const fs = require('fs');
const { stdout } = process;

let readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on('data', data =>
  stdout.write(data)
);