const path = require('path');

module.exports = {
    entry: {
        main:   './src/index.js',
        app:    './docs/assets/js/app.js',
        demo01: './docs/assets/js/demo/demo1.js',
        demo02: './docs/assets/js/demo/demo2.js',
    },
    output: {
        filename: (pathData) => {
            return (pathData.chunk.name.includes('demo') || pathData.chunk.name.includes('app')) ? 'docs/assets/js/[name].min.js' : 'dist/[name].min.js';
        },
        path: path.join(__dirname, './'),
    }
};
