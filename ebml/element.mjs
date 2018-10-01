import EBMLint from './vint'
import ByteReader from 'biteme'

import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.tags = this.scan()
        this.size = this.scan()
        this.data = this.scan(this.size)
    }

    scan(byteCount) {
        return {
            top: this.doc.head,
            bot: this.doc.head += byteCount || this.doc.specs.vint(this.doc.peek())
        }
    }

    toString() { return { id: this.id, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}