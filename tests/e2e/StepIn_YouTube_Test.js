'use strict';
const path = require('path');
const fs = require('fs');
const upath = require('upath');


var youtubePage = require('../../pages/YouTubePage.js');
var CommonLibrary = require('../../CommonUtils/CommonLibrary.js');
var testData = require('../../testdata/TestData.json');
var txtFilePath = path.resolve(__dirname, "hello.txt");
var shellScriptPath = path.resolve(__dirname, "../../api/FirstCall.sh");
const shell = require('shelljs');
var searchString;
describe('StepIn_YouTube', function () {

    it('00_Launch Youtube', function () {
        youtubePage.apiCall(shellScriptPath);
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
           searchString = fs.readFileSync(txtFilePath, 'utf8');
           console.log(searchString);
    });

    it('07_search and hit the video link', function () {

        youtubePage.searchVideo(searchString);
        //youtubePage.clickOnFirstVideo();
    });

    it('08_Click on settings button', function () {
        youtubePage.clickOnSettingsButton();
    });

    it('09_Click on Quality', function () {
        youtubePage.clickOnQuality()
    });
+
    it('10_Click on Quality', function () {
        youtubePage.clickOn360P();
    });

    it('11_ Quality check', function () {
        youtubePage.assertVideoQuality();
    });

    it('12_ upcoming videos', function () {
        youtubePage.upComingVideos();
    });


});
