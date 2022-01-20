module.exports = {
    test: /\.(ttf|eot|otf|woff|woff2)$/i,
    type: 'asset/resource',
    generator: {
        filename: 'fonts/[hash][ext]',
    },
};
