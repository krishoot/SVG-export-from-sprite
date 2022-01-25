'use strict';

const
    NODE_ENV = process.env.NODE_ENV || 'development',
    WATCH    = process.env.WATCH === "true" || false,
    SERVE    = process.env.SERVE === "true" || false,
    path     = require('path'),
    {merge}  = require('webpack-merge'),
    paths    = require("../paths");

let settings = {
    mode:  NODE_ENV,
    //esModule: true,
    entry: {
        app: `${paths.src}/index.ts`,
    },
    output: {
        filename:   'js/[name].[contenthash].js',
        path: paths.build
    },
    watch: (WATCH === true || SERVE === true),
    watchOptions: {
        aggregateTimeout: 1200,
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.vue' ],
        fallback: {
            "events": false,
            "buffer": false,
            "url":    false,
            'fs':     false,
            'path':   false,
        }
    },
    optimization: {
        minimize:     false,
        emitOnErrors: false,
    },
    plugins: [],
    module: {
        rules: []
    }
};

/**
 * ########################################
 * Добавление плагинов WebPack:
 * ########################################
 */
const addPlugin = (plugin) => {
    settings = merge(settings, {plugins: [plugin]})
};

addPlugin(require('./plugins/vueLoader'));
addPlugin(require('./plugins/miniCssExtract'))
addPlugin(require('./plugins/define'));
addPlugin(require('./plugins/assets'));
addPlugin(require('./plugins/cleanWebpack'));
addPlugin(require('./plugins/webpackBar'));
addPlugin(require('./plugins/HTMLWebpack'));
addPlugin(require('./plugins/copyWebpack'));

/**
 * #######################################
 * Добавление лоадеров для разнообразных
 * типов файлов:
 * #######################################
 */
const addLoader = (loader) => {
    settings = merge(settings, {module: {rules: [loader]}});
}

addLoader(require('./loaders/images'));
addLoader(require('./loaders/swc'));
addLoader(require('./loaders/vue'));
addLoader(require('./loaders/scss'));
addLoader(require('./loaders/fonts'));
addLoader(require('./loaders/styles'));

module.exports = settings;
