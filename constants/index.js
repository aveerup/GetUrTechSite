const {config} = require('dotenv')
config()

module.exports={
    SERVERPORT : process.env.serverPort,
    SERVER_URL : process.env.serverurl,
    CLIENT_URL:process.env.clienturl,
    PASSWORD:process.env.dtpassword,
    SECRET: process.env.secret,
}