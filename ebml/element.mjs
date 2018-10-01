import EBMLint from "./vint";
import ByteReader from 'biteme'

export default class EBMLement {
    constructor(doc) {
        this.doc = doc

        this.id = this.doc.specs.lookup(this.scan().eval())
        this.size = this.scan().eval()
        this.data = this.scan(this.size)
    }

    scan(bytesLeft) {
        return new EBMLint({
            top: this.doc.head,
            bot: this.doc.head += bytesLeft || ByteReader.leadingZeros(this.doc.peek()),
        })
    }

}