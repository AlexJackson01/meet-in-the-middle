# meet-in-the-middle

<p align="center">
<img src="./client/src/images/meet-logo.png" width="250" />
</p>

### If you’re looking for **somewhere new**, if you’re meeting someone who **lives on the other side of town** or even the country, if you’re a couple going on a **date night**, someone organising a **first date**, colleagues going for a **work lunch**, friends or family having a **catch up**, or if you’re just plain **indecisive** about where to go, why not...

<p style="text-align: center; font-size: 30px; font-weight: bold; color: #77C29E" >
Meet in the Middle?
</p>

Meet in the Middle is an app that does what it says on the tin… simply type in two locations, select a place category and radius, and hit Search. The app will calculate the midpoint of the two locations by distance and show you the top-rated places near that midpoint. Details of your midpoint and each nearby place will be marked on a map as well as displayed on screen.

[gif of search to go here]

If you like the look of a place, you can click the heart icon on each card and the place will be added to your Favourites. Or if you don’t find a place that appeals to you, you can clear the Search and begin again / you can select an alternative category or radius and Search again.

[gif of favourites to go here]

After you’ve met in the middle, you can go to your Favourites page and rate the place you visited. You can give it an overall star rating out of 5, rate it on its price range and also recommend it based on different categories by ticking the corresponding boxes. Submit your rating by clicking the ‘Submit’ button and you will see all your recent reviews displayed at the bottom of your Favourites page.

[gif of ratings to go here]

&nbsp;
# Set up

Run ```npm install``` to install packages. Navigate to the client folder with ```cd client``` and run ```npm start``` to start the development server.

The app will run on ```http://localhost:3000``` as the default port.

The app is also available to view on Heroku - LINK HERE.

&nbsp;
# API keys

To run the location searches, you will need to sign up for an account with [Open Route Service](https://openrouteservice.org/) and [TomTom](https://developer.tomtom.com/).

*Open Route Service* – you can login with your Github account. Under ‘Dashboard’, request a free token and give it a nickname of your choice. Copy this token and copy it to the ```geoKey``` variable on **line 45** of ```App.js```.

*TomTom* – register for an account and under your account, add a new key for all APIs. Copy the key to the ```nearbyKey``` variable on **line 47** of ```App.js```.

### The API calls should now work as expected!

&nbsp;
# Firebase

For the backend to work via the development server, you will need to set up an account with [Firebase](https://firebase.google.com/).

1. Once logged in, click **‘Go to console’** in the top-right and add a project. 

2. Give it a relevant name such as **‘Meet in the Middle’** and click **‘Continue’**. 

3. You can **disable Google Analytics** and click **‘Create project’**. 

4. Once loaded, click **‘Continue’** to get started and follow the instructions below to add your config to the project.

5. **Add a ‘web’ app** to get started

<p align="center">
<img src="./client/src/images/firebase_setup.png" width="500" />
</p>

6. Give your web app a name such as ‘meet-in-the-middle’ and click **‘Register app’**

7. Copy the **firebaseConfig** code into the ```firebase.js``` file at **lines 7-15** and save

&nbsp;
## Database Tables

8. Navigate to the **Firestore Database** and click **‘Create database’**

9. Click **‘Start in test mode’** and **‘Next’**

10. Select a **Firestore location**, e.g. ```‘eur3 (Europe-west)’``` and click **'Enable'**

11. Once the database has loaded, you can now create the two required collections as follows:

&nbsp;
## favourites:

| Field      | Type | Example |
| -------- | ------ | ------------ |
| id      | String       | Rm91cnNxdWFyZTo0YWQwYjhkZWY5NjRhNTIwNjBkOTIwZTM=
| name   | String        | Fenton House
| address   | String        | Hampstead Grove, Swiss Cottage, London, NW3 6SP
| pointOne   | String        | DH99 1WB
| pointTwo   | String        | The Prince Alfred, Formosa Street
| rating   | Number        | 4.5
| user_id   | String        | bvGzUG2yWjZGxKXKwQsAUuyWlkw1

&nbsp;
## ratings:

| Field      | Type | Example |
| -------- | ------ | ------------ |
| place_id      | String       | Rm91cnNxdWFyZTo0YWQwYjhkZWY5NjRhNTIwNjBkOTIwZTM=
| user_id   | String        | bvGzUG2yWjZGxKXKwQsAUuyWlkw1
| name   | String        | Fenton House
| priceRange   | String        | ££
| rating   | Number        | 4.5
| timeDate   | String        | 1/17/2022, 8:47:03 PM
| recommendations   | Array        | {food_quality: 0, pet_friendly: 1, … }

&nbsp;
## Enabling logins

12. Navigate to the **‘Authentication’** area in the left-hand menu and click **‘Get started’**

13. Under **‘Sign-in method’**, enable **‘Email/Password’** and click **‘Save’**

<p align="center">
<img src="./client/src/images/firebase_email.png" width="500" />
</p>

14. Click **‘Add new provider’**, enable **‘Google’**, add a support email and click **‘Save’**

<p align="center">
<img src="./client/src/images/firebase_google.png" width="500" />
</p>

### Your Firebase backend should now run as expected!
&nbsp;

 _This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._


