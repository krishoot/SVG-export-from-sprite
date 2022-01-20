module.exports = {
    test: /\.worker\.ts$/,
    loader: "worker-loader",
    options: {
        publicPath: "/js/workers/",
        filename: "js/workers/[contenthash].worker.js",
    },
};
