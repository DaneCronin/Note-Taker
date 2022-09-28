const express = require('express');
const fs = require('fs');
const path = require("path");
const uuid = require('uuid');



//Setup Express app/initiate server
const app = express();
const PORT = process.env.PORT || 3001;

//Parse(convert) incoming JSON data
app.use(express.json());
//Parse(convert) incoming POST data string or array data
app.use(express.urlencoded({ extended : true}));


//Express.js middleware that instructs server to make front end files available
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });








//API routes to Get/Post
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
})

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.push(newNote);

        console.log(arrayOfObjects);
        arrayOfObjects = JSON.stringify(arrayOfObjects);
        fs.writeFile('./db/db.json', arrayOfObjects, (err, data) => {
            if (err) throw err

            console.log("Success!");
        });
    });


    res.send(newNote);

});

//Delete Notes


//HTML paths
// RETURN the contents at `notes.html `
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Wildcard Route to catch unintentional routes and return index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});





//Starts server to start listening for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});