# Sign Company Dashboard

A modern internal dashboard for Sign Company Owners built with the MERN stack.

## Features

- 📅 **Calendar/Events** - Full calendar system with event management
- 🏛 **Convention** - Convention details with countdown timer
- 📝 **Success Stories** - Blog-style success stories platform
- 💬 **Forum** - Thread-based owner discussions
- 📂 **Library** - File management system with S3 integration
- 👥 **Owners Roster** - Searchable owner directory
- 🗺️ **Map Search** - Interactive map with owner locations
- 🤝 **Partners** - Preferred partner directory
- 🎥 **Videos** - YouTube-based learning center
- 🛒 **Equipment** - Equipment catalog with inquiry system
- ❓ **FAQs** - Help center with categorized FAQs

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Amazon S3
- **Maps**: Google Maps API

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- AWS Account (for S3)
- Google Maps API Key

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sign-company-dashboard
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:

Create `.env` in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sign-company-dashboard
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=sign-company-dashboard-files
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

4. Run the development server:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:5173

## Default Login

Since only admins can create new users, you'll need to:

1. Create an admin user in MongoDB manually or via a seed script
2. Use the admin account to create owner accounts

## Project Structure

```
sign-company-dashboard/
├── server/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── index.js        # Server entry point
├── client/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── types/      # TypeScript types
│   └── package.json
└── package.json
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/me` - Get current user
- `GET /api/users` - Get all users
- `GET /api/events` - Get all events
- ... (and more for each module)

## Deployment

1. Build the client:
```bash
npm run build
```

2. Set NODE_ENV to production and configure production database

3. Deploy to your preferred hosting service (Heroku, AWS, DigitalOcean, etc.)

## License

Private - Sign Company Internal Use Only# Force Render rebuild
