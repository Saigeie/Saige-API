declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: string;
      PORT: string;
      API_KEY: string;
      SERVER_ID: string;
    }
  }
}

export {}
