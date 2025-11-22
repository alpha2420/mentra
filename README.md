# Mentra - Mentorship Platform

> **Real Mentors. Real Wisdom. Real Growth.**

Mentra is a full-stack mentorship platform that connects young professionals and students with experienced mentors (40+) for life direction, career guidance, entrepreneurship, and personal development.

## ✨ Key Features

- **AI-Powered Matching**: Smart algorithm to match mentees with the perfect mentor based on goals and personality
- **Real-Time Chat**: Socket.IO-powered instant messaging between mentors and mentees
- **Video Meetings**: Integrated Jitsi Meet for seamless 1:1 video consultations
- **Session Booking**: Schedule and manage mentorship sessions with calendar integration
- **Advanced Animations**: Framer Motion animations including typing effects and scroll-triggered reveals
- **Secure Authentication**: Clerk-based authentication with custom sign-up/sign-in flows
- **Premium UI/UX**: Modern, responsive design with glassmorphism, gradients, and smooth transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (Advanced animations)
- **Lucide React** (Icons)

### Backend
- **Custom Node.js Server** (`server.ts`)
- **Socket.IO** (Real-time messaging)
- **Prisma ORM**
- **PostgreSQL** (Supabase)

### Authentication & Services
- **Clerk** (Auth)
- **Supabase** (Database)
- **Jitsi Meet** (Video calls)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mentra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file:
   ```env
   DATABASE_URL=postgresql://user:password@host:6543/postgres?pgbouncer=true
   ```

   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/register
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
   SUPABASE_SECRET_KEY=your_supabase_secret
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:10000](http://localhost:10000)

## 📂 Project Structure

```
mentra/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── shared/            # Reusable components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── public/                # Static assets
├── server.ts              # Custom server with Socket.IO
└── package.json
```

## 🔑 Key Implementation Details

### Custom Server
The app uses a **custom Node.js server** (`server.ts`) instead of the default Next.js server to support Socket.IO for real-time messaging:

- **Port**: Uses `process.env.PORT` (Railway) or `10000` (local)
- **Hostname**: `0.0.0.0` (production) or `localhost` (dev)
- **WebSocket handling**: Socket.IO for chat, with separate handling for Next.js HMR

### Database Connection
- **Supabase Transaction Pooler** with `?pgbouncer=true` parameter
- **Prisma**: Connection pooling configured for serverless compatibility

### Advanced Animations
- **Hero Text**: Typing animation using Framer Motion variants
- **Counter Component**: Spring-based number counting animations
- **Scroll Animations**: `whileInView` triggers for section reveals
- **Gradient Animations**: Continuous background gradient shifts

### Authentication Flow
- **Clerk**: Custom routes at `/auth/login` and `/auth/register`
- **User Sync**: Automatic sync between Clerk and database via `syncUser` utility

## 🚢 Deployment

This app **cannot be deployed to Vercel** due to the custom server requirement. Deploy to **Railway** instead.

### Deploy to Railway

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add Environment Variables**
   
   In Railway dashboard → Variables tab, add all variables from `.env` and `.env.local`

4. **Deploy**
   
   Railway will automatically build and deploy your app. Access it via the generated URL.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📝 Available Scripts

- `npm run dev` - Start development server with custom server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 🐛 Known Issues

- **WebSocket Upgrade Warning**: The "Cannot read properties of undefined (reading 'bind')" error in development logs is a known issue with Next.js custom servers and HMR. It doesn't affect functionality and is caught gracefully.

## 📄 License

MIT
