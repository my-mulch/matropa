export default class EBMLint {
    constructor(props) {
        this.top = props.top
        this.bot = props.end
    }

    eval(doc) {
        return this.doc.bytes
            .slice(this.top, this.bot)
            .reduce(function (result, byte) {
                return result || byte
            }, 0)
    }
}
