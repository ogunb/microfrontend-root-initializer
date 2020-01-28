const express = require('express');
const app = express();
app.listen(3002, () => {
    console.log('product up...');
})

app.get('*', (req, res) => {
    res.send('product hit.');
})
