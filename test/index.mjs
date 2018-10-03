import util from 'util' // nodes

import EBMLDocument from './ebml/document'
import MatroskaSpecs from './matroska/specs'

import fs from 'fs'

const ebml = new EBMLDocument({
    bytes: fs.readFileSync('/Users/tru/Desktop/buffer.mkv'),
    specs: MatroskaSpecs
})

console.log(util.inspect(ebml, false, null, true /* enable colors */))
