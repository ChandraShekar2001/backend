const app = require('./app')

const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

//config
dotenv.config({path: './config/config.env'})

connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
}) 


//unhandled promise
process.on('unhandledRejection', err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to unhandled Promise rejection');
    server.close(()=>{
        process.exit();
    })
})