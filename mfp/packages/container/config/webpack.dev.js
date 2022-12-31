const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); 
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        // [NOTE] Used the full domain for reasons explained in
        // auth and marketing dev configs.
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            // package.json's dependencies are what will be used in production 
            // and probably shared between the modules.
            shared: packageJson.dependencies,
        }),
    ]
}

// devConfig will override existing common configs
module.exports = merge(commonConfig, devConfig);