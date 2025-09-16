import type { Config } from '../types/config.type';

export const config: Config = {
  backend: {
    url: import.meta.env.VITE_BACKEND_URL,
  },
};
