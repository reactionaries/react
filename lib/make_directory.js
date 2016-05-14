const fs = require('fs');
  function checkDirectory(directory) {
    fs.stat(directory, (err) => {
      if (err) {
        fs.mkdir(directory);
        return process.stdout.write('made directory');
      }
      process.stdout.write('dir exists');
    });
  }
  checkDirectory('./db/');
