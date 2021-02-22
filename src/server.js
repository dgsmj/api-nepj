const express = require('express');
const app = express();


app.use(express.json());
app.use('/api', require('./route/posts-route') );

app.listen(3000);