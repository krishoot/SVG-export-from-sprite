const CopyPlugin = require("copy-webpack-plugin");
const path        = require("path");
const storagePath = path.resolve(__dirname, './../../../src/assets/js/content/');

module.exports = new CopyPlugin({
    patterns: [
        {
            from: storagePath,
            to({ context, absoluteFilename }) {
                return "[name][ext]";
            },
        }
    ]
})