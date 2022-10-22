// House demo, made with the program in this repo
let House = () => {
    console.log("Executing House demo...");
    for (c = 0; c < 25; c++) new Block("grass", c, 10);
    for (c = 0; c < 8; c++) new Block("oak_plank", 4, c + 2);
    for (c = 0; c < 8; c++) new Block("oak_plank", 19, c + 2);
    for (c = 0; c < 14; c++) new Block("stone", c + 5, 1);
    for (c = 0; c < 14; c++) new Block("oak_log_top", c + 5, 0);
    new Block("oak_plank", 3, 2);
    new Block("oak_plank", 20, 2);
    new Block("large_chest_left", 5, 9);
    new Block("large_chest_right", 6, 9);
    new Block("oak_door_top", 18, 8);
    new Block("oak_door_bottom", 18, 9);
    for (c = 0; c < 3; c++) new Block("oak_plank", 17, c + 7);
    new Block("oak_plank", 18, 7);
    new Block("chain", 11, 2);
    new Block("glowstone", 11, 3);
    new Block("oak_log_top", 4, 0);
    new Block("oak_log_top", 3, 1);
    new Block("oak_log_top", 2, 2);
    new Block("oak_log_top", 19, 0);
    new Block("oak_log_top", 20, 1);
    new Block("oak_log_top", 21, 2);
    new Block("oak_log_vertical", 4, 1);
    new Block("oak_log_vertical", 19, 1);
    console.log("House Finished!");
    return;
}