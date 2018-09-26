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

class EBMLement {
    constructor(id) {
        this.id = this.vRead()
        this.size = this.vRead()
        this.data = this.dRead(this.valueOfVintStr(this.size))

        this.toString()
    }

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

    toString() {
        console.log('--------ELEMENT--------')
        console.log('id', utils.convertBinStringToHexString(this.id))
        console.log('size', utils.convertBinStringToHexString(this.size))
        console.log('data', utils.convertBinStringToHexString(this.data))
        console.log('master', matroskaIds.has(this.id))
        console.log('\n\n')
    }
}

const matfile = utils
    .convertHexStringToBinString('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b6142878104428581021853806701ffffff')
    .match(/.{1,8}/g)
    .map(function (byte) { return Number.parseInt(byte, 2) })

const byteReader = new ByteReader({ data: matfile })
new EBMLement()

