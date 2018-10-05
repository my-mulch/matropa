import EBMLDocument from '../ebml/document'
import MatroskaSpecs from '../matroska/specs'

import fs from 'fs'

const ebml = new EBMLDocument({
    bytes: fs.readFileSync('/Users/tru/Downloads/matroska_test_w1_1/test1.mkv'),
    specs: MatroskaSpecs
})

console.log(Object.keys(ebml))
console.log(ebml)