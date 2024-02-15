const conn = require('../../database/config');
const auth = require('../../middleware/auth');
const mailer = require('../../middleware/mailer');
const randomstring = require('randomstring');
const NodeCache = require('node-cache');
const otpCache = new NodeCache();

function sendOtpForEmployeeSignup(data){
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM employee WHERE email = ?',
        [data.email],
        (selectError, selectResult) => {
          if (selectError) {
            return reject(selectError);
          }
  
          if (selectResult.length > 0) {
            const message = 'User already exist, please login.';
            return resolve({ message });
          }
  
          const otp = randomstring.generate({
            length: 6,
            charset: 'numeric',
          });
  
          const expirationTime = Date.now() + 10 * 60 * 1000;
          otpCache.set(data.email, { otp, expirationTime });
          const otpData = otpCache.get(data.email);
  
          //console.log(otpData.otp);
          //console.log(otpData.expirationTime);
  
          mailer
            .sendEmail(data.email, 'signup verification code', `Your Signup verification code is: ${otp}`)
            .then((result) => {
              // Assuming mailer.sendEmail is an asynchronous function
              // If it's synchronous, you can remove the .then() and just use the callback immediately after generating OTP
  
              // Resolve with success and OTP details
              resolve(result);
            })
            .catch((error) => {
              // Handle error
              reject(error);
            });
        }
      );
    });
}
function verifyOtpForEmployeeSignup(data, callback){
    const otpData = otpCache.get(data.email);
    //console.log(otpData.otp);
  
    if (otpData.otp === data.otp){
        const currentTime = Date.now();
        //console.log('valid otp');
        if(currentTime<= otpData.expirationTime){
            // Check if the combination of u_id and s_id already exists
       // If the combination does not exist, insert the record
       conn.query(
        `INSERT INTO employee(
            name, 
            mobile, 
            email,
            dob,
            blood_group,
            education,
            profession,
            interest,
            fname,
            mname,
            address,
            city,
            state,
            pincode,
            nominee_name,
            nominee_dob,
            relation,
            referal_code 
            ) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?,?,?,?)`,
        [
            data.name,
            data.mobile,
            data.email,
            data.dob,
            data.blood_group,
            data.education,
            data.profession,
            data.interest,
            data.fname,
            data.mname,
            data.address,
            data.city,
            data.state,
            data.pincode,
            data.nominee_name,
            data.nominee_dob,
            data.relation,
            data.referal_code
  
        ],
        (insertError, insertResult) => {
            if (insertError) {
                return callback(insertError);
            }
  
            return callback(null, insertResult);
        }
    );
  
        }else{
            callback({ message: 'OTP expired' });
        }
    }else{
        callback({ message: 'Invalid OTP' });
    }
}
function sendOtpForEmployeeLogin(data) {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM employee WHERE email = ?',
        [data.email],
        (selectError, selectResult) => {
          if (selectError) {
            return reject(selectError);
          }
  
          if (selectResult.length === 0) {
            const message = 'User does not exist, please sign up.';
            return resolve({ message });
          }
  
          const otp = randomstring.generate({
            length: 6,
            charset: 'numeric',
          });
  
          const expirationTime = Date.now() + 10 * 60 * 1000;
          otpCache.set(data.email, { otp, expirationTime });
          const otpData = otpCache.get(data.email);
  
          //console.log(otpData.otp);
          //console.log(otpData.expirationTime);
  
          mailer
            .sendEmail(data.email, 'login otp', `Your login OTP is: ${otp}`)
            .then((result) => {
              // Assuming mailer.sendEmail is an asynchronous function
              // If it's synchronous, you can remove the .then() and just use the callback immediately after generating OTP
  
              // Resolve with success and OTP details
              resolve(result);
            })
            .catch((error) => {
              // Handle error
              reject(error);
            });
        }
      );
    });
}
function verifyOtpForEmployeeLogin(data, callback){
  console.log('verify otp method called');
  console.log(data.otp);
  console.log(data.email);
    const otpData = otpCache.get(data.email);
    //console.log(otpData.otp);

    if (otpData.otp === data.otp){
        const currentTime = Date.now();
       // console.log('valid otp');
        if(currentTime<= otpData.expirationTime){
            const token = auth.generateAccessToken(data.email);
         //   console.log('authenticated otp');
          //  console.log(token);
            callback(null, token );

        }else{
            callback({ message: 'OTP expired' });
        }
    }else{
        callback({ message: 'Invalid OTP' });
    }
}
function employeeProfile(email, callback){
    conn.query(
        `SELECT * FROM employee WHERE email = ?`,
        [email],
        (selectError, selectResult)=>{
            if(selectError){
              return callback(selectError);
            }
            return callback(null, selectResult[0]);

        }
    )
}

module.exports = {
    sendOtpForEmployeeSignup,
    verifyOtpForEmployeeSignup,
    sendOtpForEmployeeLogin,
    verifyOtpForEmployeeLogin,
    employeeProfile
}

