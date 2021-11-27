# eleventy-plugin-emphasis

> **An [Eleventy](https://11ty.dev) plugin for your Markdown syntax which puts you in control of your emphasis markup.**

## What is this plugin for?

Markdown provides several syntaxes for emphasizing your text:

* `*Single asterisks*` get converted into `<em>` tags
* `**Double asterisks**` get converted into `<strong>` tags
* `_Single underscores_` get converted into `<em>` tags
* `__Double underscores__` get converted into `<strong>` tags

This syntax is redundant, and [sometimes you really do want to use `<b>` and `<i>` tags](https://www.w3.org/International/questions/qa-b-and-i-tags) instead of `<strong>` and `<em>`. Alternatively, maybe you'd like to use some of this syntax for other tags such as `<mark>`!

**This plugin lets you configure which tag your Eleventy project's `markdown-it` Markdown parser uses for text surrounded by single asterisks, double asterisks, single underscores, and double underscores.**

## Setup

In your terminal, navigate into your Eleventy project and run the following:

```bash
npm install eleventy-plugin-emphasis
```

Then, add this plugin to your Eleventy config file (`.eleventy.js`):

```js
const emphasisOverrides = require('eleventy-plugin-emphasis');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(emphasisOverrides, {
		// See Options API section below for full configuration options!
		'_': 'i',
		'__': 'b'
	});

	// return {...};
}
```

### I'm managing my own `markdown-it` instance!

If you're managing your own instance of `markdown-it` to provide other customizations to your Markdown parsing, you can supply that instance to `eleventy-plugin-emphasis` as the `md` property in your options object:

```js
const markdownIt = require('markdown-it');
const emphasisOverrides = require('eleventy-plugin-emphasis');

module.exports = function (eleventyConfig) {
	const markdown = markdownIt({html: true});

	eleventyConfig.addPlugin(emphasisOverrides, {
		'md': markdown,
		'_': 'i',
		'__': 'b'
	});

	eleventyConfig.setLibrary('md', markdown);

	// return {...};
}
```

## Options API

All options are completely optional.

| Option |   Default  | Type                                 |                                                                                               Purpose                                                                                              |
|:------:|:----------:|--------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `'md'` |            | `Object` (instance of `markdown-it`) | Pass your own instance of markdown-it to configure. If not provided, the plugin will create its own instance using the [same defaults as Eleventy](https://www.11ty.dev/docs/languages/markdown/). |
| `'*'`  | `'em'`     | `String` (any valid HTML tag)        | Tag to use when text is surrounded in a single asterisk like `*this*`                                                                                                                              |
| `'**'` | `'strong'` | `String` (any valid HTML tag)        | Tag to use when text is surrounded in double asterisks like `**this**`                                                                                                                             |
| `'_'`  | `'em'`     | `String` (any valid HTML tag)        | Tag to use when text is surrounded in a single underscore like `_this_`                                                                                                                            |
| `'__'` | `'strong'` | `String` (any valid HTML tag)        | Tag to use when text is surrounded in double underscores like `__this__`                                                                                                                           |