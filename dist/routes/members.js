"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const members_1 = require("../controller/members");
//LOGIN PAGE
//router.post('/addMembers', addMembers);
router.put('/updateTeam/:teamID', members_1.updateMembers);
exports.default = router;
//# sourceMappingURL=members.js.map