const start = {
    x: 0,
    y: 6
}

const end = {
    x:6,
    y:1
}

const maze = [
    ['#','#','#','#','#','#','S','#'],
    ['#',' ',' ',' ',' ','#',' ','#'],
    ['#',' ',' ',' ',' ','#',' ','#'],
    ['#',' ',' ',' ',' ','#',' ','#'],
    ['#',' ','#','#','#','#',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ','#'],
    ['#','E','#','#','#','#','#','#'],
]

const directions = [
    // top
    [-1, 0],
    // right
    [0, 1],
    // bottom
    [1, 0],
    // left
    [0, -1]
]


/**
 * we need to think about a base case and a recursive case
 * base case is kind of a trigger that tells you whether should call yourself again or not
 * recursive case is something like what should be the next direction
 * 
 * The base case in this scenario will be
 * 1. we should not fall of the maze (out of bound)
 * 2. the block should not be a wall
 * 3.have we reached end
 * 4. have we already visited the same block or not
 */

function walk(currentPoint, track, path) {

    // base case

    // out of bound check
    if(
        currentPoint.x >= maze.length || 
        currentPoint.x < 0 || 
        currentPoint.y >= maze[0].length || 
        currentPoint.y < 0
        ) {
            return false
        }
    
        // is the current step is a wall
    if(maze[currentPoint.x][currentPoint.y] === '#') {
        return false
    }

    //  have we reached end ?
    if(maze[currentPoint.x][currentPoint.y] === 'E') {
        path.push(currentPoint)
        return true
    }
    
    // have we ever encountered that tile
    if(track[currentPoint.x][currentPoint.y]) {
        return false
    }

    // pre
    path.push(currentPoint)
    track[currentPoint.x][currentPoint.y] = true
    // recursive case
    for (let index = 0; index < directions.length; index++) {
        const direction = directions[index]
        if(walk({ x: currentPoint.x + direction[0], y: currentPoint.y + direction[1]}, track, path)) {
            return true
        }

    }

    // post (while following a trail if we end up on a dead end and we have to go back then)
    path.pop()

}

function main() {
    const path = []
    const track = []

    for(let i = 0; i <  maze.length; i++) {
        track[i] = maze[i].map(() => false)
    }

    walk(start, track, path)

    console.log('path followed', path)
}

main()