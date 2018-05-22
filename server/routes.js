const router = require('express').Router();
const db = require('../database/index');
const { addNewUser } = require('../database/index');
const axios = require('axios');
const { sgAPI, unsplashAPI } = require('../config.js');
const { API, GOOGLE_PLACES } = require('../config.js');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS} = require('../config.js')
const sgMail = require('@sendgrid/mail');
const _ = require('underscore');
const {google} = require('googleapis');
const calendar = google.calendar('v3');

router.route('/login')
  .get((req, res) => {
  // console.log(req.query)
    const userInfo = req.query;
    // let token = req.query['0']
    db.checkLogin(userInfo.email)
      .then((data) => {
        console.log('db back', data);
        if (data.rowCount === 0) {
        // console.log('hi new user!!!!')
        // query insert new data
          return db.addNewUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.uid);
        }
        // console.log('matched', data.rows[0])
        // res.json(data.rows[0])
        // res.status(200).send('user exists, login success')
        return data;
      })
      .then((data) => {
      // console.log('response', data)
        res.status(200).send({ userId: data.rows[0].id });
      })
      .catch((err) => {
        console.error(err);
      });
  });

router.route('/users')
  .get((req, res) => {
    const { username } = req.query;
    db.getFirstNameByUsername(username)
      .then((data) => {
        res.json(data.rows[0]);
      });
  })
  .post((req, res) => {
    const newUser = req.body;
    // console.log('going to add this user: ', newUser);
    db.addNewUser(newUser)
      .then((response) => {
        const addedUser = response;
        // console.log('added this user: ', addedUser);
        res.send(`Added User ${addedUser}`);
      })
      .catch((err) => {
        console.error('did not add user: ', err);
        res.send(err);
      });
  });

router.route('/home')
  .get()
  .post()
  .delete();


router.route('/trips')
  .get((req, res) => {
    db.getTripsByUser(req.query.userId)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
  })
  .delete((req, res) => {
    // console.log(req.body.tripId)
    db.deleteTrip(req.body.tripId)
      .then(() => {
        // console.log('success in delete')
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/newTrip')
  .post((req, res) => {
    const trip = req.body;
    db.addTripToTrips(trip)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/tripId')
  .get((req, res) => {
    const owner = req.query.id;
    // console.log('getting newly created trip for this owner: ', owner);
    db.getNewTripId(owner)
      .then((response) => {
        const newTrip = response.rows[0];
        res.send(newTrip);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/usersByTrips')
  .get()
  .post((req, res) => {
    const { newTripId, ownerId } = req.body;

    db.addTripsByUser(ownerId, newTripId)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  });


router.route('/discover')
  .get()
  .post()
  .delete();

router.route('/getCoordinates')
  .get((req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query[0]}&key=${GOOGLE_PLACES}`)
      .then((data) => {
        const cityData = {
          formattedName: data.data.results[0].formatted_address,
          coordinates: data.data.results[0].geometry.location,
          place_id: data.data.results[0].place_id,
        };
        res.status(200).send(cityData);
      })
      .catch((err) => {
        console.log('couldnt get data:', err);
        res.status(400).send(err);
      });
  });

router.route('/getNearbyPlacesByType')
  .get((req, res) => {
    Promise.all(req.query[0].map(type => axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query[1]},${req.query[2]}&radius=1500&type=${type}&key=${GOOGLE_PLACES}`)))
      .then((places) => {
        const placeData = places.map(received => received.data.results);
        let outArr = [];
        for (let i = 0; i < placeData.length; i++) {
          outArr = outArr.concat(placeData[i]);
        }
        outArr = _.uniq(outArr, false, place => place.id);
        outArr.sort((a,b) => {
          return b.rating - a.rating
        });
        let results = outArr.slice(0,9)
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log('couldnt get all places in server:', err);
        res.status(400).send(err);
      });
  });

router.route('/trip/members')
  .get((req, res) => {
    const { tripId } = req.query;
    db.getTripMembers(tripId)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.sendStatus(400).send(err);
      });
  })
  .post((req, res) => {
    const { userId, tripId } = req.body.params;
    db.addMember(userId, tripId)
      .then((() => {
        res.sendStatus(201);
      }))
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    const { memberId, tripId } = req.body;
    db.deleteTripMember(memberId, tripId)
      .then((response) => {
        res.status(202).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/trip/invite')
  .get((req, res) => {
    const { userId, tripId } = req.query;
    db.getPendingInvites(userId, tripId)
      .then((data) => {
        res.json(data.rows);
      });
  })
  .post((req, res) => {
    sgMail.setApiKey(sgAPI);
    const {
      toEmail, trip_id, owner_id, email, firstName, city,
    } = req.body.params;

    axios.get(`https://api.unsplash.com/search/photos/?query=${city}&client_id=${unsplashAPI}`)
      .then((data) => {
        const imgUrl = data.data.results[0].urls.small;
        const msg = {
          to: toEmail,
          from: email,
          subject: `${firstName} sent you a Travel Peanut Invite`,
          text: `${firstName} has invited you to a magical journey`,
          html: `<!doctype html>
          <html xmlns=http://www.w3.org/1999/xhtml xmlns:v=urn:schemas-microsoft-com:vml xmlns:o=urn:schemas-microsoft-com:office:office>
          <head>
          <!--[if gte mso 15]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <meta charset=UTF-8>
          <meta http-equiv=X-UA-Compatible content="IE=edge">
          <meta name=viewport content="width=device-width, initial-scale=1">
          <title>*|MC:SUBJECT|*</title>
          <style type=text/css>p{margin:10px 0;padding:0}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{display:block;margin:0;padding:0}img,a img{border:0;height:auto;outline:0;text-decoration:none}body,#bodyTable,#bodyCell{height:100%;margin:0;padding:0;width:100%}.mcnPreviewText{display:none!important}#outlook a{padding:0}img{-ms-interpolation-mode:bicubic}table{mso-table-lspace:0;mso-table-rspace:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}p,a,li,td,blockquote{mso-line-height-rule:exactly}a[href^=tel],a[href^=sms]{color:inherit;cursor:default;text-decoration:none}p,a,li,td,body,table,blockquote{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{line-height:100%}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.templateContainer{max-width:600px!important}a.mcnButton{display:block}.mcnImage,.mcnRetinaImage{vertical-align:bottom}.mcnTextContent{word-break:break-word}.mcnTextContent img{height:auto!important}.mcnDividerBlock{table-layout:fixed!important}h1{color:#222;font-family:Helvetica;font-size:40px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:center}h2{color:#222;font-family:Helvetica;font-size:34px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:left}h3{color:#444;font-family:Helvetica;font-size:22px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:left}h4{color:#999;font-family:Georgia;font-size:20px;font-style:italic;font-weight:normal;line-height:125%;letter-spacing:normal;text-align:center}#templateHeader{background-color:#a6dbce;background-image:url("https://gallery.mailchimp.com/7cf149b21fa6811f5936bb306/images/68400b29-4d61-4b22-9491-03fd6f05b3d6.png");background-repeat:repeat;background-position:;background-size:auto;border-top:0;border-bottom:0;padding-top:54px;padding-bottom:54px}.headerContainer{background-color:transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0}.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{color:#808080;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left}.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{color:#00add8;font-weight:normal;text-decoration:underline}#templateBody{background-color:#fff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:36px;padding-bottom:54px}.bodyContainer{background-color:transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0}.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{color:#808080;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left}.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{color:#00add8;font-weight:normal;text-decoration:underline}#templateFooter{background-color:#333;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:45px;padding-bottom:63px}.footerContainer{background-color:transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0}.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{color:#fff;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center}.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{color:#fff;font-weight:normal;text-decoration:underline}@media only screen and (min-width:768px){.templateContainer{width:600px!important}}@media only screen and (max-width:480px){body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:none!important}}@media only screen and (max-width:480px){body{width:100%!important;min-width:100%!important}}@media only screen and (max-width:480px){.mcnRetinaImage{max-width:100%!important}}@media only screen and (max-width:480px){.mcnImage{width:100%!important}}@media only screen and (max-width:480px){.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{max-width:100%!important;width:100%!important}}@media only screen and (max-width:480px){.mcnBoxedTextContentContainer{min-width:100%!important}}@media only screen and (max-width:480px){.mcnImageGroupContent{padding:9px!important}}@media only screen and (max-width:480px){.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{padding-top:9px!important}}@media only screen and (max-width:480px){.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{padding-top:18px!important}}@media only screen and (max-width:480px){.mcnImageCardBottomImageContent{padding-bottom:9px!important}}@media only screen and (max-width:480px){.mcnImageGroupBlockInner{padding-top:0!important;padding-bottom:0!important}}@media only screen and (max-width:480px){.mcnImageGroupBlockOuter{padding-top:9px!important;padding-bottom:9px!important}}@media only screen and (max-width:480px){.mcnTextContent,.mcnBoxedTextContentColumn{padding-right:18px!important;padding-left:18px!important}}@media only screen and (max-width:480px){.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{padding-right:18px!important;padding-bottom:0!important;padding-left:18px!important}}@media only screen and (max-width:480px){.mcpreview-image-uploader{display:none!important;width:100%!important}}@media only screen and (max-width:480px){h1{font-size:30px!important;line-height:125%!important}}@media only screen and (max-width:480px){h2{font-size:26px!important;line-height:125%!important}}@media only screen and (max-width:480px){h3{font-size:20px!important;line-height:150%!important}}@media only screen and (max-width:480px){h4{font-size:18px!important;line-height:150%!important}}@media only screen and (max-width:480px){.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{font-size:14px!important;line-height:150%!important}}@media only screen and (max-width:480px){.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{font-size:16px!important;line-height:150%!important}}@media only screen and (max-width:480px){.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{font-size:16px!important;line-height:150%!important}}@media only screen and (max-width:480px){.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{font-size:14px!important;line-height:150%!important}}</style></head>
          <body>
          <!--[if !gte mso 9]><span class=mcnPreviewText style=display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;visibility:hidden;mso-hide:all>*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
          <center>
          <table align=center border=0 cellpadding=0 cellspacing=0 height=100% width=100% id=bodyTable>
          <tr>
          <td align=center valign=top id=bodyCell>
          <table border=0 cellpadding=0 cellspacing=0 width=100%>
          <tr>
          <td align=center valign=top id=templateHeader data-template-container>
          <!--[if (gte mso 9)|(IE)]>
          <table align=center border=0 cellspacing=0 cellpadding=0 width=600 style=width:600px>
          <tr>
          <td align=center valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=center border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer>
          <tr>
          <td valign=top class=headerContainer><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%>
          <tbody class=mcnTextBlockOuter>
          <tr>
          <td valign=top class=mcnTextBlockInner style=padding-top:9px>
          <!--[if mso]>
          <table align=left border=0 cellspacing=0 cellpadding=0 width=100% style=width:100%>
          <tr>
          <![endif]-->
          <!--[if mso]>
          <td valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=max-width:100%;min-width:100% width=100% class=mcnTextContentContainer>
          <tbody><tr>
          <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px>
          <h2 class=null>${firstName} has invited on a trip to ${city}!</h2>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </tbody>
          </table></td>
          </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          <tr>
          <td align=center valign=top id=templateBody data-template-container>
          <!--[if (gte mso 9)|(IE)]>
          <table align=center border=0 cellspacing=0 cellpadding=0 width=600 style=width:600px>
          <tr>
          <td align=center valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=center border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer>
          <tr>
          <td valign=top class=bodyContainer><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%>
          <tbody class=mcnTextBlockOuter>
          <tr>
          <td valign=top class=mcnTextBlockInner style=padding-top:9px>
          <!--[if mso]>
          <table align=left border=0 cellspacing=0 cellpadding=0 width=100% style=width:100%>
          <tr>
          <![endif]-->
          <!--[if mso]>
          <td valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=max-width:100%;min-width:100% width=100% class=mcnTextContentContainer>
          <tbody><tr>
          <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px>
          <p>${firstName} has invited you to a trip&nbsp;to ${city}!&nbsp;You can communicate with your travel mates, discover&nbsp;new places, and help plan your trip. Get started by accepting the invite and getting started all through Travel Peanut!</p>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnDividerBlock style=min-width:100%>
          <tbody class=mcnDividerBlockOuter>
          <tr>
          <td class=mcnDividerBlockInner style="min-width:100%;padding:27px 18px 0">
          <table class=mcnDividerContent border=0 cellpadding=0 cellspacing=0 width=100% style=min-width:100%>
          <tbody><tr>
          <td>
          <span></span>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnImageGroupBlock>
          <tbody class=mcnImageGroupBlockOuter>
          <tr>
          <td valign=top style=padding:9px class=mcnImageGroupBlockInner>
          <table align=left width=564 border=0 cellpadding=0 cellspacing=0 class=mcnImageGroupContentContainer>
          <tbody><tr>
          <td class=mcnImageGroupContent valign=top style=padding-left:9px;padding-top:0;padding-bottom:0>
          <img alt src=${imgUrl} width=564 style=max-width:100%;padding-bottom:0 class=mcnImage>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          <tr>
          <td valign=top style=padding:9px class=mcnImageGroupBlockInner>
          <table align=left width=273 border=0 cellpadding=0 cellspacing=0 class=mcnImageGroupContentContainer>
          <tbody><tr>
          <td class=mcnImageGroupContent valign=top style=padding-left:9px;padding-top:0;padding-bottom:0>
          <a href="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-0.3.5&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;s=871a02b242b32565bf5ca078f370ef13&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" title class target=_blank>
          <img alt src=https://gallery.mailchimp.com/7cf149b21fa6811f5936bb306/images/b7d9bd6b-4785-4350-9017-ac6400000c9e.jpeg width=264 style=max-width:100%;padding-bottom:0 class=mcnImage>
          </a>
          </td>
          </tr>
          </tbody></table>
          <table align=right width=273 border=0 cellpadding=0 cellspacing=0 class=mcnImageGroupContentContainer>
          <tbody><tr>
          <td class=mcnImageGroupContent valign=top style=padding-right:9px;padding-top:0;padding-bottom:0>
          <img alt src=https://gallery.mailchimp.com/7cf149b21fa6811f5936bb306/images/a106eb9d-83e8-4695-97ae-8432ad35e9b4.jpeg width=264 style=max-width:100%;padding-bottom:0 class=mcnImage>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnDividerBlock style=min-width:100%>
          <tbody class=mcnDividerBlockOuter>
          <tr>
          <td class=mcnDividerBlockInner style="min-width:100%;padding:9px 18px 0">
          <table class=mcnDividerContent border=0 cellpadding=0 cellspacing=0 width=100% style=min-width:100%>
          <tbody><tr>
          <td>
          <span></span>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnDividerBlock style=min-width:100%>
          <tbody class=mcnDividerBlockOuter>
          <tr>
          <td class=mcnDividerBlockInner style="min-width:100%;padding:9px 18px">
          <table class=mcnDividerContent border=0 cellpadding=0 cellspacing=0 width=100% style="min-width:100%;border-top:1px solid #e0e0e0">
          <tbody><tr>
          <td>
          <span></span>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%>
          <tbody class=mcnTextBlockOuter>
          <tr>
          <td valign=top class=mcnTextBlockInner style=padding-top:9px>
          <!--[if mso]>
          <table align=left border=0 cellspacing=0 cellpadding=0 width=100% style=width:100%>
          <tr>
          <![endif]-->
          <!--[if mso]>
          <td valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=max-width:100%;min-width:100% width=100% class=mcnTextContentContainer>
          <tbody><tr>
          <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px>
          <h3>You can start planing your own trips through Travel Peanut:</h3>
          <ul>
          <li>Invite friends and family</li>
          <li>Explore new places in your destination</li>
          <li>Create a full itinerary</li>
          <li>Sync your google calendar</li>
          <li>Send email invites</li>
          <li>Manage multiple trips</li>
          <li>Share messages with the whole group&nbsp;</li>
          </ul>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnDividerBlock style=min-width:100%>
          <tbody class=mcnDividerBlockOuter>
          <tr>
          <td class=mcnDividerBlockInner style="min-width:100%;padding:18px 18px 0">
          <table class=mcnDividerContent border=0 cellpadding=0 cellspacing=0 width=100% style=min-width:100%>
          <tbody><tr>
          <td>
          <span></span>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnButtonBlock style=min-width:100%>
          <tbody class=mcnButtonBlockOuter>
          <tr>
          <td style=padding-top:0;padding-right:18px;padding-bottom:18px;padding-left:18px valign=top align=center class=mcnButtonBlockInner>
          <table border=0 cellpadding=0 cellspacing=0 class=mcnButtonContentContainer style=border-collapse:separate!important;border-radius:3px;background-color:#00add8>
          <tbody>
          <tr>
          <td align=center valign=middle class=mcnButtonContent style=font-family:Helvetica;font-size:18px;padding:18px>
          <a class=mcnButton title="Get Started with Travel Peanut!" href=http://ec2-52-91-87-32.compute-1.amazonaws.com target=_self style=font-weight:bold;letter-spacing:-0.5px;line-height:100%;text-align:center;text-decoration:none;color:#fff>Get Started with Travel Peanut!</a>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table></td>
          </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          <tr>
          <td align=center valign=top id=templateFooter data-template-container>
          <!--[if (gte mso 9)|(IE)]>
          <table align=center border=0 cellspacing=0 cellpadding=0 width=600 style=width:600px>
          <tr>
          <td align=center valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=center border=0 cellpadding=0 cellspacing=0 width=100% class=templateContainer>
          <tr>
          <td valign=top class=footerContainer><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowBlock style=min-width:100%>
          <tbody class=mcnFollowBlockOuter>
          <tr>
          <td align=center valign=top style=padding:9px class=mcnFollowBlockInner>
          <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentContainer style=min-width:100%>
          <tbody><tr>
          <td align=center style=padding-left:9px;padding-right:9px>
          <table border=0 cellpadding=0 cellspacing=0 width=100% style=min-width:100% class=mcnFollowContent>
          <tbody><tr>
          <td align=center valign=top style=padding-top:9px;padding-right:9px;padding-left:9px>
          <table align=center border=0 cellpadding=0 cellspacing=0>
          <tbody><tr>
          <td align=center valign=top>
          <!--[if mso]>
          <table align=center border=0 cellspacing=0 cellpadding=0>
          <tr>
          <![endif]-->
          <!--[if mso]>
          <td align=center valign=top>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=display:inline>
          <tbody><tr>
          <td valign=top style=padding-right:10px;padding-bottom:9px class=mcnFollowContentItemContainer>
          <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem>
          <tbody><tr>
          <td align=left valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px>
          <table align=left border=0 cellpadding=0 cellspacing=0 width>
          <tbody><tr>
          <td align=center valign=middle width=24 class=mcnFollowIconContent>
          <a href=http://www.facebook.com target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png style=display:block height=24 width=24 class></a>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          <td align=center valign=top>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=display:inline>
          <tbody><tr>
          <td valign=top style=padding-right:10px;padding-bottom:9px class=mcnFollowContentItemContainer>
          <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem>
          <tbody><tr>
          <td align=left valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px>
          <table align=left border=0 cellpadding=0 cellspacing=0 width>
          <tbody><tr>
          <td align=center valign=middle width=24 class=mcnFollowIconContent>
          <a href=http://www.twitter.com/ target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png style=display:block height=24 width=24 class></a>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          <td align=center valign=top>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=display:inline>
          <tbody><tr>
          <td valign=top style=padding-right:10px;padding-bottom:9px class=mcnFollowContentItemContainer>
          <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem>
          <tbody><tr>
          <td align=left valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px>
          <table align=left border=0 cellpadding=0 cellspacing=0 width>
          <tbody><tr>
          <td align=center valign=middle width=24 class=mcnFollowIconContent>
          <a href=http://www.instagram.com/ target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png style=display:block height=24 width=24 class></a>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          <td align=center valign=top>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=display:inline>
          <tbody><tr>
          <td valign=top style=padding-right:0;padding-bottom:9px class=mcnFollowContentItemContainer>
          <table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnFollowContentItem>
          <tbody><tr>
          <td align=left valign=middle style=padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px>
          <table align=left border=0 cellpadding=0 cellspacing=0 width>
          <tbody><tr>
          <td align=center valign=middle width=24 class=mcnFollowIconContent>
          <a href=http://mailchimp.com target=_blank><img src=https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png style=display:block height=24 width=24 class></a>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnDividerBlock style=min-width:100%>
          <tbody class=mcnDividerBlockOuter>
          <tr>
          <td class=mcnDividerBlockInner style=min-width:100%;padding:18px>
          <table class=mcnDividerContent border=0 cellpadding=0 cellspacing=0 width=100% style="min-width:100%;border-top:2px solid #505050">
          <tbody><tr>
          <td>
          <span></span>
          </td>
          </tr>
          </tbody></table>
          </td>
          </tr>
          </tbody>
          </table><table border=0 cellpadding=0 cellspacing=0 width=100% class=mcnTextBlock style=min-width:100%>
          <tbody class=mcnTextBlockOuter>
          <tr>
          <td valign=top class=mcnTextBlockInner style=padding-top:9px>
          <!--[if mso]>
          <table align=left border=0 cellspacing=0 cellpadding=0 width=100% style=width:100%>
          <tr>
          <![endif]-->
          <!--[if mso]>
          <td valign=top width=600 style=width:600px>
          <![endif]-->
          <table align=left border=0 cellpadding=0 cellspacing=0 style=max-width:100%;min-width:100% width=100% class=mcnTextContentContainer>
          <tbody><tr>
          <td valign=top class=mcnTextContent style=padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px>
          <em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
          <br>
          *|IFNOT:ARCHIVE_PAGE|*
          *|LIST:DESCRIPTION|*
          <br>
          <br>
          <strong>Our mailing address is:</strong>
          <br>
          *|HTML:LIST_ADDRESS_HTML|* *|END:IF|*
          <br>
          <br>
          Want to change how you receive these emails?<br>
          You can <a href=*|UPDATE_PROFILE|*>update your preferences</a> or <a href=*|UNSUB|*>unsubscribe from this list</a>.
          <br>
          <br>
          *|IF:REWARDS|* *|HTML:REWARDS|*
          *|END:IF|*
          </td>
          </tr>
          </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </tbody>
          </table></td>
          </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
          </tr>
          </table>
          </td>
          </tr>
          </table>
          </center>
          </body>
          </html>`
        };
        sgMail.send(msg);
        db.saveInvite(toEmail, trip_id, owner_id)
          .then((response) => {
            res.status(201).send(response);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  })
  .delete((req, res) => {
    const { email, tripId } = req.query;
    db.deleteInvite(email, tripId)
      .then(() => {
        res.sendStatus(202);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/invitations')
  .get((req, res) => {
    const { email } = req.query;
    db.getInvitations(email)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    const { email, tripId } = req.query;
    db.deleteInvitation(email, tripId)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/activities')  
  .get((req, res) => {
    const { tripId, activityDate} = req.query
    db.getActivites(tripId, activityDate)
      .then((activities) => {
        res.status(200).send(activities);
      })
      .catch((err) => {
        console.error('couldnt get activities:', err);
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    let {tripId, activityDate, startTime, activityName} = req.body.params    
    db.addActivity(tripId, activityDate, startTime, activityName)
      .then((success) => {
        res.status(200).send(success);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });


router.route('/updateActivity')
  .post((req, res) => {
    let {id, startTime, newActivityName} = req.body.params
    db.updateActivity(id, startTime, newActivityName)
    .then((success) => {
      res.status(200).send(success)
    })
    .catch(err => {
      console.error('couldnt update activity:', err)
      res.status(400).send(err)
    })
  })
  .delete((req, res) => {
    db.deleteActivity(req.query.id)
      .then((success) => {
        res.status(200).send(success)
      })
      .catch(err => {
        console.error('couldnt delete in route:', err)
        res.status(400).send(err)
      })
  })
router.route('/itinerary')
  .post((req, res) => {
    const {accessToken} = req.body.params
    let oauth = new google.auth.OAuth2(
      CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);
    oauth.setCredentials({access_token: accessToken});
    //make a database call to pull the activities
    let resource = {
        "summary": "Appointment",
        "location": "Somewhere",
        "start": {
          'dateTime': '2018-05-28T17:00:00',
          'timeZone': 'America/Los_Angeles'              
        },
        "end": {
          'dateTime': '2018-05-28T18:00:00',
          'timeZone': 'America/Los_Angeles'
        }
      };
      calendar.events.insert({
        'calendarId': 'primary',
        'auth': oauth,
        'resource': resource
      })     
      .then((response) => res.json(response.data))
      .catch((error) => res.sendStatus(400))
})

  router.route('/upVoteActivity')
    .post((req, res) => {
      let {activityId, userId, tripId} = req.body.params
      db.upVoteActivity(activityId, userId, tripId)
      .then((success) => {
        res.status(200).send(success)
      })
      .catch(err => {
        console.error('couldnt update activity votes:', err)
        res.status(400).send(err)
      })
    })

  router.route('/downVoteActivity')
  .post((req, res) => {
    let {activityId, userId, tripId} = req.body.params
    db.downVoteActivity(activityId, userId, tripId)
    .then((success) => {
      res.status(200).send(success)
    })
    .catch(err => {
      console.error('couldnt update activity votes:', err)
      res.status(400).send(err)
    })
  })

  router.route('/votes')
  .get((req,res) => {
    let {tripId} = req.query
    db.getVotes(tripId)
    .then(data => {
      console.log('just got alll the votes!!!!!')
      res.status(200).send(data)
    })
    .catch(err => {
      console.log('couldnt get response from db:', err)
    })
  })

module.exports = router;
