const express = require('express');

const app = express();

app.use(require('./routes/categoryRoute'))
app.use(require('./routes/productRoute'))

app.listen(3000, () => console.log('Listening on port 3000'));
