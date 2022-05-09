export interface Letter {
  lowercase: string;
  uppercase: string;
  capsLowercase: string;
  capsUppercase: string;
}

export interface KeyboardButton {
  key: string;
  ru: Letter;
  en: Letter;
  customClass?: string;
}

export type KeyboardRow = KeyboardButton[];
export type Keyboard = KeyboardRow[];
