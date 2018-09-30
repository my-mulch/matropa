
export default class EBMLement {
    constructor(reader) {
        this.reader = reader

        this.id = this.reader.vRead()
        this.size = this.reader.vRead()
        this.data = this.reader.dRead(EBMLement.convertVIntStr(this.size))
    }

    static convertVIntStr(vIntStr) {
        return Number.parseInt(vIntStr.slice(vIntStr.length / 8), 2)
    }

}