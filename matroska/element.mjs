import EBMLement from '../ebml/element'
import EBMLint from '../ebml/vint'
import ByteReader from 'biteme'

import util from 'util'

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        super(doc)

        this.id = this.doc.specs.lookup(this.scan().eval(this.doc, 0))
        this.size = this.scan().eval(this.doc, 1)
        this.data = this.scan(this.size)
    }

    scan(byteCount) {
        this.doc.setMarker(byteCount)

        if (this.id && this.size && this.id.isMaster()) {
            while (!this.doc.pastMarker())
                this.children.push(new MatroskaElement(this.doc))

            this.doc.popMarker()
            return this.children
        }

        return new EBMLint({
            top: this.doc.head,
            bot: this.doc.head = this.doc.popMarker() || (this.doc.head + ByteReader.leadingZeros(this.doc.peek()) + 1)
        })
    }

    toString() {
        return `id: ${this.id}\nsize: ${this.size}\ndata: ${this.data}\n`
    }

    [util.inspect.custom]() { return this.toString() }


}