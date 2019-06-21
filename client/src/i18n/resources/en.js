export default {
  test: 'this is a test string',
  profile: {
    languageLabel: 'choose language'
  },
  header: {
    brandTitle: 'KSTU Dormitory',
    documentation: 'Documentation',
    profile: 'Profile',
    logout: 'Log Out',
    dormitory: 'Dormitory',
    tenants: 'Tenants',
    settlements: 'Settlements',
    announcements: 'Announcements',
    requests: 'Requests',
    applications: 'Applications',
    apply: 'Apply',
    users: 'Users'
  },
  welcome: {
    header: 'Welcome to KSTU dormitory administration website.',
    text: 'Please, choose a corresponding section to start working.'
  },
  dormitory: {
    dormitory: 'Dormitory',
    selectRoom: 'Please, select room',
    floor: 'Floor',
    details: 'Details',
    addTenant: 'Add Tenant',
    tenants: 'Tenants',
    actions: {
      move: 'Move',
      unsettle: 'Unsettle',
      tenantDetails: 'See details'
    },
    roomTypes: {
      room: 'Room',
      corridor: 'Corridor',
      wc: 'Water Closet',
      bathroom: 'Bathroom',
      kitchen: 'Kitchen'
    }
  },
  roles: {
    employee: 'Employee',
    student: 'Student',
    service: 'Service Worker',
    admin: 'Admin',
    commandant: 'Commandant',
    dean: 'Dean'
  },
  actions: {
    move: 'Move',
    unsettle: 'Unsettle',
    settle: 'Settle',
    all: 'All'
  },
  addTenant: {
    chooseAtenant: 'Choose a tenant',
    submit: 'Submit'
  },
  lists: {
    loadMore: 'Load More'
  },
  tenants: {
    title: 'Tenants',
    all: 'All',
    notSettled: 'Not Settled',
    settled: 'Settled',
    settle: 'Settle',
    unsettle: 'Unsettle',
    move: 'Move',
    notLiving: 'Not living in a dormitory'
  },
  settlementForm: {
    title: 'Choose a room',
    dormitory: 'Dormitory',
    floor: 'Floor',
    available: 'Available',
    noResidents: 'No residents'
  },
  tenantDetails: {
    dormitory: 'Dormitory',
    floor: 'Floor',
    number: 'Number',
    requests: 'Requests',
    settlements: 'Settlements'
  },
  settlements: {
    title: 'Settlements',
    actions: {
      all: 'All',
      settle: 'Settled',
      unsettle: 'Unsettled',
      move: 'Moved'
    },
    settlement: {
      settle: 'was settled',
      unsettle: 'was unsettled',
      move: 'was moved',
      to: 'to',
      from: 'from',
      by: 'by'
    }
  },
  requests: {
    title: 'Requests',
    all: 'All',
    awaiting: 'Awaiting',
    inProgress: 'In Progress',
    done: 'Done',
    create: 'Create',
    request: {
      room: 'room',
      author: 'author',
      date: 'date',
      category: 'category',
      start: 'start',
      finish: 'finish',
      categories: {
        plumbing: 'plumbing',
        electricity: 'electricity',
        carpentry: 'carpentry',
        other: 'other'
      }
    }
  },
  login: {
    errors: {
      UserNotFound: 'No user with such username',
      WrongPassword: 'Wrong password',
      required: 'Input is required',
      passwordValidation: 'Password must be minimum 5 characters long'
    },
    username: 'username',
    password: 'password',
    submit: 'Log In'
  },
  users: {
    title: 'Users',
    list: 'List',
    create: 'Create',
    edit: 'edit',
    delete: 'delete',
    submit: 'Submit',
    username: 'Username',
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    empty: 'Please, select section to start working',
    tooltips: {
      password: 'Minimum length: 5 characters'
    },
    errors: {
      uniqueUsername: 'Username must be unique',
      passwordValidation: 'Password must be minimum 5 characters long',
      required: 'Input is required'
    },
    messages: {
      success: 'success',
      error: 'could not perform operation'
    }
  },
  requestForm: {
    title: 'Request Form',
    requestTitle: 'Title',
    category: 'Request Category',
    description: 'Request Description',
    submit: 'Submit',
    success: 'Success'
  },
  applications: {
    title: 'Applications',
    unconsidered: 'Unconsidered',
    approved: 'Approved',
    rejected: 'Rejected',
    birthDate: 'Birth Date',
    passportNumber: 'Passport Number',
    issuedBy: 'Issued By',
    issuedOn: 'Issued On',
    agree: 'I Agree',
    submit: 'Submit',
    approve: 'Approve',
    reject: 'Reject',
    tooltips: {
      passportNumber: 'Passport number must be 7 characters long',
      issuedBy: "MKK must be 5 characters long including '-'"
    }
  },
  announcements: {
    title: 'Announcements',
    list: 'List',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    announcementTitle: 'Title',
    description: 'Description',
    submit: 'Submit'
  },
  dormitoryDetails: {
    dormitory: 'Dormitory',
    floor: 'Floor',
    total: 'Total Places',
    occupied: 'Occupied Places',
    summary: 'Summary'
  }
};
