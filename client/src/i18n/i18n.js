import i18next from 'i18next';
import en from './resources/en';
import ru from './resources/ru';
import ky from './resources/ky';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: en
    },
    ru: {
      translation: ru,
    },
    ky: {
      translation: ky
    }
  }
});

export default i18next;
