import util from 'util' // nodes

import ConversionUtils from './utils/conversion' // mine
import ByteReader from './utils/reader' // mine

import MatroskaSpecs from './matroska/specs'
import EBMLReader from './ebml/reader'


const matfile = ConversionUtils
    .convertHexStringToBinString('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b6142878104428581021853806701ffffffffffffff1549a966992ad7b1830f42404d80864368726f6d655741864368726f6d651654ae6badaeabd7810173c5876bfe67acf82f25838101868f565f4d504547342f49534f2f415643e088b0820280ba8201e0')
    .match(/.{1,8}/g)
    .map(function (byte) { return Number.parseInt(byte, 2) })

const ebml = new EBMLReader({
    specs: MatroskaSpecs,
    reader: ByteReader,
    document: matfile
}).read()

console.log(util.inspect(ebml, false, null, true /* enable colors */))



