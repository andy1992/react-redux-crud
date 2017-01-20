var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './public/src/main.js'
    ],
    output: {
        path: __dirname + '/public/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        moduleDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            /*{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                presets: ['es2015', 'react']
            },*/
            // CSS
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src/assets/dist'),
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['eslint-loader', 'babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    eslint: {
        configFile: './.eslintrc'
    },

    // Add proxy in case you need to bypass CORS, for example in your local dev environment
    /*devServer: {
        proxy: {
            '/react-redux-crud/api': {
                target: 'http://localhost:8081',
                secure: false,
                changeOrigin: true
            }
        }
    }*/
};