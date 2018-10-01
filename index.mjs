import util from 'util' // nodes

import EBMLDocument from './ebml/document'
import MatroskaSpecs from './matroska/specs'

import fs from 'fs'

const file = fs.readFileSync('/Users/tru/Desktop/buffer.mkv')
const ebml = new EBMLDocument({ bytes: file })
console.log(util.inspect(ebml, false, null, true /* enable colors */))
