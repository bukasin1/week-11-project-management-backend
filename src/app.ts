import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cookieSession from 'cookie-session';
import passport from 'passport';
import flash from 'express-flash';

// import authRouter from "./routes/auth";
import authRouter from './routes/auth-routes';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import passwordRouter from './routes/passwordRoutes';
import profileRouter from './routes/profile-routes';
import tasksRouter from './routes/task-routes';
import teamsRoute from './routes/teamsRoute';

const app = express();
require('./config/passport-config');

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookiesKey as string],
  }),
);
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/password', passwordRouter);
app.use('/profile', profileRouter);
app.use('/tasks', tasksRouter);
app.use('/', teamsRoute);

// catch 404 and forward to error handler

app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
