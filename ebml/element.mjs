import EBMLVint from "./vint";

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.id = this.scan().eval()
        this.size = this.scan().eval()
        this.data = this.scan()
    }

    static convertVIntStr(vIntStr) {
        return Number.parseInt(vIntStr.slice(vIntStr.length / 8), 2)
    }

    scan(byteCount) {
        byteCount = byteCount || this.doc.byteReader.getCountLeadZero(this.doc.peek())

        return new EBMLVint({
            start: this.byteReader.head,
            end: this.byteReader.skip(byteCount),
        })
    }

}