import fs from 'fs'
import ByteReader from './'

const file = fs.readFileSync('/Users/tru/Desktop/.../movies/ed/calculus-strang/The\ Exponential\ Function-oo1ZZlvT2LQ.webm')
const fileReader = new ByteReader({ file })

const masks = [128, 64, 32, 16, 8, 4, 2, 1]

function leadingZeros2(byte) {
    for (let i = 0; i < masks.length; i++)
        if (masks[i] & byte)
            return i
}

function leadingZeros3(byte) {
    if (byte > 128) return 0
    if (byte > 64) return 1
    if (byte > 32) return 2
    if (byte > 16) return 3
    if (byte > 8) return 4
    if (byte > 4) return 5
    if (byte > 2) return 6
    if (byte > 1) return 7
}

console.time('lz1')

for (let i = 1; i < file.length; i += 1)
    ByteReader.leadingZeros(0)

console.timeEnd('lz1')



console.time('lz2')

for (let i = 1; i < file.length; i += 1)
    leadingZeros2(0)

console.timeEnd('lz2')



console.time('lz3')

for (let i = 1; i < file.length; i += 1)
    leadingZeros3(0)

console.timeEnd('lz3')