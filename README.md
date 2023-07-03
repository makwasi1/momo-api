# Virtual Card with Buy Now Pay Later option

The client code was built with Angular and can be found in the Client folder with the most updated code found in the Client Repository.

The server code was built in Node.js which connects to the MOMO API and the Stripe API which issues the virtual cards with the most updated code found in Heroku which we use for CI/CD development, It as well contains a Readme file with how to use it.

## To build the application and run the extension.

1.Run `npm install` to install the packages.
2. Run `ng serve` for a dev server.
3. Navigate to `http://localhost:4200/`. 
4. The application will automatically reload if you change any of the source files.
5. Run `ng build`  to bundle the angular app 
5. Go to chrome://extension and drag and drop the build folder from the previous step.
6. The build artifacts will be stored in the `dist/` directory.`.



## How to use the extension

1.Click onto the extension logo and name and a dialog box is presented to you containing a login form.
2. Enter an active MTN phone number to the login screen.
3. An OTP will be sent to your Phone via sms.
3. Enter otp of `123456` this is for sandbox testing.
4. A screen containing the card details and usage buttons is presented to you.




