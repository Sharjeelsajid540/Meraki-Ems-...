"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/User/Home/page",{

/***/ "(app-pages-browser)/./src/Components/navbar.js":
/*!**********************************!*\
  !*** ./src/Components/navbar.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavBar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _Apis_apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Apis/apis */ \"(app-pages-browser)/./Apis/apis.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction NavBar() {\n    _s();\n    const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [userImage, setUserImage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const id = localStorage.getItem(\"LoginData\");\n        if (id) {\n            const idData = JSON.parse(id);\n            if (idData && idData.name) {\n                setUserName(idData.name);\n                (0,_Apis_apis__WEBPACK_IMPORTED_MODULE_3__.fetchUserImage)(idData.id).then((response)=>{\n                    console.log(\"response\", response);\n                    setUserImage(response.image);\n                }).catch((error)=>{\n                    console.error(\"Error fetching user image:\", error);\n                });\n            }\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center h-26 px-36 bg-navbar-color\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"flex justify-content-start mr-5 ml-Welcome-text\",\n                children: \"Welcome\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"ml-auto flex items-center space-x-4 mr-UserName-text\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: userImage && userImage !== \"\" && userImage !== \"string\" ? \"data:image/jpeg;base64,\".concat(userImage) : \"/Ellipse 8.png\",\n                        className: \"h-[50px]\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-signature\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-black text-4xl\",\n                            children: userName\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                            lineNumber: 44,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, this);\n}\n_s(NavBar, \"FeVZzYjKcs7DeIBKW3l2rjzJ6rU=\");\n_c = NavBar;\nvar _c;\n$RefreshReg$(_c, \"NavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9Db21wb25lbnRzL25hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNtRDtBQUN0QjtBQUNvQjtBQUVsQyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ00sV0FBV0MsYUFBYSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUUzQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNUyxLQUFLQyxhQUFhQyxPQUFPLENBQUM7UUFDaEMsSUFBSUYsSUFBSTtZQUNOLE1BQU1HLFNBQVNDLEtBQUtDLEtBQUssQ0FBQ0w7WUFFMUIsSUFBSUcsVUFBVUEsT0FBT0csSUFBSSxFQUFFO2dCQUN6QlQsWUFBWU0sT0FBT0csSUFBSTtnQkFDdkJaLDBEQUFjQSxDQUFDUyxPQUFPSCxFQUFFLEVBQ3JCTyxJQUFJLENBQUMsQ0FBQ0M7b0JBQ0xDLFFBQVFDLEdBQUcsQ0FBQyxZQUFZRjtvQkFDeEJULGFBQWFTLFNBQVNHLEtBQUs7Z0JBQzdCLEdBQ0NDLEtBQUssQ0FBQyxDQUFDQztvQkFDTkosUUFBUUksS0FBSyxDQUFDLDhCQUE4QkE7Z0JBQzlDO1lBQ0o7UUFDRjtJQUNGLEdBQUcsRUFBRTtJQUlMLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQWtEOzs7Ozs7MEJBQ2hFLDhEQUFDRDtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNFO3dCQUNDQyxLQUNFcEIsYUFBYUEsY0FBYyxNQUFNQSxjQUFjLFdBQzNDLDBCQUFvQyxPQUFWQSxhQUMxQjt3QkFFTmlCLFdBQVU7Ozs7OztrQ0FFWiw4REFBQ0k7d0JBQUdKLFdBQVU7a0NBQ1osNEVBQUNLOzRCQUFLTCxXQUFVO3NDQUNibkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT2I7R0E5Q3dCRDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvQ29tcG9uZW50cy9uYXZiYXIuanM/ZTU0OCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5pbXBvcnQgeyBmZXRjaFVzZXJJbWFnZSB9IGZyb20gXCIuLi8uLi9BcGlzL2FwaXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdkJhcigpIHtcclxuICBjb25zdCBbdXNlck5hbWUsIHNldFVzZXJOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFt1c2VySW1hZ2UsIHNldFVzZXJJbWFnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJMb2dpbkRhdGFcIik7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgY29uc3QgaWREYXRhID0gSlNPTi5wYXJzZShpZClcclxuICAgICAgICA7XHJcbiAgICAgIGlmIChpZERhdGEgJiYgaWREYXRhLm5hbWUpIHtcclxuICAgICAgICBzZXRVc2VyTmFtZShpZERhdGEubmFtZSk7XHJcbiAgICAgICAgZmV0Y2hVc2VySW1hZ2UoaWREYXRhLmlkKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBzZXRVc2VySW1hZ2UocmVzcG9uc2UuaW1hZ2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXIgaW1hZ2U6XCIsIGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGgtMjYgcHgtMzYgYmctbmF2YmFyLWNvbG9yXCI+XHJcbiAgICAgIDxoMiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBtci01IG1sLVdlbGNvbWUtdGV4dFwiPldlbGNvbWU8L2gyPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLWF1dG8gZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC00IG1yLVVzZXJOYW1lLXRleHRcIj5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICBzcmM9e1xyXG4gICAgICAgICAgICB1c2VySW1hZ2UgJiYgdXNlckltYWdlICE9PSBcIlwiICYmIHVzZXJJbWFnZSAhPT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgID8gYGRhdGE6aW1hZ2UvanBlZztiYXNlNjQsJHt1c2VySW1hZ2V9YFxyXG4gICAgICAgICAgICAgIDogXCIvRWxsaXBzZSA4LnBuZ1wiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJoLVs1MHB4XVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zaWduYXR1cmVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdGV4dC00eGxcIj5cclxuICAgICAgICAgICAge3VzZXJOYW1lfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvaDE+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiZmV0Y2hVc2VySW1hZ2UiLCJOYXZCYXIiLCJ1c2VyTmFtZSIsInNldFVzZXJOYW1lIiwidXNlckltYWdlIiwic2V0VXNlckltYWdlIiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaWREYXRhIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsInRoZW4iLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJpbWFnZSIsImNhdGNoIiwiZXJyb3IiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsImltZyIsInNyYyIsImgxIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/Components/navbar.js\n"));

/***/ })

});