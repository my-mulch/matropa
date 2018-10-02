import MatroskaIdList from './id-list'
import MatroskaElement from './element'
import EBMLSpecs from '../ebml/specs'

export default class MatroskaSpecs extends EBMLSpecs {
    /*
        interpretations:
            id
            master
            string
            float
            binary
            date
            UTF-8
            unsigned
            signed
    */

    static id(element) {
        return this.ids[element.id.toString(2).padStart(32, '0')]
    }

    static m(element) {
        const children = []

        const end = element.size < 0 ? Number.POSITIVE_INFINITY : element.doc.head
        element.doc.head -= element.size < 0 ? 0 : element.size

        while (element.doc.head < end && !element.doc.isEmpty())
            children.push(new MatroskaElement(element.doc))

        return children
    }

    static s(element) {
        return this.interpret({
            element,
            range: element.data,
            base: '',
            action: function (string, byte) { return string + String.fromCharCode(byte) },
        })
    }

    static f() { }
    static b() { }
    static d() { }
    static e(element) {
        return this.interpret({
            element,
            range: element.data,
            base: '',
            action: function (string, byte) { return string + String.fromCharCode(byte) },
        })
    }
    static u(element) {
        return this.interpret({
            element,
            action: 'vintfull',
            range: element.data
        })
    }
    static i() { }
}

MatroskaSpecs.element = MatroskaElement
MatroskaSpecs.ids = MatroskaIdList