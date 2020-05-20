const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        app: './docs/assets/js/app.js',
    },
    output: {
        filename: (pathData) => {
            return (pathData.chunk.name === 'app') ? 'docs/assets/js/[name].min.js' : 'dist/[name].min.js';
        },
        path: path.join(__dirname, './'),
    }
};
