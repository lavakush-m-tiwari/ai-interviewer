# AI Interviewer Frontend

This project is a React application designed to facilitate AI-based interview simulations. It allows users to upload resumes, engage in chat sessions, and receive feedback on their performance.

## Project Structure

- **src/**: Contains the source code for the application.
  - **App.tsx**: Main component managing application state and rendering.
  - **index.tsx**: Entry point of the React application.
  - **components/**: Contains reusable components.
    - **ChatWindow.tsx**: Component for the chat interface.
    - **ResumeUpload.tsx**: Component for uploading resumes.
  - **services/**: Contains context providers and services.
    - **SessionContext.tsx**: Provides session-related context.
  - **App.css**: Styles for the App component.

- **public/**: Contains static files.
  - **index.html**: Main HTML file serving the React application.

- **tailwind.config.js**: Configuration file for Tailwind CSS.

- **postcss.config.js**: Configuration file for PostCSS.

- **tsconfig.json**: TypeScript configuration file.

- **package.json**: npm configuration file listing dependencies and scripts.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd ai-interviewer-fe
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Tailwind CSS Setup

This project uses Tailwind CSS for styling. Ensure that you have the necessary configuration files (`tailwind.config.js` and `postcss.config.js`) set up correctly. You can customize the Tailwind configuration as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.