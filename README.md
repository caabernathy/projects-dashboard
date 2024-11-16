# Christian Open Source Projects Dashboard

A dashboard for exploring and discovering Christian open source projects across GitHub and GitLab. This dashboard provides insights into project metrics, owner information, and engagement statistics to help connect contributors with meaningful projects.

![open_source_projects_dashboard](https://github.com/user-attachments/assets/76b82609-345b-4dc2-baa1-42b201f01752)


## Features

- Browse Christian open source projects from multiple platforms
- View detailed project metrics and statistics
- Explore maintainer profiles and contact information
- Track community engagement and contribution patterns
- Responsive design for desktop and mobile viewing

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)

## Local Development Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/repo-dashboard.git
    cd repo-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173/repo-dashboard`

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Deploy to GitHub Pages

You can optionally deploy to your own GitHub Pages site.

### Setup

1. Fork the repo.

2. Modify `package.json` and change the `homepage` parameter to point to your GitHub account / organization. 

### Deploy

1. Push any code changes up to your repo

3. Push your changes to GitHub Pages:
    ```bash
    npm run deploy
    ``` 

## Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Issues

- Use the GitHub issue tracker to report bugs
- Provide as much information as possible about your environment
- Include steps to reproduce the issue
- Add screenshots if applicable

### Making Changes

1. Fork the repository
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes
4. Write or update tests as needed
5. Run tests:
    ```bash
    npm run test
    ```
6. Commit your changes:
    ```bash
    git commit -m "feat: add your feature description"
    ```
7. Push to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
8. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Implement proper type definitions
- Use functional components and hooks for React code
- Add comments for complex logic
- Use meaningful variable and function names

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or modifying tests
- `chore:` for maintenance tasks

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy site to your GitHub Pages

## Technical Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
