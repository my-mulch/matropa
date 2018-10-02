import util from 'util' // nodes

import EBMLDocument from './ebml/document'
import MatroskaSpecs from './matroska/specs'

import fs from 'fs'

const ebml = new EBMLDocument({
    specs: MatroskaSpecs,
    bytes: fs.readFileSync('/Users/tru/Desktop/buffer.mkv'),
})

console.log(util.inspect(ebml, false, null, true /* enable colors */))
