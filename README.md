# SIFTD

SIFTD is a mobile application built with Expo and React Native. This README provides instructions on how to set up the project for local development and how to contribute.

## Table of Contents

- [Installation](#installation)
- [Local Development](#local-development)
- [Bug Reports and Feature Requests](#bug-reports-and-feature-requests)

## Installation

1. **Clone the Repository**:

```bash
git clone https://github.com/calebfaruki/siftd.git
cd siftd
```

### Install Dependencies:

Ensure you have Node.js and npm installed. Then run:

```bash
npm install
```

### Set Up Expo:

If you don't have the Expo CLI installed, you can install it globally:

```bash
npm install -g expo-cli
```

## Local Development

Start the Development Server:

```bash
npm start
```

This will start the Expo development server. You can then use the Expo Go app on your mobile device to scan the QR code and run the app locally.

### Running on Emulators:

To run the app on Android or iOS emulators, use the following commands:

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

### Build archives locally:

Android

```sh
eas build -p android --local --profile preview
```

## Bug Reports and Feature Requests

If you encounter any bugs or have a feature request, please file it under the [GitHub Issues](https://github.com/calebfaruki/siftd/issues) section of this repository. Ensure to provide as much detail as possible to help in addressing the issue or request.

###

```sh
npx uglify-js siftd.min.js -b --source-map "filename='siftd.min.map'" -o siftd.js
```

### Debug

```
npx react-native log-android
npm run android
```
