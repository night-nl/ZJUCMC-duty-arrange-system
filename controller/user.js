const models = require("../model/index");
const sso = require("./ssoUtil.js");

exports.tokenChecker = async (accesstoken) => {
    //console.log(accesstoken);
    let flag = 1;
    let result = await sso.getUserInformation(accesstoken).then().catch(function (err) {
        flag = 0;
        return {
            errorCode: 401,
            errorMsg: err,
            payload: {}
        };
    });

    if(flag) {
        return {
            errorCode: 200,
            errorMsg: "accesstoken正确",
            payload: result
        };
    } else {
        return result;
    }
}