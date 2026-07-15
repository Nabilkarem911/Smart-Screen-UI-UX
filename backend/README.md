# Smart Screen Backend API

## Setup

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Create .env file
cp env.example .env

# 3. Generate Prisma client
npm run prisma:generate

# 4. Run database migrations
npm run prisma:migrate

# 5. Seed the database
npm run seed

# 6. Start development server
npm run dev
```

## API Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/screens` | List screens | Yes |
| POST | `/api/screens` | Create screen | Yes |
| PUT | `/api/screens/:id` | Update screen | Yes |
| DELETE | `/api/screens/:id` | Delete screen | Yes |
| GET | `/api/groups` | List groups | Yes |
| POST | `/api/groups` | Create group | Yes |
| GET | `/api/devices` | List devices | Yes |
| POST | `/api/devices` | Create device | Yes |
| GET | `/api/media` | List media | Yes |
| POST | `/api/media/upload` | Upload file | Yes |
| DELETE | `/api/media/:id` | Delete media | Yes |
| GET | `/api/content` | List content | Yes |
| POST | `/api/content` | Create content | Yes |
| GET | `/api/approvals` | List approvals | Yes |
| POST | `/api/approvals` | Create approval | Yes |
| PUT | `/api/approvals/:id/review` | Review approval | Yes |
| POST | `/api/broadcasts` | Emergency broadcast | Yes |
| GET | `/api/analytics/stats` | Dashboard stats | Yes |
| GET | `/api/notifications` | List notifications | Yes |

## Default Users

- **Admin:** admin@smartscreen.com / admin123
- **Editor:** editor@smartscreen.com / editor123

## Production

```bash
npm run build
pm2 start dist/server.js --name smartscreen-api
pm2 startup
pm2 save
```
