# React Native Authentication App

A complete authentication system with Login, Signup, and Home screens built using React Native and Expo.

## Features

- User Login with email and password
- User Signup with name, email, and password
- Persistent authentication using AsyncStorage
- Form validation with real-time error messages
- Password visibility toggle
- Context API for state management

## Installation

```bash
npm install
```

## Run the App

**Android:**
```bash
npx expo run:android
```

**iOS:**
```bash
npx expo run:ios
```

**Expo Go:**
```bash
npx expo start
```

## Project Structure

```
src/
├── context/AuthContext.js       # Authentication state management
├── screens/                     # Login, Signup, Home screens
├── components/                  # Reusable UI components
├── utils/validation.js          # Form validation functions
└── styles/commonStyles.js       # Shared styles
```

## Tech Stack

- React Native
- Expo
- React Navigation
- AsyncStorage
- React Context API
