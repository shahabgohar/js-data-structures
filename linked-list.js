class Node {
    constructor() {
        this.value = undefined
        this.next = undefined
        this.prev = undefined
    }

    // isEqual(otherNode) {
    //     if(typeof(this.value) === 'object') {
    //         return this.value.value === otherNode.value.value
    //     }
    //     return this.value === otherNode.value
    // }
}

class SingleLinkedList {

    #length = 0
    #head = undefined
    #tail = undefined

    all() {

        if(this.#length === 0) {
            console.log('there are no items in the linked list')
        }
        this.#iterate((node) => {
            console.log('value ',node.value, ' prev: ', node.prev?.value, ' next: ', node.next?.value)
        })
    }

    #iterate(job = (val) => true) {
        let node = this.#head
        for(let i = 0; i < this.#length; i++) {

            let response = job(node)
            if(response !== undefined || response === false) {
                break
            }

            node = node.next
        } 
    }

    push(value) {

        if(this.#length === 0) {
            const node = new Node()
            node.value = value
            this.#head = node
            this.#tail = node
        } else {
            const node = new Node()
            node.value = value
            node.prev = this.#tail
            this.#tail.next = node
            this.#tail = node   
        }

        ++this.#length
    }

    pop() {
        if(this.#length === 0) {
            return undefined
        }
        if(this.#length === 1) {
            const item = this.#tail
            this.#tail = undefined
            this.#head = undefined
            --this.#length
            return item.value
        }
       let item = this.#tail
       this.#tail = this.#tail.prev
       this.#tail.next = undefined
       --this.#length
       return item.value
    }

    delete(value) {

        if(this.#length === 0) {
            console.log('currently there are no new elements')
            return;
        }

        let prevLength = this.#length

        this.#iterate((node) => {
            if(node.value === value) {
                debugger
                --this.#length

                // suppose we are deleting the first element of a linkedlist
                if(node.prev === undefined) {
                    // check if there is a next node
                    if(this.#head.next === undefined) {
                        this.#head = undefined
                        this.#tail = undefined
                    } else {
                        this.#head = this.#head.next
                        this.#head.prev = null
                    }
                    return false
                }

                // lets suppose we are deleting the last element
                if(node.next === undefined) {
                    this.#tail = node.prev
                    node.prev.next = undefined
                    return false
                }

                // deleting somewhere in the mid
                node.prev.next = node.next
                return false
            }
        })

        if (this.#length === prevLength) {
            return false
        } else {
            return true
        }
    }

    insertAfter(search, value) {

        if(this.#length === 0) {
            console.log('currently there are no new elements')
            return;
        }

        this.#iterate((node) => {

            if(node.value === search) {
                const newNode = new Node()
                newNode.value = value
                newNode.next = node.next
                newNode.prev = node
                node.next = newNode
                ++this.#length
                return false
            }

        })
    }
    
    getlength() {
        return this.#length
    }

    shift() {
        if(this.#length <= 0) {
            return
        }
        const prevHead = this.#head
        this.#head = this.#head.next
        this.#head.prev = null
        --this.#length
        return prevHead.value
    }

    getHead() {
        return this.#head.value
    }
}

module.exports =  SingleLinkedList




