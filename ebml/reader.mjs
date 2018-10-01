import EBMLement from './element'
import ByteReader from 'biteme'

export default class EBMLDocument {
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
}