import { createServer } from 'node:http';

const server = createServer()
server.on("request", (request, response) => {
  if (request.method === "POST") {
    console.log("POSTED")
    
    request.on("data", (data) => {
        console.log("You sent " + data)
        response.writeHead(200)
    }).on('end', function(){
        console.log("Stop process");
     });
  } else if (request.method === "GET") {
    console.log("GOT")

    let send = "The day is today"
    request.on("data", (data) => {
        send = "You sent " + data
        response.writeHead(200)
    }).on("end", () => {
        response.write(JSON.stringify(send))
        response.end()
        console.log("Stop process");
    })
  }
});

const myServer = server.listen(3000);
console.log("Start Server")

fetch("http://localhost:3000/", {method: "GET"})
    .then((response) => response.json(), (err) => console.log(err))
    .then((data) => {
        console.log("On Client")
        console.log(data)
    })