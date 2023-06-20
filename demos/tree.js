const Tree = require('../tree')
const {askQuestion, close} = require('../utils')

const tree = new Tree()
let data = [7,23,34,10,15,55,44,99,88,24,19]
tree.populateFromArray(data)
let shouldExit = false

async function main() {

    while (!shouldExit) {

        const userChoice = await askQuestion(`
        sample data is ${data}
        kindly select one of the following Depth First Search approches
        1. Pre Order Traverse
        2. Post Order Traverse
        3. In Order Traverse
        4. Breadth First Search
        5. exit
        `)

        switch (userChoice) {
            case 1:
                const preOrder = tree.preOrderTraverse()
                console.log(preOrder.join(' => '))
                break;
            case 2:
                const postOrder = tree.postOrderTraverse()
                console.log(postOrder.join(' => '))
                break;
            case 3:
                const inOrder = tree.inOrderTraverse()
                console.log(inOrder.join(' => '))
                break;  
            case 4:
                const itemToBeSearched = await askQuestion('enter value to searched: ')
                const isFound = tree.breadthFirstSearch(itemToBeSearched)
                if(isFound) {
                    console.log('item exist')
                }  else {
                    console.log('item not exist')
                }
                break;
            case 5:
                shouldExit = true;
                break;
        
            default:
                break;
        }
    }

    close()
}

main()