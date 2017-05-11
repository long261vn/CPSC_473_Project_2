/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'draw',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    'ember-websockets': {
        socketIO: true
    },

    // Using Firebase for chat
    // firebase: {
    //   apiKey: "AIzaSyA9cMGi7pCIlic1APWh-IxZtAnkR6txErU",
    //   authDomain: "chat-f405a.firebaseapp.com",
    //   databaseURL: "https://chat-f405a.firebaseio.com",
    //   storageBucket: "chat-f405a.appspot.com"
    //
    // },
    firebase: {
      apiKey: "AIzaSyB0JQx0fOj2x7p8jZwlNB9JNxcwvkTH0lw",
      authDomain: "cs473-31370.firebaseapp.com",
      databaseURL: "https://cs473-31370.firebaseio.com",
      storageBucket: "cs473-31370.appspot.com"

    },
    torii: {
      sessionServiceName: 'session'
    },
    contentSecurityPolicy: {
      'script-src': '\'self\' \'unsafe-eval\' apis.google.com',
      'style-src': '\'self\' \'unsafe-inline\' fonts.googleapis.com',
      'font-src': '\'self\' fonts.gstatic.com',
      'frame-src': '\'self\' https://*.firebaseapp.com',
      'img-src': '\'self\' *.gravatar.com s3.amazonaws.com',
      'connect-src': '\'self\' wss://*.firebaseio.com https://*.googleapis.com'
    },


    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
