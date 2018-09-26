import utils from './utils'
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
        this.id = MatroskaSpecs[this.vRead()]
        this.size = this.vRead()
        this.data = MatroskaReader.isMasterElement(this.id)
            ? this.mRead(this.valueOfVintStr(this.size))
            : this.dRead(this.valueOfVintStr(this.size))
    }

    byteCount() { return (this.id.length + this.size.length + this.data.length) / 8 }

    valueOfVintStr(vIntStr) {
        return Number.parseInt(vIntStr.slice(vIntStr.length / 8), 2)
    }

    vRead() {
        let field = byteReader.read().toString(2)
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
            elements.push(element)
            bytesLeft -= element.byteCount()
        }

        return elements
    }

}

const matfile = utils
    .convertHexStringToBinString('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b614287810442858102')
    .match(/.{1,8}/g)
    .map(function (byte) { return Number.parseInt(byte, 2) })

const byteReader = new ByteReader({ data: matfile })
console.log(new EBMLement())


