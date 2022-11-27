/**
 * Welcome to an experiment in JS classes, designed to be a fun small project 
 * that you can mess around with.
 * 
 * It is coded in 100% Javascript and could probably be way more efficient. (Made by a 12 year-old)
 * Just paste into a web Javascript console and wait for it to load. 
 * OR
 * open the index.html file in your browser.
 * 
 * Controls explained in the README.md file
 * This is free to use, have fun!
 * 
 * All images sourced from the Minecraft Wiki (https://minecraft.fandom.com/wiki/List_of_block_textures), 
 * which is licenced under the CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/legalcode).
 */

/**
 * TODO: 
 * Create Local Storage
 * Finish palateSquare
 * Learn jQuery maybe
 * Add mouse controls for fill and clear or whatever
 * Add a system to make encoded / decode text to builds
 */

// Vars

document.title = "MC Block Placer";
let blockList = [];
let menuOpen = false;
let lastBlockPlaced = "stone";
let fillPointOne, fillPointTwo, clearPointOne, clearPointTwo = undefined;
const grid = document.body.appendChild(document.createElement("div"));
let currentBlockType = "stone";
grid.id = "gridContainer";
let gridWidth = 34, gridHeight = 15, blockSide = 50, blockCount = blockList.length, buttonMode = 0, index, shouldLogBlockData = true,
canSwitch = true;

// Styles
document.body.style.overflow = "auto";
const preCon1 = document.head.appendChild(document.createElement("link"));
preCon1.rel = "preconnect";
preCon1.href = "https://fonts.googleapis.com";

const preCon2 = document.head.appendChild(document.createElement("link"));
preCon2.rel = "preconnect";
preCon2.href = "https://fonts.gstatic.com";
preCon2.crossOrigin = true;

const font = document.head.appendChild(document.createElement("link"));
font.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
font.rel = "stylesheet";
const styles = document.head.appendChild(document.createElement("style"));
styles.innerHTML = "#gridContainer, #full_palate {font-family: 'Press Start 2P', cursive; font-size: 15px};";
// Grid
let cellContainer = [];        
for (column = 0; column < gridHeight; column++) {
    cellContainer[column] = [];
    const rowDiv = grid.appendChild(document.createElement("div"));
    rowDiv.id = "Row_" + column;
    for (row = 0; row < gridWidth; row++) {
        cellContainer[column][row] = {
            x : row,
            y : column,
            isOccupied : false,
            gridBlock : null,
        };
        cellContainer[column][row].gridBlock = rowDiv.appendChild(document.createElement("div"));
        cellContainer[column][row].gridBlock.style.position = "absolute";
        if (row != 0) cellContainer[column][row].gridBlock.style.left = row * blockSide + 200; 
        else {
            let xCoord = cellContainer[column][row].gridBlock.appendChild(document.createElement("p"));
            xCoord.innerText = column;
            xCoord.style.position = "absolute";
            xCoord.style.right = 60;
            xCoord.style.top = 10;
            cellContainer[column][row].gridBlock.style.left += 200;
        }
        if (column === 0) {
            let yCoord = cellContainer[column][row].gridBlock.appendChild(document.createElement("p"));
            yCoord.innerText = row;
            yCoord.style.position = "absolute";
            yCoord.style.left = 20;
            yCoord.style.bottom = 50;
            if (row >= 10) yCoord.style.left = 10;
        } 
        cellContainer[column][row].gridBlock.style.top = column * blockSide + 200;
        cellContainer[column][row].gridBlock.style.width = blockSide;
        cellContainer[column][row].gridBlock.style.height = blockSide;
        cellContainer[column][row].gridBlock.style.borderStyle = "solid";
        cellContainer[column][row].gridBlock.style.borderWidth = 1;
        cellContainer[column][row].gridBlock.style.borderColor = "black";
        cellContainer[column][row].gridBlock.id = cellContainer[column][row].x + " " + cellContainer[column][row].y;
        grid.addEventListener("contextmenu", (e) => e.preventDefault()); 
        cellContainer[column][row].gridBlock.addEventListener("contextmenu", function(e) {
            if (e.button === 2 && buttonMode === 0) new Block(currentBlockType, this.id.split(" ")[0], this.id.split(" ")[1]);
            if (e.button === 2 && buttonMode === 1) {
                if (fillPointOne == undefined && fillPointTwo == undefined) {
                    fillPointOne = [this.id.split(" ")[0], this.id.split(" ")[1]];
                    console.log("Point 1: " + fillPointOne[0], fillPointOne[1]);
                } else {
                    fillPointTwo = [this.id.split(" ")[0], this.id.split(" ")[1]];
                    console.log("Point 2: " + fillPointTwo[0], fillPointTwo[1]);
                    fill(currentBlockType, fillPointOne[0], fillPointOne[1], fillPointTwo[0], fillPointTwo[1]);
                    fillPointOne, fillPointTwo = undefined;
                }
            }
        });
        cellContainer[column][row].gridBlock.addEventListener("click", function (e) {
            if (e.button === 0 && buttonMode === 0) deleteBlock(this.id.split(" ")[0], this.id.split(" ")[1]);
            if (e.button === 0 && buttonMode === 1) {
                if (clearPointOne == undefined && clearPointTwo == undefined) {
                    clearPointOne = [this.id.split(" ")[0], this.id.split(" ")[1]];
                    console.log("Point 1: " + clearPointOne[0], clearPointOne[1]);
                } else {
                    clearPointTwo = [this.id.split(" ")[0], this.id.split(" ")[1]];
                    console.log("Point 2: " + clearPointTwo[0], clearPointTwo[1]);
                    clear(currentBlockType, clearPointOne[0], clearPointOne[1], clearPointTwo[0], clearPointTwo[1]);
                    clearPointOne, clearPointTwo = undefined;
                }
            }
        });
        document.body.addEventListener("keydown", e => {
            if (e.key == "q" && canSwitch === true) {
                canSwitch = false;
                if (buttonMode === 0) {
                    buttonMode = 1;
                    console.log("Mode: Fill/Clear");
                }
                else if (buttonMode === 1) {
                    buttonMode = 0;
                    console.log("Mode: Place/Delete");
                }
            }
        })
        document.body.addEventListener("keyup", () => canSwitch = true);
    } 
}

// Sidebar 
const sideBar = document.body.appendChild(document.createElement("div"));
sideBar.id = "sidebar";
let blockPalate = [];
sideBar.style.position = "relative";
sideBar.style.width = 150;
sideBar.style.height = outerHeight;
sideBar.style.borderRightStyle = "solid";
sideBar.style.borderColor = "black";
sideBar.style.borderWidth = 2;
sideBar.style.right += 20;
sideBar.style.bottom += 20;
sideBar.style.backgroundColor = "red";


let fullPalate = sideBar.appendChild(document.createElement("p"));
fullPalate.innerHTML = "Open\nPalate";
fullPalate.id = "full_palate";
fullPalate.style.position = "absolute";
fullPalate.style.textDecorationLine = "underline"
fullPalate.style.left = 25;
fullPalate.style.top = 130;
fullPalate.style.fontSize = "20";
fullPalate.addEventListener("click", () => {
    if (!menuOpen) {
        fullPalateScreen.style.display = "";
        fullPalate.innerHTML = "Close\nPalate";
        menuOpen = true;
    } else if (menuOpen) {
        fullPalateScreen.style.display = "none";
        fullPalate.innerHTML = "Open\nPalate";
        menuOpen = false;
    }
});

let fullPalateScreen = sideBar.appendChild(document.createElement("div"));
fullPalateScreen.style.display = "none";
fullPalateScreen.style.position = "relative";
fullPalateScreen.style.borderStyle = "solid";
fullPalateScreen.style.borderWidth = 5;
fullPalateScreen.style.borderColor = "black";
fullPalateScreen.style.left = 180;
fullPalateScreen.style.top = 150;
fullPalateScreen.style.width = 360;
fullPalateScreen.style.height = 360;
fullPalateScreen.style.backgroundColor = "white";

let xPos = -1;
let yPos = 0;
for (let i in usableBlocks) {
    xPos += 1;
    let x = fullPalateScreen.appendChild(document.createElement("img"));
    if (xPos === 6) {
        xPos = 0;
        yPos += 1;
    }
    x.addEventListener("contextmenu", function(e) {
       if (e.button === 2) {
        // Code for quick palate
        } 
        e.preventDefault();
    });
    
    x.addEventListener("click", e => {
        if (e.button === 0) currentBlockType = Object.keys(usableBlocks).find(key => usableBlocks[key] == usableBlocks[i]);
        for (let i of blockPalate) i.palateSquare.style.transform = "scale(1, 1)";
    });
    x.style.left = 60 * xPos;
    x.style.top = 60 * yPos;
    x.src = usableBlocks[i];
    x.style.position = "absolute";
    x.style.width = 60;
    x.style.height = 60;
    if (i === "oak_log_horizontal") x.style.transform = "rotate(90deg)";
}

let palateContainer = sideBar.appendChild(document.createElement("div"));
palateContainer.id = "Palate_Container";
let palateList = ["stone", "oak_plank", "cobblestone", "chest", "crafting_table"];
for (let i = 0; i < 5; i++) {
	blockPalate[i] = {
        palateSquare : palateContainer.appendChild(document.createElement("img")),
        blockType : palateList[i],
    } 
    blockPalate[i].palateImage = "./Blocks/" + palateList[i] +".png";
    blockPalate[i].palateSquare.style.position = "absolute";
    blockPalate[i].palateSquare.style.width = 80;
    blockPalate[i].palateSquare.style.height = 80;
    blockPalate[i].palateSquare.style.borderStyle = "solid";
    blockPalate[i].palateSquare.style.borderRadius = "5px";
    blockPalate[i].palateSquare.style.borderColor = "black";
    blockPalate[i].palateSquare.style.borderWidth = 2;
    blockPalate[i].palateSquare.style.left += 40;
    blockPalate[i].palateSquare.style.top += 210 + i * 100;
    blockPalate[i].palateSquare.style.zIndex = 2;
    blockPalate[i].palateSquare.src = blockPalate[i].palateImage;
    blockPalate[i].palateSquare.id = blockPalate[i].blockType;

    blockPalate[i].palateSquare.addEventListener("mousedown", function (e) {
        if (e.button === 0) {
            currentBlockType = this.id;
            for (let i of blockPalate) i.palateSquare.style.transform = "scale(1, 1)";
            this.style.transform = "scale(0.8, 0.8)";

        }
    });
}


// Blocks
class Block {
    constructor(type, x, y) {
        blockCount++;
        blockList[blockCount-1] = this;
        if (cellContainer[y][x].isOccupied) {
            console.error("Error: Space Occupied! (" , x , "," , y , ")");
            delete this;
            blockList.pop();
            blockCount--; 
            return;
        } 
        if ((type === "large_chest_left" && cellContainer[y][+x+1].isOccupied && (lastBlockPlaced != "large_chest_right"))|| (type === "oak_door_bottom" && cellContainer[+y+1][x].isOccupied && lastBlockPlaced != "oak_door_top") || (type === "oak_door_top" && cellContainer[y][+x-1].isOccupied && lastBlockPlaced != "oak_door_bottom") || (type === "large_chest_right" && cellContainer[y][+x-1].isOccupied && lastBlockPlaced != "large_chest_left")) {
            console.error("Error: Not Enough Space.");
            delete this;
            blockList.pop();
            blockCount--;
            return;
        }
        this.type = type;
        this.x = x;
        this.y = y;
        if (type === "stone" || this.type === undefined) this.bname = "stone";
        else this.bname = this.type;
        if (shouldLogBlockData) console.log("Block Successfully Placed (" , x , "," , y , ")");
        this.cellImg = cellContainer[y][x].gridBlock.appendChild(document.createElement("img"));
        this.cellImg.src = './Blocks/' + this.type + ".png";
        this.cellImg.style.width = blockSide;
        this.cellImg.style.height = blockSide;
        this.cellImg.style.position = "absolute";
        cellContainer[y][x].isOccupied = true;
        if (type === "oak_log_horizontal") this.cellImg.style.transform = "rotate(90deg)";
        if (type === "large_chest_right" && !cellContainer[y][+x-1].isOccupied) new Block("large_chest_left", (+x-1).toString(), y);
        if (type === "oak_door_top" && !cellContainer[+y-1][x].isOccupied) new Block("oak_door_bottom", x, (+y+1).toString());
        if (type === "large_chest_left" && !cellContainer[y][+x+1].isOccupied) new Block("large_chest_right", (+x+1).toString(), y);
        if (type === "oak_door_bottom" && !cellContainer[+y+1][x].isOccupied) new Block("oak_door_top", x, (+y-1).toString());

        cellContainer[y][x].gridBlock.style.borderStyle = "none";
        lastBlockPlaced = this.type;
        return;
    }   
}

// Deletes a block
function deleteBlock(x, y) {
    for (let i = 0; i < blockList.length; i++) {
        if (blockList[i].x === x && blockList[i].y === y) {
            cellContainer[y][x].isOccupied = false;
            console.log(blockList[i]);
            blockList[i].cellImg.remove();
            cellContainer[y][x].gridBlock.style.borderStyle = "solid";
            for (let del in blockList[i]) delete blockList[i][del];
            blockList.splice(i, 1);
            blockCount--;
            if (shouldLogBlockData) console.log("Successfully Deleted Block! (", x , "," , y , ")");
            return;
        } else continue;
    }
    console.log("Nothing to delete! (", x , "," , y , ")");
    return;
}
// Fill Function (Fills a Rectangle)
function fill(blockType, x, y, z, w) {
    let counter = 0;
    shouldLogBlockData = false;
    for (let i = 0; i < (w - y) + 1; i++) {
        for (let c = 0; c < (z - x) + 1; c++) {
            counter++;
            new Block(blockType, c + x, i + y);
        }
    }
    shouldLogBlockData = true;
    let countMsg = () => {
        if (counter === 1) return "Block";
        else return "Blocks";
    }
    console.log("Filled" , counter , countMsg());
}
// Clear Function (Clears a Rectangle)
function clear(x, y, z, w) {
    let counter = 0;
    shouldLogBlockData = false;
    for (let i = 0; i < (w - y) + 1; i++) {
        for (let c = 0; c < (z - x) + 1; c++) {
            counter++;
            deleteBlock(c + x, i + y);
        }
    }
    shouldLogBlockData = true;
    let countMsg = () => {
        if (counter === 1) return "Block";
        else return "Blocks";
    }
    console.log("Deleted" , counter , countMsg());
}

const exportBuild = () => console.log("Run this to import this build:\nimportBuild('" + JSON.stringify(blockList) + "');")

function importBuild(build) {
    shouldLogBlockData = false;
    let parsed = JSON.parse(build);
    for(let i in parsed) new Block(parsed[i].type, +parsed[i].x, +parsed[i].y);
    shouldLogBlockData = true;
    console.log("Successfully Imported.")
}

console.log("Program Ready!");
