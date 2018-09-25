
class ByteReader {
    constructor(props) {
        this.data = props.data
        this.skip = props.skip
        this.head = props.head
    }

    read() { return this.data[this.head++] }
}
