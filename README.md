# SNIPPIFY
**Snippify** is a full-stack developer tool that allows users to save, organize, and manage code snippets. It also provides AI-powered code explanations using the user’s own Gemini API key, ensuring privacy and flexibility.

## FEATURES ✨
1. **Authentication**

- JWT based login and registration
- Protected Routes
- Persistent login using localstorage

2. **Snippets Management**
- CRUD operations on the snippets with code updation.

3. **Gemini Code explanation**
- Integrate Gemini that helps to provide explanations of the code snippets you saved. 
- User needs to enter his/her Gemini API key to access this feature.
- Any error related to the Gemini API key is properly handled.

4. **Security**
- User's `password` and `Gemini Key` is hashed before being store in our database.
- No risk of exposing the Gemini API key. 

6. **Style and Design**
- Used `Tailwind CSS` for the styling.
- Responsive design along with responsive sidebar.
- `Framer motion` animations
- **Dark Mode** & **Light Mode** functionality according to user preference.

6. **State Management**
- Manage application's state using `Redux Toolkit`.
- Created 2 slices `authSlice.js` and `snippetSlice` to manage their states respectively.


## Tech Stacks
| **Frontend**       | **Backend**                  |
|---------------------|------------------------------|
| React (Vite)        | Node.js                      |
| Redux Toolkit       | Express.js                   |
| Tailwind CSS        | MongoDB + Mongoose           |
| Framer Motion       | JWT Authentication           |
| Axios               | AES Encryption (crypto)      |
|                     | Gemini API                   |
