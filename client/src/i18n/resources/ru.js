export default {
  test: 'это тестовая строка',
  profile: {
    languageLabel: 'Выберите язык'
  },
  header: {
    brandTitle: 'Общежитие КГТУ',
    documentation: 'Документация',
    profile: 'Профиль',
    logout: 'Выйти',
    dormitory: 'Общежитие',
    tenants: 'Жители',
    settlements: 'Расселения',
    announcements: 'Объявления',
    requests: 'Жалобы',
    applications: 'Заявления',
    apply: 'Подать заявление',
    users: 'Пользователи'
  },
  welcome: {
    header: 'Добро пожаловать на сайт управления общежитием КГТУ',
    text: 'Пожалуйста, выберите секцию для начала работы'
  },
  dormitory: {
    dormitory: 'Общежитие',
    selectRoom: 'Пожалуйста, выберите комнату',
    floor: 'Этаж',
    details: 'Подробности',
    addTenant: 'Добавить жителя',
    tenants: 'Жители',
    actions: {
      move: 'Переселить',
      unsettle: 'Выселить',
      tenantDetails: 'Посмотреть профиль'
    },
    roomTypes: {
      room: 'Комната',
      corridor: 'Коридор',
      wc: 'Туалет',
      bathroom: 'Ванная',
      kitchen: 'Кухня'
    }
  },
  roles: {
    employee: 'Сотрудник',
    student: 'Студент',
    service: 'Сервисная служба',
    admin: 'Администратор',
    commandant: 'Коммендант',
    dean: 'Деканат'
  },
  actions: {
    move: 'Переселить',
    unsettle: 'Выселить',
    settle: 'Заселить',
    all: 'Все'
  },
  addTenant: {
    chooseAtenant: 'Выберите жителя',
    submit: 'Подтвердить'
  },
  lists: {
    loadMore: 'Загрузить еще'
  },
  tenants: {
    title: 'Жители',
    all: 'Все',
    notSettled: 'Незаселенные',
    settled: 'Заселенные',
    settle: 'Заселить',
    unsettle: 'Выселить',
    move: 'Переселить',
    notLiving: 'Не проживает в общежитии'
  },
  settlementForm: {
    title: 'Выберите комнату',
    dormitory: 'Общежитие',
    floor: 'Этаж',
    available: 'Свободно',
    noResidents: 'Нет проживающих'
  },
  tenantDetails: {
    dormitory: 'Общежитие',
    floor: 'Этаж',
    number: 'Номер',
    requests: 'Жалобы',
    settlements: 'Расселения'
  },
  settlements: {
    title: 'Расселения',
    actions: {
      all: 'Все',
      settle: 'Заселенные',
      unsettle: 'Выселенные',
      move: 'Переселенные'
    },
    settlement: {
      settle: 'был заселен',
      unsettle: 'был выселен',
      move: 'был переселен',
      to: 'в',
      from: 'из',
      by: 'кем'
    }
  },
  requests: {
    title: 'Жалобы',
    all: 'Все',
    awaiting: 'Не рассмотренные',
    inProgress: 'В процессе',
    done: 'Завершенные',
    create: 'Создать',
    request: {
      room: 'комната',
      author: 'автор',
      date: 'дата',
      category: 'категория',
      start: 'начать',
      finish: 'закончить',
      categories: {
        plumbing: 'сантехника',
        electricity: 'электрика',
        carpentry: 'плотник',
        other: 'другое'
      }
    }
  },
  login: {
    errors: {
      UserNotFound: 'Нет пользователя с таким именем',
      WrongPassword: 'Неверный пароль',
      required: 'Обязательное поле',
      passwordValidation: 'Пароль должен быть минимум в 5 символов'
    },
    username: 'юзернэйм',
    password: 'пароль',
    submit: 'Войти'
  },
  users: {
    title: 'Пользователи',
    list: 'Список',
    create: 'Создать',
    edit: 'редактировать',
    delete: 'удалить',
    submit: 'Отправить',
    username: 'Юзернэйм',
    firstName: 'Имя',
    lastName: 'Фамилия',
    password: 'Пароль',
    empty: 'Пожалуйста, выберите секцию для начала работы',
    tooltips: {
      password: 'Минимальная длина: 5 символов'
    },
    errors: {
      uniqueUsername: 'Юзернэйм должен быть уникальным',
      passwordValidation: 'Пароль должен содержать мнимум 5 символов',
      required: 'Обязательное поле'
    },
    messages: {
      success: 'Успех',
      error: 'Операция не проведена'
    }
  },
  requestForm: {
    title: 'Форма Жалоб',
    requestTitle: 'Заголовок',
    category: 'Категория жалобы',
    description: 'Описание жалобы',
    submit: 'Отправить',
    success: 'Успех'
  },
  applications: {
    title: 'Заявления',
    unconsidered: 'Нерассмотренные',
    approved: 'Утвержденные',
    rejected: 'Отказанные',
    birthDate: 'Дата рождения',
    passportNumber: 'Номер паспорта',
    issuedBy: 'Кем выдан',
    issuedOn: 'Когда выдан',
    agree: 'Я согласен',
    submit: 'Отправить',
    approve: 'Утвердить',
    reject: 'Отказать',
    tooltips: {
      passportNumber: 'Номер паспорта должене содержать 7 символов',
      issuedBy: "МКК должен содержать 5 символов включая '-'"
    }
  },
  announcements: {
    title: 'Объявления',
    list: 'Список',
    create: 'Создать',
    edit: 'Редактировать',
    delete: 'Удалить',
    announcementTitle: 'Заголовок',
    description: 'Описание',
    submit: 'Отправить'
  }
};
