'use strict';
var fs = require('fs');
var path = require('path');

/**
 * @method loadEnvTestData()
 * @description 1. Will read the MasterEnv.json file
 *              2. Based on arguments [platform and environment] environment.json will get write.
 */
exports.loadEnvTestData = function () {
    var testData,envFilePath,platform,environmentName;

    testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../MasterEnv.json')));
    envFilePath = path.resolve(__dirname, '../environment.json');

    console.log(process.argv);
    platform = browser.params.platform;
    environmentName = browser.params.environment;
    console.log("Platform : "+platform+", environment : "+environmentName);

    if(platform === 'aws'){
        if(environmentName === 'testEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.aws.testEnv));
        }else if(environmentName === 'uatEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.aws.uatEnv));
        }else if(environmentName === 'prodEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.aws.prodEnv));
        }else{
            console.error("Please provide the environment argument as either test or uat or prod, currently environment provided as " +arg1[3]);
        }
    }else if(platform === 'azure'){
        if(environmentName === 'testEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.azure.testEnv));
        }else if(environmentName === 'uatEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.azure.uatEnv));
        }else if(environmentName === 'prodEnv'){
            //*******Environment json***************
            fs.writeFileSync(envFilePath, JSON.stringify(testData.azure.prodEnv));
        }else{
            console.error("Please provide the environment argument as either test or uat or prod, currently environment provided as " +arg1[3]);
        }
    }else{
        console.error("Please provide the platform argument as either aws or azure, currently platform provided as " +arg1[2]);
    }
};