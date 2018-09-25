import matroskaIds from './matroska-ids'
import utils from './utils'

export default class ByteReader {
    constructor(props) {
        this.data = props.data
        this.skip = props.skip || 1
        this.head = props.head || 0
    }

    read() { return this.data[this.head++] }
}

class MatroskaReader {
    constructor() { this.elements = [] }

    static getReaderForElement(EBMLement) {
        return matroskaIds.has(EBMLement.id) ? matReader : EBMLement
    }

    read(id = null) {
        while (id = byteReader.read())
            this.elements.push(new EBMLement(id))
    }
}

class EBMLement {
    constructor(start) {
        this.id = this.read(start)
        this.size = this.read()
        // this.data = MatroskaReader.getReaderForElement(this).read()
    }

    read(start) {
        const rawByte = start || byteReader.read()

        if (!rawByte)
            return

        let field = rawByte.toString(2)
        let bytesLeft = 8 - field.length

        field = field.padStart(8, '0')
        while (bytesLeft--)
            field += byteReader.read().toString(2).padStart(8, '0')

        return field
    }
}

const matfile = utils
    .convertHexStringToBinString('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b6142878104428581021853806701ffffff')
    .match(/.{1,8}/g)
    .map(function (byte) { return Number.parseInt(byte, 2) })


const byteReader = new ByteReader({ data: matfile })
const matReader = new MatroskaReader()
matReader.read()

matReader.elements.forEach(function (element) {
    console.log('--------ELEMENT--------')
    console.log('id', utils.convertBinStringToHexString(element.id))
    console.log('size', utils.convertBinStringToHexString(element.size))
    console.log('data', utils.convertBinStringToHexString(element.data))
    console.log('master', matroskaIds.has(element.id))
    console.log('\n\n')
}, this)

