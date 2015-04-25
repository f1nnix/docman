###*
# Containter for all common Markdown tags generators
###

Markdown = generator:
  h1    : (text) -> "# #{text}"
  h2    : (text) -> "## #{text}"
  h3    : (text) -> "### #{text}"
  h4    : (text) -> "#### #{text}"
  h5    : (text) -> "##### #{text}"
  h6    : (text) -> "###### #{text}"
  li    : (text) -> "* #{text}"
  a     : (text, url) -> "[#{text}](#{url})"
  strong: (text, url) -> "**#{text}**"

module.exports = Markdown.generator
