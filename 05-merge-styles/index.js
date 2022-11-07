const path = require('path');
const fs = require('fs');

const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    if (file.isFile() === true && path.extname(file.name) === '.css') {
      fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
        bundle.write(data);
      });
    };
  });
});