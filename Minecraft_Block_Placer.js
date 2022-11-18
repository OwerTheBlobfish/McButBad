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
 * 
 * Hard code the oak door so on click both tiles it will change the type to same thing maby
 */

// Vars


document.title = "MC Block Placer";
let blockList = [];
let menuOpen = false;
let lastBlockPlaced = "stone";

const grid = document.body.appendChild(document.createElement("div"));
let currentBlockType = "stone";
grid.id = "Grid_Container";
let gridWidth = 34, gridHeight = 15, blockSide = 50, blockCount = blockList.length, buttonMode = 0, index, logBlockData = true,
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
styles.innerHTML = "#Grid_Container, #full_palate {font-family: 'Press Start 2P', cursive; font-size: 15px};";
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
        cellContainer[column][row].gridBlock.id = cellContainer[column][row].x + "_" + cellContainer[column][row].y;

        cellContainer[column][row].gridBlock.addEventListener("click", function (e) {
            if (e.button === 0 && buttonMode === 0) {
                if (this.id.charAt(1) === "_") new Block(currentBlockType, this.id.charAt(0), this.id.charAt(2) + "" + this.id.charAt(3));
                else if (this.id.charAt(2) === "_" && this.id.length === 4) new Block(currentBlockType, this.id.charAt(0) + "" + this.id.charAt(1), this.id.charAt(3));            
                else new Block(currentBlockType, this.id.charAt(0) + "" + this.id.charAt(1), this.id.charAt(3) + "" + this.id.charAt(4));
            }
            if (e.button === 0 && buttonMode === 1) {
                if (this.id.charAt(1) === "_") deleteBlock(this.id.charAt(0), this.id.charAt(2) + "" + this.id.charAt(3));
                else if (this.id.charAt(2) === "_" && this.id.length === 4) deleteBlock(this.id.charAt(0) + "" + this.id.charAt(1), this.id.charAt(3));            
                else deleteBlock(this.id.charAt(0) + "" + this.id.charAt(1), this.id.charAt(3) + "" + this.id.charAt(4));
            }
        });
        document.body.addEventListener("keydown", e => {
            if (e.key == "q" && canSwitch === true) {
                canSwitch = false;
                if (buttonMode === 0) {
                    buttonMode = 1;
                    console.log("Mode: Delete");
                }
                else if (buttonMode === 1) {
                    buttonMode = 0;
                    console.log("Mode: Place");
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
    x.addEventListener("click", e => {
        if (e.button === 0) currentBlockType = Object.keys(usableBlocks).find(key => usableBlocks[key] == usableBlocks[i]);
        if (e.button === 2) {
            // Code for quick palate

        }
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
    /* Block Types */ {
        if (palateList[i] === "dirt") blockPalate[i].palateImage = "./Blocks/dirt.png";
        else if (palateList[i] === "grass") blockPalate[i].palateImage = "./Blocks/grass.png";
        else if (palateList[i] === "glass") blockPalate[i].palateImage = "./Blocks/glass.png";
        else if (palateList[i] === "stone_bricks") blockPalate[i].palateImage = "./Blocks/stone_bricks.png";
        else if (palateList[i] === "sand") blockPalate[i].palateImage = "./Blocks/sand.png";
        else if (palateList[i] === "ice") blockPalate[i].palateImage = "./Blocks/ice.png";
        else if (palateList[i] === "stone") blockPalate[i].palateImage = "./Blocks/stone.png";
        else if (palateList[i] === "cobblestone") blockPalate[i].palateImage = "./Blocks/cobblestone.png";
        else if (palateList[i] === "netherrack") blockPalate[i].palateImage = "./Blocks/netherrack.png";
        else if (palateList[i] === "end_stone") blockPalate[i].palateImage = "./Blocks/end_stone.png";
        else if (palateList[i] === "glowstone") blockPalate[i].palateImage = "./Blocks/glowstone.png";
        else if (palateList[i] === "diamond_block") blockPalate[i].palateImage = "./Blocks/diamond_block.png";
        else if (palateList[i] === "iron_block") blockPalate[i].palateImage = "./Blocks/iron_block.png";
        else if (palateList[i] === "gold_block") blockPalate[i].palateImage = "./Blocks/gold_block.png";
        else if (palateList[i] === "redstone_block") blockPalate[i].palateImage = "./Blocks/redstone_block.png";
        else if (palateList[i] === "netherite_block") blockPalate[i].palateImage = "./Blocks/netherite_block.png";
        else if (palateList[i] === "emerald_block") blockPalate[i].palateImage = "./Blocks/emerald_block.png";
        else if (palateList[i] === "oak_plank") blockPalate[i].palateImage = "./Blocks/oak_plank.png";
        else if (palateList[i] === "oak_log_top") blockPalate[i].palateImage = "./Blocks/oak_log_top.png";
        else if (palateList[i] === "oak_log_vertical") blockPalate[i].palateImage = "./Blocks/oak_log.png";
        else if (palateList[i] === "oak_log_horizontal") blockPalate[i].palateImage = ".Blocks/oak_log.png";
        else if (palateList[i] === "hay_bale") blockPalate[i].palateImage = "./Blocks/hay_bale.png";
        else if (palateList[i] === "torch") blockPalate[i].palateImage = "./Blocks/torch.png";
        else if (palateList[i] === "bookshelf") blockPalate[i].palateImage = "./Blocks/bookshelf.png";
        else if (palateList[i] === "iron_bar") blockPalate[i].palateImage = "./Blocks/iron_bar.png";
        else if (palateList[i] === "chest") blockPalate[i].palateImage = "./Blocks/chest.png";
        else if (palateList[i] === "obsidian") blockPalate[i].palateImage = "./Blocks/obsidian.png";
        else if (palateList[i] === "furnace_off") blockPalate[i].palateImage = "./Blocks/furnace.png";
        else if (palateList[i] === "crafting_table") blockPalate[i].palateImage = "./Blocks/crafting_table.png";
        else if (palateList[i] === "oak_trapdoor") blockPalate[i].palateImage = "./Blocks/oak_trapdoor.png";
        else if (palateList[i] === "tnt") blockPalate[i].palateImage = "./Blocks/tnt.png";
        else if (palateList[i] === "bedrock") blockPalate[i].palateImage = "./Blocks/bedrock.png";
    }
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
    constructor(type, x, y, bname, img) {
        blockCount++;
        blockList[blockCount-1] = this;
        if (cellContainer[y][x].isOccupied) {
            console.error("Error: Space Occupied! (" , x , "," , y , ")");
            delete this;
            blockList.pop();
            blockCount--; 
            return;
        } 
        if ((img === undefined || bname === undefined) && type === null) {
            console.error("Error: No type or Image specified.");
            delete this;
            blockList.pop();
            blockCount--;
            return;
        }    
        if (x > gridWidth || y > gridHeight || x < 0 || y < 0) {
            console.error("Error: Invalid X or Y coordinate.");
            delete this;
            blockList.pop();
            blockCount--;
            return;
        }
        if ((type === "large_chest_left" && cellContainer[y][+x+1].isOccupied && lastBlockPlaced != "large_chest_right") || (type === "oak_door_bottom" && cellContainer[+y+1][x].isOccupied && lastBlockPlaced != "oak_door_top") || (type === "oak_door_top" && cellContainer[y][+x-1].isOccupied && lastBlockPlaced != "oak_door_bottom") || (type === "large_chest_right" && cellContainer[y][+x-1].isOccupied && lastBlockPlaced != "large_chest_left")) {
            console.error("Error: Not Enough Space.");
            delete this;
            blockList.pop();
            blockCount--;
            return;
        }
        this.type = type;
        this.x = x;
        this.y = y;
        /* Block Types */ {
        if (type === "stone" || this.type === undefined) {
            this.bname = "stone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dc/Stone_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001141805";
        } else if (type === "dirt") {
            this.bname = "dirt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3d/Dirt_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200919012354"
        } else if (type === "grass") {
            this.bname = "grass";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3b/Grass_Block_%28side_texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200921204925"
        } else if (type === "glass") {
            this.bname = "glass";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1d/Glass_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20200920213104";
        } else if (type === "dirt") {
            this.bname = "dirt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3d/Dirt_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200919012354";
        } else if (type === "stone_bricks") {
            this.bname = "stone_bricks";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/be/Stone_Bricks_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001141809";
        } else if (type === "sand") {
            this.bname = "sand";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c8/Sand_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140257";
        } else if (type === "ice") {
            this.bname = "ice";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e8/Ice_%28texture%29_JE2_BE6.png/revision/latest/scale-to-width-down/48?cb=20200922000647";
        }  else if (type === "cobblestone") {
            this.bname = "cobblestone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a7/Cobblestone_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001121005";
        } else if (type === "netherrack") {
            this.bname = "netherrack";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/98/Netherrack_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140136";
        } else if (type === "end_stone") {
            this.bname = "end_stone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/76/End_Stone_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001134049";
        } else if (type === "glowstone") {
            this.bname = "glowstone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c7/Glowstone_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001134117";
        } else if (type === "diamond_block") {
            this.bname = "diamond_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b4/Block_of_Diamond_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120845";
        } else if (type === "iron_block") {
            this.bname = "iron_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5b/Block_of_Iron_%28texture%29_JE3_BE3.png/revision/latest/scale-to-width-down/48?cb=20201006053737";
        } else if (type === "gold_block") {
            this.bname = "gold_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2d/Block_of_Gold_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120858";
        } else if (type === "redstone_block") {
            this.bname = "redstone_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/8a/Block_of_Redstone_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004101113";
        } else if (type === "netherite_block") {
            this.bname = "netherite_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3f/Block_of_Netherite_%28texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20201001120902";
        } else if (type === "emerald_block") {
            this.bname = "emerald_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/41/Block_of_Emerald_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120854";
        } else if (type === "oak_plank") {
            this.bname = "oak_plank";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e6/Oak_Planks_%28texture%29_JE6_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140156";
        } else if (type === "oak_log_top") {
            this.bname = "oak_log";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7e/Oak_Log_%28top_texture%29_JE5_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140152";
        } else if (type === "oak_log_vertical") {
            this.bname = "oak_log";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5f/Oak_Log_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140144";
        } else if (type === "oak_log_horizontal") {
            this.bname = "oak";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5f/Oak_Log_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140144";
        } else if (type === "hay_bale") {
            this.bname = "hay_bale";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/9f/Hay_Bale_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004111932";
        } else if (type === "torch") {
            this.bname = "torch";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c9/Torch_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20191129162608";
        } else if (type === "bookshelf") {
            this.bname = "bookshelf";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f3/Bookshelf_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201006054051";
        } else if (type === "iron_bar") {
            this.bname = "iron_bar";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/8d/Iron_Bars_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000650";
        } else if (type === "chest") {
            this.bname = "chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/08/Chest_%28front_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195049";
        } else if (type === "smooth_stone") {
            this.bname = "smooth_stone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c8/Smooth_Stone_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20210209145037";
        } else if (type === "obsidian") { 
            this.bname = "obsidian";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5a/Obsidian_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140204";
        }
        else if (type === "furnace_off") {
            this.bname = "furnace";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/9a/Off_Furnace_%28front_texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20210206133200";
        } else if (type === "crafting_table") {
            this.bname = "crafting_table";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3c/Crafting_Table_%28front_texture%29_JE4.png/revision/latest/scale-to-width-down/48?cb=20201001121026";
        } else if (type === "oak_door_top") {
            this.bname = "oak_door";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0f/Oak_Door_%28top_texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000809";
        } else if (type === "oak_door_bottom") {
            this.bname = "oak_door";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f5/Oak_Door_%28bottom_texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140140";
        } else if (type === "oak_trapdoor") {
            this.bname = "oak_trapdoor";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/ab/Oak_Trapdoor_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000818";
        } else if (type === "tnt") {
            this.bname = "tnt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5d/TNT_%28side_texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004103532";
        } else if (type === "bedrock") {
            this.bname = "bedrock";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/08/Bedrock_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001115713";
        } else if (type === "large_chest_left") {
            this.bname = "large_chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7f/Large_Chest_%28front_left_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195049";
        } else if (type === "large_chest_right") {
            this.bname = "large_chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/ff/Large_Chest_%28front_right_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195051";
        } else if (type === "") {
            this.bname = "";
            this.img = "";
        } 
        } 
        if (logBlockData) console.log("Block Successfully Placed (" , x , "," , y , ")");
        this.bimg = cellContainer[y][x].gridBlock.appendChild(document.createElement("img"));
        this.bimg.src = this.img;
        this.bimg.style.width = blockSide;
        this.bimg.style.height = blockSide;
        this.bimg.style.position = "absolute";
        cellContainer[y][x].isOccupied = true;
        if (type === "oak_log_horizontal") this.bimg.style.transform = "rotate(90deg)";
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
            blockList[i].bimg.remove();
            cellContainer[y][x].gridBlock.style.borderStyle = "solid";
            for (let del in blockList[i]) delete blockList[i][del];
            blockCount--;
            if (logBlockData) console.log("Successfully Deleted Block! (", x , "," , y , ")");
            index = blockList.indexOf(i);
            if (index > -1) { 
                blockList.splice(index, 1);
            }
            return;
        } else continue;
    }
    console.log("Nothing to delete! (", x , "," , y , ")");
}
// Fill Function (Fills a Rectangle)
function fill(blockType, x, y, z, gridWidth) {
    let counter = 0;
    logBlockData = false;
    for (let i = 0; i < (gridWidth - y) + 1; i++) {
        for (let c = 0; c < (z - x) + 1; c++) {
            counter++;
            new Block(blockType, c + x, i + y);
        }
    }
    logBlockData = true;
    
    console.log("Filled" , counter , () => {
        if (counter === 1) return "Block";
        else return "Blocks";
    });
}
// Clear Function (Clears a Rectangle)
function clear(x, y, z, gridWidth) {
    let counter = 0;
    logBlockData = false;
    for (let i = 0; i < (gridWidth - y) + 1; i++) {
        for (let c = 0; c < (z - x) + 1; c++) {
            counter++;
            deleteBlock(c + x, i + y);
        }
    }
    logBlockData = true;

    console.log("Deleted" , counter , () => {
        if (counter === 1) return "Block";
        else return "Blocks";
    });
}

console.log("Program Ready!");
