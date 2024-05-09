//14 rows tall and 17 col wide, starting at 0
// ' ' is an empty cell
// 'b' stands for block, which will make that cell occupied with a wall.
// 'e' stands for end, which is where the enemies need to end up.
// 'p' stands for path, which is the set path that the enemies will use.
let customLevel = [ // this is the custom level, ment to be created in the game, not the code (here)
    ['s', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];



let level1Key = [
    [' ', 'b', 'b', 'b', 'b', ' ', ' ', ' ', 's', ' ', 'b', ' ', 'b', 'b', 'b', 'b', 'b', 'b'],
    [' ', 'b', 'b', 'b', 'b', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', 'b', 'b', 'b', 'b', 'b', 'b', ' ', ' ', 'b', 'b', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', ' ', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', 'b', ' ', ' ', ' ', ' ', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', 'b', ' ', ' ', ' ', ' ', 'b', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', ' ', ' ', ' ', 'b', 'b', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
    [' ', 'b', 'b', 'b', ' ', 'b', ' ', ' ', ' ', 'b', ' ', 'b', 'b', 'b', ' ', ' ', 'b', 'b'],
    [' ', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b'],
    [' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b'],
    [' ', 'b', 'b', 'b', 'b', 'b', 'b', ' ', ' ', ' ', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'e', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b']
];
let level2Key = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 's', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'b', 'b', ' ', 'b', 'p', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'b', 'b', ' ', ' ', 'p', ' ', ' ', ' ', ' ', 'b', 'b', ' ', ' ', ' '],
    [' ', ' ', ' ', 'b', 'b', ' ', ' ', ' ', 'b', 'b', 'b', ' ', ' ', 'b', 'b', ' ', ' ', ' '],
    [' ', ' ', 'b', 'b', ' ', ' ', ' ', 'b', 'b', 'b', 'b', 'b', ' ', ' ', ' ', 'b', 'b', ' '],
    [' ', ' ', 'b', 'b', ' ', ' ', ' ', ' ', 'b', 'b', 'b', ' ', ' ', ' ', 'b', 'b', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'b', 'b', 'b', ' ', ' ', ' ', 'b', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['b', ' ', ' ', ' ', 'b', ' ', ' ', ' ', 'b', 'b', 'b', ' ', ' ', 'b', 'b', 'b', 'b', 'b'],
    ['b', ' ', ' ', 'b', 'b', 'b', ' ', ' ', 'b', 'b', ' ', ' ', ' ', 'b', ' ', ' ', ' ', 'b'],
    ['b', ' ', 'b', ' ', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', 'b'],
    ['b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', 'b'],
    ['b', 'b', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b'],
    ['b', 'b', ' ', ' ', ' ', 'e', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b']
];

let level3Key = [
    [' ', ' ', ' ', 'b', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', 'b', 'b', ' ', ' ', 'e'],
    [' ', ' ', 'b', 'b', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', 'b', 'b', 'b', ' '],
    [' ', ' ', 'b', 'b', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', 'b', 'b', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' '],
    [' ', 'b', 'b', 'b', 'b', 'b', ' ', ' ', 'b', 'b', ' ', ' ', 'b', 'b', 'b', 'b', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'b', 'b', 'b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b', 'b', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', ' ', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'b', ' ', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'b', ' ', 'b', 'b', ' ', 'b', ' ', ' ', 'b', ' ', 'b', 'b', ' ', 'b', 'b', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' ', 's', 'b', ' ', ' ', ' ', ' ', ' ', ' ', 'b']
];
