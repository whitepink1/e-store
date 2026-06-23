# Full-Stack Tech E-Commerce Platform (Monorepo)

A high-performance, production-ready e-commerce web application for purchasing tech gadgets. This project is structured as a monorepo utilizing **Turborepo** to orchestrate seamless development workflows across the frontend and backend applications.

<img width="2880" height="3250" alt="main_md" src="https://github.com/user-attachments/assets/3ca39a4a-73d0-463b-b4ab-a4484f641038" />

---
<img width="2880" height="3250" alt="catalog" src="https://github.com/user-attachments/assets/15e00a02-1aad-40fb-ab0d-a55976f2fc11" />

---
<img width="2880" height="3250" alt="product" src="https://github.com/user-attachments/assets/6aa9aae9-bda5-490f-9b74-2c4e08255484" />


---

## 📂 Repository Structure

This workspace is managed using Turborepo:
* **`apps/web`** - The Next.js client application (App Router, Tailwind CSS, Framer Motion).
* **`apps/backend`** - The Node.js & Express server application (Mongoose, MongoDB).
* **`packages/`** - Shared tooling and configurations (ESLint, TypeScript, Tailwind configurations).

---

## 🚀 Core Features

### 🌐 Frontend Client (`apps/web`)
* **Dynamic Product Catalog:** Filter items seamlessly by tab-based categories ("New", "Best", "Featured") or drill down using category-specific specifications (e.g., Battery Capacity, RAM, Screen Diagonal).
* **Multi-Variant Configurations:** Instantly switch between hardware attributes (Storage/RAM) and colors on the product details page. URL query parameters (`?v=index`) dynamically control application states, maintaining consistent navigation depth and preventing item duplication.
* **Smart Discount Calculator:** Real-time percentage discount visualizer ensuring customers see exact absolute saving calculations and final pricing without round-off artifacts.
* **Fluid UI & Animations:** Powered by Framer Motion to create smooth staggered layout transitions, interactive tab-switching effects, and responsive layout feedback.
* **Favorites System:** Persistent client-side layout structures for custom favorited product tracking.

### ⚙️ Backend Server (`apps/backend`)
* **Comprehensive Product Architecture:** Accommodates extensive technical parameters matching various technical groups (smartphones, smartwatches, laptops) with optimized Mongoose schema models.
* **Data Validation Pipelines:** Rigorous request validation utilizing `Zod` schemas coupled with explicit type guards matching client expectations.
* **Cloudinary Media Engine:** Direct dynamic image upload handling combined with automated background asset cleanups when deleting or overwriting specific items.
* **Session Security:** Secure token-based cookies (`httpOnly`, `secure`) configuration keeping server operations decoupled and protected.

---

## 🛠️ Monorepo Tech Stack

* **Frameworks:** Next.js 14+ (App Router), Express.js
* **Monorepo Tooling:** Turborepo
* **Language:** TypeScript (Strict Mode)
* **Styling & Animation:** Tailwind CSS, Framer Motion (`motion/react`)
* **Database & ORM:** MongoDB Atlas, Mongoose
* **Form & Validation:** React Hook Form, Zod

---
## 🎨 Design Acknowledgments

Special thanks to **Mayank** for the incredible UI/UX concept design. You can explore the original Figma community file here:
* [🔗 Tech E-Commerce Design on Figma Community](https://www.figma.com/community/file/1362344995738653261)
---

## 📦 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* Active MongoDB Instance
* Cloudinary Developer Account

### Global Installation & Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/whitepink1/e-store.git](https://github.com/whitepink1/e-store.git)
cd e-store
```
Install all workspace dependencies:

```bash
npm install
```

Configure Environment Variables:

1.1 ****Create a .env.local file inside apps/web/:****

```Code snippet
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=folder_name(for exp. 'e-store')
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=your_secret_key
EXTERNAL_BACKEND_URL=http://localhost:5000
EXTERNAL_CLIENT_URL=http://localhost:3000
JWT_SECRET=your_secret_key(for exp. 'super_secret')
JWT_CHECKOUT_SECRET=your_checkout_secret_key(for exp. 'super_checkout_secret')
```

1.2 ****Create a .env file inside apps/backend/:****

```Code snippet
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/tech-store
JWT_SECRET=same_key_from_frontend
JWT_CHECKOUT_SECRET=same_key_from_frontend
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
PUBLIC_PRODUCTS_PER_PAGE=amount_of_products_per_page(for exp. '5')
```

Run the entire ecosystem simultaneously:

```bash
npm run dev
```
