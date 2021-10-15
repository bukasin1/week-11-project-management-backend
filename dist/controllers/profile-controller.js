"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProfile = void 0;
const showProfile = (req, res) => {
    const user = req.user;
    res.render('profile', { user: user.userName });
};
exports.showProfile = showProfile;
//# sourceMappingURL=profile-controller.js.map