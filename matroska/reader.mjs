import EBMLReader from '../ebml/reader'

export default class MatroskaReader extends EBMLReader {
    constructor(props) { super(props) }

    read() {
        while (!byteReader.isEmpty())
            this.elements.push(new EBMLement({
                id: this.specs.lookup(this.vRead()),
                size: this.vRead()
            }))
    }
}
