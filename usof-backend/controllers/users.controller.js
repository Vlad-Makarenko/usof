const allUsers = async (req, res, next) => {
  try {
    res.json([4, 444]);
  } catch (err) {}
};

module.exports = {
  allUsers,
};
