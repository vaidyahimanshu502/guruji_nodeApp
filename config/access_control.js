const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("task")
 .updateOwn("task")
 .createOwn("task")
 .deleteOwn("task")
 .updateOwn("task")

 ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
 
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("task")
 .deleteAny("task")
 .createOwn("task")
 
return ac;
})();