import EBMLReader from '../ebml/reader'
import MatroskaElement from './element'

export default class MatroskaReader extends EBMLReader {
    constructor(props) { super(props) }

    parse() {
        while (!this.byteReader.isEmpty())
            this.elements.push(new MatroskaElement(this))
    }
}
