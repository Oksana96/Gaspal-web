require('ignore-styles');

require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/react'],
    plugins: [
        "@babel/plugin-proposal-class-properties"
    ]  
});

require('./index');