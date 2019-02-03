export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

export const Token = {
  get: () => {
    JSON.parse(window.sessionStorage.getItem(TOKEN_KEY));
  },
  save: ({ token, tokenType }) => {
    const dataString = JSON.stringify({ token, tokenType });
    window.sessionStorage.setItem(TOKEN_KEY, dataString);
  },
  remove: () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
  },
};

export default null;
