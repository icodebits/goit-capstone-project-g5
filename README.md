# GoIT Capstone Project G5

A modern Next.js 16 application with authentication, profile management, and a beautiful UI built with TypeScript, Tailwind CSS, and Prisma.

## 🚀 Features

- **Authentication System**: Secure login/register with session management
- **Profile Management**: User profile editing with validation
- **Modern UI**: Responsive design with Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Docker Support**: Containerized development environment
- **CI/CD**: GitHub Actions with Vercel deployment
- **Type Safety**: Full TypeScript support
- **Testing**: Jest and React Testing Library

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: HTTP-only cookies, bcrypt
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Testing**: Jest, React Testing Library
- **Development**: Docker, ESLint, Prettier

## 📋 Prerequisites

- Node.js 20+
- Docker and Docker Compose
- Git

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd goit-capstone-project-g5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

### Docker Development

1. **Start the Docker environment**
   ```bash
   npm run docker:up
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Next.js app on port 3000

2. **Stop the Docker environment**
   ```bash
   npm run docker:down
   ```

## 🗄️ Database Setup

### Local Development
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Push schema changes (alternative to migrations)
npm run prisma:push
```

### Docker Development
```bash
# Run migrations inside Docker container
docker compose exec app npx prisma migrate dev
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run docker:up` - Start Docker development environment
- `npm run docker:down` - Stop Docker development environment

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (login, register)
│   ├── (private)/         # Protected routes (dashboard, profile)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── shared/           # Shared components
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── validators/       # Zod validation schemas
│   ├── db.ts            # Database connection
│   └── utils.ts         # Utility functions
└── __tests__/           # Test files
```

## 🔐 Environment Variables

Create `.env.local` for local development:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/goit?schema=public"
SESSION_COOKIE_NAME="SESSION_ID"
SESSION_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

For Docker development, use `.env.dev`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/goit?schema=public"
SESSION_COOKIE_NAME="SESSION_ID"
SESSION_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to GitHub**
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Set up environment variables in Vercel**
   - `DATABASE_URL` - Your production database URL
   - `SESSION_COOKIE_NAME` - Session cookie name
   - `SESSION_SECRET` - Strong secret key
   - `NEXT_PUBLIC_APP_URL` - Your Vercel app URL

3. **Deploy**
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### CI/CD Pipeline

The project includes GitHub Actions workflow that:
- Runs linting and type checking
- Executes tests with coverage
- Builds the application
- Deploys to Vercel (preview and production)

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile
- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update user profile

## 🔒 Security Features

- HTTP-only session cookies
- Password hashing with bcrypt
- Session token rotation
- Input validation with Zod
- CSRF protection
- Secure cookie settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub.