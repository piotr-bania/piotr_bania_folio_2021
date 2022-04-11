const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            // {
            //     test: /\.(svg|png|jpg|jpeg|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'images'
            //         }
            //     }
            // },
            {
                test: /\.(glb|gltf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/models/'
                    }
                }]
            },
            {
                // test: /\.gltf$/,
                // use: [{
                //         loader: 'file-loader',
                //         options: {
                //             esModule: false
                //         },
                //     },
                //     '@vxna/gltf-loader',
                // ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test | ThreeJS',
            filename: 'index.html',
            template: 'src/template.html'
        })
    ]
}