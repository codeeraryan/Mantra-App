# Mantra Counter App

A simple and elegant mobile application for tracking mantra repetitions. Built with React Native and Expo, this app provides a minimalist interface to help you stay focused on your spiritual practice.

## Features

- **Simple Counter**: Track your mantra repetitions with a single tap
- **Target Setting**: Set personalized targets for your practice sessions
- **Progress Tracking**: Visual progress bar shows completion percentage
- **Notifications**: Receive audio and vibration alerts when you reach your target
- **Data Persistence**: Your count and target are saved even when you close the app

## Screenshots

![Mantra Counter Main Screen](https://github.com/user-attachments/assets/87098da5-ccf2-4341-8802-441bcb66a022)
![Target Setting Modal](https://github.com/user-attachments/assets/7353ad04-29e5-4336-b404-be527bd62d95)
![Target Reached Alert](https://github.com/user-attachments/assets/ef995ebb-eaf4-4c70-9f49-60ad3d1591e9)



## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/mantra-counter.git
   cd mantra-counter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add a bell sound file:
   - Download a bell sound (mp3 format)
   - Rename it to `bell.mp3`
   - Place it in the `assets` folder

4. Start the development server:
   ```bash
   expo start
   ```

5. Run on your device:
   - Scan the QR code with the Expo Go app (Android) or the Camera app (iOS)
   - Or press 'i' to open in iOS simulator / 'a' to open in Android emulator

## Dependencies

- React Native
- Expo
- @react-native-async-storage/async-storage
- expo-av

## Usage

- **Increment Counter**: Tap the large purple button
- **Reset Counter**: Press the "Reset" button
- **Set Target**: Press the "Set Target" button and enter your desired number of repetitions
- **Track Progress**: View your progress in the progress bar beneath the counter
- **Notifications**: When you reach your target, you'll receive a vibration, sound alert, and congratulation message

