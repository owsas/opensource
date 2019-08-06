# @owsas/responsive

Validators to detect if you are running on big or small screens, using a similar approach to Bootstrap, defining `xs`, `sm`, `md` or `lg` screen breakpoints.

## Installation
With npm:
```bash
npm install --save @owsas/responsive
```

With yarn:
```bash
yarn add @owsas/responsive
```

## Usage

```js
const { Responsive } = require('@owsas/responsive');

Responsive.isXs(100) // true
Responsive.isSm(600) // true
Responsive.isMd(300) // false
Responsive.isMd(800) // true
Responsive.isLg(1920) // true
```

If you provide no parameters, this module grabs the width from `window.innerWidth`.

```js
Responsive.isMd() // detects the window.innerWidth and says if it is a medium screen
```

### Setting new breakpoints
You may customize the breakpoints, using the function `setBreakpoints`

```js
Responsive.setBreakPoints({
  xs: 600, // xs devices are maximum 600px width
  sm: 800, // sm devices are maximum 800px width
  md: 1200 // md devices are maximum 1200px width
  // lg devices are > 1200px width
});
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
