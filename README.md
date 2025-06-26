# 🏛️ CultureScape

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![Render](https://img.shields.io/badge/Deployed%20on-Render-purple)


**CultureScape** is a full-stack web application that allows users to explore, share, and discuss cultural and historical tourist destinations. The platform provides a seamless experience for users to contribute travel-worthy locations, review others' submissions, and engage with a dynamic, secure interface.

---

## 🚀 Live Demo

👉 [**CultureScape on Render**](https://culturescape.onrender.com/)

---

## 🌟 Highlights

- 🧭 **Explore Cultural Sites**: Discover heritage and historical locations submitted by fellow users.
- 📝 **User Contributions**: Registered users can add new sites with images and descriptions.
- 💬 **Review System**: Add, edit, or delete reviews to share feedback on listed locations.
- 🔐 **Authentication & Session Management**: Full user auth flow with secure sessions.
- 🖼️ **Cloud Image Hosting**: Image uploads powered by Cloudinary and Multer.
- 🛡️ **Security Best Practices**: Helmet, input sanitization, and server-side validation integrated.
- 📱 **Responsive Design**: Fully optimized UI across devices.

---

## 🧰 Tech Stack

### 🎯 Frontend
- **EJS** (server-side templating)
- **Bootstrap 5** (responsive design)
- **Custom CSS + MapTiler** (interactive maps)

### 🛠️ Backend
- **Node.js + Express.js**
- **MongoDB** with **Mongoose**
- **Passport.js** for local authentication
- **Cloudinary** + **Multer** for media management

### 🧱 Security & Utilities
- `express-session`, `connect-flash` for sessions & alerts  
- `helmet`, `express-mongo-sanitize` for security  
- `joi` for schema validation  
- `dotenv` for environment configuration  

---

## 📁 Features in Depth

| Feature                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 🔐 User Authentication     | Register/Login using Passport with sessions and secure cookies              |
| 🗺️ Cultural Site Listing   | Users can create, view, edit, and delete cultural site entries              |
| 🖼️ Cloudinary Integration  | Uploaded images are stored on Cloudinary for performance and reliability    |
| 💬 Reviews with CRUD       | Authenticated users can manage reviews per listing                          |
| 🛡️ Secure by Design        | Data sanitization, CSP, and validation guards against common web attacks    |
| 🌍 Dynamic Maps            | Interactive maps rendered using MapTiler SDK                                |
| 💡 Flash Messages          | Instant feedback for user actions across the app                            |

---

## 👤 Author

**Shreyansh Jugran**  
🔗 [GitHub: @SageSaiyan](https://github.com/SageSaiyan)  
📬 Open to feedback and collaboration on full-stack development projects.

---

