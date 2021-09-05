const fs = require("fs");
const dir = __dirname; // Current directory
const [height, width] = [1000, 1000];

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];


const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if (_str.includes(r.key)) {
            itemRarity = r.val;
        }
    });
    return itemRarity;
}



const cleanName = (_str) => {
    let name = _str.slice(0, -4);
    rarity.forEach((r) => {
        name = name.replace(r.key, "");
    });
    return name;
}


const getElements = (path) => {
    return fs
    .readdirSync(path.replace(/\//g, "\\")) // Using Windows OS, we need to replace / with \\ character
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item) )
    .map((i, index) => {
        return {
            id: index + 1,
            name: cleanName(i),
            fileName: i,
            rarity: addRarity(i),
        }
    })
}


const layers = [
    {
        id: 1,
        name: "background",
        location: `${dir}/background/`,
        elements: getElements(`${dir}/background/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 2,
        name: "ball",
        location: `${dir}/ball/`, 
        elements: getElements(`${dir}/ball/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 3,
        name: "eye_color",
        location: `${dir}/eye_color/`, 
        elements: getElements(`${dir}/eye_color/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 4,
        name: "iris",
        location: `${dir}/iris/`, 
        elements: getElements(`${dir}/iris/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 5,
        name: "shine",
        location: `${dir}/shine/`, 
        elements: getElements(`${dir}/shine/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 6,
        name: "bottom_lid",
        location: `${dir}/bottom_lid/`, 
        elements: getElements(`${dir}/bottom_lid/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
    {
        id: 7,
        name: "top_lid",
        location: `${dir}/top_lid/`, 
        elements: getElements(`${dir}/top_lid/`),
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
    },
];

// for (let i = 0; i < 7; i++){
//     console.log("LAYER " + i);
//     console.log(layers[i].elements);
// }


module.exports = {layers, width, height};