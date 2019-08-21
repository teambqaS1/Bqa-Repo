'use strict';
const fs = require('fs');const child_process = require('child_process');
const Finder = require('fs-finder');
const zipper = require('zip-local');
const path = require('path');
const upath = require('upath');

const sleep = require('system-sleep');
var self = this;

exports.readFile = function(filePath) {
    var contents = fs.readFileSync(filePath, 'utf8');
    console.log(contents);
}


exports.waitForElementToBePresent = function (object, objectName, timeTowait) {
    return browserinstance.wait(global.EC.presenceOf(object), timeTowait).then(function () {
        console.log(objectName + " : successfully showing on application after some action");
        return true;
    }, function (error) {
        self.failReport("Error while checking the presence of : " + objectName + ", Error : " + error, objectName + "NotPresent");
        return false;
    });
};

exports.waitForElementToBeClickable = function (object, objectName, timeTowait) {
    return browserinstance.wait(global.EC.elementToBeClickable(object), timeTowait).then(function () {
        console.log(objectName + " : successfully showing on application after some action");
        return true;
    }, function (error) {
        self.failReport("Error while checking the clickable property of : " + objectName + ", ClickablePropertyError_" + error);
        return false;
    });
};

exports.replaceValueInJsonFile = function (searchKey, inputText, filePath) {
    var fileData = (fs.readFileSync(filePath)).toString();
    var jsonObj = JSON.parse(fileData);
    for (var key in jsonObj) {
        //console.log("key is " + key)
        if (key == searchKey) {
            console.log("Searched String key " + jsonObj[key]);
            console.log("key is " + key)
            jsonObj[key] = inputText;
            console.log("Replaced String key " + jsonObj[key]);
            var json = JSON.stringify(jsonObj);
            fs.writeFileSync(filePath, json, 'utf8');
        }
    }
};

exports.createFile = function (fileName) {
    fs.openSync(fileName, 'w');
};

exports.writeAppNameToFile = function (fileName, dataToWrite) {
    fs.writeFileSync(fileName, dataToWrite);
};

exports.readAppnameFromFile = function (fileName) {
    return fs.readFileSync(fileName, 'utf8');
};

exports.deleteFile = function (fileName) {
    fs.unlinkSync(fileName);
};

exports.funclick = function (elements, rowIndex, browser) {
    browserinstance.element.all(by.css(`${elements}`)).get(`${rowIndex}`).all(by.tagName('button')).get(0).click();
    browserinstance.sleep(9000);
};

exports.waitForElements = function (xpath, browser) {
    var elm = browserinstance.element.all(by.xpath(`${xpath}`));
    browserinstance.wait(EC.presenceOf(elm), 60000);
};

exports.waitForElement = function (xpath) {
    let elm = browserinstance.element(by.xpath(`${xpath}`));
    browserinstance.wait(EC.presenceOf(elm), 60000);
};

exports.browserwait = function () {
    browserinstance.driver.wait(function () {
        return browserinstance.driver.executeScript('return document.readyState').then(function (readyState) {
            return readyState === 'complete';
        });
    });
};

exports.checkIfFileExists = function (input) {
    browserinstance.driver.wait(function () {
        var files = Finder.from(path.resolve(__dirname, '../dataDownload')).findFiles(input);
        return files.length === 1;
    }, 300000).then(function () {
        console.log("File Downloaded");
    }, function (error) {
        self.failReport("Either download files task failed or check for any other issue", "downloadFailedCantCaptureSnapshot");
    });
};


exports.deleteFileAfterTest = function () {
    var files = Finder.from(path.resolve(__dirname, '../dataDownload')).findFiles();
    for (file of files) {
        fs.unlink(file, function (error) {
            if (error) {
                console.log(error + " " + file);
                console.log("File or files not found to be deleted");
            }
            else {
                console.log("File" + file)
                console.log('Deleted!!');
            }
        });
    }
};



exports.deleteAllFilesFromFolder = function (folderPath) {
    // var files=this.readDirectorySync(folderPath);
    // files.forEach( function (file){
    //     console.log( file );
    //     console.log("Going to delete an existing file");
    //     var deleteFilePath = folderPath+"/"+file;
    //     fs.unlink(deleteFilePath, function(err) {
    //         if (err) {
    //            // return console.error(err);
    //                  deleteAllFilesFromFolder(deleteFilePath);
    //         }
    //         console.log(file+" -File deleted successfully!");
    //     });
    // });
    var path = folderPath;
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                if (fs.existsSync(curPath)) {
                    fs.readdirSync(curPath).forEach(function (file, index) {
                        var curPath1 = curPath + "/" + file;
                        if (fs.lstatSync(curPath1).isDirectory()) { // recurse

                        } else { // delete file
                            fs.unlinkSync(curPath1);
                        }
                    });
                    fs.rmdirSync(curPath);
                }
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        //fs.rmdirSync(path);
    }
};

// exports.deleteAllFilesFromFolder=function(path){
//     if( fs.existsSync(path) ) {
//         fs.readdirSync(path).forEach(function(file,index){
//           var curPath = path + "/" + file;
//           if(fs.lstatSync(curPath).isDirectory()) { // recurse
//             deleteAllFilesFromFolder(curPath);
//           } else { // delete file
//             fs.unlinkSync(curPath);
//           }
//         });
//         fs.rmdirSync(path);
//     }
// }

exports.unzipFileSync = function (zipfilePath, unzipPath) {
    console.log("Extracting files from path: " + zipfilePath);
    zipper.sync.unzip(zipfilePath).save(unzipPath);
    console.log("File extracted successfully to path :" + unzipPath);
};

exports.readDirectorySync = function (folderPath) {
    console.log("Reading files from folder: " + folderPath);
    var files = fs.readdirSync(folderPath);
    console.log("Files read:" + files);
    return files;
};

exports.getToken = function () {
    var defer = protractor.promise.defer();
    var createPtnt = function () {
        request({
            url: env.tectoken.tokenurl,
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            auth: {
                'user': env.tectoken.username,
                'pass': env.tectoken.password
            },
        }, function (error, response, body) {
            defer.fulfill({ response: response, body: body, error: error });
        });
        return defer.promise;
    };

    var getResponse = browser.controlFlow().execute(createPtnt).then(function (response) {
        if (response.error) {
            console.log('Error while creating token, , Error:' + response.error);
        }
        else if (response.response.statusCode === 200) {
            console.log('Created token successfully with status code 200');
            console.log(response.body);
        }
        else {
            console.log('Error while creating token: , HTTP Status Code:' + response.statusCode);
        }
        // console.log('get response : ',response);
        return response;
    });
    return getResponse;
};

exports.genearateAppName = function (appPrefix) {

    var fileToWritten = '../data/testdata/AppData.json';
    var absolutepath = path.resolve(__dirname, fileToWritten);
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //var appname = appPrefix + "" + day + "" + month + "" + year + "" + hour + "" + minute + "" + second;
    if (month < 9) {
        month = "0" + month;
    }
    if (day < 9) {
        day = "0" + day;
    }
    var appname = appPrefix + "" + day + "" + month + "" + hour + "" + minute + "" + second;
    console.log("Generated AppName:" + appname);
    this.replaceValueInJsonFile("appName", appname, absolutepath);
};
exports.genearateRuleName = function (appPrefix) {

    var fileToWritten = path.resolve(__dirname, '../data/uts/core/CoreData.json');
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 9) {
        month = "0" + month;
    }
    if (day < 9) {
        day = "0" + day;
    }
    var appname = appPrefix + "t" + "" + day + "" + month + "" + hour + "" + minute + "" + second;
    console.log("Generated AppName:" + appname);
    this.replaceValueInJsonFile("RuleName", appname, fileToWritten);
    console.log("Writing to File:" + appname);
    this.replaceValueInJsonFile("MetricName", appname, fileToWritten);
    console.log("Writing to File:" + appname);
    this.replaceValueInJsonFile("UnitType", appname, fileToWritten);
    console.log("Writing to File:" + appname);
    };
exports.createFolder = function (folderpath) {
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
    }
}

exports.newbrowser = function () {
    browserinstance = browser.forkNewDriverInstance();
    browserinstance.manage().deleteAllCookies();
    //browserinstance = browser;
    //browser = browserinstance;
    return browserinstance;
};

exports.resetbrowser = function () {
    //browserinstance = browser;
    browser = browserinstance;
    return browserinstance;
};

exports.swtichTobrowser = function (browserInst) {
    browserinstance = browserInst;
    return browserinstance;

};
exports.swtichToTab = function (TabNo) {

    browserinstance.getAllWindowHandles().then(function (handles) {
        browserinstance.switchTo().window(handles[TabNo]);
    });
};

exports.closebrowser = function () {
    browserinstance.close();
}

exports.backbrowser = function () {
    browserinstance.navigate().back();

}

exports.openbrowser = function () {
    //browserinstance = browser.forkNewDriverInstance();
    browserinstance = browser;
    return browserinstance;
};




exports.getLaunchedApplicationSession = function () {


    browserinstance.sleep(10000);
    var session = browserinstance.manage().getCookie('SESSION');
    //browserinstance.sleep(5000);//.then(function(cookie) {
    /*console.log('launch app session cookie test : ', cookie.value);
    return cookie.value;
  })*/
    return session;
};
exports.validateText = function (object, objectName, ExpectedText) {
    return object.getText().then(function (ActualText) {
        expect(ActualText).toContain(ExpectedText);
    }, function (error) {
        fail("Error while checking the visibility of : " + objectName + ", Error : " + error);
        return false;
    });
};


exports.generateRandomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.isElementDisplayed = function (object, objectName) {

    return object.isDisplayed().then(function (isPresent) {
        return isPresent;
    });
};
exports.getAttributeValue = function (object, attribute, objectName, isSnapRequired) {
    return this.isElementDisplayed(object).then(function (present) {
        if (present) {
            return object.getAttribute(attribute).then(function (text) {
                self.consoleLogWithScreenShot(objectName + " : attribute - " + attribute + " is " + text, objectName + "_Exists",isSnapRequired);
                return text;
            }, function () {
                self.consoleLogWithScreenShot("Issue while getting value of attribute :" + attribute + " of " + objectName, "ErrorFindingAttributeof" + objectName);
                return "";
            });
        }
        else {
            self.consoleLogWithScreenShot("Unable to find the : " + objectName + ", to perform the get attribute action", "ErrorwhileFinding_" + objectName);
            console.log("Unable to find the : " + objectName + ", to perform the get attribute action");
            return "";
        }
    }, function (error) {
        self.consoleLogWithScreenShot("Unable to find the : " + objectName + ", to perform the get attribute action : " + error, "ErrorwhileFinding_" + objectName);
        return "";
    });
};

exports.enterText = function (object, valueToEnter, objectName, isSnapRequired) {
    return object.isDisplayed().then(function (present) {
        if (present) {
            object.clear();
            return object.sendKeys(valueToEnter).then(function () {
                self.consoleLogWithScreenShot(valueToEnter + " : text entered in " + objectName, valueToEnter + " : text entered in " + objectName,isSnapRequired);
                return true;
            });
        }
        else {
            self.failReport("Unable to find the : " + objectName + ", to perform the enter text action",objectName+"_NotExists");
            return false;
        }
    }, function (error) {
        self.failReport("Unable to find the : " + objectName + ", to perform the enter text action : "+error,objectName+"_NotExists");
        return false;
    });
}
exports.waitForElementAndClick = function (object, objectName, timeTowait, isSnapRequired) {
    if (timeTowait == undefined)
        timeTowait = 30000;
    return browserinstance.wait(EC.elementToBeClickable(object), timeTowait).then(function () {
        //self.consoleLogWithScreenShot(objectName + " : successfully showing on application",objectName+"_ExistsAndClickable");
        return object.click().then(function () {
            self.consoleLogWithScreenShot("Clicked/Selected on : " + objectName + " UI element", "ClickedOn_" + objectName, isSnapRequired);
            return true;
        }, function (error) {
            self.failReport("Error while clicking on : " + objectName + ", Error : " + error, "IssueWhileClickingOn_" + objectName);
            return false;
        });
    }, function (error) {
        self.failReport("Error/timeout while checking the clickable property of : " + objectName + ", Error : " + error, objectName + "_Not_Clickable");
        return false;
    });
};

// exports.selectByVisibleText(visibleText){
//     console.log("Selecting element based text  : "+visibleText)
    
//     select obj=new select(driver.findElement(by.xpath("//select[@Class='gwt-ListBox']")));
// obj.se
//     // select the option
    
//     //this.dropdown.element(by.xpath("//option[text()='"+visibleText+"']")).click()
// }

exports.writeScreenShot = function (data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
};
exports.generateRandomNumber = function (length) {
    var string = '';
    var letters = '0123456789';
    for (i = 0; i < length; i++) {
        string += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return string;
};
exports.waitForElementToBeDisappear = function (object, objectName, timeTowait, isSnapRequired) {
    return browserinstance.wait(global.EC.invisibilityOf(object), timeTowait).then(function () {
        self.consoleLogWithScreenShot(objectName + " : successfully disappear or doesn't exist on application", objectName + "_Disappeared", isSnapRequired);
        return true;
    }, function (error) {
        self.consoleLogWithScreenShot("Error while checking the invisibility of : " + objectName + ", Error : " + error, objectName + "_Invisibility_Issue", isSnapRequired);
        return false;
    });
};
exports.waitForElementToBeAppear = function (object, objectName, timeTowait, isSnapRequired) {
    return browserinstance.wait(EC.visibilityOf(object), timeTowait).then(function () {
        browserinstance.actions().mouseMove(object).perform();
        self.consoleLogWithScreenShot(objectName + " : showing on application", objectName + "_isPresent", isSnapRequired);
        return true;
    }, function (error) {
        self.consoleLogWithScreenShot("Error while checking the visibility of : " + objectName + ", Error : " + error, "UnableToFind_" + objectName + "NotPresent", isSnapRequired);
        return false;
    });
};
exports.clickOn = function (object, objectName, isSnapRequired) {
    return browserinstance.element(object).click().then(function () {
        self.consoleLogWithScreenShot("Clicked/Selected on : " + objectName + " UI element", "ClickedOn_" + objectName, isSnapRequired);
        return true;
    }, function (error) {
        self.failReport("Error while clicking on : " + objectName + ", Error : " + error, "UnableToClickedOn_" + objectName);
        return false;
    });
};
exports.isObjEnabled = function (objLocatorBy, objectName,boolIsSnapRequired) {
    return browserinstance.element(objLocatorBy).isEnabled().then(function (enabled) {
        self.consoleLogWithScreenShot(objectName+" is enabled:"+enabled,objectName + " enabled : " + enabled);
        return enabled;
    }, function (error) {
        self.failReport("Error while checking enable property of : " + objectName + ", Error : " + error);
        return false;
    });
};
exports.validateObjIsEnabledOrNot = function (objLocatorBy, objectName, enableTrueORDisablefalse) {
    if (enableTrueORDisablefalse) {
        return browserinstance.element(objLocatorBy).isEnabled().then(function (enabled) {
            if (enabled) {
                self.consoleLogWithScreenShot(objectName + " is enabled to proceed as expected", objectName + "_Enabled");
                return true;
            } else {
                self.consoleLogWithScreenShot(objectName + " is not enabled to proceed", objectName + "_Disabled");
                return false;
            }
        });
    } else {
        return browserinstance.element(objLocatorBy).isEnabled().then(function (enabled) {
            if (enabled) {
                self.consoleLogWithScreenShot(objectName + " is enabled, but as per expected it should not be enabled", objectName + "_Enabled");
                return false;
            } else {
                self.consoleLogWithScreenShot(objectName + " is not enabled as expected", objectName + "_Disabled");
                return true;
            }
        });
    }
};


exports.saveScreenshot = function (imgNameToSave) {
    if (imgNameToSave === undefined || imgNameToSave === "")
        imgNameToSave = "";
    self.allureScreenshot(imgNameToSave);
    /*var dateTimeStamp = this.getCurrentDateTimeStamp();
    var imgPath = screenShotPath + imgNameToSave + "_" + dateTimeStamp + '.png';
    browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(imgPath);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    }).then(self.allureScreenshot(imgNameToSave));*/
};


exports.getCurrentDateTimeStamp = function () {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var dateTimeStamp = day + "" + month + "" + hour + "" + minute + "" + second;

    return dateTimeStamp;

};


exports.isElementPresentOnUI = function (objectLocatorBy, objectName, boolIsSnapRequired) {
    return browserinstance.isElementPresent(objectLocatorBy).then(function (isPresent) {
        if (isPresent) {
            //browserinstance.actions().mouseMove(objectLocatorBy).perform();
            self.consoleLogWithScreenShot(objectName + " present on UI", objectName + "_Exists", boolIsSnapRequired);
            return true;
        }
        else {
            self.consoleLogWithScreenShot(objectName + " not present on UI", objectName + "_NotExists", boolIsSnapRequired);
            return false;
        }
    });
};
exports.selectDropDownValueByCSS = function(dropdownLocatorByID,cssLocatorForOptions,dropdownValue){
     browserinstance.element(dropdownLocatorByID).all(by.cssContainingText(cssLocatorForOptions,dropdownValue)).click();
    };  
   

exports.iscontentAvailableInTableByColumnIndex = function (objectLocatorBy,Index,content) {
     return browserinstance.element.all(objectLocatorBy).then(function(rows){
        rows.forEach(function(row){
            row.all(by.tagName('td')).then(function(columns){                
                columns[Index].getAttribute('innerText').then(function(value){
                    console.log('ColumnContent: ' + value);
                    if (value == content){
                        console.log('content found')
                        return value
                        
                    }else{
                        console.log('content not found')
                        return value
                        
                    }
                });
                
            });
        });     
    });
};


exports.failReport = function (failMessage, imgNameToSave) {
    console.log(failMessage);
    fail(failMessage);
    this.saveScreenshot(imgNameToSave)
};


exports.consoleLogWithScreenShot = function (msgToPrint, imgNameToSave, isScreenShotRequired) {
    console.log(msgToPrint);

    if (isScreenShotRequired === undefined || isScreenShotRequired === true)
        this.saveScreenshot(imgNameToSave)
}


exports.deleteAllDirectoriesAndFiles = function (dirPath, removeSelf) {
    if (removeSelf === undefined)
        removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                self.deleteAllDirectoriesAndFiles(filePath);
        }
    if (removeSelf)
        fs.rmdirSync(dirPath);

}

exports.diffMinutes = function (endDateTime, startDateTime) {

    var diff = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
    diff /= 60;
    console.log(Math.abs(Math.round(diff)));
    return Math.abs(Math.round(diff));

};


exports.allureScreenshot = function (screenShotName) {
    browserinstance.takeScreenshot().then(function (png) {
        allure.createAttachment(screenShotName, function () {
            return new Buffer(png, 'base64')
        }, 'image/png')();
    }, function (error) {
        console.log("Something went wrong while taking screenshot : " + error);
    });
};



exports.clearAllureReports = function () {
    var allureresultPath = path.resolve(__dirname, '../allure-results');
    var allurereportPath = path.resolve(__dirname, '../allure-report');

    //Deleting allure results
    if (fs.existsSync(allureresultPath)) {
        self.deleteAllDirectoriesAndFiles(allureresultPath);
        console.log("old allure results removed");
    } else {
        console.log('allure results folder does not exist');
    }
    ////Deleting allure report folder
    if (fs.existsSync(allurereportPath)) {
        //fsextra.removeSync(allurereport);
        self.deleteAllDirectoriesAndFiles(allurereportPath);
        console.log("old allure reports removed successfully");
    } else {
        console.log('history folder in utility does not exit');
    }
}


exports.getText = function (object, objectName, isSnapRequired) {
    var that = this;
    return this.isElementDisplayed(object).then(function (present) {
        if (present) {
            return object.getText().then(function (value) {
                self.consoleLogWithScreenShot("text value of " + objectName + " is - " + value, objectName, isSnapRequired);
                return value;
            }, function (error) {
                self.consoleLogWithScreenShot("Issue while getting text value of :" + objectName + " - " + error, objectName + "_getTextError", isSnapRequired);
                return "";
            });
        }
        else {
            that.failReport("Unable to find the : " + objectName, "ErrorwhileFinding_" + objectName);
            return ""
        }
    });
};

exports.callMe = function () {
    var testdata =
        console.log("Hello")
    console.log((process.argv).slice(2))

    if (arg1[0] == 'conf.js') {
        if (arg1[2] == '--environment.platform=aws') {

            if (arg1[3] == '--environment.envAWSName=int') {
                var masterenvpath = path.resolve(__dirname, '../MasterEnv.json')
                //console.log(masterenvpath)
                var testdata = JSON.parse(fs.readFileSync(masterenvpath));
                //console.log(testdata.aws)

                var envfilepath = path.resolve(__dirname, '../environment.json');
                //console.log(envfilepath);
                //console.log("aws object:", testdata.aws.int);
                fs.writeFileSync(envfilepath, JSON.stringify(testdata.aws.int));
            }

        }
    } else {
        console.log('AWS int env not found!')
    }
    if (arg1[0] == 'conf.js') {
        if (arg1[2] == '--environment.platform=aws') {

            if (arg1[3] == '--environment.envAWSName=cert') {
                var masterenvpath = path.resolve(__dirname, '../MasterEnv.json')
                //console.log(masterenvpath)
                var testdata = JSON.parse(fs.readFileSync(masterenvpath));
                console.log(testdata.aws)

                var envfilepath = path.resolve(__dirname, '../environment.json');
                //console.log(envfilepath);
                //console.log("aws object:", testdata.aws.cert);
                fs.writeFileSync(envfilepath, JSON.stringify(testdata.aws.cert));
            }
        }

    } else {
        console.log('AWS cert env not found!')
    }
    if (arg1[0] == 'conf.js') {
        if (arg1[2] == '--environment.platform=azure') {

            if (arg1[3] == '--environment.envAWSName=rc') {
                var masterenvpath = path.resolve(__dirname, '../MasterEnv.json')
                //console.log(masterenvpath)
                var testdata = JSON.parse(fs.readFileSync(masterenvpath));
                //console.log(testdata.aws)

                var envfilepath = path.resolve(__dirname, '../environment.json');
                //console.log(envfilepath);
                //console.log("aws object:", testdata.azure.rc);
                fs.writeFileSync(envfilepath, JSON.stringify(testdata.azure.rc));
            }
        }

    } else {
        console.log('Azure rc env not found!')
    }

}

exports.waitAndClickAndEnableHardAssertIfClickFails = function (elementFinder, objName, waitTime) {
    return this.waitForElementAndClick(elementFinder, objName, waitTime).then(function (clicked) {
        if (!clicked)

        return clicked;
    })
}



exports.waitForThirtyMins = function (i) {

    return browserinstance.sleep(60000).then(function (value) {
        console.log("I val : " + i);
        if (i === 30) {
            return true;
        } else {
            return false;
        }
    });
};

exports.waitForSixtyMins = function (i) {

    return browserinstance.sleep(60000).then(function (value) {
        console.log("I val : " + i);
        if (i === 60) {
            return true;
        } else {
            return false;
        }
    });
};

exports.checkElementDisplayWithHardAssertion = function (object, objectname) {
    return this.isElementDisplayed(object, objectname).then(function (present) {
        if (!present) {
            console.log("Element " + object + "is not displayed")
        } else {
            return present;
        }

    });
}


exports.waitForElementToBePresentForNonAngular = function (webElementOrElementFinder, timeToWaitInMilSec) {
    return browserinstance.wait(function () {
        return browserinstance.isElementPresent(webElementOrElementFinder).then(function (value) {
            if (value) {
                return true;
            } else {
                return false;
            }
        });
    }, timeToWaitInMilSec).then(function () {
        return true;
    }, function (error) {
        console.log("Error : " + error);
        return false;
    });
};


exports.countNumberOfMatchingElements = function (firstmatch, commonmatchelement) {
    
        return browserinstance.element(firstmatch).isPresent().then(function (present) {
            if (present) {
                return browserinstance.element.all(commonmatchelement).count().then(function (getcount) {
                    return getcount
                })
            }
        })
}

exports.generateAllureReport = function(){
var flag;
    var appFilePath = path.resolve(__dirname, "../");
    var drive = appFilePath.split(":")
    console.log("appFilePath"+appFilePath)
    /*cd D:\TestAutoThon\node_modules\allure-commandline\dist\bin
    D:
        allure.bat generate D:\TestAutoThon\allure-results -c -o D:\TestAutoThon\allure-report*/
    //var appPath = upath.toUnix(path.resolve(__dirname, pathToFile));
    var dataToWrite =  "cd "+appFilePath+"/node_modules/allure-commandline/dist/bin\n";
    dataToWrite += "cd "+drive[0]+":\n";
        dataToWrite += "allure.bat generate "+appFilePath+"/allure-results -c -o "+appFilePath+"/allure-report\n";
    //dataToWrite += "exit";
    var batchFilePath = appFilePath + '/generateReport.sh';
    batchFilePath = path.resolve(appFilePath, batchFilePath);
    self.writeAppNameToFile(batchFilePath, dataToWrite);

    console.log(dataToWrite)


    var workerProcess = child_process.exec(batchFilePath);
    workerProcess.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    workerProcess.on('close', function (code) {
        flag = true;
        if (code == 0) {
            console.error('child process exited with code ' + code);
        }
        else {
            console.log('child process exited with code ' + code);
        }
    });
    while (!flag) {
        sleep(1000);
    }
};




