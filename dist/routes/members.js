'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const router = (0, express_1.Router)();
const members_1 = require('../controller/members');
const projectAuth_1 = require('../middleware/projectAuth');
//LOGIN PAGE
//router.post('/addMembers', addMembers);
router.put('/updateTeam/:teamID', projectAuth_1.projectAuth, members_1.updateMembers);
exports.default = router;
//# sourceMappingURL=members.js.map
