const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = env => {
    if (!env) {
        env = {}
    }
    let plugins = [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
        new VueLoaderPlugin(),
        new UglifyJsPlugin()
    ];
    return {
        mode: 'development',
        entry: ['./src/main.js', './src/viewport.js'],
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    oneOf: [{
                        resourceQuery: /module/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                }
                            }, {
                                loader: 'px2rem-loader',
                                options: {
                                    remUnit: 40,
                                    remPrecision: 8
                                }
                            }, {
                                loader: 'postcss-loader',
                                options: {
                                    ident:'postcss',
                                    plugins: [
                                        require('postcss-cssnext')(),
                                        require('cssnano')()
                                    ]
                                }
                            },
                            'sass-loader'
                        ]
                    }],
                }
            ]
        },
        plugins,
        resolve: {
            extensions: [
                '.js', '.vue', '.json'
            ],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    }
};