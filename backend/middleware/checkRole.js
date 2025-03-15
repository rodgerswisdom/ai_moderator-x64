const Role = require('../models/roles');

/**
 * 
student = ['access_dashboard', 'access_assignment', 'access_grades', 'access_chat', 'edit_assignment', 'access_profile'];
educator = ['access_dashboard', 'access_assignment', 'access_grades', 'access_chat', 'edit_assignment', 'access_profile'];
admin = ['access_dashboard', 'access_assignment', 'access_grades', 'access_chat', 'edit_assignment', 'access_profile', 'edit_grades', 'edit_chat', 'edit_profile', 'edit_assignment', 'edit_dashboard'];
*/

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
