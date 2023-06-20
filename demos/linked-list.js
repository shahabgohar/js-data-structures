const LinkedList = require('../linked-list')
const {askQuestion, close} = require('../utils')

const linkedList = new LinkedList()
let shouldExit = false
async function main() {

    while (!shouldExit) {

        const userChoice = await askQuestion(`
        kindly select one of the following
        1. show all elements (all)
        2. get total elements count (length)
        3. push item in the list (push)
        4. remove last item (pop)
        5. remove specific entry (delete)
        6. add entry after an existing entry (insertAfter)
        7. remove first (shift)
        8. exit
        `)

        switch (userChoice) {
            case 1:
                linkedList.all()
                break;
            case 2:
                console.log(linkedList.getlength())
                break;
            case 3:
                const data = await askQuestion('insert number: ')
                linkedList.push(data)
                break;
            case 4:
                const poped = linkedList.pop()
                console.log('poped element is ', poped)
                break;
            case 5: 
                const toBeRemoved = await askQuestion('type value to be deleted: ')
                const isDeleted = linkedList.delete(toBeRemoved)
                if(isDeleted) {
                    console.log(toBeRemoved, ' is successfully removed')
                } else {
                    console.log('no deletion operation is performed')
                }
                break;
            case 6: 
                const searchValue = await askQuestion('type value to be searched: ')
                const valueToBeInserted = await askQuestion('type value to be inserted ')
                linkedList.insertAfter(searchValue, valueToBeInserted)
                break;
            case 7:
                const shifted = linkedList.shift()
                if(shifted) {
                    console.log('element removed ', shifted)
                }
                break;
            case 8:
                shouldExit = true;
                break;
        
            default:
                break;
        }
    }

    close()
}

main()