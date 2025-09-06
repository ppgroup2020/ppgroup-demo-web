const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.get('/api/health', (req,res)=> res.json({ok:true,name:'PP Group API'}));
app.use('/', express.static(path.join(__dirname,'..','client')));
app.listen(process.env.PORT||3000, ()=> console.log('PP Group API a correr na porta', process.env.PORT||3000));
