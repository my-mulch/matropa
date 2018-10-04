
import ByteReader from 'biteme'
import EBMLSpecs from './specs'
import util from 'util'

export default class EBMLDocument extends ByteReader {
    constructor(props) {
        super(props)

        this.specs = props.specs || EBMLSpecs
        this.elements = []

        while (!this.isEmpty())
            this.elements.push(new this.specs.element(this))
    }

    index(element, tag) {
        (this[tag] = this[tag] || []).push(element)
    }

    toString() { return this.elements }
    [util.inspect.custom]() {
        return util.inspect(this.toString(), false, null, true /* enable colors */)
    }
}