const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    test: /\.s[ac]ss$/i,
    use: [
        // minify all css output
        MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        "css-loader",
        // Path fix resolver for scss
        "resolve-url-loader",
        // Compiles Sass to CSS
        {
            loader: "sass-loader",
            options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
                sourceMap: true
            },
        }
    ],
}
