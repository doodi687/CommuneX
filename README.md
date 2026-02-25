# 🎓 CommuneX
**A secure, full-stack marketplace designed exclusively for students.**

CommuneX is a robust web platform that enables students to buy, sell, or trade items and services within their university community. By leveraging a hybrid database architecture, it provides the flexibility of NoSQL for real-time features and the reliability of relational data for core transactions.



---

## 🚀 Features

* **Secure Authentication:** JWT-based user login and registration with student email verification.
* **Hybrid Database Architecture:** * **PostgreSQL:** Handles structured relational data (Users, Listings, Transactions).
    * **MongoDB:** Manages flexible, high-speed data (Real-time Chat, Notifications).
* **Real-Time Messaging:** Instant buyer-seller communication powered by Socket.io.
* **Robust Search & Filters:** Filter by category, price range, or item condition.
* **Dynamic Listings:** Easily upload, edit, and manage your items with image support.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js |
| **Backend** | Express.js |
| **Databases** | PostgreSQL, MongoDB |
| **Real-time** | Socket.io |
| **Auth** | JSON Web Tokens (JWT) & Bcrypt |

---

## 🏗️ System Architecture



The application follows a modular architecture to ensure scalability:
1.  **Client:** A responsive React SPA.
2.  **Server:** A Node/Express API acting as a bridge.
3.  **Data Layer:** **PostgreSQL** ensures ACID compliance for financial/user records.
    * **MongoDB** stores chat history for horizontal scaling.

---

## ⚙️ Getting Started

### Prerequisites
* Node.js (v16+)
* PostgreSQL & MongoDB installed locally or via cloud (Atlas/Supabase)
* NPM or Yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/doodi687/CommuneX.git](https://github.com/doodi687/CommuneX.git)
   cd CommuneX

2. **Install dependencies**

For Backend:

    cd server
    yarn

For Frontend:
   
    cd client
    yarn
    
3. **Environment Variables**: Create a .env file in the root directory and add:

For Backend:
   ```bash
   MYPORT=4000
   RANDOM=123
   MONGO_URI=<MONGODB_URL>
   SECRET=<SECRET_PHRASE>
   DATABASE_URL=<POSTGRESSQL_URL>
   FRONTEND_URL=<FRONTEND_URL>
   ```

For Frontend:
   ```bash
   VITE_APP_BACKEND_URL=<BACKEND_URL>
   ```

4. **From the root directory** (runs both client and server)
   ```bash
   yarn run dev

Open your browser and navigate to `http://localhost:5173` to view the application.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please ensure your code follows the project's styling guidelines and includes relevant tests where applicable.

---


