var exec = require('child_process').exec;

function getText(path, lang , cb) {
    exec('tesseract "'+ path + '" stdout -l ' + lang , function (error, stdout, stderr) {
        cb(error, stdout);
});
}
module.exports.getText = getText;
