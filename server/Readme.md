## About the Momocard server code.
#### [The Backend is composed of:]

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Firebase](https://www.mongodb.com/)
4. [JWT](https://jwt.io/)
5. [Mtn-momo](https://momodeveloper.mtn.com/developer/)
6. [Stripe](https://stripe.com/)
7. [Heroku](https://www.heroku.com/)

### Api end points and required Fields.

1. [Login] : {post}{ method url}(https://momocard.herokuapp.com/api/login)(request body fields, phone_number. Exclude the plus sign and include the country code.)
2. [Get All users] : {Get}{ method url}(https://momocard.herokuapp.com/api/users)(request parameter fields None.) (request header. JWT token from Firebase.)
3. [Get Single user] : {Get}{ method url}(https://momocard.herokuapp.com/api/user/:phone_number)(request parameter fields phone_number.) (request header. JWT token from Firebase.).
4. [Update Single user] : {Put}{ method url}(https://momocard.herokuapp.com/api/user/:phone_number)(request parameter fields phone_number.) (request header. JWT token from Firebase.).
5. [Delete Single user] : {Delete}{ method url}(https://momocard.herokuapp.com/api/user/:phone_number)(request parameter fields phone_number.) (request header. JWT token from Firebase.).
6. [Top up virtual card] : {Post}{ method url}(https://momocard.herokuapp.com/api/vcard/topup)(request parameter fields phone_number and amount.) (request header. JWT token from Firebase.).

7. [Request virtual card credit] : {Get}{ method url}(https://momocard.herokuapp.com/api/vcard/requestprefund/:phone_number)(request parameter fields phone_number).
8. [Update  virtual card status] : {Put}{ method url}(https://momocard.herokuapp.com/api/vcard/updatecardstatus/:phone_number)(request parameter fields phone_number.) (request header. JWT token from Firebase.).
9.   [Get virtual card details] : {Get}{ method url}(https://momocard.herokuapp.com/api/vcard/carddetails/:phone_number)(request parameter fields phone_number.) 
10.  [Get virtual card transaction history]: {Get}{ method url}(https://momocard.herokuapp.com/api/vcard/cardtransaction/:phone_number)(request parameter fields phone_number.).