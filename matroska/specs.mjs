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
        element.doc.head = element.range[0]

        while (element.doc.head < element.range[1])
            children.push(new MatroskaElement(element.doc))

        return children
    }

    static s(element) {
        return element.doc
            .extract(element.range)
            .reduce(element.doc.constructor.utils.toString, '')
    }

    static f(element) { return element.range }
    static b(element) { return element.range }
    static d(element) { return element.range }

    static e(element) {
        return this.s(element)
    }

    static u(element) {
        return element.doc
            .extract(element.range)
            .reduce(this.vintfull, 0)
    }

    static i(element) { return element.range }
    static j(element) {
        element.doc.head = element.range[0]
        
        while (true)
            for (let i = 0, byte = 0; i < this.MAX_ID_LEN; i++)
                if (this.ids[byte = byte << 8 | element.doc.read()])
                    return element.doc.rewind(i)
    }
}

MatroskaSpecs.ids = MatroskaIdList
MatroskaSpecs.element = MatroskaElement

