
import EBMLSpecs from './ebml/specs'
import EBMLDocument from './ebml/document'
import MatroskaSpecs from './matroska/specs'

export default {
    EBMLDocument,
    specs: {
        matroska: MatroskaSpecs,
        ebml: EBMLSpecs
    }
}
