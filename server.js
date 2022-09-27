const express = require('express');
const fs = require('fs');
const path = require("path");


//Setup Express app/initiate server
const app = express();
const PORT = process.env.PORT || 3001;

//Express.js middleware that instructs server to make front end files available
app.use(express.static('public'));
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//HTML paths
// RETURN the contents at `notes.html `
app.get("/notes", (req, res) => {
    const notes = noteData
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Wildcard Route to catch unintentional routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//GET route to connect server with API to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})



//Starts server to start listening for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});