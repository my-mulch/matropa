
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

    read(byteCount) {
        return [
            this.head,
            this.head += byteCount || this.specs.vint(this.peek())
        ]
    }

    toString() { return this.elements }
    [util.inspect.custom]() { return this.toString() }
}