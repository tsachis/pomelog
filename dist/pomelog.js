(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pomelog", [], factory);
	else if(typeof exports === 'object')
		exports["pomelog"] = factory();
	else
		root["pomelog"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pomelog = /** @class */ (function () {
    function Pomelog(window) {
        this.window = window;
        this.useGroup = true;
        this.groupPrefix = '';
        this.isEnabled = !!window.localStorage.getItem(Pomelog.ENABLED_FLAG);
        this.componentsFilter = window.localStorage.getItem(Pomelog.COMPONENTS_FILTER_FLAG) || '';
    }
    Pomelog.prototype.log = function (component) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cnsl = this.window.console;
        try {
            if (!this.isEnabled) {
                return;
            }
            if (!component || typeof component !== 'string') {
                cnsl.warn("First argument to pomelog.log \n                          must be a string specifying the component/namespace name");
                return;
            }
            if (this.shouldLog(component)) {
                if (this.useGroup) {
                    cnsl.group((this.groupPrefix + " " + component).trim());
                    cnsl.log.apply(cnsl, args);
                    cnsl.groupEnd();
                }
                else {
                    cnsl.log.apply(this.window.console, args);
                }
            }
        }
        catch (err) {
            cnsl.error(err);
        }
    };
    Pomelog.prototype.enable = function () {
        this.isEnabled = true;
    };
    Pomelog.prototype.setFilter = function (filter) {
        if (typeof filter !== 'string') {
            this.window.console.warn('Component/namespace filter must be a string');
            return;
        }
        this.componentsFilter = filter;
    };
    Pomelog.prototype.shouldLog = function (component) {
        var filter = this.componentsFilter.replace('*', '');
        return component.indexOf(filter) === 0;
    };
    Pomelog.ENABLED_FLAG = 'pomelog-enabled';
    Pomelog.COMPONENTS_FILTER_FLAG = 'pomelog-components-filter';
    return Pomelog;
}());
exports.pomelog = new Pomelog(window);


/***/ })
/******/ ])["pomelog"];
});
//# sourceMappingURL=pomelog.js.map