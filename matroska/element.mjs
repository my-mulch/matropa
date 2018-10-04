import EBMLement from '../ebml/element'
import util from 'util'

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        super(doc)
        this.range = this.data

        this.id = this.doc.specs.ids[this.rawi] || this.doc.specs.ids[0xec] // void id
        this.data = this.doc.specs[this.id.type].call(this.doc.specs, this)

        this.doc.index(this, this.id.toString())
    }

    toString() { return { id: this.id, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}