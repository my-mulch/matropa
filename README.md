# matropa

```js

import { EBMLDocument, MatroskaSpecs, EBMLSpecs } from 'matropa'

const ebml = new EBMLDocument({
    bytes: /* A Uint8Array */,
    specs: MatroskaSpecs
})

// All values made availiable
console.log(ebml.PixelWidth)
console.log(ebml.PixelHeight)

```
