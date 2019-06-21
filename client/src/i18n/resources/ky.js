export default {
  test: '[ky] это тестовая строка',
  profile: {
    languageLabel: '[ky] Выберите язык'
  },
  header: {
    brandTitle: '[ky] Общежитие КГТУ',
    documentation: '[ky] Документация',
    profile: '[ky] Профиль',
    logout: '[ky] Выйти',
    dormitory: '[ky] Общежитие',
    tenants: '[ky] Жители',
    settlements: '[ky] Расселения',
    announcements: '[ky] Объявления',
    requests: '[ky] Жалобы',
    applications: '[ky] Заявления',
    apply: '[ky] Подать заявление',
    users: '[ky] Пользователи'
  },
  welcome: {
    header: '[ky] Добро пожаловать на сайт управления общежитием КГТУ',
    text: '[ky] Пожалуйста, выберите секцию для начала работы'
  },
  dormitory: {
    dormitory: '[ky] Общежитие',
    selectRoom: '[ky] Пожалуйста, выберите комнату',
    floor: '[ky] Этаж',
    details: '[ky] Подробности',
    addTenant: '[ky] Добавить жителя',
    tenants: '[ky] Жители',
    actions: {
      move: '[ky] Переселить',
      unsettle: '[ky] Выселить',
      tenantDetails: '[ky] Посмотреть профиль'
    },
    roomTypes: {
      room: '[ky] Комната',
      corridor: '[ky] Коридор',
      wc: '[ky] Туалет',
      bathroom: '[ky] Ванная',
      kitchen: '[ky] Кухня'
    }
  },
  roles: {
    employee: '[ky] Сотрудник',
    student: '[ky] Студент',
    service: '[ky] Сервисная служба',
    admin: '[ky] Администратор',
    commandant: '[ky] Коммендант',
    dean: '[ky] Деканат'
  },
  actions: {
    move: '[ky] Переселить',
    unsettle: '[ky] Выселить',
    settle: '[ky] Заселить',
    all: '[ky] Все'
  },
  addTenant: {
    chooseAtenant: '[ky] Выберите жителя',
    submit: '[ky] Подтвердить'
  },
  lists: {
    loadMore: '[ky] Загрузить еще'
  },
  tenants: {
    title: '[ky] Жители',
    all: '[ky] Все',
    notSettled: '[ky] Незаселенные',
    settled: '[ky] Заселенные',
    settle: '[ky] Заселить',
    unsettle: '[ky] Выселить',
    move: '[ky] Переселить',
    notLiving: '[ky] Не проживает в общежитии'
  },
  settlementForm: {
    title: '[ky] Выберите комнату',
    dormitory: '[ky] Общежитие',
    floor: '[ky] Этаж',
    available: '[ky] Свободно',
    noResidents: '[ky] Нет проживающих'
  },
  tenantDetails: {
    dormitory: '[ky] Общежитие',
    floor: '[ky] Этаж',
    number: '[ky] Номер',
    requests: '[ky] Жалобы',
    settlements: '[ky] Расселения'
  },
  settlements: {
    title: '[ky] Расселения',
    all: '[ky] Все',
    settle: '[ky] Заселенные',
    unsettle: '[ky] Выселенные',
    move: '[ky] Переселенные'
  },
  settlement: {
    settle: '[ky] был заселен',
    unsettle: '[ky] был выселен',
    move: '[ky] был переселен',
    to: '[ky] в',
    from: '[ky] из',
    by: '[ky] кем'
  },
  requests: {
    title: '[ky] Жалобы',
    all: '[ky] Все',
    awaiting: '[ky] Не рассмотренные',
    inProgress: '[ky] В процессе',
    done: '[ky] Завершенные',
    create: '[ky] Создать',
    request: {
      room: '[ky] комната',
      author: '[ky] автор',
      date: '[ky] дата',
      category: '[ky] категория',
      start: '[ky] начать',
      finish: '[ky] закончить',
      categories: {
        plumbing: '[ky] сантехника',
        electricity: '[ky] электрика',
        carpentry: '[ky] плотник',
        other: '[ky] другое'
      }
    }
  },
  login: {
    errors: {
      UserNotFound: '[ky] Нет пользователя с таким именем',
      WrongPassword: '[ky] Неверный пароль',
      required: '[ky] Обязательное поле',
      passwordValidation: '[ky] Пароль должен быть минимум в 5 символов'
    },
    username: '[ky] юзернэйм',
    password: '[ky] пароль',
    submit: '[ky] Войти'
  },
  users: {
    title: '[ky] Пользователи',
    list: '[ky] Список',
    create: '[ky] Создать',
    edit: '[ky] редактировать',
    delete: '[ky] удалить',
    submit: '[ky] Отправить',
    username: '[ky] Юзернэйм',
    firstName: '[ky] Имя',
    lastName: '[ky] Фамилия',
    password: '[ky] Пароль',
    empty: '[ky] Пожалуйста, выберите секцию для начала работы',
    tooltips: {
      password: '[ky] Минимальная длина: 5 символов'
    },
    errors: {
      uniqueUsername: '[ky] Юзернэйм должен быть уникальным',
      passwordValidation: '[ky] Пароль должен содержать мнимум 5 символов',
      required: '[ky] Обязательное поле'
    },
    messages: {
      success: '[ky] Успех',
      error: '[ky] Операция не проведена'
    }
  },
  requestForm: {
    title: '[ky] Форма Жалоб',
    requestTitle: '[ky] Заголовок',
    category: '[ky] Категория жалобы',
    description: '[ky] Описание жалобы',
    submit: '[ky] Отправить',
    success: '[ky] Успех'
  },
  applications: {
    title: '[ky] Заявления',
    unconsidered: '[ky] Нерассмотренные',
    approved: '[ky] Утвержденные',
    rejected: '[ky] Отказанные',
    birthDate: '[ky] Дата рождения',
    passportNumber: '[ky] Номер паспорта',
    issuedBy: '[ky] Кем выдан',
    issuedOn: '[ky] Когда выдан',
    agree: '[ky] Я согласен',
    submit: '[ky] Отправить',
    approve: '[ky] Утвердить',
    reject: '[ky] Отказать',
    tooltips: {
      passportNumber: '[ky] Номер паспорта должене содержать 7 символов',
      issuedBy: "[ky] МКК должен содержать 5 символов включая '-'"
    }
  },
  announcements: {
    title: '[ky] Объявления',
    list: '[ky] Список',
    create: '[ky] Создать',
    edit: '[ky] Редактировать',
    delete: '[ky] Удалить',
    announcementTitle: '[ky] Заголовок',
    description: '[ky] Описание',
    submit: '[ky] Отправить'
  }
};
