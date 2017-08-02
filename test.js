

// http://stackoverflow.com/a/26828357/
var fs = require('fs');
var path = require('path');

var walk = function(directoryName) {
  fs.readdir(directoryName, function(e, files) {
    if (e) {
      console.log('Error: ', e);
      return;
    }
    files.forEach(function(file) {
      var fullPath = path.join(directoryName,file);
      fs.stat(fullPath, function(e, f) {
        if (e) {
          console.log('Error: ', e);
          return;
        }
        if (f.isDirectory()) {
          walk(fullPath);
        } else {
          console.log(fullPath + "   " + fullPath.split("_").join(""));
        }
      });
    });
  });
};

walk('./generators/app/templates/_client')
