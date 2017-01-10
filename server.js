/*const path = require('path');
const express = require('express');

module.exports = {
    app: function() {
        const app = express();
        const indexPath = path.join(__dirname, '/index.html');
        const publicPath = express.static(path.join(__dirname, '/public'));

        app.use('/public', publicPath);
        app.get('/', function(_, res){ res.sendFile(indexPath) });

        return app;
    }
};*/

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import open from 'open';

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '/index.html'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler)); // And this line
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/public'));
});

const port = 3000;
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});