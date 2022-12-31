const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); 
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        // [NOTE] Previously nested paths like localhost:8082/marketing/something
        // were broken because they were referencing marketing's main.js
        // as localhost:8081/marketing/main.js while the correct location of
        // the actual file is localhost:8081/main.js. This problem could
        // have been easily solved by adding publicPath: '/' property to
        // devConfig. However, ... [NOTE2]
        //        
        // [NOTE2] If publicPath is set to '/' auth's remoteEntry.js will 
        // referencing dependent js files as they are located on the default 
        // domain (in other words from container's domain localhost:8080).
        // To solve this new problem, publicPath must be set to the 
        // full domain of marketing app, ending with '/' as shown below.
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap',
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