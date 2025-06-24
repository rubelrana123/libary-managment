import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const uri = config.database_url; 
let server : Server;
async function main() {
    try {
        await mongoose.connect(uri as string);
        console.log("server is connected")
        server = app.listen(config.port, () => {
            console.log(`App is listening on port ${config.port}`);

        })
        
    } catch (error) {
        console.log(error)
        
    }

  
}    

main();