const workerSettings = {
    poolTimeout:        500,
    workers:            4,
    workerParallelJobs: 100,
    poolParallelJobs:   1000,
};

module.exports = {
    test: /\.vue$/,
    use:  [
        {
            loader: 'thread-loader',
            options: workerSettings,
        },
        {
            loader:  'vue-loader',
            options: {
                extractCSS: false
            }
        },
    ]
}
