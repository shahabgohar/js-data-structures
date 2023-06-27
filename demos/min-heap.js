const MinHeap = require('../min-heap')
const {askQuestion, close} = require('../utils')

const minHeap = new MinHeap()
const data = [3, 50, 71, 100, 101, 80, 150, 190]
minHeap.populateFromArray(data)
let shouldExit = false

async function main() {

    while (!shouldExit) {

        const userChoice = await askQuestion(`
        data now ${minHeap.data}
        kindly select one of the following Depth First Search approches
        1. Insert
        2. Delete
        3. exit
        `)

        switch (userChoice) {
            case 1:
                const value = await askQuestion('Insert Number: ')
                minHeap.insert(value)
                break;
            case 2:
                console.log('deleted root node ', minHeap.delete())
                break;
            case 3:
                shouldExit = true;
                break;
        
            default:
                break;
        }
    }

    close()
}

main()