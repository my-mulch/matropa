
export default class ByteReader {
    constructor(props) {
        this.data = props.data
        this.skip = props.skip || 1
        this.head = props.head || 0
    }

    read() { return this.data[this.head++] }
}

class MatroskaReader {
    constructor() {
        this.elements = []
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

        const dataReader = MatroskaReader.isMasterElement(this)
        this.data = dataReader.read()
    }

    read(start) {
        let field = start ? start.toString(2) : byteReader.read().toString(2)
        let bytesLeft = 8 - field.length

        field = field.padStart(8, '0')
        while (bytesLeft--)
            field += byteReader.read().toString(2).padStart(8, '0')

        return field
    }
}

const matfile = Array
    .from('1a45dfa3a34286810142f7810142f2810442f381084282886d6174726f736b6142878104428581021853806701ffffff')
    .reduce(function (binString, nib) {
        return binString + Number.parseInt(nib, 16).toString(2).padStart(4, '0')
    }, '')
    .match(/.{1,8}/g)
    .map(function (byte) {
        return Number.parseInt(byte, 2)
    })

const byteReader = new ByteReader({ data: matfile })
const matReader = new MatroskaReader()
matReader.read()
