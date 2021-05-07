export const gitApi = {
  URL: `https://api.github.com`,
  CLIENT_ID:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_GIT_CLIENT_ID
      : process.env.GIT_CLIENT_ID,
  CLIENT_SECRET:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_GIT_CLIENT_SECRET
      : process.env.GIT_CLIENT_SECRET,
};
