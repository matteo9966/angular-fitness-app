export const ROUTES = {
  home: {
    path: 'home',
    absolute: '/home',
    children: {
      landing: {
        path: 'landing',
        absolute: '/home/landing',
      },
      blog: {
        path: 'blog',
        absolute: '/home/blog',
      },
      courseInfo: {
        path: ':id',
        absolute: '/home/:id',
      },
    },
  },
  dashboard: {
    path: 'dashboard',
    absolute: '/dashboard',
    children: {
      editUser: {
        path: 'edit-user',
        absolute: '/dashboard/edit-user',
      },
      profile: {
        path: 'profile',
        absolute: '/dashboard/profile',
      },
    },
  },
  workout: {
    path: 'workout',
    absolute: '/workout',
    children: {},
  },
  signup: {
    path: 'signup',
    absolute: '/signup',
  },
  login: {
    path: 'login',
    absolute: '/login',
  },
  unauthorized: {
    path: 'unauthorized',
    absolute: '/unauthorized',
  },
};
