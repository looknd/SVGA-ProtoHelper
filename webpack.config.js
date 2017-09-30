var path = require('path');
var webpack = require('webpack')
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "svga.protohelper.js"
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'index.js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.js$/,
            minimize: true,
            output: { comments: false },
        }),
    ]
}