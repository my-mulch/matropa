import EBMLement from './element'
import ByteReader from 'biteme'

export default class EBMLDocument extends ByteReader {
    constructor(props) {
        super(props)
        this.elements = []
    }

    parse() {
        while (!this.byteReader.isEmpty())
            this.elements.push(new EBMLement(this))
    }
}