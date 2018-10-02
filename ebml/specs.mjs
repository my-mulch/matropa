import EBMLement from "./element"
import ByteReader from 'biteme'

export default class EBMLSpecs {
    static interpret(event) {
        let { element, action, range, base } = event

        if (!range)
            range = element.doc.read(element.size)

        if (typeof action === 'string')
            action = this[action]

        if (base === undefined)
            base = 0

        return Array
            .from(element.doc.bytes.slice(...range))
            .reduce(action, base)
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