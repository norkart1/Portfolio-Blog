# replit.md

## Overview

This is a Next.js 16 portfolio blog application with an admin dashboard for content management. The project is built with TypeScript and uses the App Router architecture. It features an authentication system for admin access and is designed to support blog post management functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS integration
- **UI Components**: Custom components with Lucide React icons
- **Fonts**: Geist Sans and Geist Mono via next/font

### Backend Architecture
- **API Routes**: Next.js App Router API routes located in `app/api/`
- **Authentication**: NextAuth.js v4 with credentials provider
- **Session Management**: JWT-based sessions

### Authentication Flow
- Admin login page at `/admin/login`
- Protected dashboard at `/admin/dashboard`
- Session provider wraps the application via `AuthProvider` component
- Default admin credentials for initial setup: `admin@example.com` / `admin123`

### Data Layer
- **Database**: MongoDB with Mongoose ODM
- **Connection**: Cached connection pattern in `lib/db/mongodb.ts` to prevent connection exhaustion
- **Models**: User model defined in `models/User.ts` with email, password, and name fields

### Directory Structure
```
app/                    # Next.js App Router pages and API routes
├── admin/              # Admin dashboard and login pages
├── api/auth/           # NextAuth.js API routes
components/             # Reusable React components
lib/db/                 # Database connection utilities
models/                 # Mongoose schema definitions
```

## External Dependencies

### Database
- **MongoDB**: Primary database (requires `MONGODB_URI` environment variable)
- **Mongoose**: ODM for MongoDB schema management and queries

### Authentication
- **NextAuth.js**: Authentication framework (requires `NEXTAUTH_SECRET` environment variable)

### Required Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js session encryption

### HTTP Client
- **Axios**: HTTP client library (installed but usage not yet implemented)