var express = require('express');
var router = express.Router();
const controller = require("../controller/index")
const { adminController } = controller;

//001 管理员发布值班请求
router.post("/dutyInfo",async (req,res)=>{
    let ret = await adminController.postShiftAdd(req.body,req.params);
    res.send(ret).end();
})