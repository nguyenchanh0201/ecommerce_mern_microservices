const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const generateUsername = require('../utils/generateUsername');
const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();
const { facebook_client_id, facebook_secret_key, facebook_callback_url } = require("../config/index");
const generateToken = require('../utils/generateToken');

const express = require('express');
const router = express.Router();

passport.use(
  new FacebookStrategy(
    {
      clientID: facebook_client_id,
      clientSecret: facebook_secret_key,
      callbackURL: facebook_callback_url,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await userRepository.getUserByFacebook(profile.id);
        const username = await generateUsername();

        if (!user) {
          console.log('Adding new Facebook user to DB..');
          const newUser = {
            email: `facebook_${profile.id}@example.com`,
            facebookId: profile.id,
            username: username,
            name: profile.displayName,
          };
          const createdUser = await userRepository.createUser(newUser);
          return cb(null, createdUser); 
        } else {
          console.log('Facebook User already exists in DB..');
          return cb(null, user); 
        }
      } catch (error) {
        console.error('Error during Facebook authentication:', error);
        return cb(error);
      }
    }
  )
);

router.get('/', 
  passport.authenticate('facebook')
);

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
    session: false
  }),
  async function (req, res) {
    try {
      const user = req.user;  
      const token = generateToken(user);

      console.log('Token generated:', token);
      
      res.send(`
      <script>
        window.opener.postMessage({ type: 'FACEBOOK_LOGIN', token: '${token}' }, '*');
        window.close();
      </script>
    `);
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).send({ message: 'Error generating token' });
    }
  }
);

router.get('/success', async (req, res) => {
  res.status(200).send({ message: 'Facebook login success' });
});

router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));


module.exports = router;
