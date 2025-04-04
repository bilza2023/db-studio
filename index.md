
import convertMongoToRelational from "./convertMongoToRelational.js";
import {db} from "./SECURE17-mar-2025.js";



function main() {
    // const inputFilePath = path.join(__dirname, 'mongodb-data.json');
    // const outputFilePath = path.join(__dirname, 'relational-data.json');
    // console.log("db",db);
    
    convertMongoToRelational(db, "./relational-data.json");
  }
  
main();