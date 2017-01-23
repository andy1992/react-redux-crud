import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import open from 'open';

const app = express();
const compiler = webpack(config);
const indexPath = path.join(__dirname, '/index.html');
const publicPath = express.static(path.join(__dirname, '/public'));
const port = 3000;

app.use('/public', publicPath);

// Use Webpack. Comment the next 2 lines when you are deploying to production server
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('*', function response(req, res) {
    res.sendFile(indexPath);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});