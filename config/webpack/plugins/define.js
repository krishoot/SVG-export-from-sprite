/**
 * @see https://webpack.js.org/plugins/define-plugin/
 */
const
    webpack  = require('webpack'),
    NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: true,
    NODE_ENV:      JSON.stringify(NODE_ENV),
    'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
    }
})
