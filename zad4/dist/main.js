/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./auxilaryFunctions.js":
/*!******************************!*\
  !*** ./auxilaryFunctions.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let has_at_least_8_chars = false;\nlet has_at_least_one_digit = false;\nlet has_at_least_one_special_char = false;\nlet has_at_least_one_capital_letter = false;\n\nconst check_if_has_at_least_eight_chars = (text) => \n{\n    return text.length >= 8;\n};\n\nconst check_if_has_at_least_one_special_char = (text) =>\n{\n    var regexp = /(?=.*[!@#$%^&*])/;\n    return regexp.test(text);\n};\n\nconst check_if_has_at_lest_one_capital_letter = (text) =>\n{\n    var regexp = /(?=.*[A-Z])/;\n    return regexp.test(text);\n};\n\nconst check_if_has_at_least_one_digit = (text) =>\n{\n    var regexp = /\\d/;\n    return regexp.test(text);\n};\n\nconst validate_password = (text) => \n{\n\n    if(!check_if_has_at_least_eight_chars(text))\n    {\n        has_at_least_8_chars = false;\n    }\n    else \n    {\n        has_at_least_8_chars = true;\n    }\n\n    if(!check_if_has_at_least_one_special_char(text))\n    {\n        has_at_least_one_special_char = false;\n    }\n    else\n    {\n        has_at_least_one_special_char = true;\n    }\n\n    if(!check_if_has_at_lest_one_capital_letter(text))\n    {\n       has_at_least_one_capital_letter = false;\n    }\n    else\n    {\n        has_at_least_one_capital_letter = true;\n    }\n\n    if(!check_if_has_at_least_one_digit(text))\n    {\n        has_at_least_one_digit = false;\n    }\n    else\n    {\n        has_at_least_one_digit = true;\n    }\n\n    return ( has_at_least_8_chars && has_at_least_one_capital_letter && has_at_least_one_digit && has_at_least_one_special_char ) ? true : false;\n};\n\nconst show_status_of_password = (span_8_chars_requirement, span_one_special_char_requirement, span_one_capital_letter_requirement, span_one_digit_requirement) => {\n    if(!has_at_least_8_chars)\n    {\n        span_8_chars_requirement.innerHTML = 'cancel';\n        span_8_chars_requirement.style.color = 'black';\n    }\n    else \n    {\n        span_8_chars_requirement.innerHTML = 'check_circle';\n        span_8_chars_requirement.style.color = 'green';\n    }\n\n    if(!has_at_least_one_special_char)\n    {\n        span_one_special_char_requirement.innerHTML = 'cancel';\n        span_one_special_char_requirement.style.color = 'black';\n    }\n    else\n    {\n        span_one_special_char_requirement.innerHTML = 'check_circle';\n        span_one_special_char_requirement.style.color = 'green';\n    }\n\n    if(!has_at_least_one_capital_letter)\n    {\n        span_one_capital_letter_requirement.innerHTML = 'cancel';\n        span_one_capital_letter_requirement.style.color = 'black';\n    }\n    else\n    {\n        span_one_capital_letter_requirement.innerHTML = 'check_circle';\n        span_one_capital_letter_requirement.style.color = 'green';\n    }\n\n    if(!has_at_least_one_digit)\n    {\n        span_one_digit_requirement.innerHTML = 'cancel';\n        span_one_digit_requirement.style.color = 'black';\n    }\n    else\n    {\n        span_one_digit_requirement.innerHTML = 'check_circle';\n        span_one_digit_requirement.style.color = 'green';\n    }\n};\n\nexports.check_if_has_at_least_one_special_char = check_if_has_at_least_one_special_char;\nexports.check_if_has_at_least_eight_chars = check_if_has_at_least_eight_chars;\nexports.check_if_has_at_lest_one_capital_letter = check_if_has_at_lest_one_capital_letter;\nexports.check_if_has_at_least_one_digit = check_if_has_at_least_one_digit;\nexports.validate_password = validate_password;\nexports.show_status_of_password = show_status_of_password;\n\n//# sourceURL=webpack:///./auxilaryFunctions.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { validate_password, show_status_of_password } = __webpack_require__(/*! ./auxilaryFunctions */ \"./auxilaryFunctions.js\");\n\nconsole.log(\"It is working!\");\n\nconst new_password_input = document.getElementById('new_password_input');\nconst repeat_password_input = document.getElementById('repeat_password_input');\n\nconst span_8_chars_requirement = document.getElementById('characters_requirement');\nconst span_one_special_char_requirement = document.getElementById('one_special_character_requirement');\nconst span_one_capital_letter_requirement = document.getElementById('one_capital_letter_requirement');\nconst span_one_digit_requirement = document.getElementById('one_digit_requirement');\n\nconst hide_new_password_input = document.getElementById('hide_new_password_icon');\nconst hide_repeat_password_input= document.getElementById('hide_repeat_password_icon');\n\nlet is_hidden_new_password = true;\nlet is_hidden_repeat_password = true;\nlet are_passwords_the_same = true;\n\nhide_new_password_input.addEventListener('click', (e)=>\n{\n    is_hidden_new_password = !is_hidden_new_password;\n    if(is_hidden_new_password)\n    {\n        new_password_input.setAttribute('type', 'password');\n        hide_new_password_input.setAttribute('src', 'bxs-bullseye.svg');\n    }\n    else\n    {\n        new_password_input.setAttribute('type', 'text');\n        hide_new_password_input.setAttribute('src', 'bx-low-vision.svg');\n    }\n});\n\nhide_repeat_password_input.addEventListener('click', (e)=>\n{\n    is_hidden_repeat_password = !is_hidden_repeat_password;\n    if(is_hidden_repeat_password)\n    {\n        repeat_password_input.setAttribute('type', 'password');\n        hide_repeat_password_input.setAttribute('src', 'bxs-bullseye.svg');\n    }\n    else\n    {\n        repeat_password_input.setAttribute('type', 'text');\n        hide_repeat_password_input.setAttribute('src', 'bx-low-vision.svg');\n    }\n});\n\nnew_password_input.addEventListener('input', (e)=>\n{\n    validate_password(new_password_input.value);\n    show_status_of_password(span_8_chars_requirement, span_one_special_char_requirement, span_one_capital_letter_requirement, span_one_digit_requirement);\n});\n\n\nrepeat_password_input.addEventListener(\"keyup\", function(event) {\n    event.preventDefault();\n    if (event.keyCode === 13) {\n        if(new_password_input.value === repeat_password_input.value)\n        {\n            are_passwords_the_same = true;\n        }\n        else\n        {\n            are_passwords_the_same = false;\n            alert(\"Passwords are not the same, you have to correct them!\");\n        }\n    }\n});\n\n\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });