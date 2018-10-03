import util from 'util' // nodes

import EBMLDocument from './ebml/document'

import fs from 'fs'

const ebml = new EBMLDocument({
    bytes: fs.readFileSync('/Users/tru/Desktop/buffer.mkv'),
})

console.log(util.inspect(ebml, false, null, true /* enable colors */))
