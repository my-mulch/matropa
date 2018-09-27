export default class EBMLReader {
    constructor(props) {
        this.elements = []

        this.specs = props.specs
        this.document = props.document

        this.reader = props.byteReader
        this.reader.load(this.document)
    }

    read() { /* Abtract */ }

    vRead() {
        byteReader.read()

        let field = rawByte.toString(2)
        let bytesLeft = 8 - field.length

        field = field.padStart(8, '0')
        while (bytesLeft--)
            field += byteReader.read().toString(2).padStart(8, '0')

        return field
    }

}