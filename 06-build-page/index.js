const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
  if (err) throw err;
});

//index.html

const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

input.on('data', chunk => {
  fs.readdir(path.join(__dirname, 'components'), (err, files) =>{
    files.forEach(file => {
      let fileName = file.replace('.html', '');
      if (chunk.includes(`{{${fileName}}}`)){
        const readableStream = fs.createReadStream(path.join(__dirname, 'components', file));
        readableStream.on('data', text => {
          chunk = chunk.replace(`{{${fileName}}}`, text.toString());
          const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
          output.write(chunk)
        });
      };
    });
  });
});

//style.css

const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    if (file.isFile() === true && path.extname(file.name) === '.css') {
      fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
        style.write(data);
      });
    };
  });
});

//copy assets
fs.readdir(__dirname + '/assets',{ withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    fs.mkdir(path.join(__dirname + '/project-dist/', 'assets'), { recursive: true }, err => {
      if (err) throw err;
    });
    files.forEach(file => {
      fs.mkdir(path.join(__dirname + '/project-dist/assets/', file.name), { recursive: true }, err => {
        if (err) throw err;
      });
      fs.readdir(__dirname + '/assets/' + file.name, { withFileTypes: true }, (err, items) => {
        if (err) throw err;
        else {
          items.forEach(item => {
            fs.copyFile(__dirname + '/assets/' + file.name + '/' + item.name,
                        __dirname + '/project-dist/assets/' + file.name + '/' + item.name,
                        (err) => {
              if (err) {
                throw err;
              }
            });
          })
        }
      })
    })
  }
})



