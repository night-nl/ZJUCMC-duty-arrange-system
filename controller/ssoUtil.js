//const { resolve } = require('path/posix');
const request = require('request');
const oauthConfig = {
    server: 'https://sso.zjutv.com',
    appKey: '4SOfiQSkwMnE',
    appSecret: '24emn7CwdJMx',
};
const oauthConfigNew = {            // 适用于新增的两个接口
    server: 'https://sso.zjutv.com',
    appKey: 'bdyy3000',
    appSecret: 'bdyy3000',
};

const exported = {
    oauthConfig,
    oauthConfigNew,
};

exported.getUserInformation = (accessToken) => {
    return new Promise((resolve, reject) => {
        let reqUrl = `${oauthConfig.server}/user_account/api/oauth/service/users/info?access_token=${accessToken}&app_key=${oauthConfig.appKey}&app_secret=${oauthConfig.appSecret}`;
        request(reqUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode != 200) {
                reject('获取用户信息失败');
                return;
            }
            let { errorCode, errorMessage, payload } = JSON.parse(body);
            if (errorCode != 0) {
                reject(errorMessage);
                return;
            }
            resolve(payload);
        });
    });
};

exported.getUserByStuID = (stuID) => {  // stuID是储存学号的数组
    return new Promise((resolve, reject) => {
        let reqUrl = `${oauthConfig.server}/user_account/api/client_service/users/info?app_key=${oauthConfigNew.appKey}&app_secret=${oauthConfigNew.appSecret}&users=${stuID} `;
        request(reqUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode != 200) {
                reject('获取学号对应用户信息失败');
                return;
            }
            let { errorCode, errorMessage, payload } = JSON.parse(body);
            if (errorCode != 0) {
                reject(errorMessage);
                return;
            }
            resolve(payload);
        });
    });
};

module.exports = exported;
