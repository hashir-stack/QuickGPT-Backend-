# QuickGPT Backend ⚡

QuickGPT Backend is the server-side component of the **QuickGPT** application — a MERN stack project where users can generate **AI-powered text and images** through an interactive chatbot.  
👉 Live API: [quick-gpt-backend-omega.vercel.app](https://quick-gpt-backend-omega.vercel.app)

## ✨ Features
- 🔐 **Authentication**: Secure login/logout flow with JWT.
- 🤖 **AI Text Generation**: Routes to interact with GPT models.
- 🎨 **Image Generation**: API endpoints for AI-driven image creation.
- 🗂️ **Modular Architecture**: Controllers, routes, middleware, and models separated for maintainability.
- 🌐 **Deployment Ready**: Configured with `vercel.json` for seamless hosting.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose models)
- **Middleware:** Custom authentication & error handling
- **Deployment:** Vercel

## 📂 Project Structure
QuickGPT-Backend- ├── config/          # Database & environment configuration ├── controller/      # Business logic for routes ├── middleware/      # Auth & request validation ├── model/           # Mongoose schemas ├── routes/          # Express route definitions ├── index.js         # Entry point ├── package.json     # Dependencies & scripts ├── vercel.json      # Deployment config └── .gitignor

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16.x)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### Installation
```bash
# Clone the repo
git clone https://github.com/hashir-stack/QuickGPT-Backend-.git

# Navigate into the project
cd QuickGPT-Backend-

# Install dependencies
npm install

Environment Variables
Create a .env file in the root with:
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
PORT=5000

Running Locally
npm start

🌐 Deployment
This project is configured for Vercel.
To deploy:
- Push your repo to GitHub.
- Connect it to Vercel.
- Add environment variables in Vercel dashboard.
- Deploy — Vercel will auto-detect the vercel.json.

🤝 Contributing
Contributions are welcome!
- Fork the repo
- Create a new branch (feature/your-feature)
- Commit changes
- Open a Pull Request

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Hashir
GitHub: hashir-stack (github.com in Bing)
