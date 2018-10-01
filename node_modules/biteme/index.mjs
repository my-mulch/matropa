export default class ByteReader {

    constructor(props) {
        this.bytes = props.bytes
        this.markers = props.markers || []
        this.head = 0
    }

    static leadingZeros(byte) { // winner of the speed tests
        if (byte >= 128) return 0
        if (byte >= 64) return 1
        if (byte >= 32) return 2
        if (byte >= 16) return 3
        if (byte >= 8) return 4
        if (byte >= 4) return 5
        if (byte >= 2) return 6
        if (byte >= 1) return 7

        return 8
    }

    read() { return this.bytes[this.head++] } // twice as slow as direct access
    isEmpty() { return this.head >= this.bytes.length }
    peek() { return this.bytes[this.head] }

    pastMarker() { return this.head >= this.markers[this.markers.length - 1] }
    setMarker(marker) { this.markers.push(this.head + marker) }
    popMarker() { return this.markers.pop() }

}


