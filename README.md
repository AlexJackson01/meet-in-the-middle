<p align="center">
<img src="./client/src/images/meet-logo.png" width="250"/>
</p>

If you’re looking to go **somewhere new**, if you’re meeting someone who **lives on the other side of town**, if you’re a couple going on a **date night**, someone organising a **first date**, colleagues going for a **work lunch**, friends or family having a **catch up**, or if you’re just plain **indecisive** about where to go, why not... **_Meet in the Middle?_**

_Meet in the Middle_ is an app that does what it says on the tin… simply type in two locations, select a place category and radius, and hit Search. The app will calculate the midpoint of the two locations by distance and show you the top-rated places near that midpoint. Details of your midpoint and each nearby place will be marked on a map as well as displayed on screen.

If you like the look of a place, you can click the heart icon on each card and the place will be added to your Favourites. Or if you don’t find a place that appeals to you, you can clear the Search, select an alternative category or radius and Search again.

After you’ve met in the middle, you can go to your Favourites page and rate the place you visited. You can give it an overall star rating out of 5, rate it on its price range and also recommend it based on different categories by ticking the corresponding boxes. Submit your rating by clicking the ‘Submit’ button and you will see all your recent reviews displayed at the bottom of your Favourites page.

I created this app not only because I'm always wanting to try new things and places. Also, now that I live in a different area to my loved ones, it's always helpful to meet at a convenient place in the middle when we reunite. I recognised that although there are similar websites out there, I hadn't come across a service that made it user-friendly and visually simple to find a place and save it for later. I know that many others will find it just as useful.

&nbsp;
# Technologies used
Front end:

- React
- CSS/Bootstrap
- Figma for design mockup
- Canva for logo and intro videos
- TomTom and Open Route Service APIs for the location search
- FontAwesome for the icons
- React Router
- Google Maps - initially for its API but now for directions links

Backend:

- Firebase/Cloud Firestore 
- EmailJS - technically did the backend for me

&nbsp;
# Set up

Run ```npm install``` to install packages. Navigate to the client folder with ```cd client```, run ```npm install``` again and ```npm start``` to start the development server.

The app will run on ```http://localhost:3000``` as the default port.

The app is also available to view on [Netlify](https://meet-in-the-middle.netlify.app) @ meet-in-the-middle.netlify.app.

&nbsp;
# API keys

To run the location searches, you will need to sign up for accounts with [Open Route Service](https://openrouteservice.org/) and the [TomTom Developer Portal](https://developer.tomtom.com/). It is quick and easy to generate API keys on both sites. They offer free plans with a generous allowance of API requests per day.

_Open Route Service_ – you can login easily with your Github account. Once logged in, under your ‘Dashboard’, request a free token and give it a nickname of your choice. Copy this token and assign it to the ```geoKey``` variable on **line 44** of ```App.js```.

_TomTom_ – register for an account and on your user dashboard, add a new key for all APIs. Copy the key to the ```nearbyKey``` variable on **line 45** of ```App.js```.

### **The API calls should now work as expected!**


### **Remember**: 
Before pushing to a public Github repo, make sure your API keys are securely added to an ```.env``` file in your root folder.

For example, store the ```geoKey``` as so in the ```.env``` file:

```
REACT_APP_GEO_API_KEY=INSERTYOURKEY
```
In ```App.js```, change the corresponding API variable to read:

```
const geoKey = process.env.REACT_APP_GEO_API_KEY;
```

The same goes for the sensitive Firebase config described below. Ensure your ```.env``` file is included in the ```.gitignore``` list!

&nbsp;
# Firebase

The backend is built using [Firebase](https://firebase.google.com/). For the backend to work via the development server, you will need to set up an account with them. Your account will be automatically signed up to their free Spark plan, which has a large number of database reads and writes allowed per day/month. It won't allow you to exceed these limits unless you upgrade to their Blaze pay as you go plan - so no worries there!

1. Once logged in, click **‘Go to console’** in the top-right and add a project. 

2. Give it a relevant name such as **‘Meet in the Middle’** and click **‘Continue’**. 

3. You can **disable Google Analytics** and click **‘Create project’**. 

4. Once loaded, click **‘Continue’** to get started. A page will then appear containing the config that needs to be added to the project.

5. Next, **add a ‘web’ app** to get started, give it a name such as ‘meet-in-the-middle’ and click **‘Register app’**.

<p align="center">
<img src="./client/src/images/firebase_setup.png" width="900" />
</p>

6. Copy the **firebaseConfig** code into the ```firebase.js``` file at **lines 7-15** and save. The code will look something like this:

```
const firebaseConfig = {
  apiKey: "AIzaSyCLw7i972jHceOCpvKrrBhzYEq1ZJVj4w4",
  authDomain: "fir-b566d.firebaseapp.com",
  projectId: "fir-b566d",
  storageBucket: "fir-b566d.appspot.com",
  messagingSenderId: "420192848357",
  appId: "1:420192848357:web:6a0211610fbd899d6ac70c"
};
```

&nbsp;
## Database Tables

7. Navigate to the **Firestore Database** and click **‘Create database’**.

8. Click **‘Start in test mode’** and **‘Next’**.

9. Select a **Firestore location**, e.g. ```eur3 (Europe-west)``` and click **'Enable'**.

10. Once the database has loaded, you can now create the two required collections as follows:

&nbsp;
## Collection 1: favourites

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
## Collection 2: ratings

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

11. Navigate to the **‘Authentication’** area in the left-hand menu and click **‘Get started’**.

12. Under **‘Sign-in method’**, enable **‘Email/Password’** and click **‘Save’**.

<p align="center">
<img src="./client/src/images/firebase_email.png" width="900" />
</p>

13. Click **‘Add new provider’**, enable **‘Google’**, add a support email and click **‘Save’**.

<p align="center">
<img src="./client/src/images/firebase_google.png" width="900" />
</p>

### **Your Firebase backend should now run as expected!**
&nbsp;

## Next steps

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._ I'd love to hear any feedback or suggestions on how to take the app further - please get in touch if you have any. I'm a beginner so please be kind :D

Ideas for how I'd like to develop the project include:

- Adding search filters by user recommendations
- Adding route planning within the app itself to prevent users being taken away by external Google Maps links
- Adding an option to find the midpoint by time as well as distance - currently it uses latitudes and longitudes, but this doesn't always guarantee an equal journey from both points to the middle
- A 'Decide For Me' button which suggests the single place that is: in the middle, high rated and the most convenient to get to from both ends
- A share function - the ability to share a place from the search results with someone via email, Whatsapp, Facebook, Instagram, etc.
- Ability to leave comments during the nearby search - currently users can leave reviews once places are added to their favourites. However if they see a place they have been before, there could be a comments feature where they can tell other users if they should visit or avoid.
- Calendar invitations - to organise a meetup time and date at a desired place in the middle
- Table bookings within the app - something to investigate further via OpenTable etc.
- Creating a mobile app that incorporates the full experience above!



