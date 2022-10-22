//#######################################################################
// Type "new Block()" with the type of block as the first parameter,    #
// and the x and y coordinates as the second and third.                 #
// You can make your own block by putting null as the first parameter   #
// and specifying the name of your block and the image.                 #
//                                                                      #
// Use "deleteBlock()" with coordinates as the parameters               #
// to delete a block at those coordinates.                              #
//                                                                      #
//                                                                      #
// All images from the Minecraft wiki:                                  #
// https://minecraft.fandom.com/wiki/Minecraft_Wiki                     #
//                                                                      #
//#######################################################################

// Vars
let blockList = [], gridList = [[], [], [], [], [], [], [], [], [], [], []];
let grid = document.body.appendChild(document.createElement("div"));
grid.id = "Grid_Container";
let w = 25, h = 11, blockSide = 68, blockCount = blockList.length, i;

// Styles
let preCon1 = document.head.appendChild(document.createElement("link"));
preCon1.rel = "preconnect";
preCon1.href = "https://fonts.googleapis.com";

let preCon2 = document.head.appendChild(document.createElement("link"));
preCon2.rel = "preconnect";
preCon2.href = "https://fonts.gstatic.com";
preCon2.crossOrigin = true;

let font = document.head.appendChild(document.createElement("link"));
font.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
font.rel = "stylesheet";
let styles = document.head.appendChild(document.createElement("style"));
styles.innerHTML = "#Grid_Container {font-family: 'Press Start 2P', cursive; font-size: 25px";

// Grid
for (column = 0; column < h; column++) {
    gridList[column] = [];
    let rowDiv = grid.appendChild(document.createElement("div"));
    rowDiv.id = "Row_" + column;
    for (row = 0; row < w; row++) {
        gridList[column][row] = rowDiv.appendChild(document.createElement("div"));
        gridList[column][row].style.position = "absolute";
        if (row != 0) gridList[column][row].style.left = row * blockSide + 200; 
        else {
            let xCoord = gridList[column][row].appendChild(document.createElement("p"));
            xCoord.innerText = column;
            xCoord.style.position = "absolute";
            xCoord.style.right = 80;
            xCoord.style.top = 0;
            gridList[column][row].style.left += 200;
        }
        if (column == 0) {
            let yCoord = gridList[column][row].appendChild(document.createElement("p"));
            yCoord.innerText = row;
            yCoord.style.position = "absolute";
            yCoord.style.left = 20;
            yCoord.style.bottom = 80;
            if (row >= 10) yCoord.style.left = 10;
        } 
        gridList[column][row].style.top = column * blockSide + 200;
        gridList[column][row].style.width = blockSide;
        gridList[column][row].style.height = blockSide;
        gridList[column][row].style.borderStyle = "solid";
        gridList[column][row].style.borderWidth = 1;
        gridList[column][row].style.borderColor = "black";
    }
}

// Blocks
function Block(type, x, y, bname, img) {
    blockCount++;
    blockList[blockCount-1] = this;
    if (gridList[y][x].style.borderStyle == "none") {
        console.error("Error: Space Occupied!" + "(" + x + ", " + y + ")");
        delete this;
        blockList.pop(blockList.length);
        blockCount--; 
        return;
    }
    this.type = type;
    this.x = x;
    this.y = y;
    if (this.type = undefined) {
            this.bname = bname;
            this.img = img;
    } else if (type == "dirt") {
            this.type = type;
            this.bname = "dirt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3d/Dirt_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200919012354"
    } else if (type == "grass") {
            this.type = type;
            this.bname = "grass";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3b/Grass_Block_%28side_texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200921204925"
    } else if (type == "glass") {
            this.type = type;
            this.bname = "glass";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1d/Glass_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20200920213104";
    } else if (type == "dirt") {
            this.type = type;
            this.bname = "dirt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3d/Dirt_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200919012354";
    } else if (type == "stone_bricks") {
            this.type = type;
            this.bname = "stone_bricks";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/be/Stone_Bricks_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001141809";
    } else if (type == "sand") {
            this.type = type;
            this.bname = "sand";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c8/Sand_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140257";
    } else if (type == "ice") {
            this.type = type;
            this.bname = "ice";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e8/Ice_%28texture%29_JE2_BE6.png/revision/latest/scale-to-width-down/48?cb=20200922000647";
    } else if (type == "stone") {
            this.type = type;
            this.bname = "stone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dc/Stone_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001141805";
    } else if (type == "cobblestone") {
            this.type = type;
            this.bname = "cobblestone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a7/Cobblestone_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001121005";
    } else if (type == "netherrack") {
            this.type = type;
            this.bname = "netherrack";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/98/Netherrack_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140136";
    } else if (type == "end_stone") {
            this.type = type;
            this.bname = "end_stone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/76/End_Stone_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001134049";
    } else if (type == "glowstone") {
            this.type = type;
            this.bname = "glowstone";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c7/Glowstone_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001134117";
        
    } else if (type == "diamond_block") {
            this.type = type;
            this.bname = "diamond_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b4/Block_of_Diamond_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120845";
    } else if (type == "iron_block") {
            this.type = type;
            this.bname = "iron_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5b/Block_of_Iron_%28texture%29_JE3_BE3.png/revision/latest/scale-to-width-down/48?cb=20201006053737";
    } else if (type == "gold_block") {
            this.type = type;
            this.bname = "gold_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2d/Block_of_Gold_%28texture%29_JE5_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120858";
    } else if (type == "redstone_block") {
            this.type = type;
            this.bname = "redstone_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/8a/Block_of_Redstone_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004101113";
    } else if (type == "netherite_block") {
            this.type = type;
            this.bname = "netherite_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3f/Block_of_Netherite_%28texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20201001120902";
    } else if (type == "emerald_block") {
            this.type = type;
            this.bname = "emerald_block";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/41/Block_of_Emerald_%28texture%29_JE4_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001120854";
    } else if (type == "oak_plank") {
            this.type = type;
            this.bname = "oak_plank";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e6/Oak_Planks_%28texture%29_JE6_BE3.png/revision/latest/scale-to-width-down/48?cb=20201001140156";
    } else if (type == "oak_log_top") {
            this.type = type;
            this.bname = "oak_log";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7e/Oak_Log_%28top_texture%29_JE5_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140152";
    } else if (type == "oak_log_vertical") {
            this.type = type;
            this.bname = "oak_log";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5f/Oak_Log_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140144";
    } else if (type == "oak_log_horizontal") {
            this.type = type;
            this.bname = "oak";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5f/Oak_Log_%28texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140144";
    } else if (type == "hay_bale") {
            this.type = type;
            this.bname = "hay_bale";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/9f/Hay_Bale_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004111932";
    } else if (type == "torch") {
            this.type = type;
            this.bname = "torch";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c9/Torch_%28texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20191129162608";
    } else if (type == "chain") {
            this.type = type;
            this.bname = "chain";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1b/Chain_%28texture%29_JE1.png/revision/latest/scale-to-width-down/48?cb=20200922190129";
    } else if (type == "iron_bar") {
            this.type = type;
            this.bname = "iron_bar";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/8d/Iron_Bars_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000650";
    } else if (type == "chest") {
            this.type = type;
            this.bname = "chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/08/Chest_%28front_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195049";
    } else if (type == "furnace_on") {
            this.type = type;
            this.bname = "furnace";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/28/On_Furnace_%28front_texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20210206133246";
    } else if (type == "furnace_off") {
            this.type = type;
            this.bname = "furnace";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/9a/Off_Furnace_%28front_texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20210206133200";
    } else if (type == "crafting_table") {
            this.type = type;
            this.bname = "crafting_table";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3c/Crafting_Table_%28front_texture%29_JE4.png/revision/latest/scale-to-width-down/48?cb=20201001121026";
    } else if (type == "oak_door_top") {
            this.type = type;
            this.bname = "oak_door";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0f/Oak_Door_%28top_texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000809";
    } else if (type == "oak_door_bottom") {
            this.type = type;
            this.bname = "oak_door";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f5/Oak_Door_%28bottom_texture%29_JE4_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001140140";
    } else if (type == "oak_trapdoor") {
            this.type = type;
            this.bname = "oak_trapdoor";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/ab/Oak_Trapdoor_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20200922000818";
    } else if (type == "tnt") {
            this.type = type;
            this.bname = "tnt";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5d/TNT_%28side_texture%29_JE3_BE2.png/revision/latest/scale-to-width-down/48?cb=20201004103532";
    } else if (type == "bedrock") {
            this.type = type;
            this.bname = "bedrock";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/08/Bedrock_%28texture%29_JE2_BE2.png/revision/latest/scale-to-width-down/48?cb=20201001115713";
    } else if (type == "large_chest_left") {
            this.type = type;
            this.bname = "large_chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7f/Large_Chest_%28front_left_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195049";
    } else if (type == "large_chest_right") {
            this.type = type;
            this.bname = "large_chest";
            this.img = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/ff/Large_Chest_%28front_right_texture%29_JE1_BE1.png/revision/latest/scale-to-width-down/48?cb=20200918195051";
    } else if (type == "") {
            this.type = type;
            this.bname = "";
            this.img = "";
    } else {
        console.error("Error: No type or Image specified.");
        delete this;
        blockList.pop(blockList.length);
        blockCount--;
        return;
    }
    this.bimg = gridList[y][x].appendChild(document.createElement("img"));
    this.bimg.src = this.img;
    this.bimg.style.width = blockSide;
    this.bimg.style.height = blockSide;
    this.bimg.style.paddingLeft += 1
    if (this.type == "oak_log_horizontal") this.bimg.style.transform = "rotate(90deg)"
    if (this.type == "chain" || this.type == "torch") this.bimg.style.paddingLeft += (blockSide/2 - 15);
    gridList[y][x].style.borderStyle = "none";
}   

function deleteBlock(x, y) {
    for (i = 0; i < blockList.length; i++) {
        if (blockList[i].x == x && blockList[i].y == y) {
            blockList[i].bimg.remove();
            gridList[y][x].style.borderStyle = "solid";
            for (let del in blockList[i]) delete blockList[i][del];
            blockList.pop(blockList[i]);
            blockCount--;
            console.log("Successfully Deleted Block! (" + x + ", " + y + ")");
            return;
        } else continue;
    }
    console.log("Nothing to delete!");
}

function fill(blockType, x, y, z, w) {
    for (i = 0; i < (w - y) + 1; i++) {
        for (c = 0; c < (z - x) + 1; c++) new Block(blockType, c + x, i + y);
    }
}

function clear(x, y, z, w) {
    for (i = 0; i < (w - y) + 1; i++) {
        for (c = 0; c < (z - x) + 1; c++) deleteBlock(c + x, i + y);
    }
}
console.log("Program Ready!");
