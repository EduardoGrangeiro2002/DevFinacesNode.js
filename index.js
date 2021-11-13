const PORT = 3000;
const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
const path = require('path');

app.use('/api', apiRoute);

app.use('/', express.static(path.join(__dirname, "public")))



app.listen(PORT, (err) => {
    if(err){ throw err}
    console.log(`Servidor rodando na porta:${PORT}`)
})