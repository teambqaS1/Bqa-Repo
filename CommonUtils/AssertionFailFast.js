var self = this;
var _lodash = require('lodash');
var path = require('path');
var CommonLibrary = require(path.resolve(__dirname,'./CommonLibrary.js'));
//var _lodash2 = self.interopRequireDefault(_lodash);

var refs;
var specs = [];
var suites = [];


exports.interopRequireDefault = function(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
exports.getSpecReferences = function () {
    // Use specFilter to gather references to all specs.
    jasmine.getEnv().specFilter = function (spec) {
        specs.push(spec);
        return true;
    };

    // Wrap jasmine's describe function to gather references to all suites.
    jasmine.getEnv().describe = this.interopRequireDefault(_lodash)['default'].wrap(jasmine.getEnv().describe, function (describe) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var suite = describe.apply(null, args);
        suites.push(suite);
        return suite;
    });

    return {
        specs: specs,
        suites: suites
    };
}

exports.init = function () {
    refs = self.getSpecReferences();

    return {
        specDone: function specDone(result) {
            for(var i = 0; i < result.failedExpectations.length; i++) {
                console.log("Failure: " + result.failedExpectations[i].message);
                console.log(result.failedExpectations[i].stack);

                if(result.failedExpectations[i].message.includes("Failed: unknown error")){
                    CommonLibrary.saveScreenshot("UnknownWebDriverError");
                    //isHardAssert=true;
                }else if(result.failedExpectations[i].message.includes("Wait timed out")){
                    CommonLibrary.saveScreenshot("TimeOutError_"+CommonLibrary.getCurrentDateTimeStamp());
                }else if(result.failedExpectations[i].message.includes("script timeout")){
                    CommonLibrary.saveScreenshot("AngularIssue _"+CommonLibrary.getCurrentDateTimeStamp());
                    //isHardAssert=true;
                }else if(result.failedExpectations[i].message.includes("invalid session id")){
                    CommonLibrary.saveScreenshot("AngularIssue _"+CommonLibrary.getCurrentDateTimeStamp());
                    //isHardAssert=true;
                }
            }

            /*if (isHardAssert) {
                self.disableSpecs(refs);
            }*/
        }
    };
}

exports.disableSpecs = function() {
    if (!refs) {
        throw new Error('AssertFailFast: Must call init() before calling disableSpecs()!');
    }

    refs.specs.forEach(function (spec) {
        return spec.disable();
    });

    refs.suites.forEach(function (suite) {
        suite.beforeFns = [];
        suite.afterFns = [];
        suite.beforeAllFns = [];
        suite.afterAllFns = [];
    });
}

