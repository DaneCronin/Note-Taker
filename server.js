const express = require('express');
const fs = require('fs');


//Setup Express app/initiate server
const app = express();
const PORT = process.env.PORT || 3001;


//Starts server to start listening for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});