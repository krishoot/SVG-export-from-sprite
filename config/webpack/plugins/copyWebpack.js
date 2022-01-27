const CopyPlugin = require("copy-webpack-plugin");
const path        = require("path");
const storagePath = path.resolve(__dirname, './../../../src/assets/js/content/');
const buildPath = path.resolve(__dirname, './../../../build/SVG-export-from-sprite-extension/');

module.exports = new CopyPlugin({
    patterns: [
        {
            from: storagePath,
            to: buildPath
        }
    ]
})