const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

const adminOrAnalystOnly = (req, res, next) => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'ANALYST')) {
    return res.status(403).json({ message: "Admin or Analyst access only" });
  }
  next();
}

module.exports = {adminOnly, adminOrAnalystOnly};