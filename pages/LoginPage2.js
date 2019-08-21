var loginLocators = require('../locators/YouTubePage_OR.json');
var CommonLibrary = require('../CommonUtils/CommonLibrary.js');

exports.loadUrl = function (url) {
    /*browser.ignoreSynchronization = true;
    browser.get(url);*/

    browserinstance.ignoreSynchronization = true;
    browserinstance.get(url);
};
exports.loginToApplication = function (username, password) {
    CommonLibrary.enterText(element(by.id(loginLocators.userName_TxtBox_Id)),username,"UserName");
    CommonLibrary.enterText(element(by.id(loginLocators.password_TxtBox_Id)),password,"password");
};