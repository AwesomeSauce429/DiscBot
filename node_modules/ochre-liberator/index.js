var exec = require('child_process').exec;

function getFileContents(path, cb) {
    exec('libreoffice5.0 --headless --cat "' + path + '"', function (error, stdout, stderr) {
        cb(error, stdout);
    });
}

module.exports.getFileContents = getFileContents;
