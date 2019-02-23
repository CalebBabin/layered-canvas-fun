
const path = require('path');
const Fiber = require('fibers');

module.exports = {
    entry: './src/scripts/index.js',
    mode: 'development',
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    fiber: Fiber
                }
            }]
        }]
    }
};