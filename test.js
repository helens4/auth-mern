const myArr = [6, 3, 2, 4, 6, 8]

const k = 8

let i = 0
while (i < myArr.length && myArr[i] !== k) i++

if (i < myArr.length) {
    console.log(`${k} występuje na pozycji ${i}`)
} else {
    console.log(`w tablicy nie ma ${k}`)
}