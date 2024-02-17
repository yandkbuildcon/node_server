const customerRouter = require('../routes');
const customerController = require('../controller/customer_controller');
const auth = require('../../middleware/auth');
const customerUploads = require('../../middleware/customerUploads');


customerRouter.post('/customerSignup', customerController.customerSignup);
customerRouter.post('/sendOtpForSignup', customerController.sendOtpForSignup);
customerRouter.post('/verifyOtpForSignup', customerController.verifyOtpForSignup);
customerRouter.post('/updateCustomerDetails', auth.authenticateToken, customerController.updateCustomerDetails);
customerRouter.post('/sendOtpForLogin', customerController.sendOtpForLogin);
customerRouter.post('/verifyOtpForLogin', customerController.verifyOtpForLogin);
customerRouter.get('/customerProfile', auth.authenticateToken, customerController.customerProfile);
customerRouter.post('/uploadCustomerProfilePic', auth.authenticateToken, customerUploads.single('customerProfilePic') ,customerController.uploadProfilePic);



customerRouter.get('/fetchAllProperties', customerController.fetchAllProperties);
customerRouter.post('/fetchAllPropertiesWithPaginationAndFilter', customerController.fetchAllPropertiesWithPaginationAndFilter);
customerRouter.post('/fetchSinglePropertyById', customerController.fetchSinglePropertyById);
customerRouter.post('/submitPropertyRating', auth.authenticateToken, customerController.submitPropertyRating);
customerRouter.get('/fetchOfferList', customerController.fetchOfferList);
customerRouter.post('/fetchOffer', customerController.fetchOffer);
customerRouter.get('/fetchAdminContact', customerController.fetchAdminContact);


customerRouter.post('/addToFavorite', auth.authenticateToken, customerController.addtoFavorite);
customerRouter.post('/removeFromFavorite', auth.authenticateToken, customerController.removeFromFavorite);
customerRouter.post('/fetchFavoriteProperty', auth.authenticateToken, customerController.fetchFavoriteProperty);
customerRouter.post('/fetchFavoritePropertyListDetails', auth.authenticateToken, customerController.fetchFavoritePropertyListDetails)


customerRouter.post('/requestVisit', auth.authenticateToken, customerController.requestVisit);
customerRouter.post('/fetchVisitRequestedList', auth.authenticateToken, customerController.fetchVisitRequestedList);
customerRouter.post('/fetchVisitRequestedPropertyDetails', auth.authenticateToken, customerController.fetchVisitRequestedPropertyDetails);
customerRouter.put('/cancelRequest', auth.authenticateToken, customerController.changeVisitStatus);
customerRouter.post('/fetchBlog', customerController.fetchBlog);




module.exports = customerRouter;