import util from 'util'

export default class MatroskaId {
    constructor(props) {
        this.id = props.id

        this.name = props.name
        this.level = props.level
        this.type = props.type
        this.webm = props.webm

        this.description = props.description
        this.mandatory = props.mandatory
        this.multiple = props.multiple
        this.range = props.range
        this.default = props.default

        this.v1 = props.v1
        this.v2 = props.v2
        this.v3 = props.v3
        this.v4 = props.v4
    }

    toString() { return this.name.trim() }
    [util.inspect.custom]() { return this.toString() }
}