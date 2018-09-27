class ByteReader {
    constructor(props) {
        this.data = props.data
        this.skip = props.skip || 1
        this.head = props.head || 0
    }

    read() { return this.data[this.head++] }
    isEmpty() { return this.head === this.data.length }
}
