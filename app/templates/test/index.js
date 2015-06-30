global.document = require("jsdom").jsdom("");
global.window = document.parentWindow;
global.navigator = window.navigator;

var assert = require("assert");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var <%= classname %> = require("../<%= slug %>");

describe("<%= classname %>", function () {
  describe("basic", function () {
    it("should render component", function () {
      var <%= camelcase %> = TestUtils.renderIntoDocument(React.createElement(<%= classname %>));

      assert.ok(React.findDOMNode(<%= camelcase %>), "should have a DOM node");
    });
  });
});
