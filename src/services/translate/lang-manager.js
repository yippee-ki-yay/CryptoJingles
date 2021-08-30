import { createIntl, createIntlCache } from 'react-intl';
import languages from './languages';

class LangManager {
  constructor() {
    this.store = null;
    this.locale = '';
    this.messages = '';
    this.intl = null;
  }

  init(store) {
    if (store) this.store = store;
    this.changeLocale('en');
    // this.changeLocale(LS.getItWem('locale') || 'en');
  }

  changeLocale(locale) {
    // const messages = await languages.getLanguage(locale);
    const messages = languages.en;
    // const currentLocale = LS.getItem('locale');
    // const currentLocale = 'en';
    this.intl = createIntl({ locale, messages }, createIntlCache());
    this.messages = messages;
    this.locale = locale;
    // if (!currentLocale || currentLocale !== locale) ('locale', locale);
    // this.store.dispatch(changeLocale(locale));
  }
}
const langContextInstance = new LangManager();
export default langContextInstance;
