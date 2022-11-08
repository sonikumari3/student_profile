const jwt = require("jsonwebtoken");

const studentToken = (token)=>{
    let tokenValidate = jwt.verify(token,"This is my secret key",(err,data)=>{
        if(err) 
        return null
        else{
            return data
        }    
    })
    return tokenValidate
}


const validateToken = async function (req, res, next) {
    try {
        let token = req.headers['x-student-Key'] || req.headers['x-Student-key']
        if (!token) {
           return res.status(401).send({ status: false, message: "token must be present" });
        }
       let decodedToken = studentToken(token)
       if(!decodedToken){
           return res.status(401).send({status:false,message:"inavlid token"})
       }
        console.log(decodedToken)
        
            req["studentId"]= decodedToken.studentId
             
            next()
          
    } 
    catch (err) {
        return res.status(500).send({  status:"Error", error: err.message })

    }
}
module.exports.validateToken = validateToken