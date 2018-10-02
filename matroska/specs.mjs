import MatroskaIdList from './id-list'
import MatroskaElement from './element'
import EBMLSpecs from '../ebml/specs'

export default class MatroskaSpecs extends EBMLSpecs {

    static interpret() { }

    // to maintain this pretty table
    static id(id) { return this.ids[id.toString(2).padStart(32, '0')] }

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

    static m(element, type) {
        const children = []
        const end = element.doc.head

        element.doc.head -= element.size
        while (element.doc.head < end)
            children.push(new MatroskaElement(element.doc))

        return children
    }

    static s() { }
    static f() { }
    static b() { }
    static d() { }
    static e() { }
    static u() { }
    static i() { }
}

MatroskaSpecs.element = MatroskaElement
MatroskaSpecs.ids = MatroskaIdList