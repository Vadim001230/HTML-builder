const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (err) {
      throw err;
    } else {
      if (file.isFile()) {
        fs.stat(path.join(folder, file.name), (error, stats) => {
          if (error) {
            throw error;
          } else {
              let nameFile = file.name;
              let extFile = path.extname(file.name);
              let sizeFile = stats.size / 1024;
              console.log(`${nameFile.split('.')[0]} - ${extFile.slice(1)} - ${sizeFile.toFixed(3)} kb`);
          }
        });
      }
    }
  });
});