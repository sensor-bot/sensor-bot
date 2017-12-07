# sensor-bot
sensor-bot is a web service similar to [io.adafruit.com](https://io.adafruit.com). Adafruit is great, but even with a paid plan, they delete your data after 60 days.  With sensor-bot, you own your data and can do whatever the heck you want with it.  Also, with sensor-bot's Heroku deployment guide, you can host the service for free with HTTPS and a 500MB MongoDB database.

## Demo
https://rdelhommer-demos.herokuapp.com

## Why make this when so many IoT dashboards already exist?
There are a lot of options for IoT dashboards that are more feature rich than sensor-bot and may be a better choice for you.  Some examples include:
* Grafana
* Freeboard
* Thingsboard

I wanted to make something that was easy and free to host and use.  The original reason for making this was so that some non-technical friends could install a remotely monitored temperature probe in their greenhouse.  The goal was to create something that was easy to deploy and accessible from outside their home network while requiring minimal configuration.

**With sensor-bot you get the following:**
* No changes to or reconfiguration of your home network
* Free and professionally managed Platform as a Service (PaaS) hosting.
    * Free server managed by Heroku
    * Free 500MB database managed by mLab
    * Free SSL certificate and Heroku subdomain for securely accessing your sensor-bot deployment from anywhere in the world
* Thorough deployment guide

## Deployment Guide
This guide is intended to be very thorough
### Heroku - requires a credit card on file for mLab integration
**A Note about mLab**

Technically, when you use the mLab service, you still own your data.  However, you grant mLab a license to do all sorts of things with your data "for the sole purposes of enabling mLab to provide you with the service" - whatever that means.  The relevant portion of the Terms of Service are below.

> 7.1. mLab claims no ownership rights in or to any of Your Content or Application. You retain all copyright and any other rights you already hold in Your Content and/or Application. **You hereby grant mLab a worldwide, royalty-free, and non-exclusive license to reproduce, adapt, modify, translate, publish, publicly perform, publicly display and distribute (i) all Your Content that you submit, transmit, post, process, store, or display on or through the Service, (ii) your Application, in each case, for the sole purposes of enabling mLab to provide you with the Service.**

**Step 1 - Create a new Heroku application** (Web browser)
1. Create a [heroku account](https://signup.heroku.com/dc)
2. Sign-in and create a [new app](https://dashboard.heroku.com/new-app)

**Step 2 - Install the mLab add-on to your new app** (Web browser)
1. From the dashboard of your new app, go to the "Resources" tab
2. Type "mLab" in the Add-ons section search bar and click the "mLab MongoDB" result that appears.
3. Select the "Sandbox - Free" plan and click provision.

**Step 3 - Install the Heroku CLI** (Web browser)
1. Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

**Step 4 - Get your own copy of sensor-bot** (Terminal/CMD)
1. Clone the sensor-bot repo
    ```sh
    git clone https://github.com/sensor-bot/sensor-bot
    ```
2. CD to the newly cloned git repo
    ```sh
    cd sensor-bot
    ```

**Step 5 - Deploy to Heroku** (Web browser and Terminal/CMD)
1. Login to your heroku account and enter your accont information when prompted
    ```sh
    heroku login
    ```
2. Add your heroku app as a git remote
    ```sh
    heroku git:remote -a <YOUR_APP_NAME_HERE>
    ```
    For example, if your app was called "robots-are-neato", the command would be
    ```sh
    heroku git:remote -a robots-are-neato
    ```
3. Push your application to heroku
    ```sh
    git push heroku master
    ```
4. (Optional) Set a secret app key to prevent random people from altering your sensor-bot data
    ```sh
    heroku config:set APP_SECRET=<YOUR_SECRET_KEY_HERE>
    ```

**Step 6 - Send measurements to your sensor-bot deployment** (FINALLY)
1. Send a POST request to https://<YOUR_APP_NAME_HERE>.herokuapp.com/measurement.  The request body should include the following data.
    * localStationId - Unique identifier for the measurement station (ex - greenhouse-raspberry-pi)
    * channelIndex - The measurement channel index.  On a raspberry pi, this could be the GPIO channel that your measurement was read from.
    * value - The measurement value.
    NOTE - If you created a secret app key in the following step, you must include an "app-key" header in your POST request that provides the key

    Example cURL:
    ```sh
    curl https://example-sensor-bot.herokuapp.com/measurement -d "localStationId=greenhouse-rpi&value=12&channelIndex=0" -H "app-key: super-sekrit-password"
    ```

**Step 7 - View your measurements**

Your measurements can be viewed at https://<YOUR_APP_NAME_HERE>.herokuapp.com/

## Contributing
Right now, sensor-bot is pretty barebones.  If you'd like to contribute, please create an issue with your request so that it can be evaluated.

### Development Environment
The following command will start sensor-bot with nodemon and a non-production env configuration.  Nodemon will auto-restart the service for you whenever a file is edited.
```sh
npm run dev
```

### TODO
* User can specify timeframes to query data

## Some Technical Details
sensor-bot backend is built with the [FeathersJS](https://github.com/feathersjs/feathers) framework with the [Mongoose](https://github.com/Automattic/mongoose) ORM

sensor-bot frontend is built with AngularJS, Bootstrap4, and Chart.js.
