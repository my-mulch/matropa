import MatroskaIdList from './id-list'
import MatroskaElement from './element'
import EBMLSpecs from '../ebml/specs'

export default class MatroskaSpecs extends EBMLSpecs {
    /*
        interpretations:
            master
            string
            float
            binary
            date
            UTF-8
            unsigned
            signed
    */

    static id(id) { return this.ids[id.toString(2).padStart(32, '0')] }

    static m(element) {

    }
    
    static s(element) { return element.data }
    static f(element) { return 'floats' }
    static b(element) { return 'binary' }
    static d(element) { return 'datess' }
    static e(element) { return 'utf8ss' }
    static u(element) { return 'unsign' }
    static i(element) { return 'signed' }
}

MatroskaSpecs.element = MatroskaElement
MatroskaSpecs.ids = MatroskaIdList