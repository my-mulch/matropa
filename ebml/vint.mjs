export default class EBMLint {
    constructor(props) {
        this.top = props.top
        this.bot = props.bot
    }

    eval(doc, type) {
        switch (type) {
            case 0:
                return doc.bytes
                    .slice(this.top, this.bot)
                    .reduce(function (result, byte) {
                        return result << 8 | byte
                    }, 0)
            case 1:
                return doc.bytes
                    .slice(this.top, this.bot)
                    .reduce(function (result, byte, i, slice) {
                        if (i === 0) return byte ^ (256 >> slice.length)
                        return result << 8 | byte
                    }, 0)
        }

    }
}
