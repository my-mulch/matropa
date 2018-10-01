import util from 'util'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.tags = this.doc.specs.interpret(this, 'vintfull')
        this.size = this.doc.specs.interpret(this, 'vintrmlz')
        this.data = this.doc.read(this.size)
    }

    toString() { return { tags: this.tags, size: this.size, data: this.data } }
    [util.inspect.custom]() { return this.toString() }
}