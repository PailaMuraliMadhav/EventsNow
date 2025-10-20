
# 🗓️ EventsNow – College Event Management Platform

EventsNow is a full-stack MERN web application built to streamline the process of organizing and participating in college events. It enables organizers to create and manage events, and students to explore, register, and stay notified.

## 🌐 Live Demo

- Frontend: [https://eventsnow05.vercel.app](https://eventsnow05.vercel.app)  
- Backend: Deployed on [Render](https://render.com)

---

## 🚀 Features

### 👩‍💼 For Organizers
- Create, update, and delete events
- View list of participants
- Secure login and authentication

### 👨‍🎓 For Students
- Browse upcoming college events
- Register for events
- View registered events

### 🔐 Authentication
- Role-based login (Organizer / Student)
- JWT-based authentication
- Password hashing with bcrypt

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- Tailwind CSS
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- CORS

**Deployment:**
- Frontend: Vercel
- Backend: Render

---

## 📁 Folder Structure

```
EventsNow/
├── backend/           # Express server & API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/          # React app
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

---

## 🧑‍💻 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/PailaMuraliMadhav/EventsNow.git
cd EventsNow
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`  
Backend will run at: `http://localhost:5000`

---

## 📸 Screenshots

<img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/e0aa259f-4d8e-45d2-b867-881cb3dabae0" />
<img width="1914" height="923" alt="image" src="https://github.com/user-attachments/assets/bf2e94ea-d1a0-4902-b5b0-76310710e766" />



---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Built with 💙 by [Paila Murali Madhav](https://www.linkedin.com/in/pailamuralimadhav)
