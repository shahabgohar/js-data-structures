const {Node, Tree} = require('./tree.js')

/**
 * 

             lesser then         17       always greater than
             or equal to        / \       base node
             base node         /   \
                              /     \
                             /       \
                          /             \
                         10             50
                         /\              /\
                        /  \            /  \
                       /    \          /    \
                      /      \        /      \
                     5       16      40      70

 * To Insert
 * first we are checking if the base node is initialized or not
 * after that if the base node is already initialized then
 * we will check if the value is lesser than equal to the current node value
 * if it is lesser than or equal to the current node value then we check if there is any node
 * on the left of the current node
 * if it is there then we call insertion again with left of the current node and check our condition
 * if there is not then we create a new node and assign it to the left of the current node.
 * 
 * 
 * if the value is greater than the current node we then check if the right is undefined. if it 
 * is true then we create a new node and assign it to the right of the current node
 * if there is a node there on the right side then we call insert again having passed the right child of the 
 * current node
 * 
 * The complexity is O(N)  
 * 
 * insertion is the only case where we deviate from the classic recursion technique
 * 
 * find(value,node)
 * complexity for find is O(logN)
 * if the searched value is lesser than the current node value then 
 * call the find function with find(value, node.left)
 * if the searched value is grater than the current node value then
 * call the find function with find(value, node.right)
 * 
 * 
 *             lesser then         17       always greater than
             or equal to        / \       base node
             base node         /   \
                              /     \
                             /       \
                          /             \
                         10             50
                         /\              /\
                        /  \            /  \
                       /    \          /    \
                      /      \        /      \
                     5       16      40      70
                                            / \
                                   /|      /   \
                                  / |     /     \
                                 /  |    /       \
                                /   |   60       90
                               /    |
                              /     |
                             20     |
                                    |
                                    |
                                    45


so lets suppose we want to delete 50:
then we check if the left node is not null/undefined
then we move to left node from parent node(50) then we find the largest
one
we grab the largest one, which in our case is 45 and remove its    
connection and place it on 50

now, we can also do the opposite one by checking right node and then 
selecting the smallest one

for first case our result would be

             lesser then         17       always greater than
              or equal to        / \       base node
              base node         /   \
                               /     \
                              /       \
                           /             \
                          10             45
                          /\              /\
                         /  \            /  \
                        /    \          /    \
                       /      \        /      \
                      5       16      40      70
                                             / \
                                    /       /   \
                                   /       /     \
                                  /       /       \
                                 /       60       90
                                /
                               /
                              20


 for second case our result would be

              lesser then         17       always greater than
               or equal to        / \       base node
               base node         /   \
                                /     \
                               /       \
                            /             \
                           10             60
                           /\              /\
                          /  \            /  \
                         /    \          /    \
                        /      \        /      \
                       5       16      40      70
                                              / \
                                     /       /   \
                                    /       /     \
                                   /       /       \
                                  /       60       90
                                 /
                                /
                               20


as you can see in both cases our tree structure maintained
 * 
 */

const data = [17, 10, 5,16,50,40,70, 20, 45, 60, 90]

class BinaryTree extends Tree{

    constructor() {
        super()
    }

    #createNode(val) {
        const node = new Node()
        node.value = val
        return node 
    }

    insert(val, node) {
        
        if(this._root === undefined) {
            this._root = this.#createNode(val)
            return
        } 

        if(val <= node.value) {
            if(node.left === undefined) {
                node.left = this.#createNode(val)
                return
            } else {
                this.insert(val,node.left)
                return
            }
        }

        if(val > node.value) {
            if(node.right === undefined) {
                node.right = this.#createNode(val)
                return
            }else{
                this.insert(val,node.right)
                return
            }
        }


    }

    populateFromArray(data) {
        for(let i = 0; i < data.length; ++i) {
            if(data[i] === 50) {
                
            }
            this.insert(data[i], this._root)
        }
    }

    find(val, node) {
        
        let current = node


        if(!val || !current) {
            return false
        }

        if(val === current.value) {
            return true
        }

        if(val <= current.value) {
            return this.find(val, current.left)
        }
        
        if(val > current.value) {
            return this.find(val, current.right)
        }
    }

    #leftMax(node, parent) {
        if(node.right === undefined) {
            return {node, parent}
        }

        return this.#leftMax(node.right, node)
    }

    #rightMin(node, parent) {
        if(node.left === undefined) {
            return {node, parent}
        } 

        return this.#rightMin(node.left, node)
    }

    delete(val, node, parent) {
        if(!val || !node) {
            return false
        }

        if(val === node.value) {
            
            if(node.left === undefined && node.right === undefined) {
                if(parent.left == node) {
                    parent.left = undefined
                }
                if(parent.right == node) {
                    parent.right = undefined
                }
                return true
            } 

            let minMax = undefined
            if(node.left) {
                minMax = {node: node.left, parent: node}
                if(node.left.right) {
                    minMax = this.#leftMax(node.left, node)
                    minMax.parent.right = undefined
                } else {
                    minMax.parent.left = undefined
                }
            } else {
                if(node.right) {
                    minMax = {node: node.right, parent: node}
                    if(node.right.left) {
                        minMax = this.#rightMin(node.right, node)
                        minMax.parent.left = undefined
                    } else {
                        minMax.parent.right = undefined
                    }
                }
            }

            if(!minMax) {
                return
            }

            const minMaxNode  = minMax.node
            if(val > parent.value) {
                parent.right = minMaxNode
            }
            if(val < parent.value) {
                parent.left = minMaxNode
            }
    
            minMaxNode.right = node?.right
            minMaxNode.left = node?.left
            minMax = null
            return true


        }

        if(val <= node.value) {
            return this.delete(val, node.left, node)
        }
        
        if(val > node.value) {
            return this.delete(val, node.right, node)
        }
    }
}

// const binaryTree = new BinaryTree()
// binaryTree.insertFromArray(data)
// console.log('finding: ', binaryTree.find(100, binaryTree._root))
// console.log('finding: ', binaryTree.find(70, binaryTree._root))
// console.log('finding: ', binaryTree.find(50, binaryTree._root))
// console.log('deleting 50: ', binaryTree.delete(50, binaryTree._root, binaryTree._root))
// console.log(' in-order traversal ', binaryTree.inOrderTraverse())
// console.log(' pre-order traversal ', binaryTree.preOrderTraverse())
// console.log(' post order traversal ', binaryTree.postOrderTraverse())

module.exports = BinaryTree