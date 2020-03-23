# `prefjs`

![](./repo/prefjs-repo.jpg)

This package is meant for internationalization. It helps you define a JSON structure for different locales, and getting the right value back. For example, it could be used for the internationalization of a blog post.  

PrefJS can be used in NodeJS and in the browser, being compatible with all the frameworks, like: React, Angular, Vue, Ember, Next.js...

## Installing the package
```
$> npm install prefjs --save
```

If you are using Typescript, you will see the types information that comes bundled with this package when you are coding :). Enjoy!

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

## LICENSE
MIT.

## Credits
Juan Camilo Guarín Peñaranda  
Jamundí, Colombia  
2020