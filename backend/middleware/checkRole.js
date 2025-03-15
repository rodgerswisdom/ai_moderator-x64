const jwt  = require('jsonwebtoken');
require('dotenv').config();

function checkRole(requiredPermission) {
    return async (req, res, next) => {
      const role = await Role.findById(req.user.role);
      if (role.permissions.includes(requiredPermission)) {
        next();
      } else {
        res.sendStatus(403);
      }
    };
}

module.exports = checkRole;
