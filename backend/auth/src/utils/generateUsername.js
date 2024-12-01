const UserRepository = require('../repositories/userRepository')

const generateRandomUsername = async () => {
  let username;
  let isUnique = false;

  while (!isUnique) {
    // Tạo tên người dùng ngẫu nhiên
    const randomString = Math.random().toString(36).substring(2, 8);
    username = `user_${randomString}`;

    const existingUser = await UserRepository.getUserByUsername({ username });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return username;  
};

module.exports =  generateRandomUsername ;