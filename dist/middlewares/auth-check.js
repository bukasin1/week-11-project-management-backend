"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {
        next();
    }
};
exports.default = authCheck;
//# sourceMappingURL=auth-check.js.map