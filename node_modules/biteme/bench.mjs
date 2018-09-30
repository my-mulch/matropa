import fs from 'fs'
import ByteReader from './'

const file = fs.readFileSync('/Users/tru/Desktop/.../movies/ed/calculus-strang/The\ Exponential\ Function-oo1ZZlvT2LQ.webm')
const fileReader = new ByteReader({ file })

console.time('no wrap')
for (let i = 1; i < file.length; i++)
    Math.exp(file[0] + 1) * Math.sin(2 * Math.PI * i)
console.timeEnd('no wrap')


console.time('wrap')
for (let i = 1; i < file.length; i++)
    Math.exp(fileReader.read(i) + 1) * Math.sin(2 * Math.PI * i)
console.timeEnd('wrap')