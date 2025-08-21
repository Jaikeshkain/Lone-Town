# Lone-Town

Lone-Town is a mindful dating app that offers one exclusive match per day, focusing on intentional relationship-building and avoiding swipe fatigue. The platform uses emotional, psychological, and behavioral compatibility for matchmaking.

---

---

## Tech Stack

### Backend
- **Node.js** & **Express.js** (REST API)
- **MongoDB** with **Mongoose** (Database)
- **Socket.io** (Real-time chat)
- **Cloudinary** (Image uploads)
- **JWT** (Authentication)
- **node-cron** (Scheduled jobs)

### Frontend
- **React** (with TypeScript)
- **Vite** (Build tool)
- **Redux Toolkit** (State management)
- **React Router** (Routing)
- **Framer Motion** (Animations)
- **Tailwind CSS** (Styling)
- **Lucide-react** (Icons)
- **React Query** (Data fetching/caching)
- **Socket.io-client** (Real-time chat)
- **Radix UI** (UI primitives)

---

## Folder Structure

```
Lone-Town/
│
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── configs/
│   │   ├── CronJob.js
│   │   ├── db.js
│   │   ├── matchmakingConfig.js
│   │   └── multer.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── matchController.js
│   │   ├── MessageController.js
│   │   └── stateController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── FreezeModel.js
│   │   ├── MatchModel.js
│   │   ├── MessageModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── matchRoutes.js
│   │   ├── messageRoutes.js
│   │   └── stateRoutes.js
│   └── utils/
│       └── saveMessgeToDB.js
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig*.json
    ├── index.html
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── index.css
    │   ├── assets/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── loginPage.tsx
    │   │   │   ├── RequireAuth.tsx
    │   │   │   └── register/
    │   │   ├── Chat/
    │   │   ├── Dashboard/
    │   │   ├── Global Components/
    │   │   ├── Header/
    │   │   ├── home/
    │   │   ├── Match/
    │   │   ├── Onboarding/
    │   │   ├── State/
    │   │   └── ui/
    │   ├── lib/
    │   ├── redux/
    │   └── services/
    └── public/
```


---

## Main API Endpoints

### Auth (`/api/auth`)
- `POST /register` — Register a new user
- `POST /login` — Login user
- `GET /getUser` — Get current user info (auth required)
- `GET /check` — Check if token is valid (auth required)
- `POST /logout` — Logout user

### Matchmaking (`/api/match`)
- `POST /findMatch` — Find a daily match (auth required)
- `GET /getMatchById` — Get match details by ID

### Messages (`/api/message`)
- `GET /:matchId` — Get all messages for a match (auth required)

### State (`/api/state`)
- `GET /getState` — Get user state (auth required)
- `PATCH /unpinMatch` — Unpin a match (auth required)

---

## Key Features

- **One exclusive match per day** based on compatibility
- **Pinned matches**: Unpinning triggers a reflection freeze
- **Real-time chat** with Socket.io
- **Video call unlock** after 100 messages in 48 hours
- **Profile onboarding** with personality quiz
- **Secure authentication** with JWT
- **Cloudinary image uploads**
- **Responsive, animated UI** with Tailwind CSS and Framer Motion

---

## Getting Started

1. **Install dependencies** in both `backend` and `frontend` folders:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up environment variables** (see `.env.example` if available).

3. **Run backend**:
   ```sh
   npm run dev
   ```

4. **Run frontend**:
   ```sh
   npm run dev
   ```

---

## License

MIT License

---

*For more details, see the code and comments in
