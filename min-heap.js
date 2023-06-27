/**
 * 
 * 

                                                 50
                                                 /\
                                                /  \
                                               /    \
                                              /      \
                                             /        \
                                            71       100
                                            /\
                                           /  \
                                          /    \
                                         /      \
                                        /        \
                                      101        80


   Heap actually maintain poor order of structuring.
   There are 2 types of heaps:
   1. MinHeap
   2. MaxHeap

   In MinHeap, we have min value at a top. In MaxHeap, we have max value at the top.
   The order of insertion in heap is from left to right.


                                                     50
                                                     /\
                                                    /  \
                                                   /    \
                                                  /      \
                                                 /        \
                                                71       100
                                                /\        /\
                                               /  \      /  \
                                              /    \    /    \
                                             /      \  150   190
                                            /        \
                                          101        80


    so lets try adding 3 to the above tree


                       50                                                               50
                       /\                                                               /\
                      /  \                                                             /  \
                     /    \                                                           /    \
                    /      \                                                         /      \
                   /        \                      `.                               /        \
                  71       100    '''''''''''''''''';'                             71       100
                  /\        /\                    ,'                               /\        /\
                 /  \      /  \         in this case we will                      /  \      /  \
                /    \    /    \        hopping/bubbling up                      /    \    /    \
               /      \  150   190                                              /      \  150   190
              /        \                                                       /        \
            101        80                                                    101        80
            /                                                                /
           /                                                    3 > 101 =>T /
          /                                                     lets swap  /
         /                                                                /
        3     this is totally wrong                           .          3                          |
             as it violates the def.                          |                                     |
             of heap                                          |_____________________________________|
                                                              '                       |
                                                                                      |   next step   k
                                                                                      |
                                                          50                          |    50
                            3                             /\                          |    /\
                           /  \                          /  \                             /  \
                          /    \         3 > 50  =>T    /    \                           /    \
                         /      \        lets swap     /      \                         /      \
                        /        \                    /        \                       /        \
                       50       100                  3        100                     71       100
                       /\        /\                  /\        /\                     /\        /\
                      /  \      /  \                /  \      /  \     3 > 71  =>T   /  \      /  \
                     /    \    /    \              /    \    /    \    lets swap    /    \    /    \
                    /      \  150   190           /      \  150   190              /      \  150   190
                   /        \                    /        \                       /        \
                  71        80                  71        80                     3         80
                 /                             /                                /
                /                             /                                /
               /                             /                                /
              /                             /                                /
     |       101                    |  |   101                       |    | 101                       |
     |                              |  |                             |    |                           |
     |                              |  |_____________________________|    |                           |
      ```````````````````````````````                                     `````````````````````````````

                                                                                go from right to left




    so either left or right you will compare it to the parent node.
   Deletion: lets delete the first node which is 3

    right to left direction
                                 50 < 100 take 50                   71 < 80  take 71
place 101 at                        and 101 > 51           50          and 101 > 71        50
the top              /  \             swap 50 with        /  \           swap 71 with     /  \
                    /    \                101            /    \              101         /    \
                   /      \                             /      \                        /      \
                  /        \                           /        \                      /        \
                 50       100                         101      100                    71       100
                 /\        /\                         /\        /\                    /\        /\
                /  \      /  \                       /  \      /  \                  /  \      /  \
               /    \    /    \                     /    \    /    \                /    \    /    \
              /      \  150   190                  /      \  150   190             /      \  150   190
             /        \                           /        \                      /        \
            71        80                         71        80                    101       80
           /
          /
         /
        /
       101                              .
 now take the last node and place it on |now we need to bubble it down |
 top                                    |from root node. since it is a |
                                        |minheap,compare the child node|     now deletion is a success
                                        |take the one which is smallest|
                                        |one , compare node to be      |
                                        |swapped with smallest node. if|
                                        |it is small then swap         |
                                        |                              |







Mapping function for tree visualisation to  arraylist



                50 (0)
               /  \
              /    \                   [50,71,100,101,80,150,190]
             /      \
            /        \
      (1)  71       100   (2)
           /\        /\
          /  \      /  \
         /    \    /    \
        /      \  150   190 (6)
       /        \  (5)
  (3) 101       80
               (4)


                            to access a child from parent node we can say that:

                            for left:
                            (2 x nodeIndex)+ 1
                            for right:
                            (2 x nodeIndex) + 2

                            to access parent from child we can say that:


                           Math.floor((nodeIndex - 1) / 2)

 */


class MinHeap {

    constructor() {
        this.data = []
        this.length = 0
    }

    #getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    #getLeftChildIndex(index) {
        return 2 * index + 1
    }

    #getRightChildIndex(index) {
        return 2 * index + 2
    }

    #bubblingUp(childIndex) {
        if(childIndex === 0) {
            return
        }

        const parentIndex = this.#getParentIndex(childIndex)
        const parentValue = this.data[parentIndex]
        const childValue = this.data[childIndex]

        if(childValue < parentValue) {
            this.data[childIndex] = parentValue
            this.data[parentIndex] = childValue
            this.#bubblingUp(parentIndex)
        }
        return true

    }

    insert(val) {
        this.data.push(val)
        return this.#bubblingUp(this.length++)
    }

    populateFromArray(arr) {
        for(let index = 0; index < arr.length; index++) {
            this.insert(arr[index])
        }
    }

    #bubblingDown(parentIndex) {

        const leftChildIndex = this.#getLeftChildIndex(parentIndex)
        const rightChildIndex = this.#getRightChildIndex(parentIndex)
        const leftChildValue = this.data[leftChildIndex]
        const rightChildValue = this.data[rightChildIndex]
        const parentValue = this.data[parentIndex]

        if(leftChildValue < rightChildValue && parentValue > leftChildValue) {
            this.data[leftChildIndex] = parentValue
            this.data[parentIndex] = leftChildValue
            this.#bubblingDown(leftChildIndex)
        } else {
            if(rightChildValue < leftChildValue && parentValue > rightChildValue) {
                this.data[rightChildIndex] = parentValue
                this.data[parentIndex] = rightChildValue
                this.#bubblingDown(rightChildIndex)
            }
        }
    }

    delete() {
        if(this.length === 0) {
            return
        }
        const lastNode = this.data.pop()
        const firstNode = this.data[0]
        --this.length
        this.data[0] = lastNode
        this.#bubblingDown(0)
        return firstNode
    }
}

module.exports = MinHeap