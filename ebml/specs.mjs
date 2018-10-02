import EBMLement from "./element"
import ByteReader from 'biteme'

export default class EBMLSpecs {
    static interpret(element, action) {
        return element.doc.bytes
            .slice(...element.doc.read(element.size))
            .reduce(this[action], 0)
    }

    static vint(byte) {
        return 1 + ByteReader.leadingZeros(byte)
    }

    static vintfull(result, byte) {
        return result << 8 | byte
    }

    static vintrmlz(result, byte, i, slice) {
        if (i === 0) return byte ^ (256 >> slice.length)

        return result << 8 | byte
    }

}

EBMLSpecs.element = EBMLement