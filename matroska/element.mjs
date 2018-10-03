import EBMLement from '../ebml/element'
import util from 'util'

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        super(doc)

        this.id = this.doc.specs.id(this.head)
        this.data = this.doc.specs[this.id.type](this)

        // Expose keys
        if (!this.doc[this.id.toString()])
            this.doc[this.id.toString()] = []

        this.doc[this.id.toString()].push(this)
    }

    toString() { return { id: this.id, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}