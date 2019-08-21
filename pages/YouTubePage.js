var loginLocators = require('../locators/YouTubePage_OR.json');
var CommonLibrary = require('../CommonUtils/CommonLibrary.js');

var searchBox_Obj = element(by.css(loginLocators.youTube_SearchBox_Css));
var searchButton_Obj = element(by.css(loginLocators.youTube_SearchButton_Css));
var stepinForum_Link_Obj = element(by.xpath(loginLocators.stepinForum_Link_Xpath));
var videos_TAB_Obj = element(by.xpath(loginLocators.videos_Tab_Xpath));
//var videos_Link_Obj = element(by.xpath(loginLocators.videos_Link_Css));

const shell = require('shelljs');
const child_process = require('child_process');

/*var userNameObj = element(by.id("email"));
var greetingObj = element(by.id("pass"));*/

exports.loadUrl = function (url) {
    browser.ignoreSynchronization = true;
    browser.get(url);
    CommonLibrary.saveScreenshot("YouTube");
};

exports.enterSearchText = function (searchText) {
    CommonLibrary.waitForElementToBeClickable(searchBox_Obj,"Search_Box",45000);
    CommonLibrary.enterText(searchBox_Obj,searchText,"YouTube_SearchBox");
};

exports.clickOnSearchButton = function () {
    CommonLibrary.waitForElementAndClick(searchButton_Obj,"Search_Button",30000);
};

exports.clickOnStepInForumLink = function () {
    CommonLibrary.waitForElementAndClick(stepinForum_Link_Obj,"StepInForum_Link",30000);
};

exports.clickOnVideosTAB= function () {
    CommonLibrary.waitForElementAndClick(videos_TAB_Obj,"Videos_TAB",30000);
};

exports.apiCall= function (shellScriptPath) {
    shell.exec(shellScriptPath);
};

exports.searchTheVideo  = function(){
    element.all(by.css(loginLocators.videos_Link_Css)).each(function(element, index) {
        // Will print 0 First, 1 Second, 2 Third.
        element.getText().then(function (text) {
            console.log(index, text);
        });
    });


}
