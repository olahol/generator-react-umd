var generators = require("yeoman-generator");
var s_ = require("underscore.string");

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.appslug = s_.slugify(this.appname);
    this.appclass = s_.classify(this.appname);
    this.appcamel = s_.camelize(this.appname);
  },

  _cp: function (file, out) {
    out = out || file;

    var variables = {
      appname: this.appname,
      slug: this.appslug,
      username: this.username,
      classname: this.appclass,
      camelcase: this.appcamel,
      realname: this.user.git.name(),
      email: this.user.git.email()
    };

    this.fs.copyTpl(this.templatePath(file), this.destinationPath(out), variables);
  },

  initializingUsername: function () {
    var done = this.async();

    this.user.github.username(function (err, username) {
      if (err) {
        this.username = "GITHUBUSERNAME";
        return done();
      }

      this.username = username;
      done();
    }.bind(this));
  },

  writingBase: function () {
    this._cp("gitignore", ".gitignore");
    this._cp("npmignore", ".npmignore");
    this._cp("travis.yml", ".travis.yml");
    this._cp("package.json");
    this._cp("README.md");
    this._cp("src/index.js");
    this._cp("test/index.js");
    this._cp("dev.js");
  },

  installingDeps: function () {
    this.npmInstall(["react"], {"save": true});
  },

  installingDev: function () {
    this.npmInstall(["babel"], {"saveDev": true});
    this.npmInstall(["mocha"], {"saveDev": true});
    this.npmInstall(["jsdom@3.x.x"], {"saveDev": true});
    this.npmInstall(["babelify"], {"saveDev": true});
    this.npmInstall(["browserify"], {"saveDev": true});
    this.npmInstall(["beefy"], {"saveDev": true});
  },

  end: function () {
    this.log("run tests: npm test");
    this.log("development server: npm start");
  }
});
