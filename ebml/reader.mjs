import EBMLement from './element'

export default class EBMLReader {
    constructor(props) {
        this.elements = []

        this.specs = props.specs
        this.document = props.document

        this.byteReader = props.byteReader
        this.byteReader.load(this.document)
    }

    parse() {
        while (!this.byteReader.isEmpty())
            this.elements.push(new EBMLement(this))
    }

    vRead() {
        return this.byteReader.queue(8 - this.byteReader.peek().length).slurp()
    }

    dRead(byteCount) {
        return this.byteReader.queue(byteCount).slurp()
    }

}