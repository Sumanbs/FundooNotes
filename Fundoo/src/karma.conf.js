module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: [
      "jasmine",
      "@angular-devkit/build-angular",
      "karma-typescript"
    ],
    // files: [
    // { pattern: "src/*.ts" }
    // ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-teamcity-reporter"),
      require("karma-typescript")
      // require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      reports: {
        lcovonly: {
          directory: "coverage",
          filename: "lcov.info",
          subdirectory: "lcov"
        }
      }
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      reports: ["html", "lcov"],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 90,
        functions: 90
      }
    },
    reporters: [
      "progress",
      "kjhtml",
      "coverage-istanbul",
      "dots",
      "karma-typescript"
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeNoGpu"],
    customLaunchers: {
      ChromeNoGpu: {
        base: "Chrome",
        flags: ["--disable-gpu"]
      }
    },
    singleRun: false
  });
};
