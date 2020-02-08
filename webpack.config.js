const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    entry: { 
        app: SRC_DIR + '/index.tsx'
    },
    output: {
        path: DIST_DIR,
        filename: '[name].bundle.min.js'
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                include: SRC_DIR,
                exclude: /node_modules/,
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'React with TypeScript, bundled with Webpack',
            template: SRC_DIR +'/index.html',
            filename: DIST_DIR + '/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },

    // Mount web server with HMR.
    devServer: {
        historyApiFallback: true,
        contentBase: DIST_DIR,
        compress: true,
        port: 8080,
        hot: true,
        inline: true
    } 
};