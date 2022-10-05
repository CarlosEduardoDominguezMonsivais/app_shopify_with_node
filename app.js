const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
//Engine
const { Liquid } = require('liquidjs');

global.engine = new Liquid({
    root:  ['./views',  './views/layouts'],
    extname: '.liquid',
});
app.engine('liquid', engine.express());
app.set("view engine","liquid");
app.use(express.static(path.join(__dirname, 'views/assets')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes = require('./routes');
Object.keys(routes).forEach(attr => {
    app.use('/', routes[attr]);
});


app.listen(PORT, ()=> console.log('listening on port ' +PORT));