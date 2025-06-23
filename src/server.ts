import { Server } from "http";
import app from "./app";

// getting-started.js
const mongoose = require ('mongoose');

// main().catch(err => console.log(err));
let server : Server;
const port = 5000;
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/libaryManagment');
        console.log("server is connected")
        server = app.listen(port, () => {
            console.log(`App is listening on port ${port}`);

        })
        
    } catch (error) {
        console.log(error)
        
    }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}    

main();