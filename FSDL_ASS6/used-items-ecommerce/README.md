# Used Items E-Commerce Portal

This is a full-stack web application built with **Node.js, Express, MongoDB, and EJS**. It allows users to browse, list, and buy/sell used items like cars, bikes, and electronics.

## Features

- **Authentication**: User Registration and Login using JWT stored in HTTP-only cookies.
- **Role-based Access**: Users and Admin panels. Admin can manage users and approve items.
- **Item Listings**: Users can post items for sale with an image upload (using Multer).
- **Wishlist**: Users can save items to their wishlist.
- **Search & Filter**: Browse items by category and search keyword.
- **Pagination**: Results are paginated.
- **Responsive UI**: Built with Bootstrap 5.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure you have a `public/uploads` folder for images:
```bash
mkdir -p public/uploads
```

3. Configure environment variables. The `.env` file should look like:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/used_items_db
JWT_SECRET=supersecretjwtkey_1234
SESSION_SECRET=supersecretsessionkey_4567
```

4. Seed the database with sample data (optional):
```bash
npm run seed
```
This creates:
- **Admin**: admin@test.com / password123
- **User**: john@test.com / password123

5. Start the server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.
