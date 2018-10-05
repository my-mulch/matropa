import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.base = this.doc.head

        // Offsets indicate where a section ENDS relative to the base
        this.offsets = {}

        // Compute id offset and seek past it
        this.offsets.id = this.vint()
        this.doc.seek(this.base + this.offsets.id)

        // Compute size offset and seek past it
        this.offsets.size = this.offsets.id + this.vint()
        this.doc.seek(this.base + this.offsets.size)

        // Extract rawId from offsets
        this.rawId = this.doc
            .extract(this.base, this.base + this.offsets.id)
            .reduce(this.doc.specs.vintfull, 0)

        // Extract size from offsets
        this.size = this.doc
            .extract(this.base + this.offsets.id, this.base + this.offsets.size)
            .reduce(this.doc.specs.vintrmlz, 0)

        // Compute data offset and seek past it
        this.offsets.data = this.offsets.size + (this.size >= 0 ? this.size : this.doc.length - this.doc.head)
        this.doc.seek(this.base + this.offsets.data)
    }

    vint() {
        const leadByte = this.doc.peek()
        const leadSize = this.doc.constructor.utils.leadZ(leadByte) + 1

        return leadSize
    }

    toString() { return { rawi: this.rawi, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}