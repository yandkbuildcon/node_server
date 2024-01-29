const adminRouter = require('../routes');
const adminController = require('../controller/admin_controller');
const offerUploads = require('../../middleware/offerUploads');
const auth = require('../../middleware/auth');
const propertyUpload = require('../../middleware/propertyImageUploads');

adminRouter.post('/insertPropertyDetails', adminController.insertPropertyDetails);
adminRouter.post('/sendOtpForAdminLogin', adminController.sendOtpForAdminLogin);
adminRouter.post('/verifyOtpForAdminLogin', adminController.verifyOtpForAdminLogin);
adminRouter.get('/adminProfile', auth.authenticateToken, adminController.adminProfile);



adminRouter.post('/insertAdminContact', adminController.insertAdminContact);
// Handle the file upload in your adminController
adminRouter.post('/uploadOffer', offerUploads, (req, res) => {
    // If you reach this point, the file upload was successful
    // Now you can handle additional logic using your adminController
    adminController.uploadOffer(req, res);
  });
adminRouter.get('/fetchCustomerRequest', adminController.fetchCustomerRequest);
adminRouter.post('/uploadPropertyImage', propertyUpload.upload, adminController.uploadPropertyImage);
adminRouter.post('/deletePropertyImage', adminController.deletePropertyImage);
adminRouter.put('/changeVisitStatus', adminController.changeVisitStatus);


module.exports = adminRouter;