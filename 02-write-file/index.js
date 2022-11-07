const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('\nHello, write something!\n\n');
process.on('SIGINT', () => {
  process.exit();
});

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(data);
});

process.on('exit', () => {
  stdout.write('\nYour text is written to a file text.txt\nGoodbye!\n')
});