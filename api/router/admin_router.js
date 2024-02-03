const adminRouter = require('../routes');
const adminController = require('../controller/admin_controller');
const offerUploads = require('../../middleware/offerUploads');
const auth = require('../../middleware/auth');
const propertyUpload = require('../../middleware/propertyImageUploads');

adminRouter.post('/insertPropertyDetails', auth.authenticateToken, adminController.insertPropertyDetails);
adminRouter.post('/sendOtpForAdminLogin', adminController.sendOtpForAdminLogin);
adminRouter.post('/verifyOtpForAdminLogin', adminController.verifyOtpForAdminLogin);
adminRouter.get('/adminProfile', auth.authenticateToken, adminController.adminProfile);



adminRouter.post('/insertAdminContact', auth.authenticateToken, adminController.insertAdminContact);
// Handle the file upload in your adminController
adminRouter.post('/uploadOffer', auth.authenticateToken, offerUploads, (req, res) => {
    // If you reach this point, the file upload was successful
    // Now you can handle additional logic using your adminController
    adminController.uploadOffer(req, res);
  });

adminRouter.post('/deleteOffer', auth.authenticateToken, adminController.deleteOffer);
adminRouter.post('/fetchCustomerRequest', auth.authenticateToken, adminController.fetchCustomerRequest);
adminRouter.post('/uploadPropertyImage', auth.authenticateToken, propertyUpload.upload, adminController.uploadPropertyImage);
adminRouter.post('/deletePropertyImage', auth.authenticateToken, adminController.deletePropertyImage);
adminRouter.put('/changeVisitStatus', auth.authenticateToken, adminController.changeVisitStatus);
adminRouter.put('/changePropertyAvailability', auth.authenticateToken, adminController.changePropertyAvailability);
adminRouter.post('/fetchAllCustomerList', auth.authenticateToken, adminController.fetchAllCustomerList);


module.exports = adminRouter;