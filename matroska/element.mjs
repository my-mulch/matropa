import EBMLement from './element'
import EBMLint from '../ebml/vint';

export default class MatroskaElement extends EBMLement {
    constructor(doc) {
        this.doc = doc

        this.id = this.doc.lookup(this.scan().eval())
        this.size = this.scan().eval()
        this.data = this.scan(this.size)

        this.children = []
    }

    scan(bytesLeft) {

        if (this.id && this.size && this.id.isMaster()) {
            while (!this.pastMarker())
                this.children.push(new EBMLement())

            return this.children
        }

        return new EBMLint({
            top: this.doc.head,
            bot: this.doc.head += bytesLeft || ByteReader.leadingZeros(this.doc.peek()),
        })
    }
}