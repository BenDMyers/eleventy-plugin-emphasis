const markdownIt = require('markdown-it');
const configureMarkdown = require('./configure-markdown');

/**
 * Configures the Eleventy project's Markdown instance to provide custom tags for asterisk- and underscore-based emphases
 * @param {Object} eleventyConfig - Eleventy configuration object, passed automatically by Eleventy
 * @param {PluginOptions} options - plugin options object
 */
module.exports = function (eleventyConfig, options = {}) {
	const {md, ...emphasisOptions} = options;
	const markdown = md || markdownIt({html: true});
	configureMarkdown(markdown, emphasisOptions);

	// If devs supplied their own Markdown configuration, then they get to handle setting the library
	if (!md) {
		eleventyConfig.setLibrary('md', markdown);
	}
};

/**
 * @typedef {Object} PluginOptions
 * @property {Object} [md] instance of MarkdownIt (if not supplied, the plugin will create its own instance)
 * @property {String} [_] HTML tag to use in place of `<em>` for single-underscore emphases
 * @property {String} [__] HTML tag to use in place of `<strong>` for double-underscore emphases
 * @property {String} [`\u002a`] HTML tag to use in place of `<em>` for single-asterisk emphases
 * @property {String} [`\u002a\u002a`] HTML tag to use in place of `<strong>` for double-asterisk emphases
 */