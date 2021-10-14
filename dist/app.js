"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
// import authRouter from "./routes/auth";
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const passwordRoutes_1 = __importDefault(require("./routes/passwordRoutes"));
const profile_routes_1 = __importDefault(require("./routes/profile-routes"));
const task_routes_1 = __importDefault(require("./routes/task-routes"));
const teamsRoute_1 = __importDefault(require("./routes/teamsRoute"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    //To allow requests from client
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
};
app.use((0, cors_1.default)(corsOptions));
require('./config/passport-config');
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookiesKey],
}));
app.use((0, express_flash_1.default)());
//initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/password', passwordRoutes_1.default);
app.use('/profile', profile_routes_1.default);
app.use('/tasks', task_routes_1.default);
app.use('/', teamsRoute_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map