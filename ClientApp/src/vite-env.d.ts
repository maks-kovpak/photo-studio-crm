/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_ASPNETCORE_URLS?: string;
  readonly VITE_ASPNETCORE_HTTPS_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
