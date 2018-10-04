import EBMLement from "./element"

export default class EBMLSpecs {

    static vintfull(result, byte) {
        return result << 8 | byte
    }

    static vintrmlz(result, byte, i, slice) {
        if (i === 0) return byte ^ (256 >> slice.length)

        return result << 8 | byte
    }
}

EBMLSpecs.element = EBMLement
EBMLSpecs.MAX_ID_LEN = 4