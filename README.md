# Personal Portfolio (Full-Stack)
Frontend: HTML/CSS/JS · Backend: Node.js + Express · Database: MongoDB (Mongoose)

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and fill MONGODB_URI (free cluster: MongoDB Atlas) and ADMIN_KEY
3. `npm run seed`  (adds sample projects)
4. `npm start`  → http://localhost:3000

## API
- GET  /api/projects
- POST /api/projects        (header `x-admin-key`)
- DELETE /api/projects/:id  (header `x-admin-key`)
- POST /api/contact         {name, email, message}

## Deploy (Vercel)
1. Push to GitHub
2. vercel.com → New Project → import repo
3. Add env vars MONGODB_URI and ADMIN_KEY → Deploy
4. In Atlas → Network Access, allow 0.0.0.0/0
