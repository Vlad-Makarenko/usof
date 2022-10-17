module.exports = (user) => ({
  id: user.id,
  email: user.email,
  login: user.login,
  full_name: user.full_name,
  role: user.role,
  avatar: user.profile_picture,
});
