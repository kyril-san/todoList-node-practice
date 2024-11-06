const bcrypt = require('bcrypt');

exports.hashPassword = async (plainPassword) => {
  const saltRounds = 13;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

// exports.verifyPassword = async (plainPassword, hashedPassword) => {
//   try {
//     const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
//     if (isMatch) {
//       console.log("Password is correct!");
//     } else {
//       console.log("Password is incorrect!");
//     }
//     return isMatch;
//   } catch (error) {
//     console.error("Error verifying password:", error);
//   }
// };
