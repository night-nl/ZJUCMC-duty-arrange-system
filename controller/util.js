const fs = require('fs');
const crypto = require('crypto');

let getRandomSalt = () => {
    return Math.random().toString().slice(2, 5);
}

let cryptPwd = (password, salt) => {
    let saltPassword = password + ':' + salt;
    let md5 = crypto.createHash('md5');
    let result = md5.update(saltPassword).digest('hex');
    return result;
}

exports.savePhoto = (photoData, equipmentID) => {
    let now = new Date().valueOf();
    let path = 'public/equipmentPhotos/' + cryptPwd(equipmentID, getRandomSalt()) + 'STAMP' + now + '.png';
    let base64 =photoData.replace(/^data:image\/\w+;base64,/, ""); 
    let dataBuffer = Buffer.from(base64, 'base64');
    console.log('dataBuffer是否是Buffer对象: ' + Buffer.isBuffer(dataBuffer));
    fs.writeFile(path, dataBuffer, function(err, path)  {
        if(err)  {
            console.log("savePhoto Util ERROR: " + err);
            return null;
        }
    })
    return path;
}