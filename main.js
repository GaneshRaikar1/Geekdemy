const fs = require("fs");
const { main } = require("./functions");

const takeInput = (filename) => {  
    let commands
    fs.readFile(filename, "utf8", (err, data) => {
       if (err) throw err
       commands = data.toString().split("\n")
       main(commands)
    })
}

module.exports={takeInput}