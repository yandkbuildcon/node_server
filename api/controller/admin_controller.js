const adminService = require('../service/admin_service');



function sendOtpForAdminLogin(req, res) {
   const data = req.body;
 
   adminService
     .sendOtpForAdminLogin(data)
     .then((result) => {
       if (result.message) {
         console.log(result.message);
         return res.status(400).json({
           success: false,
           message: result.message,
         });
       }
 
       return res.status(200).json({
         success: true,
         message: 'otp sent successfully',
       });
     })
     .catch((error) => {
       console.error(error);
       console.log('Something went wrong while send otp admin');
       return res.status(500).json({
         success: false,
         message: 'Something went wrong while send otp admin',
       });
     });
}

function verifyOtpForAdminLogin(req, res) {
   const data = req.body;
 
   adminService
     .verifyOtpForAdminLogin(data)
     .then((result) => {
       if (result.message) {
         console.log(result.message);
         return res.status(400).json({
           success: false,
           message: result.message,
         });
       }
       return res.status(200).json({
         success: true,
         message: 'otp verified successfully',
         token: result
       });
     })
     .catch((error) => {
       console.error(error);
       console.log('Something went wrong while verifying otp');
       return res.status(500).json({
         success: false,
         message: 'Something went wrong while verifying otp',
       });
     });
}

function adminProfile(req, res){
   const ad_email = req.user.email;
   adminService
     .adminProfile(ad_email)
     .then((result) => {
       
       return res.status(200).json({
         success: true,
         message: 'admin profile fetched successfully',
         result:result
       });
     })
     .catch((error) => {
       console.error(error);
       console.log('Something went wrong while fetching admin profile');
       return res.status(500).json({
         success: false,
         message: 'Something went wrong while fetching admin profile',
       });
     });
} 



function insertAdminContact(req,res){
    const data = req.body;
    adminService.insertAdminContact(data).then((result) => {
       console.log('contact inserted:', result);
       return res.status(200).json(
          {
             success:true,
             message:"contact inserted successfully"
          }
       )
     })
     .catch((error) => {
       console.error('Error inserting contact:', error);
       return res.status(500).json(
          {
             success:false,
             message:"error inserting contact"
          }
       )
     });
}

function uploadOffer(req,res){
      const offerImage = req.file.filename;
      const p_id = req.body.p_id;
      const text1 = req.body.of_text1;
      const text2 = req.body.of_text2;
      const text3 = req.body.of_text3;
      adminService.uploadOffer(offerImage, text1, text2, text3, p_id,).then((result) => {
         console.log('offer image uploaded successfully:', result);
         return res.status(200).json(
            {
               success:true,
               message:"offer image uploaded successfully"
            }
         )
       })
       .catch((error) => {
         console.error('Error uploading offer image:', error);
         return res.status(500).json(
            {
               success:false,
               message:"error uploading offer image"
            }
         )
       });
}


function fetchCustomerRequest(req,res){
      
      adminService.fetchCustomerRequest().then((result) => {
         console.log('customer request fetch successfully:', result);
         return res.status(200).json(
            {
               success:true,
               message:"customer request fetch successfully",
               result:result
            }
         )
       })
       .catch((error) => {
         console.error('Error fetching customer request:', error);
         return res.status(500).json(
            {
               success:false,
               message:"error fetching customer request"
            }
         )
       });
}  

function insertPropertyDetails(req,res){
      const data = req.body;
      adminService.insertPropertyDetails(data,(error,result)=>{
        if(error){
           console.log(error);
           console.log('something went wrong while inserting property details');
           return res.status(500).json({
               success:false,
               message:"something went wrong while inserting property details"
           })
        }
        if (result.message) {
           console.log(result.message);
           return res.status(400).json({
               success: false,
               message: result.message,
           });
       }
        return res.status(200).json({
           success:true,
           message:"property listed successfully."
        })
      });
}

function uploadPropertyImage(req,res){
  const p_id = req.body.p_id;
  console.log(p_id);
  const propertyImage = req.file.filename;
  console.log(`property image is ${propertyImage}`);
  adminService.uploadPropertyImage(p_id, propertyImage , (error,result)=>{
        
      if(error){
          console.log(error);
          console.log('something went wrong while uploading property image');
          return res.status(500).json({
              success:false,
              message:"something went wrong while uploading property image"
          })
       }
       return res.status(200).json({
          success:true,
          message:"property image uploaded successfully."
       })


  } );
}

function deletePropertyImage(req,res){
  const data=req.body;
  adminService.deletePropertyImage(data , (error,result)=>{
        
      if(error){
          console.log(error);
          console.log('something went wrong while deleting property image');
          return res.status(500).json({
              success:false,
              message:"something went wrong while deleting property image"
          })
       }
       return res.status(200).json({
          success:true,
          message:"property image deleted successfully."
       })


  } );
}

function changeVisitStatus(req,res){
  const data = req.body;
  adminService.changeVisitStatus(data).then((result) => {
     console.log('status changed:', result);
     return res.status(200).json(
        {
           success:true,
           message:"status changed successfully"
        }
     )
   })
   .catch((error) => {
     console.error('Error changing staus:', error);
     return res.status(500).json(
        {
           success:false,
           message:"error changing status"
        }
     )
   });
}
 
module.exports = {
   sendOtpForAdminLogin,
   verifyOtpForAdminLogin,
   adminProfile,
   insertPropertyDetails,
   insertAdminContact, 
   uploadOffer,
   fetchCustomerRequest,
   uploadPropertyImage,
   deletePropertyImage,
   changeVisitStatus
}   