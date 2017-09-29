var path = require('path');
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
    }
}