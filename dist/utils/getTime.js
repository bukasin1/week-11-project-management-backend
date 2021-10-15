"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = exports.logTime = void 0;
const logTime = (value) => {
    let currentTime = new Date();
    let setTime = new Date(value);
    const time = (+currentTime - +setTime) / 1000;
    let result = 0;
    let output = '';
    if (time < 60) {
        result = Math.ceil(time);
        if (result > 1) {
            output = `${result} secs`;
        }
        else {
            output = `${result} sec`;
        }
    }
    else if (time < 60 * 60) {
        result = Math.ceil(time / 60);
        if (result > 1) {
            output = `${result} mins`;
        }
        else {
            output = `${result} min`;
        }
    }
    else if (time < 60 * 60 * 24) {
        result = Math.ceil(time / (60 * 60));
        if (result > 1) {
            output = `${result} hrs`;
        }
        else {
            output = `${result} hr`;
        }
    }
    else if (time < 60 * 60 * 24 * 7) {
        result = Math.ceil(time / (60 * 60 * 24));
        if (result > 1) {
            output = `${result} days`;
        }
        else {
            output = `${result} day`;
        }
    }
    else if (time < 60 * 60 * 24 * 7 * 52) {
        result = Math.ceil(time / (60 * 60 * 24 * 7));
        if (result > 1) {
            output = `${result} wks`;
        }
        else {
            output = `${result} wk`;
        }
    }
    return output;
};
exports.logTime = logTime;
const getCurrentTime = (value) => {
    let setDate = new Date(value);
    let time = `${setDate.getHours()}:${setDate.getMinutes()} hrs`;
    return time;
};
exports.getCurrentTime = getCurrentTime;
//# sourceMappingURL=getTime.js.map