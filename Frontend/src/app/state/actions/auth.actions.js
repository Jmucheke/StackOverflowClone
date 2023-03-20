"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginFailure = exports.loginSuccess = exports.login = void 0;
const store_1 = require("@ngrx/store");
exports.login = (0, store_1.createAction)('[Auth] Login', (0, store_1.props)());
exports.loginSuccess = (0, store_1.createAction)('[Auth] Login Success', (0, store_1.props)());
exports.loginFailure = (0, store_1.createAction)('[Auth] Login Failure', (0, store_1.props)());
exports.logout = (0, store_1.createAction)('[Auth] Logout');
