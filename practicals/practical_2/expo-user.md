# Lab Report 2: User Authentication with Supabase in React Native (using email and password authenticatoion)

## Objective
Build a mobile application using React Native and Expo that implements user authentication using Supabase with email and password. Allow users to view and update their profile.

## Lab Guide Reference
This lab follows the official Supabase documentation and tutorials for:
- Supabase + Expo integration
- Email/password authentication
- Session persistence and profile management

## Tools & Technologies Used
- React Native (Expo)
- Supabase
- TypeScript
- React Native Elements UI (RNEUI)
- AsyncStorage

## Implementation Steps

### Step 1: Initialize the Project
Create a new Expo app using the TypeScript template:
```bash
npx create-expo-app -t expo-template-blank-typescript expo-user-management
cd expo-user-management
```


## Installation

Run the following command to install the required dependencies:

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed
```
### Step 2: Configure Supabase Client

- File: lib/supabase.ts

```bash
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = '<YOUR_SUPABASE_URL>'
const supabaseAnonKey = '<YOUR_SUPABASE_ANON_KEY>'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```
### Step 3: Build Authentication Component
- File: components/Auth.tsx

- Enables user signup and login with email and password.

- Uses React Native Elements for UI.

- App refreshes session using AppState.

### Step 4: Build Profile Component
- File: components/Account.tsx

- Allows users to view and update profile details such as username and website.

- Uses Supabase's database for data persistence.

### Step 5: Manage Session
- File: App.tsx

```bash
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
}, [])
```
### Step 6: Run the Application

```bash
npm start or npm run web
```
### Output

![alt text](<Screenshot from 2025-04-18 20-57-16.png>)

![alt text](<Screenshot from 2025-04-18 20-10-47.png>)

### Observations & Results
- Successfully implemented Supabase authentication using email and password.

- Used AsyncStorage to persist session and enable auto-refresh of tokens.

- Users can sign up, log in, and manage their profile within the app.

### Conclusion

This lab demonstrated how to build a fully functional authentication flow in a mobile app using Supabase and React Native. The session was managed seamlessly using Expo and AsyncStorage, providing a clean developer experience.

### References
Supabase Docs - React Native Auth

*Author: [Kuenzang Rabten]*  
*Date: [April 17, 2025]*