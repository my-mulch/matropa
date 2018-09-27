export default class EBMLement {
    constructor(props) {
        this.id = props.id
        this.size = props.size
        this.reader = props.reader
        
        this.data = this.dRead(EBMLement.convertVIntStr(this.size))
    }

    static convertVIntStr(vIntStr) {
        return Number.parseInt(vIntStr.slice(vIntStr.length / 8), 2)
    }

    dRead(byteCount) {
        return this.reader.queue(byteCount).slurp()
    }
}