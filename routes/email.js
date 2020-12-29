const router = require('express').Router();
require('dotenv').config()

router.route('/').get((req, res) => {
    return res.json({'imageUrl': "hoihoi" });
});

router.route('/').post((req, res) => {
    const verify = req.body.verifycode;
    const verifyCheck = process.env.VERIFY_CODE
    const email = req.body.email;
    const nickname = req.body.nickname;
    const transactionId = req.body.transactionId;
    const tradeItem = req.body.tradeItem;
    if(verify === verifyCheck){
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID)
        const msg = {
            to: email,
            from:'kfreetrade@gmail.com',
            subject:`[Kpop Free Trade] Trade Request arrived from ${nickname}!`,
            text: `Trade request arrived regarding following item: ${tradeItem}`,
            html:`
              Trade request received from ${nickname} regarding this item: <strong>${tradeItem}</strong>
              <br /><br />
              <a clicktracking=off href="https://kexchange.netlify.app/transaction/${transactionId}">REPLY</a>
              <br /><br />
              Trade KPOP Goods!<br />
              Free&Secure<br />
              https://kexchange.netlify.app
              `
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
  const email = req.body.email;
  const nickname = req.body.nickname;
  const feedback = req.body.feedback;
  const title = req.body.title;
  if(verify === verifyCheck){
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID)
      const msg = {
          to: 'kfreetrade@gmail.com',
          from: 'kfreetrade@gmail.com',
          subject:`[FEEDBACK] Feedback arrived from ${email}`,
          html:`
            Title: ${title}<br /><br />
            ${feedback}<br /><br />
            from ${nickname}, ${email}
            `
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