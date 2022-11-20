//Device authorization middleware

//check our endpoints with express validator (for pages with signin permission)

const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = req.header('x-auth-token')
        //console.log(token)
        jwt.verify(token, "longer-secret-is-better")
        const decodedToken = jwt.decode(token);
        //console.log(decodedToken.deviceArray);
        req.devices = decodedToken.deviceArray;
        next()                                  //execute other lines in the pipeline
    }catch(error){
        res.status(401).json({
            message: "No token. Cannot Authorize device",
            error: error
        })
    }
}
