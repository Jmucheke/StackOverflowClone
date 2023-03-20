"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReducer = exports.initialState = void 0;
const store_1 = require("@ngrx/store");
const AuthActions = __importStar(require("../actions/auth.actions"));
exports.initialState = {
    isLoggedIn: false,
    error: null,
    user: null,
};
exports.authReducer = (0, store_1.createReducer)(exports.initialState, (0, store_1.on)(AuthActions.login, (state) => {
    return Object.assign(Object.assign({}, state), { isLoggedIn: false });
}), (0, store_1.on)(AuthActions.loginSuccess, (state, { user }) => {
    return Object.assign(Object.assign({}, state), { isLoggedIn: true, error: null, user });
}), (0, store_1.on)(AuthActions.loginFailure, (state, { error }) => {
    return Object.assign(Object.assign({}, state), { isLoggedIn: false, error });
}), (0, store_1.on)(AuthActions.logout, (state) => {
    return Object.assign(Object.assign({}, state), { isLoggedIn: false });
}));
