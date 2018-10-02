import EBMLement from '../ebml/element'

import util from 'util'

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        super(doc)

        this.id = this.doc.specs.interpret(this, 'id')
        this.data = this.doc.specs.interpret(this, this.tags.type)
    }

    toString() { return { id: this.id, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}