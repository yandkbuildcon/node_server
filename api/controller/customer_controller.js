const customerService = require('../service/customer_service');


function customerSignup(req,res){
    const data = req.body;
    customerService.customerSignup(data,(error,result)=>{
      if(error){
         console.log(error);
         console.log('something went wrong while signup customer');
         return res.status(500).json({
             success:false,
             message:"something went wrong while signup customer",
             error:''
         })
      }
      if (result.message) {
         console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:''
         });
     }
      return res.status(200).json({
         success:true,
         message:"signup successfully"
      })
    });
}

function sendOtpForSignup(req, res) {
   const data = req.body;
 
   customerService
     .sendOtpForSignup(data)
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
       console.log('Something went wrong while signup customer');
       return res.status(500).json({
         success: false,
         message: 'Something went wrong while signup customer',
         error:''
       });
     });
}

function verifyOtpForSignup(req,res){
   const data = req.body;
   customerService.verifyOtpForSignup(data,(error,result)=>{
       if(error){
           console.log(error);
           console.log('something went wrong while verify otp');
           return res.status(500).json({
               success:false,
               message:"something went wrong while verify otp",
               error:''
           })
        }
        if (result.message) {
           console.log(result.message);
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





function sendOtpForLogin(req, res) {
    const data = req.body;
  
    customerService
      .sendOtpForLogin(data)
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
        console.log('Something went wrong while signup customer');
        return res.status(500).json({
          success: false,
          message: 'Something went wrong while signup customer',
          error:''
        });
      });
}
function verifyOtpForLogin(req,res){
    const data = req.body;
    customerService.verifyOtpForLogin(data,(error,result)=>{
        if(error){
            console.log(error);
            console.log('something went wrong while verify otp');
            return res.status(500).json({
                success:false,
                message:"something went wrong while verify otp",
                error:''
            })
         }
         if (result.message) {
            console.log(result.message);
            return res.status(400).json({
                success: false,
                message: result.message,
                error:''
            });
        }
      
        return res.status(200).json({
            success:true,
            message:"verified otp successfully",
            token:result
         })

    });
}
function customerProfile(req,res){
    const c_email= req.user.email;
    customerService.customerProfile(c_email, (error,result)=>{
        if(error){
            console.log(error);
            console.log('something went wrong while signup customer');
            return res.status(500).json({
                success:false,
                message:"something went wrong while signup customer",
                error:''
            })
         }
         console.log(result);
         return res.status(200).json({
            success:true,
            result:result
         })

    });
}
function uploadProfilePic(req,res){
   const c_id = req.body.c_id;
   const profilePic = req.file.filename;
   console.log(c_id, profilePic);
   customerService.uploadProfilePic(c_id, profilePic).then((result) => {
      console.log('profile pic uploaded successfully:', result);
      return res.status(200).json(
         {
            success:true,
            message:"profile pic uploaded successfully"
         }
      )
    })
    .catch((error) => {
      console.error('Error uploading profile pic:', error);
      return res.status(500).json(
         {
            success:false,
            message:"error uploading profile pci",
            error:''
         }
      )
    });
} 






function fetchAllProperties(req,res){
    
   customerService.fetchAllProperties((error,result)=>{
         
       if(error){
           console.log(error);
           console.log('something went wrong while fetching properties');
           return res.status(500).json({
               success:false,
               message:"something went wrong while fetching properties",
               error:''
           })
        }
        return res.status(200).json({
           success:true,
           message:"property successfully fetched.",
           result:result
        })


   } );
}

// =========================================fetch all properties with pagination and filter
function fetchAllPropertiesWithPaginationAndFilter(req,res){
   const { filterOptions, paginationOptions } = req.body;
   customerService.fetchAllPropertiesWithPaginationAndFilter(filterOptions, paginationOptions,(error,result)=>{
         
       if(error){
           console.log(error);
           console.log('something went wrong while fetching properties');
           return res.status(500).json({
               success:false,
               message:"something went wrong while fetching properties",
               error:''
           })
        }
        return res.status(200).json({
           success:true,
           message:"property successfully fetched.",
           result:result
        })


   } );
}


function fetchSinglePropertyById(req,res){
   const p_id = req.body.p_id;
   customerService.fetchSinglePropertyById(p_id).then((result) => {
      console.log('property fetched:', result);
      return res.status(200).json(
         {
            success:true,
            message:"property fetched successfully",
            result: result
         }
      )
    })
    .catch((error) => {
      console.error('Error fetching property:', error);
      return res.status(500).json(
         {
            success:false,
            message:"error fetching property",
            error:''
         }
      )
    });
}
function fetchOfferList(req,res){
   customerService.fetchOfferList().then((result) => {
      console.log('offer fetched successfully:', result);
      return res.status(200).json(
         {
            success:true,
            message:"offer fetched successfully",
            result:result
         }
      )
    })
    .catch((error) => {
      console.error('Error fetching offers:', error);
      return res.status(500).json(
         {
            success:false,
            message:"error fetching offers",
            error:''
         }
      )
    });
}
function submitPropertyRating(req,res){
   const data = req.body;
   customerService.submitPropertyRating(data).then((result) => {
      console.log('Rating submitted successfully:', result);
      return res.status(200).json(
         {
            success:true,
            message:"rating submitted successfully"
         }
      )
    })
    .catch((error) => {
      console.error('Error submitting rating:', error);
      return res.status(500).json(
         {
            success:false,
            message:"error submitting rating",
            error:''
         }
      )
    });
}  
function fetchAdminContact(req,res){
   customerService.fetchAdminContact().then((result) => {
      console.log('contact fetched:', result);
      return res.status(200).json(
         {
            success:true,
            message:"contact fetched successfully",
            result: result
         }
      )
    })
    .catch((error) => {
      console.error('Error fetching contact:', error);
      return res.status(500).json(
         {
            success:false,
            message:"error fetching contact",
            error:''
         }
      )
    });
}







function addtoFavorite(req,res){
  const data = req.body;
  customerService.addtoFavorite(data,(error,result)=>{
    if(error){
      console.log(error);
      console.log('something went wrong while adding to favorites');
      return res.status(500).json({
          success:false,
          message:"something went wrong while adding to favorites",
          error:''
      })
   }
   console.log(result);
         return res.status(200).json({
            success:true,
            message:"successfully added to favorites",
         })

  });
}
function removeFromFavorite(req,res){
  const data = req.body;
  customerService.removeFromFavorite(data,(error,result)=>{
    if(error){
      console.log(error);
      console.log('something went wrong while removing from favorites');
      return res.status(500).json({
          success:false,
          message:"something went wrong while removing from favorites",
          error:''
      })
   }
   console.log(result);
         return res.status(200).json({
            success:true,
            message:"successfully removed from favorites"
         })

  });
}
function fetchFavoriteProperty(req,res){
  const data = req.body;
  customerService.fetchFavoriteProperty(data,(error,result)=>{
    if(error){
      console.log(error);
      console.log('something went wrong while fetching favorite property');
      return res.status(500).json({
          success:false,
          message:"something went wrong while fetching favorite property",
          error:''
          
      })
   }
   console.log(result);
         return res.status(200).json({
            success:true,
            result:result
         })

  });
}
function fetchFavoritePropertyListDetails(req,res){
  const data = req.body;
  customerService.fetchFavoritePropertyListDetails(data,(error,result)=>{
    if(error){
      console.log(error);
      console.log('something went wrong while fetching favorite property');
      return res.status(500).json({
          success:false,
          message:"something went wrong while fetching favorite property",
          error:''
          
      })
   }
   console.log(`favorite property is${result.toString()}`);
         return res.status(200).json({
            success:true,
            result:result
         })

  });

}



function requestVisit(req,res){
   const data = req.body;
   customerService.requestVisit(data, (error, result)=>{
       if(error){
           console.log(error);
           console.log('something went wrong while requating for visit');
           return res.status(500).json({
               success:false,
               message:"something went wrong while requesting for visit",
               error:''
           })
        }
        return res.status(200).json({
           success:true,
           message:"requested successfully"
        })
   });
} 
function fetchVisitRequestedList(req,res){
   const { filterOptions, paginationOptions } = req.body;
  const data = req.body;
  customerService.fetchVisitRequestedList(filterOptions,paginationOptions,data,(error,result)=>{
    if(error){
      console.log(error);
      console.log('something went wrong while fetching visit requested list');
      return res.status(500).json({
          success:false,
          message:"something went wrong while fetching visit requested list",
          error:''
          
      })
   }
   console.log(result);
         return res.status(200).json({
            success:true,
            result:result
         })

  });
}
function fetchVisitRequestedPropertyDetails(req,res){
   const data = req.body;
   customerService.fetchVisitRequestedPropertyDetails(data,(error,result)=>{
     if(error){
       console.log(error);
       console.log('something went wrong while fetching visit requested property details');
       return res.status(500).json({
           success:false,
           message:"something went wrong while fetching visit requested list property details",
           error:''
           
       })
    }
    console.log(result);
          return res.status(200).json({
             success:true,
             result:result[0]
          })
 
   });
}


 
  

 module.exports = {
  customerSignup, 
  sendOtpForSignup,
  verifyOtpForSignup,
  sendOtpForLogin, 
  verifyOtpForLogin, 
  customerProfile,
  uploadProfilePic,


  fetchAllProperties, 
  fetchAllPropertiesWithPaginationAndFilter,
  fetchSinglePropertyById,
  submitPropertyRating,
  fetchOfferList,
  fetchAdminContact,
  
  
  addtoFavorite,
  fetchFavoriteProperty,
  removeFromFavorite,
  fetchFavoritePropertyListDetails,



  requestVisit,  
  fetchVisitRequestedList,
  fetchVisitRequestedPropertyDetails,
  

}