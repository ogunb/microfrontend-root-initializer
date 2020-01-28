const express = require('express');
const app = express();
app.listen(3001, () => {
    console.log('account up...');
})

app.get('*', (req, res) => {
    res.send('account hit.');
})
