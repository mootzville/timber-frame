var express = require('express');
var router = express.Router();
var template = require('backtick-template');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('head/head.json', {encoding: 'utf8'}));
var html = fs.readFileSync('head/head.html', {encoding: 'utf8'});
var style, script, data;

function readSyncConcat (files) {
    return files.map(function (relativePath) {
        return fs.readFileSync(relativePath, {encoding: 'utf8'});
    }).join('\n');
}

if (config.styles) {
    style = { content: readSyncConcat(config.styles) };
}

if (config.scripts) {
    script = { content: readSyncConcat(config.scripts) };
}

data = { meta: config.meta, script: script, style: style }
html = template(html, data)

function init (req, res) {
    res.send(template(html));
}

router.get('/', init);

module.exports = router;