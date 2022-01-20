/**
 * @see https://github.com/johnagan/clean-webpack-plugin
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = new CleanWebpackPlugin({
    verbose:                      true,
    cleanStaleWebpackAssets:      true,
    protectWebpackAssets:         false,
    cleanOnceBeforeBuildPatterns: [
        'js/*',
        'css/!*',
        'workers/!*',
        '!index.html',
        '!cash.ico',
    ],
});
