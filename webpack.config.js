var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        // Comment the next 2 lines when you deploy the app to production stage
        //'webpack-dev-server/client?http://127.0.0.1:8080/',
        //'webpack/hot/only-dev-server',
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
};