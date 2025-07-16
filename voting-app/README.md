# Voting App

A simple Next.js application with MongoDB integration for voting functionality. Users can cast upvotes and downvotes with real-time updates.

## Features

- **Upvote/Downvote System**: Two buttons for casting votes
- **Real-time Updates**: Vote counts update immediately
- **MongoDB Integration**: Persistent vote storage
- **Progress Visualization**: Visual progress bar showing vote distribution
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **MongoDB** with Mongoose
- **Tailwind CSS** for styling

## Prerequisites

Before running the application, make sure you have:

1. **Node.js** (version 18 or higher)
2. **MongoDB** running locally or access to MongoDB Atlas

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally on your machine
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. The app will connect to `mongodb://localhost:27017/voting_app` by default

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `.env.local`

## Environment Configuration

Create a `.env.local` file in the root directory with:

```env
MONGODB_URI=mongodb://localhost:27017/voting_app
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/voting_app?retryWrites=true&w=majority
```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. The app displays current vote counts (upvotes and downvotes)
2. Click the **Upvote** button (green) to cast an upvote
3. Click the **Downvote** button (red) to cast a downvote
4. Vote counts update immediately
5. A progress bar shows the distribution of votes

## API Endpoints

- `GET /api/vote` - Retrieve current vote counts
- `POST /api/vote` - Cast a vote (upvote or downvote)

## Project Structure

```
src/
├── app/
│   ├── api/vote/
│   │   └── route.ts       # API endpoints for voting
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # App layout
│   └── page.tsx           # Main voting page
├── lib/
│   └── mongodb.ts         # MongoDB connection utility
├── models/
│   └── Vote.ts            # Vote data model
└── types/
    └── global.d.ts        # TypeScript global types
```

## Database Schema

The Vote model stores:
- `upvotes`: Number of upvotes
- `downvotes`: Number of downvotes
- `totalVotes`: Total number of votes (calculated automatically)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Development

To contribute to this project:

1. Make your changes
2. Test the functionality
3. Ensure TypeScript compilation passes:
   ```bash
   npm run build
   ```

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
- **Port Already in Use**: Change the port in `package.json` or stop other processes on port 3000
- **TypeScript Errors**: Run `npm run build` to check for type errors

## License

This project is open source and available under the [MIT License](LICENSE).
