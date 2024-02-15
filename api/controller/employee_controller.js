const employeeService = require('../service/employee_service');


function sendOtpForEmployeeSignup(req, res) {
    const data = req.body;
  
    employeeService
      .sendOtpForEmployeeSignup(data)
      .then((result) => {
        if (result.message) {
          console.log(result.message);
          return res.status(400).json({
            success: false,
            message: result.message,
            error:''
          });
        }
  
        return res.status(200).json({
          success: true,
          message: 'otp sent successfully',
        });
      })
      .catch((error) => {
        console.error(error);
        //console.log('Something went wrong while signup customer');
        return res.status(500).json({
          success: false,
          message: 'Something went wrong while sending otp for employee signup',
          error:error
        });
      });
 }
 
 function verifyOtpForEmployeeSignup(req,res){
    const data = req.body;
    employeeService.verifyOtpForEmployeeSignup(data,(error,result)=>{
        if(error){
            //console.log(error);
            //console.log('something went wrong while verify otp');
            return res.status(500).json({
                success:false,
                message:"something went wrong while verify otp",
                error:error
            })
         }
         if (result.message) {
            //console.log(result.message);
            return res.status(400).json({
                success: false,
                message: result.message,
                error:''
            });
        }
      
        return res.status(200).json({
            success:true,
            message:"user verified and registered successfully",
            token:result
         })
 
    });
 }

 function sendOtpForEmployeeLogin(req, res) {
    const data = req.body;
  
    employeeService
      .sendOtpForEmployeeLogin(data)
      .then((result) => {
        if (result.message) {
          //console.log(result.message);
          return res.status(400).json({
            success: false,
            message: result.message,
            error:''
          });
        }
  
        return res.status(200).json({
          success: true,
          message: 'otp sent successfully',
        });
      })
      .catch((error) => {
        console.error(error);
        //console.log('Something went wrong while signup customer');
        return res.status(500).json({
          success: false,
          message: 'Something went wrong while sending otp',
          error:error
        });
      });
}
function verifyOtpForEmployeeLogin(req,res){
  console.log('controller methond called');
    const data = req.body;
    employeeService.verifyOtpForEmployeeLogin(data,(error,result)=>{
        if(error){
            //console.log(error);
            //console.log('something went wrong while verify otp');
            return res.status(500).json({
                success:false,
                message:"something went wrong while verify otp",
                error:error
            })
         }
         if (result.message) {
            //console.log(result.message);
            return res.status(400).json({
                success: false,
                message: result.message,
                error:''
            });
        }
        console.log(result);
      
        return res.status(200).json({
            success:true,
            message:"verified otp successfully",
            token:result
         })

    });
}
function employeeProfile(req,res){
    const email= req.user.email;
    employeeService.employeeProfile(email, (error,result)=>{
        if(error){
            //console.log(error);
            //console.log('something went wrong while signup customer');
            return res.status(500).json({
                success:false,
                message:"something went wrong while getting details",
                error:error
            })
         }
         //console.log(result);
         return res.status(200).json({
            success:true,
            result:result
         })

    });
}


module.exports = {
  sendOtpForEmployeeSignup,
  verifyOtpForEmployeeSignup,
  sendOtpForEmployeeLogin,
  verifyOtpForEmployeeLogin,
  employeeProfile,

}