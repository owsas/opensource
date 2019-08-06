# text-trimmer

An npm module that helps you trimming text and adding tailing characters. Ex: Hello, my name...

## Usage

```ts
import { trim } from '@owsas/text-trimmer';

// Trimming by number of words
const result = trim('This module helps trimming texts', { numWords: 3 });
console.log(result); // This module helps...

// Trimming by number of characters
const result = trim('This module helps trimming texts', { numChars: 5 });
console.log(result); // This ...

// Trimming with custom textTail
const result = trim('This module helps trimming texts', { numChars: 5, textTail: ':::' });
console.log(result); // This :::
```

## Dev mode

Clone this repo, and start adding your code in the `index.ts` file.  
When you are done, write the tests in the `index.test.ts` file. For testing, this repo works with [Jest](https://facebook.github.io/jest/).

Once you finished, you can publish your module to npm with `npm publish`. This will compile your Typescript code
and send it to npm.

Make sure to change the name of the package in `package.json`

## Dev Features
* Testing with Jest
* Linting out of the box (checks the style of your code), with TSLint
* Build, prepublish and other scripts to help you to develop
* Works with Typescript: Static typing for your JS Applications, reducing amount of runtime errors
* Coverage out of the box, thanks to Jest
* Uses deterministic module resolving, with Yarn

## Credits

Developed by Juan Camilo Guarín Peñaranda,  
Otherwise SAS, Colombia  
http://owsas.com
2018

## License 

MIT.

## Support us on Patreon 
[![patreon](./repo/patreon.png)](https://patreon.com/owsas)
