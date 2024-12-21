# Gaming Website (E-commerce Platform with Community Features)

## Description
This project is a comprehensive game-selling platform designed to bring together game sellers and enthusiasts while fostering a vibrant community. With role-based functionality, real-time chat, and community engagement features, it is a versatile platform for gaming enthusiasts and sellers alike.

---

## Key Features

### User Roles
- **Admin**: Manages users, games, and platform settings.
- **Game Seller**: Adds and manages their game listings.
- **User**: Purchases games and interacts with the community.

### Functionalities
1. **Chat System**:
   - Real-time communication powered by Socket.IO.
2. **Community Section**:
   - Forums and discussion boards to connect and share ideas.
3. **Authentication**:
   - Secure user registration and login with role-based access control using JSON Web Tokens (JWT).
4. **Game Listings**:
   - Sellers can upload games with descriptions, pricing, and images.
5. **Responsive Design**:
   - Seamless performance on both desktop and mobile devices.

---

## Technologies Used
- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO

---

## Achievements
- Implemented robust role-based authentication and authorization for secure access control.
- Built a scalable chat system enabling smooth real-time interactions among users.
- Enhanced user experience with a dynamic community feature fostering engagement.

---

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yaswanth1019/E-commerce-gaming-website-using-react.git
   ```
2. Navigate to the project directory:
   ```bash
   cd E-commerce-gaming-website-using-react
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following details:
     ```env
     MONGO_URI=your-mongodb-uri
     ```
5. Start the application:
   - Start the backend:
     ```bash
     cd backend
     nodemon start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```

---

## Usage
1. **Admin**:
   - Manage user roles, game listings, and platform settings.
2. **Game Seller**:
   - Add and manage game listings with descriptions, pricing, and images.
3. **User**:
   - Purchase games, participate in forums, and chat with others in real-time.

---


## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For questions or collaboration, reach out at: (yaswanthsai1019@gmail.com)

---


