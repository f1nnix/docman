
/**
 * Containter for all common Markdown tags generators
 */

(function() {
  var Markdown;

  Markdown = {
    generator: {
      h1: function(text) {
        return "# " + text;
      },
      h2: function(text) {
        return "## " + text;
      },
      h3: function(text) {
        return "### " + text;
      },
      h4: function(text) {
        return "#### " + text;
      },
      h5: function(text) {
        return "##### " + text;
      },
      h6: function(text) {
        return "###### " + text;
      },
      li: function(text) {
        return "* " + text;
      },
      a: function(text, url) {
        return "[" + text + "](" + url + ")";
      },
      strong: function(text, url) {
        return "**" + text + "**";
      }
    }
  };

  module.exports = Markdown.generator;

}).call(this);
