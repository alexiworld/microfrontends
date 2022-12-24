const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                // bootstrap is exporting mount function
                // and therefore we need to change index
                // to bootstrap.
                './ProductsIndex': './src/bootstrap', 
            },
            shared: ['faker']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
};