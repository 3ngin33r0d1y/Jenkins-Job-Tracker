import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #ff0000;
    --secondary-color: #b30000;
    --background-color: #121212;
    --surface-color: #1e1e1e;
    --text-color: #ffffff;
    --text-secondary-color: #b3b3b3;
    --success-color: #4caf50;
    --error-color: #f44336;
    --warning-color: #ff9800;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: var(--secondary-color);
    }
    
    &:disabled {
      background-color: #555555;
      cursor: not-allowed;
    }
  }

  input, select, textarea {
    background-color: var(--surface-color);
    border: 1px solid #333333;
    color: var(--text-color);
    padding: 8px 12px;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  .card {
    background-color: var(--surface-color);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .success {
    color: var(--success-color);
  }

  .error {
    color: var(--error-color);
  }

  .warning {
    color: var(--warning-color);
  }
`;

export default GlobalStyle;
