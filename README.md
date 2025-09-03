![WhatsApp Image 2025-09-03 at 11 11 50](https://github.com/user-attachments/assets/c0e9100a-d865-4665-b7c3-819d532b40d2)
![WhatsApp Image 2025-09-03 at 11 11 51 (2)](https://github.com/user-attachments/assets/8abdd37b-c7ba-44be-8041-41adcdbf9f11)
![WhatsApp Image 2025-09-03 at 11 11 51 (1)](https://github.com/user-attachments/assets/29de440f-a462-4646-b199-1cd7df5b9a45)
![WhatsApp Image 2025-09-03 at 11 11 51](https://github.com/user-attachments/assets/269e0768-eef6-4cfd-abf4-95b8ab3cfb76)
![WhatsApp Image 2025-09-03 at 11 11 50 (1)](https://github.com/user-attachments/assets/e4a9357c-fc4c-49c1-b61e-0af8d00ebf1a)


A full-stack mobile application where book lovers can share recommendations, discover new reads, and connect with fellow readers.

✨ Features
📱 Cross-Platform Mobile App: Built with React Native Expo for iOS and Android

🔐 Secure Authentication: JWT-based user registration and login

🎭 Fun Avatars: Automatic DiceBear avatar generation for all users

📚 Shared Book Recommendations: Community feed of book suggestions

🖼️ Image Uploads: Cloudinary integration for book cover images

🎨 Customizable Themes: Multiple color themes with easy switching

🔄 Pull-to-Refresh: Refresh control on all screens

👤 Personal Profiles: User-specific book collections

🏗️ Architecture
Bookworm follows a client-server architecture with the following components:

Frontend (React Native Expo)
Framework: React Native with Expo

State Management: Zustand for global state

Styling: Custom theme system with multiple color options

Image Handling: Integrated with Cloudinary for uploads and storage

Backend (Node.js + Express)
Runtime: Node.js with Express framework

Authentication: JWT tokens for secure sessions

Database: MongoDB with Mongoose ODM

Image Processing: Cloudinary integration for image optimization

🚀 Tech Stack
Frontend
React Native

Expo

Zustand (State Management)

React Navigation

Backend
Node.js

Express.js

JSON Web Tokens (JWT)

MongoDB with Mongoose

Cloudinary SDK

bcryptjs (Password Hashing)

CORS middleware

🔧 Installation & Setup
Prerequisites
Node.js (v18 or higher)

npm or yarn

Expo CLI

MongoDB instance (local or cloud)

Cloudinary account (for image storage)

Frontend Setup
Clone the repository

bash
git clone https://github.com/YourUsername/Bookworm-App.git
cd ./bookworm
Install dependencies

bash
npm install
# or
yarn install

bash
expo start
Backend Setup
Navigate to the backend directory

bash
cd ../backend
Install dependencies

bash
npm install
Environment Configuration
Create a .env file in the backend directory:

env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Start the server

bash
npm run dev
🎨 Theming System
The app features a comprehensive theming system with multiple color schemes. Themes are managed through a central colors.js file and can be easily extended:
Just choose a color theme from ./bookworm/constants/colors or add your own theme


👨‍💻 Author
Vaibhav Chauhan

🙏 Acknowledgments
DiceBear for awesome avatars

Cloudinary for image management

React Native team

The bookworm community for inspiration


