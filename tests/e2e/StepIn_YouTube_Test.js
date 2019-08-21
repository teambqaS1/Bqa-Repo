'use strict';
const path = require('path');
const fs = require('fs');
const upath = require('upath');


var youtubePage = require('../../pages/YouTubePage.js');
var CommonLibrary = require('../../CommonUtils/CommonLibrary.js');
var testData = require('../../testdata/TestData.json');
var txtFilePath = path.resolve(__dirname, "../../api/hello.txt");
/*var shellScriptPath = path.resolve(__dirname, "../../api/FirstCall.sh");
const shell = require('shelljs');*/
describe('StepIn_YouTube', function () {

    it('00_Launch Youtube', function () {
        youtubePage.loadUrl(env.appURL);
     });

    it('02_Search for step-inforum', function () {
        youtubePage.enterSearchText(testData.searchString);
    });

    it('03_click on search button', function () {
        youtubePage.clickOnSearchButton();
    });

    it('04_click on step in forum link', function () {
        youtubePage.clickOnStepInForumLink();
    });

    it('05_click on videos TAB', function () {
        youtubePage.clickOnVideosTAB();
    });

    it('06_read text file', function () {
        browserinstance.sleep(10000);
    });

    it('07_search and hit the video link', function () {
        youtubePage.searchTheVideo();
    });

    /*it('08_search and hit the video link', function () {
        youtubePage.searchTheVideo();
    });*/
});
