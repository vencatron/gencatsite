/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_CONTACT_ADDRESS: string
  readonly VITE_SOCIAL_LINKEDIN: string
  readonly VITE_SOCIAL_FACEBOOK: string
  readonly VITE_SOCIAL_TWITTER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}