function requireUser(req, res, next) {
  req.user && next();
}

// function decodeURIComponent(string);{
// string.
// }

module.exports = {
  requireUser,
  // decodeURIComponent
};
