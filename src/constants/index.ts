// API
export const REACT_APP_CIBUS_API = process.env.REACT_APP_CIBUS_API;

// Input regex
export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// Input lengths
export const NAME_MAX_LENGTH = 15;
export const LASTNAME_MAX_LENGTH = 30;
export const EMAIL_MAX_LENGTH = 50;

export const MIN_LENGTH_PASSWORD = 6;
export const MAX_LENGTH_PASSWORD = 50;

export const MIN_LENGTH_LAST_NAME = 2;
export const MAX_LENGTH_LAST_NAME = 50;

export const MIN_LENGTH_NAME = 2;
export const MAX_LENGTH_NAME = 50;

// Input error messages
export const ERROR_MSG_REQUIRED = "Campo obligatorio";
export const ERROR_MSG_DUPLICATED_MAIL = "¡Vaya parece que el mail está duplicado!";
export const ERROR_MSG_SERVER = "Vaya parece que hay un error en nuestros servidores, lamentamos las molestias, vuelve a intentarlo más tarde.";
