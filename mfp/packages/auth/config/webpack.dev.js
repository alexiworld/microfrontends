const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); 
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        // [NOTE1] Previously nested paths like localhost:8082/auth/signin
        // were broken because they were referencing auth's main.js
        // as localhost:8082/auth/main.js while the correct location of
        // the actual file is localhost:8082/main.js. This problem could
        // have been easily solved by adding publicPath: '/' property to
        // devConfig. However, ... [NOTE2]
        //        
        // [NOTE2] If publicPath is set to '/' auth's remoteEntry.js will 
        // referencing dependent js files as they are located on the default 
        // domain (in other words from container's domain localhost:8080).
        // To solve this new problem, publicPath must be set to the 
        // full domain of auth app, ending with '/' as shown below.
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

// devConfig will override existing common configs
module.exports = merge(commonConfig, devConfig);