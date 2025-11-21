# City Pulse – Local Events Explorer

A React Native mobile application for exploring local events using the Ticketmaster Discovery API. Built with Expo, TypeScript, and Supabase authentication.

## 📱 Features

### Core Features

- ✓ Home screen with event search (keyword + city) using Ticketmaster Discovery API
- ✓ View event detail screen
- ✓ User can mark favourite events (local storage)
- ✓ Toggle UI between Map and Grid view
- ✓ Navigation: Splash Screen → Home → Event Details → Profile
- ✓ Display user profile
- ✓ Login & Sign Up page with Supabase authentication
- ✓ User data saved locally using AsyncStorage
- ✓ Clean, modular, and well-structured code with common bridging folder

### 🌟 Bonus Features

- ✓ **Map Preview** in event details with location markers
- ✓ **Biometric Authentication** (Face ID / Fingerprint) for secure login
- ✓ Biometric validation screen on app launch (if enabled)
- ✓ Profile page with biometric enable option
- ✓ **Multilingual Support** (English & Arabic) with RTL layout support
  - Language switcher available on Sign In, Sign Up, and Profile pages
  - Automatic RTL (Right-to-Left) layout for Arabic
  - Language preference persisted across app sessions

### Not Implemented

- ✗ Firebase (Auth, Firestore, or Storage) - Using Supabase instead

## 🔐 Authentication

### Supabase Authentication

This app uses **Supabase** for user authentication instead of Firebase.

### Important Notes:

- **Sign Up & Login**: After signup, you can navigate within the app immediately. However, due to technical limitations on Supabase that require additional setup, after logging out you cannot use the same credentials to log in again. This is a known limitation that would require additional Supabase email verification configuration.
- **Test Credentials**: For testing login functionality, you can use the following credentials:
  - **Email**: `jitendra.chand13@gmail.com`
  - **Password**: `hello@123`

### Authentication Flow:

1. **Sign Up** → User registration → Ask Biometric screen (if supported) → App
2. **Sign In** → Direct to App
3. **Biometric Validation** → If biometric is enabled, user must authenticate on app launch

## 🗺️ Google Maps API Key

⚠️ **Important**: The app currently uses a dummy Google Maps API key for development purposes. **If you want to run the application in a standalone APK, you must replace it with an actual Google Maps API key**. However, in Expo Go, the app will work fine with the dummy key.

To set up an actual Google Maps API key:

- Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
- Enable "Maps SDK for Android" and "Maps SDK for iOS" APIs
- Add the key to your `.env.development` file as `GOOGLE_MAPS_API_KEY`
- Also update `src/utils/globalConfig.ts` if you're using the `googleMapKey` property directly

## 📄 Pages

1. **Splash Screen** (`InitialScreen`) - App launch screen with Lottie animation
2. **Sign In** (`SignIn.page`) - User login with email/password
3. **Sign Up** (`SignUp.page`) - User registration with email/password/name
4. **Ask Biometric** (`AskBiometric.page`) - Prompt to enable biometric authentication after signup
5. **Biometric Validation** (`BiometricValidation.page`) - Biometric authentication screen on app launch
6. **Home** (`home.page`) - Event search with Map/Grid view toggle
   - Search events by keyword
   - Toggle between Map view and Grid view
   - Event markers on map
   - Event cards in grid layout
7. **Event Detail** (`EventDetail.page`) - Detailed event information
   - Event image as background
   - Event details (date, venue, location)
   - Map preview with event location
8. **Profile** (`profile.page`) - User profile and settings
   - User information display
   - Enable biometric authentication option
   - Logout functionality

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app installed on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd adcb
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Create a `.env.development` file in `src/env/` directory
   - Add the following environment variables:
     ```env
     DATABASE_URL=your_supabase_database_url
     PUBLIC_ANON=your_supabase_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     DISCOVERY_API_URL=your_ticketmaster_api_url
     DISCOVERY_API_KEY=your_ticketmaster_api_key
     DISCOVERY_API_SECRET=your_ticketmaster_api_secret
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

4. **Run the application**
   ```bash
   npx expo start
   # or
   npm start
   ```

## 📱 Using Expo Go on Mobile

1. **Start the development server**

   ```bash
   npx expo start
   ```

2. **On your mobile device:**

   - **iOS**: Open the Camera app and scan the QR code displayed in the terminal
   - **Android**: Open the Expo Go app and scan the QR code, or use the "Scan QR code" option

3. **Alternative methods:**

   - Press `i` in the terminal to open in iOS Simulator (Mac only)
   - Press `a` to open in Android Emulator
   - Press `w` to open in web browser

4. **Troubleshooting:**
   - Ensure your mobile device and computer are on the same Wi-Fi network
   - If QR code doesn't work, use the tunnel option: `npx expo start --tunnel`
   - For Android, you may need to use `npx expo start --android`

## 🗂️ Project Structure

```
src/
├── common/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks (useBiometric)
│   └── types/          # TypeScript type definitions
├── modules/
│   ├── auth/           # Authentication pages (SignIn, SignUp, Biometric)
│   ├── home/           # Home page and event components
│   └── profile/        # Profile page
├── routes/             # Navigation configuration
├── store/              # Context providers (AuthContext)
└── utils/              # Utility functions (storage, config, etc.)
```

## 🛠️ Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **React Query** - Data fetching and caching
- **Supabase** - Authentication and backend
- **expo-local-authentication** - Biometric authentication
- **react-native-maps** - Map integration
- **Lottie React Native** - Animations
- **AsyncStorage** - Local data persistence
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **i18next** & **react-i18next** - Internationalization and multilingual support
- **expo-localization** - Device language detection
- **expo-updates** - App reload functionality

## 📝 Assumptions Made

1. **Default Location**: The app defaults to Dubai, UAE for event searches
2. **Biometric Support**: Biometric authentication is only available on devices that support it
3. **API Rate Limits**: Ticketmaster API rate limits are handled gracefully
4. **Network Errors**: Network errors are displayed to users with retry options
5. **Storage**: User data and preferences are stored locally using AsyncStorage

## 🎯 Key Features Implementation

### Event Search

- Search events by keyword
- Filter by city (default: Dubai, UAE)
- Real-time search with debouncing
- No results handling
- **Note**: Pagination is not implemented - the app fetches a fixed number of events (50) per search

### Map & Grid Views

- Toggle between Map view and Grid view
- Map view shows event markers with location
- Grid view displays events in a 2-column layout
- Smooth transitions between views

### Biometric Authentication

- Face ID / Fingerprint support
- Automatic validation on app launch (if enabled)
- Enable/disable from profile page
- Secure authentication flow

### Event Details

- Full event information
- Venue details and address
- Interactive map with event location
- Event image as background

### Multilingual Support

- English and Arabic language support
- RTL (Right-to-Left) layout for Arabic
- Language switcher on Sign In, Sign Up, and Profile pages
- Automatic device language detection on first launch
- Language preference persisted in AsyncStorage
- **Note**: Full layout changes (RTL) require app reload, which only works in release builds

## 🌐 Multilingual Support

The app supports **English** (default) and **Arabic** languages with full RTL (Right-to-Left) layout support.

### Language Switching

- Language switcher is available on:
  - Sign In page (bottom of the form)
  - Sign Up page (bottom of the form)
  - Profile page (in settings list)

### Important Note

⚠️ **Language Change & Layout**: When changing the language, the app will reload to apply RTL layout changes. **This app reload functionality only works in release/production builds**. In development mode, text alignment changes will work immediately, but full layout changes (RTL) may require a manual app restart.

### Supported Languages

- **English** (en) - Default language, LTR layout
- **Arabic** (العربية) - RTL layout with proper text alignment

## 🐛 Known Issues

- **Authentication**: After signup, users can navigate within the app, but after logout cannot use the same credentials due to Supabase technical limitations requiring additional email verification setup. Use test credentials for login testing.
- Biometric authentication may not work in Expo Go (requires development build for full functionality)
- Language change with full RTL layout reload only works in release builds (development mode requires manual restart)
- **Maps**: The app currently uses a dummy Google Maps API key. Replace it with an actual key in `.env.development` and `src/utils/globalConfig.ts` to see maps properly
- **Pagination**: Pagination is not implemented. The app fetches a fixed number of events (50) per search and does not support loading more events or navigating through pages

## 📸 Screenshots

<img width="1080" height="2400" alt="Screenshot_1763725153" src="https://github.com/user-attachments/assets/c46818c9-6b5d-4d70-8897-900ed8117c08" />
<img width="1080" height="2400" alt="Screenshot_1763725159" src="https://github.com/user-attachments/assets/d6157651-e425-4767-80f8-cd9ca6c4ac81" />
<img width="1080" height="2400" alt="Screenshot_1763725169" src="https://github.com/user-attachments/assets/97cb07e2-c434-4c0f-840b-857cb22b5b04" />
<img width="1080" height="2400" alt="Screenshot_1763725174" src="https://github.com/user-attachments/assets/542a0ed4-d0ef-424f-a322-db90408de107" />
<img width="1080" height="2400" alt="Screenshot_1763725177" src="https://github.com/user-attachments/assets/004c6fc6-6528-4786-b93b-5fe5f4972e77" />
<img width="1080" height="2400" alt="Screenshot_1763725182" src="https://github.com/user-attachments/assets/8244c7fd-b8d7-436f-88e9-b69b3bdf7bf8" />
<img width="1080" height="2400" alt="Screenshot_1763725187" src="https://github.com/user-attachments/assets/51e896e2-3bf0-4d44-8164-8d46ef86d799" />
<img width="1080" height="2400" alt="Screenshot_1763725191" src="https://github.com/user-attachments/assets/848224e6-d63b-4402-8cc3-ca9a4bd2c1e5" />
<img width="1080" height="2400" alt="Screenshot_1763725195" src="https://github.com/user-attachments/assets/eff0234b-bc2e-4c50-a557-2be9bc38e618" />
<img width="1080" height="2400" alt="Screenshot_1763725212" src="https://github.com/user-attachments/assets/7ab337a2-3516-4d5f-95a6-2cb20af7e3cf" />
<img width="1080" height="2400" alt="Screenshot_1763725548" src="https://github.com/user-attachments/assets/98603fc8-3ec4-4e08-bb57-b2259aff6390" />



## 🔗 Live Demo

_Add demo link if hosted_


## 👤 Author

Jitender Chand

---

**Note**: This project uses Supabase for authentication. Firebase integration is not implemented as per project requirements.


