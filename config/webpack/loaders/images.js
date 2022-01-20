module.exports = {
    test: /\.(svg|png|jpe?g|gif|ico)$/i,
    type: 'asset/resource',
    generator: {
        filename: 'img/[hash][ext]',
    },
};
