const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

//for the HTTPS implementation
const https = require('https')
const path = require('path')    //to get path of files
const fs = require('fs')        //for file handeling

const connectDB = require('./server/config/db')            //get DB
const auth = require('./server/routes/auth.routes')        //get routes

dotenv.config({path: './server/config/configurations.env'})        //get the configured env vars

connectDB();        //to connect the DB

const app = express();

//new
app.use('/uploads',express.static('./server/uploads'))
app.use('/device_photos', express.static('./server/device_photos'));  

app.use(express.json());        //expect json
app.use(cors())                 //TODO
app.use('/api/auth',auth)       //get auth route

//for testing the server
app.get('/',(req,res)=>{
    res.send("Hello World")
})

const PORT = process.env.PORT || 5000;

/*
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
})
*/

//create an SSL server
const sslServer = https.createServer({
    //key of the certificate
    key: fs.readFileSync(path.join(__dirname, './server/cert', 'key.pem')),             //sync file reading is used here because this file is essntial for the server to start
    //certificate
    cert: fs.readFileSync(path.join(__dirname, './server/cert', 'cert.pem'))
},app)

sslServer.listen(PORT, () => console.log(`Secure server on port ${PORT}`))