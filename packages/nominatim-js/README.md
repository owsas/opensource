# Nominatim-JS

Unofficial JS SDK for the Nominatim Open Street Map service that allows geocoding and reverse geocoding

## How to use?

First, install the SDK
``` 
$> npm install --save @owsas/nominatim-js
```

Then, use it :). It works with Promises, or can be used with async / await.

### Example with promises

```js
const { NominatimJS } = require('@owsas/nominatim-js');

NominatimJS.search({
  q: 'bakery in new york'
}).then(results => {
  // do something with results
}).catch(error => {
  // error ocurred
})

```

### Example with async / await

```js
const { NominatimJS } = require('nominatim-js');

async function search(){
  let results = await NominatimJS.search({
    q: 'bakery in new york'
  });
}
```
NOTE: To await the response, the call to the API must be written inside an async function


### More examples 

See examples folder in the repository

## Author

Juan Camilo Guarín Peñaranda  
Otherwise SAS   
Colombia  

## License

MIT

## Support us on Patreon
[![patreon](./repo/patreon.png)](https://patreon.com/owsas)