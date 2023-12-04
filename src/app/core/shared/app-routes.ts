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
      review:{
        path:'review',
        absolute:'/home/review',
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
  apps: {
    path: 'apps',
    absolute: '/apps',
    children: {
      workout: {
        path: 'workout',
        absolute: '/apps/workout',
        children: {
          viewWorkout: {
            path: 'view',
            absolute: '/apps/workout/view',
          },
          editWorkout: {
            path: 'edit-workout',
            absolute: '/apps/workout/edit-workout',
          },
        },
      },
    },
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
