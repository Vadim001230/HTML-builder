const path = require('path');
const fs = require('fs');

const mainFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(copyFolder, { recursive: true }, err => {
    if (err) throw err;
  });

  fs.readdir(copyFolder, {withFileTypes: true}, (err, files) => {
    for (let file of files) {
      fs.unlink(path.join(copyFolder, file.name), function () {
      })
    }
    fs.readdir(mainFolder,{ withFileTypes: true }, (err, files) => {
      if (err)
        throw err;
      else {
        files.forEach(file => {
          fs.copyFile(path.join(mainFolder, file.name), path.join(copyFolder, file.name), (err) => {
            if (err) {
              throw err;
            }
          });
        })
      }
    })
  })
}

copyDir();
