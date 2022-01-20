/**
 * Используется для сборки TS|JS файлов.
 * @see https://swc.rs/docs/usage/swc-loader
 */
module.exports = {
    test: /\.(m?js|tsx?)$/,
    exclude: /(node_modules)/,
    use: {
        // `.swcrc` can be used to configure swc
        loader: "swc-loader"
    }
};
