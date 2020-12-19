const router = require('express').Router();
require('dotenv').config()

router.route('/').get((req, res) => {
    return res.json({'imageUrl': "hoihoi" });
});

router.route('/').post((req, res) => {
    const verify = req.body.verifycode;
    const verifyCheck = process.env.VERIFY_CODE
    const email = req.body.verifycode;
    const nickname = req.body.nickname;
    const transactionId = req.body.transactionId;
    const description = req.body.description;
    if(verify === verifyCheck){
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID)
        const msg = {
            to: email,
            from:'gentlebae@gmail.com',
            subject:'[K-Trade] Trade Request Arrived!',
            text: 'Trade request arrived regarding following item',
            html:`<strong>${description}</strong><br /><a href="/${transactionId}>See the Transaction</a>`
        }
        
        sgMail.send(msg)
        .then(() => {
          console.log('Email Sent')
          return res.json({'status': true });        
        })
        .catch(error => {
          console.error(error)
          return res.json({'status': false });
        })

    }
});

router.route('/feedback').post((req, res) => {
  const verify = req.body.verifycode;
  const verifyCheck = process.env.VERIFY_CODE
  const email = req.body.verifycode;
  const nickname = req.body.nickname;
  const description = req.body.description;
  if(verify === verifyCheck){
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID)
      const msg = {
          to: 'gentlebae@gmail.com',
          from: 'gentlebae@gmail.com',
          subject:'[FEEDBACK] Feedback arrived',
          text: description,
          html:`<strong>${description} from ${nickname}, ${email}</string>`
      }
      
      sgMail.send(msg)
      .then(() => {
        console.log('Email Sent')
        return res.json({'status': true });        
      })
      .catch(error => {
        console.error(error)
        return res.json({'status': false });
      })
  }
});


module.exports = router;