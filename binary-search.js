// user data

let data = [1,2,3,4,5,6,7,8,9]

/**
 * for 7
 * for first we have
 * m = 10 / 2 = 5
 * lowpoint = 0
 * v = arr[5] = 6  6 !== 7
 * as 6 is lesser than 7 so we have to adjust lowpoint and high point again
 * lowpoint will be the mid poitn
 * lowpoint = 6
 * and highpoint will still be the length
 * highpoint = 10
 * midpoint = 6 + (10 - 6 / 2) = 8 
 * v = arr[8] = 9
 * as 9 is greater than 7 so we need to adjust the higpoint 
 * highpoint = midpoint = 8
 * midpoint = 6 + (8-6) / 2 = 7
 * v = arr[7] = 8
 * as 8 is lesser than 7 so we will adjust the highpoint again
 * highpoint = midpoint = 7
 * midpoint = Math.floor(6 + (7-6) / 2) = 6 
 * v = arr[6] = 7
 * so it matches to 7 then return 
 * 
 */

/**
 * for 9
 * m = 10 / 2 = 5
 * v = arr[5] = 6
 * 
 * 6 < 9
 * update the lowpoint
 * lowPoint = midpoint = 5
 * 
 * midpoint = Math.floor(5 + (10-5)/2) = 7
 * v = arr[7] = 8
 * 
 * 8 < 9
 * update the lowpoint
 * lowpoint = midpoint = 7
 * 
 * midpoint = Math.floow(7 + (10-7)/2) = 8
 * v=arr[8] = 9
 * 9==9
 * return
 * 
 * lowpoint = midpoint = 8
 * v=arr[8] = undefined
 * 
 * 
 */
let traverseSize = 2
let lowPoint = 0
let highPoint = data.length
let query = 11
do {

    let midPoint = Math.floor(lowPoint + (highPoint-lowPoint) / traverseSize)

    let v = data[midPoint]

    if(v === query) {
        console.log('value found ', v, ' at index ', midPoint)
        return
    }

    if(v < query) {
        lowPoint = midPoint

    }

    if(v > query) {
        highPoint = midPoint
    }

} while(lowPoint < data.length - 1)

/**
 * calculating O
 * 
 * N/2
 * N/4
 * N/8
 * N/16
 * .
 * .
 * .
 * .
 * .
 * N/2^k = 1
 * 
 * N = 2^k
 * log2^N = k
 * 
 * Log(N)
 */