const BinaryTree = require('../binary-tree')
const {askQuestion, close} = require('../utils')

const binaryTree = new BinaryTree()
const data = [17, 10, 5,16,50,40,70, 20, 45, 60, 90]
binaryTree.populateFromArray(data)
let shouldExit = false

async function main() {

    while (!shouldExit) {

        const userChoice = await askQuestion(`
        sample data is ${data}
        kindly select one of the following Depth First Search approches
        1. Insert
        2. Find
        3. Delete
        4. Pre Order Traverse
        5. Post Order Traverse
        6. In Order Traverse
        7. exit
        `)

        switch (userChoice) {
            case 1:
                const value = await askQuestion('Insert Number: ')
                binaryTree.insert(value, binaryTree._root)
                break;
            case 2:
                const toFind = await askQuestion('Enter Number to be found: ')
                if(binaryTree.find(toFind, binaryTree._root)) {
                    console.log(`Number ${toFind} exists`)
                } else {
                    console.log(`Number ${toFind} does not exists`)
                }
                break;
            case 3:
                const toDelete = await askQuestion('Enter Number to Delete: ')
                if(binaryTree.delete(toDelete, binaryTree._root, binaryTree._root)){
                    console.log(`Number ${toDelete} is deleted`)
                } else {
                    console.log(`Number ${toDelete} does not exists or failed to delete`)
                }
                break;  
            case 4: 
                console.log(binaryTree.preOrderTraverse().join(' => '))
                break;
            case 5: 
                console.log(binaryTree.postOrderTraverse().join(' => '))
                break;
            case 6: 
                console.log(binaryTree.inOrderTraverse().join(' => '))
                break;
            case 7:
                shouldExit = true;
                break;
        
            default:
                break;
        }
    }

    close()
}

main()