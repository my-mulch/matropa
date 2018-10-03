import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.head = this.doc.extract(this.vint()).reduce(this.doc.specs.vintfull, 0)
        this.size = this.doc.extract(this.vint()).reduce(this.doc.specs.vintrmlz, 0)

        if (this.size > 0)
            this.data = this.doc.advance(this.size)
    }

    vint() {
        const leadByte = this.doc.peek()
        const leadSize = this.doc.constructor.utils.leadZ(leadByte) + 1

        return this.doc.advance(leadSize)
    }

    toString() { return { head: this.head, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}