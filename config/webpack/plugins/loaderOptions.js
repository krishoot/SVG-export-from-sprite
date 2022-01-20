/**
 * @see https://v4.webpack.js.org/plugins/loader-options-plugin/
 */
const webpack  = require('webpack');
/**
 * @deprecated
 * @type {webpack.LoaderOptionsPlugin}
 */
module.exports = new webpack.LoaderOptionsPlugin({
    options: {
        customInterpolateName: url => {
            return url.replace(/\\/g, '/');
        }
    }
})
