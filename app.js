//=================================all packages imported================
require('dotenv').config();
const path = require('path');
const cors = require('cors'); // chatgpt
const express = require('express');
const app = express();



//=====================================CONFIGURE EXPRESS
app.use(cors({
  origin:"https://www.yandkbuildcon.com",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
})); //chatgpt
app.use(express.json());
app.use('/uploads',express.static('uploads'));

//===============================================router imported

const customerRouter = require('./api/router/customer_router');
const adminRouter = require('./api/router/admin_router');

//===============================================point endpoint router
app.use('/api/customer', customerRouter);
app.use('/api/admin', adminRouter);



//=========================================accessing property images
app.use('/api/property/accessPropertyImages', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
    // Serve the static image file
    express.static('storage/propertyImages')(req, res, (err) => {
      if (err) {
        console.error('Error serving the image:', err);
        // You can customize the error response as needed
        res.status(500).send('Error serving the image');
      }
    });
  });


  //===========================================accessing customer profile pic

  app.use('/api/customer/accessCustomerProfilePic', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
  
    // Serve the static image file
    express.static('storage/customerProfilePic')(req, res, (err) => {
      if (err) {
        console.error('Error serving the image:', err);
        // You can customize the error response as needed
        res.status(500).send('Error serving the image');
      }
    });
  });


  //==========================================accessing offer image


  app.use('/api/offer/accessOfferImage', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
  
    // Serve the static image file
    express.static('storage/offerImages')(req, res, (err) => {
      if (err) {
        console.error('Error serving the image:', err);
        // You can customize the error response as needed
        res.status(500).send('Error serving the image');
      }
    });
  });  




// -------------------------------------------webpage

app.use('/static',express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/bhuiyan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/bhuiyan.html'));
});

app.get('/Property_details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Property_details.html'));
});

app.get('/Emi', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Emi.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/blog.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// -------------------------------------------webpage end




app.listen(process.env.host_port, ()=>{
    console.log('server listening on port ', process.env.host_port);
});



