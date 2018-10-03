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

    static m(element, children = []) {
        element.doc.head = element.data[0]

        while (element.doc.head < element.data[1])
            children.push(new MatroskaElement(element.doc))

        return children
    }

    static s(element) {
        return element.doc
            .extract(element.data)
            .reduce(element.doc.constructor.utils.toString, '')
    }

    static f(element) { return 'floats' }
    static b(element) { return 'binary' }
    static d(element) { return 'datess' }

    static e(element) {
        return this.s(element)
    }

    static u(element) {
        return element.doc
            .extract(element.data)
            .reduce(this.vintfull, 0)
    }

    static i(element) { return 'signed' }
}

MatroskaSpecs.element = MatroskaElement
MatroskaSpecs.ids = MatroskaIdList