import EBMLement from '../ebml/element'

import util from 'util'

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        super(doc)

        this.id = this.doc.specs.id(this)

        if (this.id.type === 'm' || this.id.type === 's' || this.id.type === 'u' || this.id.type === 'e')
            this.data = this.doc.specs[this.id.type](this)
    }

    toString() { return { id: this.id, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}