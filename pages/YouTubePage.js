var loginLocators = require('../locators/YouTubePage_OR.json');
var CommonLibrary = require('../CommonUtils/CommonLibrary.js');

var searchBox_Obj = element(by.css(loginLocators.youTube_SearchBox_Css));
var searchButton_Obj = element(by.css(loginLocators.youTube_SearchButton_Css));
var stepinForum_Link_Obj = element(by.xpath(loginLocators.stepinForum_Link_Xpath));
var videos_TAB_Obj = element(by.xpath(loginLocators.videos_Tab_Xpath));
var settings_Button_Obj = element(by.xpath(loginLocators.settings_Button_Xpath));
var quality_Div_Obj = element(by.xpath(loginLocators.quality_Div_Xpath));
var firstVideo = element(by.xpath(loginLocators.firstVideo));
var playArea = element(by.css(loginLocators.youTubeVideo_PlayArea_Css));
//var upcomingVideos_Obj = element(by.xpath(loginLocators.upComingVideos_Xpath));
var self=this;

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

exports.clickOnSettingsButton= function () {
   // browserinstance.sleep(5000);
    CommonLibrary.waitForElementAndClick(playArea,"PlayArea",30000);
    //browserinstance.actions().mouseMove(playArea).perform();
    CommonLibrary.waitForElementAndClick(settings_Button_Obj,"Settings_Button",30000);
};

exports.clickOnQuality= function () {
    CommonLibrary.waitForElementAndClick(quality_Div_Obj,"Quality",30000);
    browserinstance.sleep(1000);
    /*browserinstance.getPageSource().then(function (res) {
        console.log('Page source code is-' + res);
    });*/
    /*browserinstance.actions().sendKeys(protractor.Key.ARROW_UP).perform();
    browserinstance.actions().sendKeys(protractor.Key.ARROW_UP).perform();
    browserinstance.actions().sendKeys(protractor.Key.ARROW_UP).perform();*/
//div[@class='ytp-panel ytp-quality-menu']//div[@class='ytp-menuitem-label']//span[.='360p']
   // browserinstance.actions().keyPress(protractor.Key.ENTER).perform();
};

exports.clickOn360P= function () {
    CommonLibrary.waitForElementAndClick(element(by.xpath("//div[@class='ytp-panel ytp-quality-menu']//div[@class='ytp-menuitem-label']//span[.='360p']")),"360P",30000);
};

exports.clickOnFirstVideo= function () {
    CommonLibrary.waitForElementAndClick(firstVideo,"FirstVideo",30000);
};

exports.assertVideoQuality= function () {
    browserinstance.sleep(10000);
    browserinstance.actions().mouseMove(playArea).perform();
    this.clickOnSettingsButton();
    element(by.xpath("//div[@class='ytp-menuitem-label' and text()='Quality']/following-sibling::div//span")).getText().then(function (value) {
       if(value === '360p'){
           CommonLibrary.consoleLogWithScreenShot("Video quality selected as 360p","360p");
       } else{
           CommonLibrary.failReport("Required video quality : 360p, but selected video quality is : "+value);
       }
    });
};

exports.clickOnSearchedVideo  = function(searchString){
    console.log("searching for video")
    var webElementObj;
    /*return element.all(by.css(loginLocators.videos_Link_Css)).each(function(element, index) {
        webElementObj = element;
        return element.getText().then(function (text) {
            console.log(index, text);

            if(text === searchString){
                CommonLibrary.waitForElementAndClick(element,"Video",30000);
                browserinstance.sleep(10000);
                return true;
            }
        });
    }).then(function () {
        console.log("in then condition")
        /!*browserinstance.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
            browserinstance.sleep(3000);
            return true;
        })*!/

        browserinstance.controlFlow().execute(function() {
            browserinstance.executeScript('arguments[0].scrollIntoView(true)', webElementObj.getWebElement());
            browserinstance.sleep(3000);
            return true;
        });
    });*/

    var videosElms = element.all(by.css(loginLocators.videos_Link_Css));
    var totalVideosCount,flag= false;
    return element.all(by.css(loginLocators.videos_Link_Css)).count().then(function (count) {
        totalVideosCount = count;
        console.log("videosElms.length"+totalVideosCount);

        for(let i=0 ; i < totalVideosCount ; i++){
            webElementObj = videosElms.get(i);
            videosElms.get(i).getText().then(function (value) {
                console.log(value)
                videoLink = value;

                if(videoLink === searchString){
                    CommonLibrary.waitForElementAndClick(videosElms.get(i),searchString,30000);
                   // browserinstance.sleep(10000);
                    flag = true;
                }
            });
        };
    }).then(function () {
        if(flag)
            return true;
        else{
            browserinstance.controlFlow().execute(function() {
                browserinstance.executeScript('arguments[0].scrollIntoView(true)', webElementObj.getWebElement());
                browserinstance.sleep(3000);
                return false;
            });
        }
    });

    var videoLink;

}

exports.searchVideo = function(searchString){
    browserinstance.sleep(7000);
    browserinstance.wait(result => {
        return self.clickOnSearchedVideo(searchString);
},300000);
}

exports.upComingVideos = function(){
    var videosList=[];
    element.all(by.xpath(loginLocators.upComingVideos_Xpath)).each(function(element,index){
        element.getText().then(function (value) {
            videosList.push(value);
        });
    }).then(function () {
        console.log(videosList);
        var myJSON = JSON.stringify(videosList);
        console.log(myJSON);
    })
}
