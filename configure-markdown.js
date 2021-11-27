/**
 * Recursively overrides configurations for `<em>` and `<strong>` syntaxes for tokens or their children
 * @param {object} token - MarkdownIt token
 * @param {EmphasisOptions} emphasisOptions - configuration for asterisk- and underscore-based emphases
 */
function replaceEmphasisMarkers(token, emphasisOptions) {
	// Ensure replacement is recursive
	if (token.children && token.children.length) {
		token.children.forEach(child => replaceEmphasisMarkers(child, emphasisOptions));
	} else {
		// Replace double underscores
		if (emphasisOptions['__'] && token.type === 'strong_open' && token.markup === '__') {
			token.tag = emphasisOptions['__'];
		}

		if (emphasisOptions['__'] && token.type === 'strong_close' && token.markup === '__') {
			token.tag = emphasisOptions['__'];
		}

		// Replace single underscores
		if (emphasisOptions['_'] && token.type === 'em_open' && token.markup === '_') {
			token.tag = emphasisOptions['_'];
		}

		if (emphasisOptions['_'] && token.type === 'em_close' && token.markup === '_') {
			token.tag = emphasisOptions['_'];
		}

		// Replace double asterisks
		if (emphasisOptions['**'] && token.type === 'strong_open' && token.markup === '**') {
			token.tag = emphasisOptions['**'];
		}

		if (emphasisOptions['**'] && token.type === 'strong_close' && token.markup === '**') {
			token.tag = emphasisOptions['**'];
		}

		// Replace single asterisks
		if (emphasisOptions['*'] && token.type === 'em_open' && token.markup === '*') {
			token.tag = emphasisOptions['*'];
		}

		if (emphasisOptions['*'] && token.type === 'em_close' && token.markup === '*') {
			token.tag = emphasisOptions['*'];
		}
	}
}

/**
 * Adds a rule to the MarkdownIt instance which will iterate over each token and replace emphasis tags as needed
 * @param {Object} markdown - instance of MarkdownIt
 * @param {EmphasisOptions} emphasisOptions - configuration for asterisk- and underscore-based emphases
 */
function configureMarkdown(markdown, emphasisOptions) {
	markdown.core.ruler.push(
		'distinguish_emphases',
		function distinguishEmphases (state) {
			for (let i = 0; i < state.tokens.length; i++) {
				let currentToken = state.tokens[i];
				replaceEmphasisMarkers(currentToken, emphasisOptions);
			}
		}
	)
}

module.exports = configureMarkdown;

/**
 * @typedef {Object} EmphasisOptions
 * @property {String} [_] HTML tag to use in place of `<em>` for single-underscore emphases
 * @property {String} [__] HTML tag to use in place of `<strong>` for double-underscore emphases
 * @property {String} [`\u002a`] HTML tag to use in place of `<em>` for single-asterisk emphases
 * @property {String} [`\u002a\u002a`] HTML tag to use in place of `<strong>` for double-asterisk emphases
 */