const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
  },
  resolve: {
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "net": false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};