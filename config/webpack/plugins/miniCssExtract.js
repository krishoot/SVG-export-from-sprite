const
    DEV_SERVER = process.env.DEV_SERVER || false,
    fileName = DEV_SERVER ? '[name]' : '[name]_[contenthash]';

/**
 * @see https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const MiniCssExtract = require('mini-css-extract-plugin');
module.exports = new MiniCssExtract({
    filename:      `css/${fileName}.css`,
    chunkFilename: `css/${fileName}.css`
});
