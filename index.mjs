import util from 'util' // nodes
import utils from './utils' // mine
import MatroskaSpecs from './matroska/specs'

class ByteReader {
    constructor(props) {
        this.data = props.data
        this.skip = props.skip || 1
        this.head = props.head || 0
    }

    read() { return this.data[this.head++] }
    isEmpty() { return this.head == this.data.length }
}

class EBMLement {
    constructor() {
        this.id = MatroskaSpecs.getId(this.vRead())
        this.size = this.vRead()

        if (this.id.name.trim() === 'Void')
            return

        this.data = this.id.isMaster()
            ? this.mRead(this.valueOfVintStr(this.size))
            : this.dRead(this.valueOfVintStr(this.size))
    }

    byteCount() { return (this.id.getId().length + this.size.length + this.data.length) / 8 }
    valueOfVintStr(vIntStr) { return Number.parseInt(vIntStr.slice(vIntStr.length / 8), 2) }

    vRead() {
        const rawByte = byteReader.read()
        if (!rawByte) return '11101100'

        let field = rawByte.toString(2)
        let bytesLeft = 8 - field.length

        field = field.padStart(8, '0')
        while (bytesLeft--)
            field += byteReader.read().toString(2).padStart(8, '0')

        return field
    }

    dRead(bytesLeft) {
        let field = ''

        while (bytesLeft--)
            field += byteReader.read().toString(2).padStart(8, '0')

        return field
    }

    mRead(bytesLeft, elements = []) {
        while (bytesLeft) {
            const element = new EBMLement()
            if (element.id.name.trim() === 'Void') break
            elements.push(element)
            bytesLeft -= element.byteCount()
        }

        return elements
    }

}


const matfile = utils
    .convertHexStringToBinString('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b6142878104428581021853806701ffffffffffffff1549a966992ad7b1830f42404d80864368726f6d655741864368726f6d651654ae6badaeabd7810173c5876bfe67acf82f25838101868f565f4d504547342f49534f2f415643e088b0820280ba8201e0')
    .match(/.{1,8}/g)
    .map(function (byte) { return Number.parseInt(byte, 2) })

const byteReader = new ByteReader({ data: matfile })
const header = new EBMLement()
const segment = new EBMLement()

console.log(util.inspect(segment, false, null, true /* enable colors */))



