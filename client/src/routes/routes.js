import i18next from '../i18n/i18n';
export default [
  {
    href: '/dormitory/',
    roles: ['commandant', 'admin'],
    title: () => i18next.t('header.dormitory'),
    icon: 'home'
  },
  {
    href: '/tenants/',
    roles: ['commandant', 'admin'],
    title: () => i18next.t('header.tenants'),
    icon: 'idcard'
  },
  {
    href: '/settlements/',
    roles: ['commandant', 'admin'],
    title: () => i18next.t('header.settlements'),
    icon: 'audit'
  },
  {
    href: '/announcements/',
    roles: ['student', 'employee', 'commandant', 'service', 'admin'],
    title: () => i18next.t('header.announcements'),
    icon: 'notification'
  },
  {
    href: '/requests/',
    roles: ['student', 'employee', 'admin', 'service', 'commandant'],
    title: () => i18next.t('header.requests'),
    icon: 'fire'
  },
  {
    href: '/applications/',
    roles: ['dean', 'admin'],
    title: () => i18next.t('header.applications'),
    icon: 'solution'
  },
  {
    href: '/apply/',
    roles: ['student', 'employee'],
    title: () => i18next.t('header.apply'),
    icon: 'mail'
  },
  {
    href: '/users/',
    roles: ['admin'],
    title: () => i18next.t('header.users'),
    icon: 'team'
  },
];
