const conn = require('../../database/config');
const auth = require('../../middleware/auth');
const mailer = require('../../middleware/mailer');
const randomstring = require('randomstring');
const NodeCache = require('node-cache');
const otpCache = new NodeCache();
const fs = require('fs');

otpData={};
function sendOtpForAdminLogin(data) {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM admin WHERE admin_email = ?',
        [data.ad_email],
        (selectError, selectResult) => {
          if (selectError) {
            return reject(selectError);
          }
  
          if (selectResult.length === 0) {
            const message = 'admin does not exist, please sign up.';
            return resolve({ message });
          }
  
          const otp = randomstring.generate({
            length: 6,
            charset: 'numeric',
          });
  
          const expirationTime = Date.now() + 10 * 60 * 1000;
          otpCache.set(data.ad_email, { otp, expirationTime });
          const otpData = otpCache.get(data.ad_email);
  
          console.log(otpData.otp);
          console.log(otpData.expirationTime);
  
          mailer
            .sendEmail(data.ad_email, 'login otp', `Your login OTP is: ${otp}`)
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

function verifyOtpForAdminLogin(data, callback){
    const otpData = otpCache.get(data.ad_email);
    console.log(otpData.otp);
    return new Promise((resolve, reject) => {

        if (otpData.otp === data.ad_otp){
            const currentTime = Date.now();
            console.log('valid otp');
            if(currentTime<= otpData.expirationTime){
                const token = auth.generateAccessToken(data.ad_email);
                console.log('authenticated otp');
                console.log(token);
                resolve(token );
    
            }else{
                reject({ message: 'OTP expired' });
            }
        }else{
            reject({ message: 'Invalid OTP' });
        }
        
      });
}

function adminProfile(ad_email){
    return new Promise((resolve, reject) => {
        conn.query(
          'SELECT * FROM admin WHERE admin_email = ?',
          [ad_email],
          (selectError, selectResult) => {
            if (selectError) {
              return reject(selectError);
            }
            resolve(selectResult);
          }
        );
      });
}

function insertAdminContact(data){

    return new Promise((resolve, reject)=>{
        conn.query(
            `INSERT INTO admin_contact(email, mobile, address) VALUES(?,?,?)`,
            [
                data.email,
                data.mobile,
                data.address
            ],
            (insertError, insertResult)=>{
                if(insertError){
                    reject(insertError);
                }
                resolve(insertResult);
            }
        )
    });

}

//http://bhunaksha.cg.nic.in/

function uploadOffer(offerImage, text1, text2, text3, p_id){
    return new Promise((resolve, reject) => {
      // Check if the combination of u_id and s_id already exists
      conn.query(
          `INSERT INTO offer(image_url, about1, about2, about3, property_id) VALUES (?, ?, ?, ?, ?)`,
          [
            offerImage,
            text1,
            text2,
            text3,
            p_id
          ],
          (updateError, updateResult) => {
              if (updateError) {
                  reject(updateError);
              }
              resolve(updateResult); 
          }
      );
  });
  }

function fetchCustomerRequest(){
    return new Promise((resolve, reject) => {
        // Check if the combination of u_id and s_id already exists
        conn.query(
            `
            SELECT
            visit.*,
            customer.*,
            property.*
        FROM
            visit
        JOIN
            customer ON visit.customer_id = customer.customer_id
        JOIN
            property ON visit.property_id = property.property_id;
         `,
            [
              
            ],
            (selectError, selectResult) => {
                if (selectError) {
                    reject(selectError);
                }
                resolve(selectResult); 
            }
        );
    });
}  

function insertPropertyDetails(data, callback) {
    
  // Check if the combination of u_id and s_id already exists
  conn.query(
      'SELECT * FROM property WHERE property_un=?',
      [data.p_un],
      (selectError, selectResult) => {
          if (selectError) {
              return callback(selectError);
          }

          // If the combination already exists, return a message
          if (selectResult.length > 0) {
              const message = 'propery already exist with this unique number.';
              return callback(null, { message });
          }

          // If the combination does not exist, insert the record
          conn.query(
              `INSERT INTO property(
                  property_name, 
                  property_un, 
                  property_area,
                  property_areaUnit,
                  property_price,
                  property_bookAmount,
                  property_type,
                  property_bhk,
                  property_floor,
                  property_isGarden,
                  property_isParking,
                  property_isFurnished,
                  property_isAvailable,
                  property_desc,
                  property_address,
                  property_locality,
                  property_city,
                  property_pincode,
                  property_locationUrl
                  ) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?)`,
              [
                data.p_name, 
                data.p_un, 
                data.p_area,
                data.p_areaUnit,
                data.p_price,
                data.p_bookAmount,
                data.p_type,
                data.p_bhk,
                data.p_floor,
                data.p_isGarden,
                data.p_isParking,
                data.p_isFurnished,
                data.p_isAvailable,
                data.p_desc,
                data.p_address,
                data.p_locality,
                data.p_city,
                data.p_pincode,
                data.p_locationUrl

              ],
              (insertError, insertResult) => {
                  if (insertError) {
                      return callback(insertError);
                  }

                  return callback(null, insertResult);
              }
          );
      }
  );
}

function uploadPropertyImage(p_id, propertyImage, callback){

    conn.query(
        `INSERT INTO property_image(image_url, property_id) VALUES(?,?)`,
        [
            propertyImage,
            p_id
        ],
        (insertError, insertResult) => {
            if (insertError) {
                return callback(insertError);
            }
            return callback(null, insertResult);
        }

    );

}

function deletePropertyImage(data, callback){

  conn.query(
    `DELETE FROM property_image WHERE image_url = ?`,
    [
        data.propertyImage,
    ],
    (deleteError, deleteResult) => {
        if (deleteError) {
            return callback(deleteError);
        }
        // Delete the image file from the uploads folder
        fs.unlinkSync(`storage/propertyImages/${data.propertyImage}`);
        return callback(null, deleteResult);
    }

);


}

function changeVisitStatus(data){
    return new Promise((resolve, reject) => {
        conn.query(
          `
          UPDATE visit SET v_status = ? WHERE customer_id = ? AND property_id = ?;
          `,
          [
            data.newStatus,
            data.c_id,
            data.p_id
        ],
          (updateError, updateResult) => {
            if (updateError) {
              return reject(updateError);
            }
            resolve(updateResult);
          }
        );
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
    changeVisitStatus,
}