const DEMO_USER = {
  id: 1,
  email: 'admin@example.com',
  password: 'admin'
};

export const userRepository = {
  async findByEmail(email) {
    if (email === DEMO_USER.email) {
      return DEMO_USER;
    }
    return null;
  },
};
