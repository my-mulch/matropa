import EBMLement from './element'
import ByteReader from 'biteme'

export default class EBMLReader {
    constructor(props) {
        this.elements = []

        this.file = props.file
        this.specs = props.specs

        this.byteReader = new ByteReader({ file: props.file })
    }

    parse() {
        while (!this.byteReader.isEmpty())
            this.elements.push(new EBMLement(this))
    }

    vRead() {
        return this.byteReader.read({ chunkSize: 8 - Integer(this.byteReader.peek()) }.length).slurp()
    }

    dRead(byteCount) {
        return this.byteReader.queue(byteCount).slurp()
    }

}