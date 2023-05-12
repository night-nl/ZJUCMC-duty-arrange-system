const models = require("../model/index");
const { param } = require("../routes/user");
const sso = require("./ssoUtil.js");
const util = require("./util.js");
const { adminModel } = models;

exports.tokenChecker = async (accesstoken) => {
    let flag = 1;
    let result = await sso.getUserInformation(accesstoken).then().catch(function (err) {
        flag = 0;
        return {
            errorCode: 401,  //token出错，401：请求要求用户的身份认证
            errorMsg: err,
            payload: {}
        };
    }
    );
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

exports.postShiftAdd = async(body,params)=>{
    let ret;
    let userId = body.userId;
    let year = body.year;
    let semester = body.semester;
    let misName = body.misName;
    let reqNum = body.reqNum;
    let period = body.period;
    let reward = body.reward;

    let modelResult = await models.adminModel.postShiftAdd1();
    if (modelResult) {
        ret = {
            errorCode: 200,
            errorMsg: "成功发布值班",
            payload: {}
        };
    } else {
        ret = {
            errorCode: 400,
            errorMsg: "值班发布失败啦",
            payload: {}
        };
    }
    return ret;
}