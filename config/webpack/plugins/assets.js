/**
 * @see https://github.com/ztoben/assets-webpack-plugin
 */
const Assets      = require('assets-webpack-plugin');
const path        = require("path");
const storagePath = path.resolve(__dirname, './../../../src/assets');
module.exports = new Assets({
    path:                storagePath,
    filename:            'assets.json',
    includeAllFileTypes: true,
    //fileTypes:           ['js', 'css', 'svg']
})
