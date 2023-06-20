/**
 * the main logic behind bubble sort is to check whether arr[i] <= arr[i + 1]
 * if the above condition satisfies then we move on
 * if it is not satisfied then we will do a swap
 * 
 * and for iteration we will have the largest item in the end of the array
 */

let data = [1,34,5,2,4,78,50,0];

/**
 * i = 0
 * 1 < 34
 * 34 < 5
 * swap
 * 1,5,34,3,4,78,50,0
 * 34< 3
 * 1,5,3,34,4,78,50,0
 * 34 < 4
 * 1,5,3,4,34,78,50,0
 * 34 < 78
 * 78 < 50
 * 1,5,3,4,34,50,78,0
 * 78 < 0
 * 1,5,3,4,34,50,0,78
 * 
 * i = 1
 * 
 * 1 < 5
 * 5 < 3
 * 1,3,5,4,34,50,0,78
 * 5 < 4
 * 1,3,4,5,34,50,0,78
 * 5 < 34
 * 34 < 50
 * 50 < 0
 * 1,3,4,5,34,0,50,78
 * 
 * i = 2
 * 
 * 1 < 3
 * 3 < 4
 * 4 < 5
 * 5 < 34
 * 34 < 0
 * 1,3,4,5,0,34,50,78
 * 
 * i = 3
 * 1 < 3
 * 3 < 4
 * 4 < 5
 * 5 < 0
 * 1,3,4,0,5,34,50,78
 * 
 * 
 * .....
 * 
 * 
 * 0,1,3,4,5,34,50,78
 */

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data.length - i; j++) {
        if(data[j] > data[j + 1]){
            let temp = data[j]
            data[j] = data[j + 1]
            data[j + 1] = temp
        }
    }
}

console.log(data)

/**
 * O(n^2)
 */