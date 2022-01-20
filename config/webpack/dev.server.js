const path             = require('path');
const Webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig    = require('./webpack.config.js');
const paths            = require("../paths");

const devServer = {
    compress: true,
    static: {
        directory: paths.build,
    },
    historyApiFallback: true,
    hot:                true,
    open:               true,
    liveReload:         true,
    port:               3000,
    magicHtml:          true,
    watchFiles:         ['src/**/*', 'public/**/*'],
}

const compiler = Webpack(webpackConfig);
const server   = new WebpackDevServer(devServer, compiler);

server.start().then(() => {});
