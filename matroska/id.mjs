
export default class MatroskaId {
    constructor(props) {
        this.name = props.name
        this.level = props.level
        this.type = props.type
        this.webm = props.webm

        this.mandatory = props.mandatory
        this.multiple = props.multiple
        this.range = props.range
        this.default = props.default

        this.id = props.id

        this.v1 = props.v1
        this.v2 = props.v2
        this.v3 = props.v3
        this.v4 = props.v4

        this.description = props.description
    }

    isMaster() { return this.type === 'm' }

}
