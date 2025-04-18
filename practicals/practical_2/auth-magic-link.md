### Lab Report 2: User Authentication with Supabase in React Native (using Magic Link Authentication)

### Objective
Build a mobile application using React Native and Expo that implements user authentication using Supabase with Magic Link. Allow users to view and update their profile.

### Lab Guide Reference
This lab follows the official Supabase documentation and tutorials for:

- Supabase + Expo integration

- Magic Link authentication

- Session persistence and profile management

### Tools & Technologies Used
- React Native (Expo)

- Supabase

- TypeScript

- React Native Elements UI (RNEUI)

- AsyncStorage

### Implementation Steps
### Step 1: Initialize the Project
Create a new Expo app using the TypeScript template:
```bash
npx create-expo-app -t expo-template-blank-typescript auth-magic-link
cd auth-magic-link
```
### Installation
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
### Step 3: Build Magic Link Auth Component
- File: components/Auth.tsx

- Allows users to input their email and receive a Magic Link for sign-in.

- UI built with React Native Elements.

- Supabase sends an authentication link to the user's email.

```bash
const handleMagicLink = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  })
  if (error) Alert.alert('Error', error.message)
  else Alert.alert('Check your email for the Magic Link!')
}
```
### Step 4: Build Profile Component
- File: components/Account.tsx

- Allows users to view and update profile details such as username and website.

- Uses Supabase database for data persistence.

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

![alt text](<auth-magic-link/Screenshot from 2025-04-18 21-32-00.png>)

![alt text](<auth-magic-link/Screenshot from 2025-04-18 21-32-19.png>)

#### Observations & Results
- Successfully implemented Supabase authentication using Magic Link.

- Users receive a link in their email to log in, removing the need for a password.

- AsyncStorage helps persist session and enables auto-refresh of tokens.

- Users can access and update their profile once logged in.

### Conclusion
This lab demonstrated how to implement secure, passwordless authentication using Magic Links in a mobile app using Supabase and React Native. The use of AsyncStorage for session persistence and Supabase’s built-in OTP flow made it simple and effective.

### References
Supabase Docs - React Native Auth

*Author: [Kuenzang Rabten]*
*Date: [April 17, 2025]*