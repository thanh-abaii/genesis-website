# Genesis Website

This repository contains the source code for the Genesis Website, a modern, responsive web application built with **React 18**, **TypeScript**, and **Vite**. The UI is crafted with **Tailwind CSS** and a custom component library based on **shadcn/ui**, ensuring a consistent and high-quality user experience.

The primary purpose of this project is to serve as a comprehensive resource for the book "Genesis," providing information about its chapters, authors, and related topics.

  
*(A placeholder for a real screenshot of the application)*

---

## 🚀 Core Technologies

This project is built with a modern, scalable, and efficient tech stack:

-   **Framework**: [React 18](https://reactjs.org/)
-   **Build Tool**: [Vite 6](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation.

---

## 📂 Project Structure

The project follows a standard yet flexible structure, designed for scalability and maintainability.

```
/
├── public/                # Static assets (images, data)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base components from shadcn/ui
│   │   └── Layout.tsx     # Main application layout
│   ├── data/              # Static data and types
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components for each route
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Entry point
├── .eslintrc.cjs          # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

---

## 📦 Local Development

To get started with local development, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/thanh-abaii/genesis-website.git
    cd genesis-website
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:5173`.

---

## 🏗 Build for Production

To create a production-ready build, run:

```bash
pnpm build
```

This command will generate a `dist/` directory with optimized, static assets. To preview the production build locally, use:

```bash
pnpm preview
```

---

## 📤 Deployment

This project is optimized for deployment on modern hosting platforms.

-   **[Vercel](httpss://vercel.com/)** (Recommended)
-   **[Netlify](httpss://www.netlify.com/)**

When deploying, ensure the build command is set to `pnpm build` and the publish directory is `dist`.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

---

## 👤 Author

Built by [Đào Trung Thành](https://github.com/thanh-abaii) – ABAII | Thought Leader on AI.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
