import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        test: 'This is some test string'
      }
    },
    ru: {
      translation: {
        test: 'Это просто тестовая строка'
      }
    }
  }
});

export default i18next;
