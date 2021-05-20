const express = require('express')
const app = express()

const Router = require('./Router');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('SuperCine Online!')
})

app.use('/cinema', Router);

app.listen(3000, () => {
  console.log(`Servidor Node.js em execusão... http://localhost:3000`)
})

