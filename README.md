# monicaesguevaart - Art Gallery Website

A modern art gallery website built with Next.js, featuring a comprehensive admin area for managing collections and paintings. The site showcases art collections with detailed information about each piece, including availability status, medium, size, and year.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Admin Area](#admin-area)
  - [Authentication](#authentication)
  - [Dashboard](#dashboard)
  - [Collections Management](#collections-management)
  - [Paintings Management](#paintings-management)
- [Database Schema](#database-schema)
- [Available Scripts](#available-scripts)
- [Public Website](#public-website)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

MonicaEsguevaArt is a full-stack art gallery website that allows artists to showcase their collections and individual paintings. The application consists of two main areas:

1. **Public Website**: A beautiful, responsive frontend where visitors can browse collections, view paintings, and learn about the artist.
2. **Admin Area**: A protected administrative interface for managing collections, paintings, and content.

The application uses a modern tech stack with server-side rendering, database management, and cloud-based image storage.

## Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **React**: 19.2.3
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based session management
- **Image Storage**: Vercel Blob Storage
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI primitives
- **Drag & Drop**: @dnd-kit for sortable interfaces
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **pnpm**: Package manager (install via `npm install -g pnpm`)
- **PostgreSQL**: Database server (local or cloud-hosted)
- **Vercel Account**: For Blob storage (optional, can use external URLs)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/monicaesguevaart?schema=public"

# JWT secret for session management (generate a random string)
SESSION_SECRET="your-random-secret-key-here"
```

### Optional Variables

```env
# Admin user auto-creation (creates admin on app startup if not exists)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"

# Vercel Blob Storage token (for image uploads)
# Get this from: https://vercel.com/dashboard/stores
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"
```

**Note**: If `BLOB_READ_WRITE_TOKEN` is not set, you can still use external image URLs when creating/editing paintings.

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monicaesguevaart
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (if exists) or create a new `.env` file
   - Fill in all required environment variables (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm db:gen

   # Run database migrations
   pnpm db:migrate
   # OR push schema directly (for development)
   pnpm db:push
   ```

5. **Seed the database** (optional)
   ```bash
   pnpm db:seed
   ```
   This will:
   - Create an admin user (if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set)
   - Create initial collections
   - Import paintings from `data/paintings.csv`

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   - Public site: [http://localhost:3000](http://localhost:3000)
   - Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Database Setup

### Initial Setup

1. Create a PostgreSQL database:
   ```bash
   createdb monicaesguevaart
   # Or use your preferred database management tool
   ```

2. Update `DATABASE_URL` in your `.env` file with your database credentials.

3. Run migrations:
   ```bash
   pnpm db:migrate
   ```

### Seeding Data

The seed script (`prisma/seed.ts`) will:
- Create an admin user from environment variables
- Create predefined collections (Portals, Acqua, Lightscapes, Universe, Soul Memory, Ascension Series, Healing)
- Import paintings from `data/paintings.csv`

To seed the database:
```bash
pnpm db:seed
```

**Warning**: The seed script will delete all existing paintings and collections before seeding. Comment out the deletion lines in `prisma/seed.ts` if you want to preserve existing data.

## Admin Area

The admin area is accessible at `/admin/*` and requires authentication. All admin routes are protected and will redirect to `/admin/login` if not authenticated.

### Authentication

#### Login

- **URL**: `/admin/login`
- **Credentials**: Use the email and password set via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables, or create an admin user manually in the database.

#### Session Management

- Sessions are JWT-based and stored in HTTP-only cookies
- Session expiration: 24 hours
- Automatic redirect to login if session expires or is invalid

#### Logout

- Click the "Logout" button in the admin sidebar
- Sessions are cleared and user is redirected to login

### Dashboard

**URL**: `/admin/dashboard`

The dashboard provides an overview of your gallery with:

#### Statistics Cards

- **Total Collections**: Count of all collections
- **Total Paintings**: Count of all paintings
- **Availability**: Breakdown of available vs unavailable paintings

#### Analytics Sections

- **Paintings Per Medium**: Visual breakdown showing how many paintings exist for each medium type
- **Top Collections**: Collections sorted by number of paintings
- **Recent Collections**: Last 5 collections created
- **Recent Paintings**: Last 5 paintings created with thumbnails
- **Empty Collections**: Collections that don't have any paintings yet (with quick action to add paintings)

#### Quick Actions

- "New Collection" button
- "New Painting" button
- Direct links to view all collections or paintings

### Collections Management

**URL**: `/admin/collections`

#### View Collections

- View all collections in grid or table format
- See collection title, description, medium, and painting count
- Collections are sorted by their `order` field

#### Create Collection

1. Click "New Collection" button
2. Fill in the form:
   - **Title** (required): Collection name
   - **Slug** (required): URL-friendly identifier (e.g., "portals", "acqua")
   - **Description** (required): Full description of the collection
   - **Tagline** (optional): Short tagline displayed on collection pages
   - **Medium** (optional): Primary medium used (e.g., "Acrylic on canvas")
   - **Order** (optional): Display order (lower numbers appear first)
3. Click "Create Collection"

#### Edit Collection

1. Navigate to `/admin/collections`
2. Click on a collection or use the edit button
3. Modify any fields
4. Click "Update Collection"

#### Delete Collection

- Use the delete button in the collections view
- **Warning**: Deleting a collection will also delete all paintings within it

#### Reorder Collections

- Use drag-and-drop in the collections view to reorder
- Order is saved automatically
- Affects display order on both admin and public pages

#### View Collection Paintings

- Click on a collection to view its paintings
- URL: `/admin/collections/[id]/paintings`
- Manage all paintings within that specific collection

### Paintings Management

#### All Paintings View

**URL**: `/admin/paintings`

- View all paintings across all collections
- **Filter by Collection**: Dropdown to filter paintings by collection
- **Search**: Search paintings by title (case-insensitive)
- **Toggle Availability**: Quick toggle to mark paintings as available/unavailable
- **Edit/Delete**: Individual painting actions

#### Collection-Specific Paintings

**URL**: `/admin/collections/[id]/paintings`

- View paintings for a specific collection
- Drag-and-drop reordering within the collection
- Create new paintings directly in the collection
- Edit/delete paintings

#### Create Painting

1. Navigate to:
   - `/admin/paintings/new` (all paintings view)
   - `/admin/collections/[id]/paintings/new` (collection-specific)

2. Fill in the form:
   - **Title** (required): Painting name
   - **Collection** (required): Select the collection this painting belongs to
   - **Description** (optional): Detailed description
   - **Medium** (optional): Medium used (e.g., "Acrylic on canvas")
   - **Size** (optional): Dimensions (e.g., "80x80 cm")
   - **Year** (optional): Year created
   - **Image** (required): 
     - Upload image file (JPEG, PNG, WebP, GIF up to 10MB)
     - OR provide an image URL
   - **Available** (checkbox): Whether the painting is available for purchase
   - **Order** (optional): Display order within collection

3. Click "Create Painting"

#### Edit Painting

1. Navigate to `/admin/paintings/[id]/edit` or use edit button in paintings view
2. Modify any fields
3. **Image Updates**:
   - Upload a new image to replace the existing one
   - Old images stored in Vercel Blob are automatically deleted
   - External URLs can be updated directly
4. Click "Update Painting"

#### Delete Painting

- Use the delete button in the paintings view
- **Warning**: This action cannot be undone

#### Reorder Paintings

- In collection-specific view, use drag-and-drop to reorder paintings
- Order is saved automatically
- Affects display order on both admin and public pages

#### Toggle Availability

- Quick toggle button in the paintings list
- Changes are saved immediately
- Available paintings are visible on the public site; unavailable ones are hidden

### Image Management

#### Supported Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

#### File Size Limit

- Maximum file size: 10MB per image

#### Storage

- Images can be uploaded to **Vercel Blob Storage** (requires `BLOB_READ_WRITE_TOKEN`)
- Images can also use external URLs (any publicly accessible image URL)
- When updating a painting with a new image, old Vercel Blob images are automatically deleted

#### Image Optimization

- Next.js Image component is used for automatic optimization
- Images are served with appropriate quality settings
- Remote patterns are configured for Vercel Blob domains

## Database Schema

The application uses Prisma ORM with PostgreSQL. The schema consists of three main models:

### Admin Model

```prisma
model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String // Hashed with bcrypt
}
```

- Stores admin user credentials
- Passwords are hashed using bcrypt (10 rounds)
- Email must be unique

### Collection Model

```prisma
model Collection {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  description String
  tagline     String?
  medium      String?
  order       Int        @default(0)
  paintings   Painting[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

- Collections group related paintings
- `slug` is used in URLs (e.g., `/collections/portals`)
- `order` determines display order (ascending)
- One-to-many relationship with paintings

### Painting Model

```prisma
model Painting {
  id           String     @id @default(cuid())
  title        String
  description  String?
  medium       String?
  size         String?
  year         String?
  imageUrl     String
  collectionId String
  collection   Collection @relation(fields: [collectionId], references: [id])
  available    Boolean    @default(true)
  order        Int        @default(0)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}
```

- Individual paintings belong to a collection
- `imageUrl` can be Vercel Blob URL or external URL
- `available` determines if painting appears on public site
- `order` determines display order within collection (ascending)

## Available Scripts

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database

```bash
# Generate Prisma client
pnpm db:gen

# Run database migrations
pnpm db:migrate

# Push schema changes to database (development)
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Seed database with initial data
pnpm db:seed
```

### Utilities

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Download images script
pnpm download-images
```

## Public Website

The public-facing website is accessible to all visitors and showcases the art collections.

### Routes

- **Homepage** (`/`): Hero section, featured collections, artist information, FAQ, and call-to-action
- **Collections** (`/collections`): List of all collections
- **Collection Detail** (`/collections/[slug]`): Individual collection page with all paintings
- **Painting Detail** (`/paintings/[id]`): Individual painting page with full details
- **About** (`/about`): About the artist page
- **Contact** (`/contact`): Contact page

### Features

- Responsive design for all devices
- Image optimization and lazy loading
- SEO-friendly URLs and metadata
- Fast page loads with Next.js App Router
- Smooth animations and transitions

## Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import project in Vercel Dashboard**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **Configure Environment Variables**
   In Vercel project settings, add:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `ADMIN_EMAIL` (optional)
   - `ADMIN_PASSWORD` (optional)
   - `BLOB_READ_WRITE_TOKEN` (optional)

4. **Set up Vercel Blob Storage** (if using image uploads)
   - Go to Vercel Dashboard → Storage
   - Create a Blob store
   - Copy the `BLOB_READ_WRITE_TOKEN` to environment variables

5. **Database Migrations**
   - Vercel will run `prisma generate` automatically during build
   - Run migrations manually after first deploy:
     ```bash
     pnpm db:migrate
     ```
   - Or use Vercel's post-deploy hooks

6. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Or trigger manual deployment from dashboard

### Other Platforms

For other hosting platforms (Railway, Render, etc.):

1. Set all environment variables
2. Run `pnpm build` during build process
3. Run database migrations after deployment
4. Ensure PostgreSQL database is accessible
5. Configure Vercel Blob or use external image URLs

## Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to database

**Solutions**:
- Verify `DATABASE_URL` is correct in `.env`
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l`
- Check network/firewall settings for remote databases
- Ensure connection string format: `postgresql://user:password@host:port/database?schema=public`

### Session/Authentication Problems

**Problem**: Cannot login or session expires immediately

**Solutions**:
- Verify `SESSION_SECRET` is set and is a random string
- Clear browser cookies and try again
- Check that cookies are enabled in browser
- Verify admin user exists in database:
  ```bash
  pnpm db:studio
  # Check Admin table
  ```

### Image Upload Issues

**Problem**: Images fail to upload

**Solutions**:
- Verify `BLOB_READ_WRITE_TOKEN` is set (if using Vercel Blob)
- Check file size is under 10MB
- Verify file format is supported (JPEG, PNG, WebP, GIF)
- Check browser console for errors
- Try using external image URL instead
- Verify Vercel Blob store is created and accessible

### Prisma Client Errors

**Problem**: `PrismaClient` not found or schema out of sync

**Solutions**:
```bash
# Regenerate Prisma client
pnpm db:gen

# If schema changed, run migrations
pnpm db:migrate
# OR push schema
pnpm db:push
```

### Build Errors

**Problem**: Build fails during deployment

**Solutions**:
- Check all environment variables are set
- Verify `DATABASE_URL` is accessible from build environment
- Ensure `SESSION_SECRET` is set
- Check Node.js version matches requirements (18.x+)
- Review build logs for specific error messages

### Admin User Not Created

**Problem**: Cannot login after setup

**Solutions**:
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in `.env`
- Check application logs for admin creation errors
- Manually create admin user:
  ```bash
  pnpm db:studio
  # Or use Prisma CLI to create admin
  ```
- Run seed script: `pnpm db:seed`

### Collections/Paintings Not Appearing

**Problem**: Data not showing on public site

**Solutions**:
- Verify paintings have `available: true` in database
- Check collection `slug` is correct and matches URL
- Verify database has data: `pnpm db:studio`
- Clear Next.js cache: Delete `.next` folder and restart
- Check for errors in browser console and server logs

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

[Add your license information here]
