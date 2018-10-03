import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.head = this.vint().reduce(this.doc.specs.vintfull)
        this.size = this.vint().reduce(this.doc.specs.vintrmlz)
        this.data = this.mark(this.size)
    }

    mark(marker) {
        return [this.doc.head, this.doc.head += marker]
    }

    vint() {
        const leadByte = this.doc.peek()
        const leadSize = this.doc.utils.leadZ(leadByte)

        return this.mark(leadSize)
    }

    toString() { return { tags: this.tags, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}