const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    entry: './dist/app.js',
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dist'),
    }
};