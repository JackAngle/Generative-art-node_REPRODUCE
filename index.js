/* IMPORT AREA*/ 

const fs = require("fs"); //Filesystem
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(1000, 1000); //Global canvas
const ctx = canvas.getContext("2d");
const { layers, width, height } = require("./input/config.js");
const { PassThrough } = require("stream");
const myArgs = process.argv.slice(2); // Import argument values from command line



/* VARIABLE INITIALIZE AREA */

const editions = myArgs.length > 0? Number(myArgs[0]) : 1; // Variable for total supply in author's tongue


var metadata = [];
var hash = [];
var decodedHash = [];
var attributes = [];



/* FUNCTIONS AREA*/ 

// This function will help saving each image being created
// It will use _edition to make filename distinguish
const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
}


// This function will add Metadata
const addMetadata = (_edition) => {
    let dateTime = Date.now();
    let tmpMetadata = {
        hash: hash.join(""),
        decodedHash: decodedHash,
        edition: _edition,
        date: dateTime,
        attributes: attributes
    }
    metadata.push(tmpMetadata);
    hash = [];
    decodedHash = [];
    attributes = [];

}


//This function will add Attributes
const addAttributes = (_element, _layer) => {
    let tmpAttribute = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    }
    attributes.push(tmpAttribute);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push({[_layer.id]: _element.id});
}


// This function will draw layer into the current canvas
// It will random extract layer's element and draw a new layer based on those extracted elements
const drawLayer = async (_layer, _edition) => {
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    console.log(element);
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location.replace(/\//g, "\\")}${element.fileName}`); // Added replace because of Windows OS
    ctx.drawImage(
        image, 
        _layer.position.x, 
        _layer.position.y, 
        _layer.size.width,
        _layer.size.height,
        );
    saveLayer(canvas, _edition);
    console.log(
        `In edition ${_edition}, I created the ${_layer.name} layer, and choose element ${element.name}`
    )
}



/* MAIN PROGRAM */

// Drawing layers loop
for (let i = 1; i <= editions; i++){
    layers.forEach((layer) => {
        drawLayer(layer, i);
    })
    addMetadata(i);
    console.log("Creating edition " + i);
}

// Save metadata to json
fs.readFile("./output/_metadata.json", (err, data) => {
    if (err) {
        // Handle FileNotExist case
        if (err.code === 'ENOENT') {
            fs.writeFileSync('./output/_metadata.json', '');
        } else throw err;
    }
    fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
})
