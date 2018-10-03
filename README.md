# matropa

```js

import util from 'util'

import { EBMLDocument, specs } from 'matropa'

const ebml = new EBMLDocument({
    bytes: /* A Uint8Array */,
    specs: specs.matroska
})

console.log(util.inspect(ebml, false, null, true /* enable colors */))

```
