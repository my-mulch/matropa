import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.base = this.doc.head

        this.offsets = {}
        this.offsets.id = this.vint()
        this.offsets.size = this.offsets.id + this.vint()

        this.id0b = this.doc.extract(this.doc.head, this.offsets.id).reduce(this.doc.specs.vintfull, 0)
        this.size = this.doc.extract(this.offsets.id, this.offsets.size).reduce(this.doc.specs.vintrmlz, 0)

        this.offsets.data = this.offsets.size + this.size > 0 ? this.size : 0

        this.doc.advance(this.offsets.id + this.offsets.size + this.offsets.data)
    }

    vint() {
        const leadByte = this.doc.peek()
        const leadSize = this.doc.constructor.utils.leadZ(leadByte) + 1

        return leadSize
    }

    toString() { return { rawi: this.rawi, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}