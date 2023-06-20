const LinkedList = require('./linked-list')

/**
 * A tree is basically a linked list in terms of we are dealing with a node / child and instead of
 * going forward and backword, we go left and right
 * let data = [7,23,34,10,15,55,44,99,88,24,19]
 * suppose the following tree, This is just a sample tree 

                               7
                              / \
                             /   \
                            /     \
                           /       \
                          /         \
                         23         34
                        /  \        / \
                       /    \      /   \
                      /      \    /     \
                     /        \  /       \
                    10        15 55      44
                   / \        /\
                  /   \      /  \
                 /     \    /    \
                /       \  /      \
               99      88 24      19
 * 
 * 
 * 
 * The preorder traversal output should be
 * 7,23,10,99,88,15,24,19,34,55,44
 * 
 * The postorder traversal output should be
 * 99,88,10,24,19,15,23,55,44,34,7
 * 
 * The inorder traverse should be
 * 99,10,88,23,24,15,19,7,55,34,44
 * 
 * 
 * Depth First Search VS Breadth First Search
 * Depth first search maintains the shape of the trees while breadth search first does not
 * 
 * 
 * Breadth First Search output will be
 * 7,23,34,10,15,55,44,99,88,24,19
 */



/**
 * 1,55,33,22,77,88,99,34,5,7,2
 */

const PRE_ORDER = 'PRE_ORDER'
const IN_ORDER = 'IN_ORDER'
const POST_ORDER = 'POST_ORDEr'

class Node {
    
    constructor() {
        this.left = undefined
        this.right = undefined
        this.value = undefined
    }

    toString() {
        console.log(`value: ${this.value}, left: ${this.left?.value}, right: ${this.right?.value}`)
    }
}

class Tree {

    #root = undefined

    #fill(currentIndex, arr, queue) {

        // base case
        if(currentIndex + 1 === arr.length) {

            const head = queue.getHead()
            const node = new Node()
            node.value = arr[currentIndex]

            if(head.left === undefined) {
                head.left = node
                return
            }

            if(head.right === undefined) {
                head.right = node
                return
            }
        }

        // recursive case
        if(queue.getlength() === 0) {
            this.#root = new Node()
            this.#root.value = arr[currentIndex]
            queue.push(this.#root)
            this.#fill(currentIndex + 1, arr, queue)
        } else {
            const head = queue.getHead()
            if(head.left === undefined) {
                const node = new Node()
                node.value = arr[currentIndex]
                head.left = node
                queue.push(node)
                this.#fill(currentIndex + 1, arr, queue)
                return
            }

            if(head.right === undefined) {
                const node = new Node()
                node.value = arr[currentIndex]
                head.right = node
                queue.push(node)
                this.#fill(currentIndex + 1, arr, queue)
                return
            }

            if(head.left && head.right) {
                queue.shift()
                this.#fill(currentIndex, arr, queue)
                return
            }
        }
    }

    populateFromArray(data) {
        const queue = new LinkedList()
        this.#fill(0,data,queue)
    }

    #walk(currentNode, arr, type) {

        // base case
        if(currentNode === undefined) {
            return
        }

        if(type === PRE_ORDER) {
            // pre
            arr.push(currentNode.value)
            // recursive
            this.#walk(currentNode.left, arr, type)
            this.#walk(currentNode.right, arr, type)
        }

        if(type === IN_ORDER) {
            // recursive
            this.#walk(currentNode.left, arr, type)
            arr.push(currentNode.value)
            this.#walk(currentNode.right, arr, type)
        }

        if(type === POST_ORDER) {
            // recursive
            this.#walk(currentNode.left, arr, type)
            this.#walk(currentNode.right, arr, type)
            arr.push(currentNode.value)
        }
        
    }
    preOrderTraverse() {
        const arr = []
        this.#walk(this.#root, arr, PRE_ORDER)
        return arr
    }

    postOrderTraverse() {
        const arr = []
        this.#walk(this.#root, arr, POST_ORDER)
        return arr
    }


    inOrderTraverse() {
        const arr = []
        this.#walk(this.#root, arr, IN_ORDER)
        return arr
    }

    breadthFirstSearch(val) {
        debugger
        const queue = new LinkedList()

        queue.push(this.#root)

        while(queue.getlength()) {

            const node = queue.pop()

            if(!node) {
                continue
            }

            if(node.value === val) {
                return true
            }

            queue.push(node.left)
            queue.push(node.right)
        }

        return false;
    }

    static compare(tree1, tree2) {

    }


}
module.exports = Tree