/*
Problem - Create a 50 x 30 grid with a "Jugnu", i.e. a "*" inside of it 
that can move in 1 of 9  directions at a time, and moves every 
200 milliseconds

Requirement - The jugnu must stay confined to the boundaries of the grid
*/

// These are the globals for heights and widths
const HEIGHT = 10
const WIDTH = 10

// Time interval with which the screen updates
const TIME_INTERVAL = 50

// The charachters
const BACKGROUND_CHAR = "."
const JUGNU_CHAR = "X"

/**
 * This class is used to represent the star for our Jugnu
 * @property {Number} xCoordinate - X of the star
 * @property {Number} yCoordinate - Y of the star
 */
class Point {
    constructor(initialX, initialY) {
        this.xCoordinate = initialX
        this.yCoordinate = initialY
    }

    /**
     * Randomly generates and moves in a direction 
     */
    update() {
        // Directions can be -1, 0, 1, depicting 
        // left / up, no movement, right / down respectively
        let directionX = Math.floor(Math.random() * 3) - 1
        let directionY = Math.floor(Math.random() * 3) - 1

        // Adds the directions, and if out of bounds, undos this operation
        this.xCoordinate += directionX
        if (this.xCoordinate >= WIDTH || this.xCoordinate <= 0) {
            this.xCoordinate -= directionX
        }

        this.yCoordinate += directionY
        if (this.yCoordinate >= HEIGHT || this.yCoordinate <= 0) {
            this.yCoordinate -= directionY
        }
    }
}

/**
 * Function to draw the top and bottom edges
 * @param {Number} width - The width to print to
 */
function flatEdge() {
    // Adding + for the corners
    let lineChars = "+"
    // Adding - for the boundary
    for (let i = 0; i < WIDTH; i++) lineChars += "-"
    lineChars += "+"
    console.log(lineChars)
}

/**
 * Prints the grid, called in each rotation
 * @param {Point} point Contains the point to be moved
 */
function printScreen(point) {
    flatEdge()

    // It is important to enumerate yLevel backwards,
    // To make sure it doesn't overflow.
    for (let yLevel = 0; yLevel < HEIGHT; yLevel++) {
        let lineChars = "|"
        for (let xLevel = 0; xLevel < WIDTH; xLevel++) {
            if (xLevel == point.xCoordinate
                && yLevel == point.yCoordinate) {
                lineChars += JUGNU_CHAR
            }
            else {
                lineChars += BACKGROUND_CHAR
            }
        }
        lineChars += "|"
        console.log(lineChars)
    }
    flatEdge()
}

/**
 * Runner function to run the endless process
 */
function movingStar() {
    const xCoordinate = Math.floor(Math.random() * WIDTH)
    const yCoordinate = Math.floor(Math.random() * HEIGHT)
    const movingPoint = new Point(xCoordinate, yCoordinate)
    // Setting random initial values
    printScreen(movingPoint)

    // Move every time
    setInterval(() => {
        console.clear()
        movingPoint.update()
        printScreen(movingPoint)
    }
        , TIME_INTERVAL)
}

movingStar()
