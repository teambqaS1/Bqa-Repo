'use strict';
var fs = require('fs');
var path = require('path');
var os = require('os');
var fsextra = require("fs-extra");
var downloadsPath = path.resolve(__dirname, '\dataDownload');
var CommonLibrary = require(path.resolve(__dirname,'CommonUtils/CommonLibrary.js'));
var source = path.resolve(__dirname, 'utility/history/')
var destination = path.resolve(__dirname, 'allure-results/history');
var failFast = require(path.resolve(__dirname,'CommonUtils/AssertionFailFast.js'));
var testDataUtility = require(path.resolve(__dirname,'CommonUtils/testDataUtility.js'));
console.log("__dirname : "+__dirname);
exports.config = {

    framework: 'jasmine2',
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    suites: {
        specs: [
            'tests/e2e/StepIn_YouTube_Test.js'
        ]
    },
    params: {
        platform : 'aws',
        environment : 'testEnv'
    },

    /*'directConnect': true,
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {'browserName': 'chrome',
            'chromeOptions': {
                useAutomationExtension: false,
                // Get rid of --ignore-certificate yellow warning
                args: ['--no-sandbox', '--test-type=browser', '--disable-extensions', '--disable-plugins'],

            }
        },
        {'browserName': 'firefox',
            'moz:firefoxOptions': {
                useAutomationExtension: false,
                'args': ['--safe-mode']
            }
        }
    ],*/

    capabilities: {
        shardTestFiles: true,
        maxInstances: 1,
        'directConnect': true,
        'browserName': 'chrome',
        'platform': 'ANY',
        'version': 'ANY',

        'chromeOptions': {
            useAutomationExtension: false,
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser', '--disable-extensions', '--disable-plugins'],
        }
    },

    useAllAngular2AppRoots: true,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000,
        stopSpecOnExpectationFailure: true,
        realtimeFailure: true
    },

    reporters: ['allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: false
        }
    },



    onPrepare: function () {
        testDataUtility.loadEnvTestData();
        CommonLibrary.clearAllureReports();

        console.log("***************************************");
        console.log("******* UI AUTOMATION********");
        console.log("***************************************");


        global.env = require('./environment.json');
        global.browserinstance = browser;
        browser.driver.manage().timeouts().implicitlyWait(1000);
        browser.manage().window().maximize();
        global.presenceOf = protractor.ExpectedConditions.presenceOf;
        global.EC = protractor.ExpectedConditions;
        //global.screenShotPath = "testReports/Screenshots/";
        //global.downloadsPath = downloadsPath;

        /*fsextra.emptyDir(screenShotPath, function (err) {
            if (err) return console.error(err);

            console.log('success!');
        });*/

        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        global.isAngularSite = function (flag) {
            browserinstance.ignoreSynchronization = !flag;
        };

        jasmine.getEnv().addReporter(failFast.init());

    },


    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            var ostype = caps.get('platform');
            var osversion = os.release();
            var osplatform = os.platform();


            fs.writeFileSync('allure-results/environment.properties', "BrowserVersion:" + browserVersion + "\n" +
                "Browser:" + browserName + "\n" +
                "OSType:" + ostype + "\n" +
                "OSVersion:" + osversion + "\n" +
                "OS:" + osplatform);
            console.log("the source for results==========" + source)
            console.log("the destination for results==========" + destination)
            /*if (fs.existsSync(source)) {
                fsextra.copy(source, destination)
                console.log("history is copied from utility to allure results")

            } else {
                console.log('history folder in allure report does not exist')
            }*/

            CommonLibrary.generateAllureReport();
        });
    }
}
