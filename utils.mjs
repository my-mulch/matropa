
export default class ConversionUtils {
    static convertHexStringToBinString(hexString) {
        return Array.from(hexString).reduce(function (binString, nib) {
            return binString + Number
                .parseInt(nib, 16)
                .toString(2)
                .padStart(4, '0')
        }, '')
    }

    static convertBinStringToHexString(binString) {
        return binString
            .match(/.{1,4}/g)
            .reduce(function (hexString, byte) {
                return hexString + Number.parseInt(byte, 2).toString(16)
            }, '')
    }

}
