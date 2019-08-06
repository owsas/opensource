# detect-link-type

Detects the type of a link, getting the extension of a provided link, in ES2015.

## Installation
```
$> npm i -S detect-link-type
```

## Usage
Typescript
```ts
import { Detector } from 'detect-link-type';
```
Javascript
```js
const { Detector } = require('detect-link-type');
```

## API docs

```js
const LINK = "http://example.com/1/2/3/a.png";

Detector.getExtension(LINK); // "png"
Detector.isImage(LINK); // true
Detector.isPNG(LINK); // true
Detector.isGIF(LINK); // false
Detector.isJPG(LINK); // false
Detector.isCSS(LINK); // false
Detector.isHTML(LINK); // false
Detector.isTTF(LINK); // false
Detector.isJS(LINK); // false
Detector.isPDF(LINK); // false
```

## Credits
Juan Camilo Guarin P  
Otherwise SAS  
[http://owsas.com](http://owsas.com)

## LICENSE
MIT
