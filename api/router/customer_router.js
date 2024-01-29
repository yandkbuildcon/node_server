const customerRouter = require('../routes');
const customerController = require('../controller/customer_controller');
const auth = require('../../middleware/auth');
const customerUploads = require('../../middleware/customerUploads');

customerRouter.post('/customerSignup', customerController.customerSignup);
customerRouter.post('/sendOtpForSignup', customerController.sendOtpForSignup);
customerRouter.post('/verifyOtpForSignup', customerController.verifyOtpForSignup);
customerRouter.post('/sendOtpForLogin', customerController.sendOtpForLogin);
customerRouter.post('/verifyOtpForLogin', customerController.verifyOtpForLogin);
customerRouter.get('/customerProfile', auth.authenticateToken, customerController.customerProfile);
customerRouter.post('/uploadCustomerProfilePic', customerUploads.single('customerProfilePic') ,customerController.uploadProfilePic);



customerRouter.get('/fetchAllProperties', customerController.fetchAllProperties);
customerRouter.post('/fetchSinglePropertyById', customerController.fetchSinglePropertyById);
customerRouter.post('/submitPropertyRating', customerController.submitPropertyRating);
customerRouter.get('/fetchOfferList', customerController.fetchOfferList);
customerRouter.get('/fetchAdminContact', customerController.fetchAdminContact);


customerRouter.post('/addToFavorite', customerController.addtoFavorite);
customerRouter.post('/removeFromFavorite', customerController.removeFromFavorite);
customerRouter.post('/fetchFavoriteProperty',customerController.fetchFavoriteProperty);
customerRouter.post('/fetchFavoritePropertyListDetails', customerController.fetchFavoritePropertyListDetails)


customerRouter.post('/requestVisit', customerController.requestVisit);
customerRouter.post('/fetchVisitRequestedList', customerController.fetchVisitRequestedList);
customerRouter.post('/fetchVisitRequestedPropertyDetails', customerController.fetchVisitRequestedPropertyDetails);




module.exports = customerRouter;