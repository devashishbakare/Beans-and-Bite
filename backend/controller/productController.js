const t = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

module.exports = {
  t,
};
