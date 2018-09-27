import EBMLement from './element'

export default class MatroskaElement extends EBMLement {
    constructor(reader) {
        this.reader = reader
        
        this.id = this.reader.vRead()
        this.size = this.reader.vRead()
        this.data = null /* The magic... */
    }
}