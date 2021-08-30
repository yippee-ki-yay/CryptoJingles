export const SUPPORTED_LANGUAGES = [
  { value: 'en', label: 'Eng' },
];

export const getLangOption = () => {
  const lang = localStorage.getItem('lang') || 'en';

  return SUPPORTED_LANGUAGES.find(({ value }) => value === lang);
};

export const getLangFull = (key) => ({
  en: 'English',
})[key];

export const setLang = (lang) => {
  localStorage.setItem('lang', lang);
  document.location.reload();
};
