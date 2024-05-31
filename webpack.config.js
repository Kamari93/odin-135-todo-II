const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Your main entry file
    output: {
        filename: 'main.js', // Output bundled file
        path: path.resolve(__dirname, 'dist'),
    },
    // Add other rules/loaders as needed for transpilation, styles, etc.
};