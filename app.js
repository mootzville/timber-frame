'use strict';
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const init = require('./routes/init.js');

app.get('/', init);

app.use(express.static('static'));

app.get('*', (req,res) => { 
    res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));