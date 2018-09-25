
export default class ConversionUtils {
    static convertHexStringToBinString(hexString) {
        return Array.from(hexString).reduce(function (binString, nib) {
            return binString + Number
                .parseInt(nib, 16)
                .toString(2)
                .padStart(4, '0')
        }, '')
    }

}
