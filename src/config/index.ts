const envVars = ['REACT_APP_URL_API'];

envVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(
      `The app requires the \`${envVar}\` environment variable to be set`,
    );
  }
});

export const URL_API = process.env.REACT_APP_URL_API as string;
