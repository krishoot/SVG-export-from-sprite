const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("../../paths");
module.exports = new HtmlWebpackPlugin({
    template: `${paths.public}/index.html`,
    filename: 'index.html',
});