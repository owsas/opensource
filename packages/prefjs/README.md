# `prefjs`

![](./repo/prefjs-repo.jpg)

This package is meant for internationalization. It helps you define a JSON structure for different locales, and getting the right value back. For example, it could be used for the internationalization of a blog post.  

PrefJS can be used in NodeJS and in the browser, being compatible with all the frameworks, like: React, Angular, Vue, Ember, Next.js...

## Dependencies
This package depends on `printj`. Please install it also :)
```
$> npm install printj --save
```

## Installing the package
```
$> npm install prefjs --save
```

If you are using Typescript, you will see the types information that comes bundled with this package when you are coding :). Enjoy!

NOTE: This package weights only 2KB, and even less when gzipped

## Localizing a blog post

First, let's create the blog post data.

```js
const PrefJS = require('prefjs');

const blogPost = {
  id: '123',
  en: {
    title: 'My title',
    config: {
      showImage: true,
    },
  },
  es: {
    title: 'Mi título'
  },
};
```
As you see, we have a blog post for english and spanish with the post title. Also, for english which is the default language we have a nested configuration to show an image.  

Now, let's create a new object with the default locale set to __en__, and the current locale set to __es__ assuming we are seeing that blog post in spanish.

```js
const pref = new PrefJS({ defaultLocale: 'en', currentLocale: 'es' });
```

After this we are going to set the data that we will be querying with PrefJS for the blog post
```js
pref.setGlobalData(blogPost);
```

Now, in order to get the title for the current locale (es), we would do:
```js
const title = pref.get('title'); // Mi título
```

PrefJS is smart enough to know that it should bring the post title for the current locale you are in. But what happens when we try to access a property that does not exist in spanish? PrefJS will return the value from the default locale. Example:
```js
const showImage = pref.get('config.showImage'); // true
```

And, what if the property does not exist in the current locale, nor in the default one? PrefJS can return a fallback value. Let's look at an example with the *postURL*, which is not set in any of the locales. Example:
```js
const fallbackValue = `https://my-domain.com/?id=${blogPost.id}`
const postURL = pref.get('postURL', fallbackValue); // https://my-domain.com/?id=123
```

The previous code snippet will first search in the currentLocale if __postURL__ existed, or will try to find it in the defaultLocale, and as it does not exist, it will return the fallbackValue provided.

### Fallback language support

```js
const PrefJS = require('prefjs');

const blogPost = {
  id: '123',
  en: {
    title: 'My title',
    config: {
      showImage: true,
    },
  },
  es: {
    title: 'Mi título',
    description: 'Test 123',
  },
  es_CO: {
    title: 'Mi título en Colombia'
  }
};

const pref = new PrefJS({ defaultLocale: 'en', currentLocale: 'es_CO' });
pref.setGlobalData(blogPost);
```

The library also provides support for a language fallback to another. In the example, both `es` and `es_CO` were configured.

Explanation:
* `es_CO` will fallback to `es` if you try to do `pref.get('description')`. Please note that description is not set in `es_CO`.
* `es` must be configured for `es_CO` to fall back to it. If it is not, it will default to `defaultLocale`

### String formatting
Starting v1.0.0 you can use string formatting. For this we use the package `printj` (https://github.com/SheetJS/printj) so all its documentation applies.

For this feature, we created the function `getF`. Here is an example:

```ts
// Language data to use
const languageData = {
  en: {
    formattedString: 'This %s is formatted. Use it %s you need it'
  }
}

// Create the instance
const pref = new PrefJS({ defaultLocale: 'en', currentLocale: 'en' });

// Get a formatted string
const s = pref.getF('formattedString', 'Fallback', 'string', 'whenever, and however');
// s = This string is formatted. Use it whenever, and however you need it
```

As you can see, the second parameter is `"Fallback"`. This is a fallback string that can be used in the case in which the first argument given is not a value in the `languageData` you defined. This string is also formattable so you can expect the subsequent parameters to work fine. Example:

```ts
const s = pref.getF('i.dont.exist', 'Use this %s %s', 'string', 'as a fallback');
// s = Use this string as a fallback
```

Note: it also works with digits and it's possible to do other kinds of string manipulation. Please refer to the `printj` documentation for more.

## Working with translations set in object keys
In this use case, you would have for example an object with the following format:

```js
const object = {
  text: 'Hello',
  text_es: 'Hola',
  text_fr: 'Bonjour',
  text_pt: 'Oi',
};
```
Note: you can have as many *_language* keys as you would like in your object, the above is just an example.

Now, you could initialize your PrefJS instance as follows:
```js
const pref = new PrefJS({ defaultLocale: 'en' });
```

Let's get the text in english:
```js
pref.getFromObject(object, 'text'); // Hello
```

And, in other languages:
```js
// Portuguese
pref.setCurrentLocale('pt');
pref.getFromObject(object, 'text'); // Oi

// Spanish
pref.setCurrentLocale('es');
pref.getFromObject(object, 'text'); // Hola

// French
pref.setCurrentLocale('fr');
pref.getFromObject(object, 'text'); // Bonjour
```

You may combine different keys in the same object:
```js
const object2 = {
  description: 'I am a product',
  description_es: 'Yo soy un producto',
  title: 'T-shirt - XL',
  title_es: 'Camiseta - XL'
};

pref.getFromObject(object2, 'title'); // T-shirt - XL
pref.getFromObject(object2, 'description'); // I am a product

// And in spanish
pref.setCurrentLocale('es'); // change to spanish
pref.getFromObject(object2, 'title'); // Camiseta - XL
pref.getFromObject(object2, 'description'); // Yo soy un producto

// Get data in other locale although pref main
// locale is currently set to 'es'
pref.getFromObject(object2, 'description', { customLocale: 'en' }); // I am a product
```

If the value in a specific locale is not found, you will get the default language value. Example:
```js
const object3 = {
  description: 'I am a product',
  title: 'T-shirt - XL',
  title_es: 'Camiseta - XL'
};

pref.setCurrentLocale('es'); // change to spanish
pref.getFromObject(object, 'title'); // Camiseta - XL
pref.getFromObject(object, 'description'); // I am a product
```
As you can see, in this case the *description_es* key was not found in the object, so the value under the *description* key was returned.  

**IMPORTANT:** You can use much more than just strings. In fact, any value from javascript is valid, including Dates, numbers, boolean values, objects... give it a try!

## LICENSE
MIT.

## Credits
Juan Camilo Guarín Peñaranda  
Otherwise
Jamundí, Colombia  
2020