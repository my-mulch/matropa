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
            junk
    */

    static m(element, children = []) {
        element.doc.head = element.base + element.offsets.size

        while (element.doc.head < element.base + element.offsets.data)
            children.push(new MatroskaElement(element.doc))

        return children
    }

    static s(element) {
        return element.doc
            .extract(element.base + element.offsets.size,
                element.base + element.offsets.data)
            .reduce(element.doc.constructor.utils.toString, '')
    }

    static f(element) { return 'float' }
    static b(element) { return 'binary' }
    static d(element) { return 'date' }

    static e(element) {
        return this.s(element)
    }

    static u(element) {
        return element.doc
            .extract(element.base + element.offsets.size,
                element.base + element.offsets.data)
            .reduce(this.vintfull, 0)
    }

    static i(element) { return 'signed' }
    static j(element) {
        element.doc.head = element.base + element.offsets.id

        let byte = 0, i = 0
        while (!this.ids[byte = byte << 8 | element.doc.read()])
            if (++i % this.MAX_ID_LEN === 0) byte = 0

        element.doc.rewind(byte.toString(16).length / 2)
        element.offsets = null
    }
}

MatroskaSpecs.ids = MatroskaIdList
MatroskaSpecs.element = MatroskaElement

