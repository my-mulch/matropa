
import ByteReader from 'biteme'
import EBMLSpecs from './specs'

export default class EBMLDocument extends ByteReader {
    constructor(props) {
        super(props)

        this.specs = props.specs || EBMLSpecs
        this.elements = []
    }

    parse() {
        while (!this.isEmpty())
            this.elements.push(new this.specs.element(this))

        return this
    }

}