export default class ByteReader {

    constructor(props) {
        this.file = props.file
        this.head = 0
    }

    read() { return this.file[this.head++] } // twice as slow as direct access
    isEmpty() { return this.head >= this.file.length }
    peek() { return this.file[this.head] }

}
