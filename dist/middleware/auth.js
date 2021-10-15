'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const secretKey = process.env.TOKEN_KEY;
//type extendedReq = Request & {regUser: unknown}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const auth = async (req, res, next) => {
  // const token: any = req.header('x-auth-token')
  const token = req.cookies.jwt;
  if (!token) res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jsonwebtoken_1.default.verify(token, secretKey);
    req.regUser = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: 'please you have to be Authenticated' });
  }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map
