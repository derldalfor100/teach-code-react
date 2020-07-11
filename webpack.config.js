const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.resolve(__dirname, 'enviroments');

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/enviroment';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + argv.mode + '.env';

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath + '.env';

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/[name].[contenthash:8].js",
            publicPath: isProduction ? '' : '/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development"
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        name: "static/media/[name].[hash:8].[ext]"
                    }
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        plugins: [
            isProduction &&
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash:8].css",
                chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
            }),
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public/index.html"),
                inject: true
            }),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                PUBLIC_URL: isProduction ? '' : 'public' // can modify `static` to another name or get it from `process`
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'favicon.ico'),
                        to: '/'
                    },
                    {
                        from: path.resolve(__dirname, 'manifest.json'),
                        to: '/'
                    }
                ],
            })
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            comments: false,
                            ascii_only: true
                        },
                        warnings: false
                    }
                }),
                new OptimizeCssAssetsPlugin()
            ],
            splitChunks: {
                chunks: "all",
                minSize: 0,
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                        }
                    },
                    common: {
                        minChunks: 2,
                        priority: -10
                    }
                }
            },
            runtimeChunk: "single"
        },
        devServer: {
            compress: true,
            historyApiFallback: true,
            open: true,
            overlay: true
        }
    };
};