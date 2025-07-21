const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;
app.use(cors())




app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});