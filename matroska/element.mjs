export default class MatroskaElement extends EBMLement {
    constructor() {
        this.id = props.id
        this.size = props.size
        this.reader = props.reader

        this.data = this.dRead(EBMLement.convertVIntStr(this.size))
    }

    mRead(byteCount) { }
}