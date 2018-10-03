import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.head = this.vint()
        this.size = this.vint()
        // this.data = 
    }

    vint() {
        const leadByte = this.doc.peek()
        const leadSize = this.doc.utils.leadZ(leadByte)

        return [this.doc.head, this.doc.head += leadSize]
    }

    toString() { return { tags: this.tags, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}