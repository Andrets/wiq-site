const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

const outputDirectory = mode === "development" ? path.resolve(__dirname, 'dist', 'development') : path.resolve(__dirname, 'dist', 'production');

module.exports = {
    mode,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: outputDirectory,
        clean: true,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [
                        '.ts', '.tsx', '.js', '.json'
                    ]
                },
                use: {
                    loader: 'ts-loader'
                },
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ],
                exclude: /\.index\.css$/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin(),
    ]
}