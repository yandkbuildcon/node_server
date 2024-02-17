const employeeRouter = require('../routes');
const employeeController = require('../controller/employee_controller');
const auth = require('../../middleware/auth');



employeeRouter.post('/sendOtpForEmployeeSignup',   employeeController.sendOtpForEmployeeSignup);
employeeRouter.post('/verifyOtpForEmployeeSignup', employeeController.verifyOtpForEmployeeSignup);
employeeRouter.post('/sendOtpForEmployeeLogin',    employeeController.sendOtpForEmployeeLogin);
employeeRouter.post('/verifyOtpForEmployeeLogin', employeeController.verifyOtpForEmployeeLogin);
employeeRouter.get('/employeeProfile', auth.authenticateToken, employeeController.employeeProfile);


module.exports = employeeRouter;