const path = require('path');

module.exports = {
    entry: {
        simulator: './src/index.js',
        app: './dist/app.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, 'dist'),
    }
};
