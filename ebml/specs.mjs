import EBMLement from "./element"
import ByteReader from 'biteme'

export default class EBMLSpecs {
    static vint(byte) {
        return 1 + ByteReader.leadingZeros(byte)
    }
}

EBMLDocument.element = EBMLement