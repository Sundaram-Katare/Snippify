# SNIPPIFY
**Snippify** is a full-stack developer tool that allows users to save, organize, and manage code snippets. It also provides AI-powered code explanations using the user’s own Gemini API key, ensuring privacy and flexibility.

--- 

## FEATURES ✨
1. **Authentication**

- JWT based login and registration
- Protected Routes
- Persistent login using localstorage

2. **Snippets Management**
- CRUD operations on the snippets with code updation.

3. **Gemini Code explanation 🪄**
- Integrate Gemini that helps to provide explanations of the code snippets you saved. 
- User needs to enter his/her Gemini API key to access this feature.
- Any error related to the Gemini API key is properly handled.

4. **Security (Encryption & Decryption)**
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

---

## Tech Stacks
| **Frontend**       | **Backend**                  |
|---------------------|------------------------------|
| React (Vite)        | Node.js                      |
| Redux Toolkit       | Express.js                   |
| Tailwind CSS        | MongoDB + Mongoose           |
| Framer Motion       | JWT Authentication           |
| Axios               | AES Encryption (crypto)      |
|                     | Gemini API                   |

## Preview:- 
<img width="1915" height="910" alt="image" src="https://github.com/user-attachments/assets/1570733e-1a1e-4953-b7b7-1a11af905a63" />

---

## Setup Locally
1. Fork the repo

2. Clone the repo
```bash
 git clone repo_url
```

3. Install frontend dependencies
```bash
 cd client
 npm install
```

4. Install backend dependencies
```bash
 cd server
 npm install
```

5. Run Backend
```bash
 node server.js
```

6. Run Frontend
```bash
 npm run dev
```

7. Set up `.env` in the backend
```bash
 PORT=3000
MONGO_URI="mongo_url"
JWT_SECRET="jwt_secret"
ENCRYPTION_KEY="encryption_key"
```

8. Set up `.env` in the frontend
```bash
 VITE_BACKEND_URL="http://localhost:3000/api/"
```

## Contributions
- Contributions are welcome 🙌.
- Make sure you raise the issue before raising the PR.

## Author
 Developed by **Sundaram katare** with 💗 & 🧠
