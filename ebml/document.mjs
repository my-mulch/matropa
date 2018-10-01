import EBMLement from './element'
import ByteReader from 'biteme'

export default class EBMLDocument extends ByteReader {
    constructor(props) {
        super(props)

        this.specs = props.specs
        this.elements = []
    }

    parse() {
        while (!this.isEmpty())
            this.elements.push(new this.specs.element(this))
    }

    lookup(id) { return this.specs.getId(id) }
}