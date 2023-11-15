import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// Access the beginning of the path (directory name) where to find the files. It can vary on different computers and servers.
// The `dirname` function extracts the directory name from the URL.
// The `fileURLToPath` function converts the directory part of the URL to a file path format (since URLs and file paths have different formats).
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use express framework
const app = express();
// Define a port for testing
const port = 3000;

// Listen  and responde to a Get request on the root path (used when visiting a website).
app.get("/", (req, res) => {
// Respond to the request of the website visitor with a index html page. The dirname "root path" plus the end of the path for the html file location.
  res.sendFile(__dirname + "/public/index.html");
})

// Mount bodyParser middleware to make easier for our server to work and understand the information sent by the user that got encoded on the URL.
app.use(bodyParser.urlencoded({ extended: true}));

let bandName;

const generateBandName = (req, res, next) => {
    bandName = req.body.street + req.body.pet;
    next()
}

app.use(generateBandName)

app.post("/submit", (req, res) => {
  const resposeText = `<h1>Your band name is:</h1><br><h2>${bandName} 🎸</h2>`;
  res.send(resposeText);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
