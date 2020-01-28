const express = require('express');
const app = express();
app.listen(3003, () => {
    console.log('dashboard up...');
})

app.get('*', (req, res) => {
    res.send('dashboard hit.');
})
