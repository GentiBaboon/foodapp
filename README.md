# Food App

This repository contains a small example Next.js application used to track food consumption.

## Facebook Login

The login page supports authenticating users through Facebook. To use this feature you need to provide a Facebook App ID via the environment variable `NEXT_PUBLIC_FACEBOOK_APP_ID` when running the app.

The Facebook SDK for JavaScript is loaded dynamically. When a user logs in successfully their name is stored in `localStorage` and they are redirected to the dashboard.
