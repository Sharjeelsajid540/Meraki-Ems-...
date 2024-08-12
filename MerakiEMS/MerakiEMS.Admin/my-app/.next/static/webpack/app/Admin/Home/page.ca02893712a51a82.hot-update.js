"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/Admin/Home/page",{

/***/ "(app-pages-browser)/./src/Components/navbar.js":
/*!**********************************!*\
  !*** ./src/Components/navbar.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavBar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _Apis_apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Apis/apis */ \"(app-pages-browser)/./Apis/apis.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction NavBar() {\n    _s();\n    const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [userImage, setUserImage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const id = localStorage.getItem(\"LoginData\");\n        if (id) {\n            const idData = JSON.parse(id);\n            if (idData && idData.name) {\n                setUserName(idData.name);\n                (0,_Apis_apis__WEBPACK_IMPORTED_MODULE_3__.fetchUserImage)(idData.id).then((response)=>{\n                    console.log(\"response\", response);\n                    setUserImage(response.image);\n                }).catch((error)=>{\n                    console.error(\"Error fetching user image:\", error);\n                });\n            }\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center h-26 px-36 bg-navbar-color\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"flex justify-content-start mr-5 ml-Welcome-text\",\n                children: \"Welcome\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"ml-auto flex items-center mr-UserName-text\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        href: \"/Profile\",\n                        passHref: true,\n                        className: \"no-underline\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: userImage && userImage !== \"\" && userImage !== \"string\" ? \"data:image/jpeg;base64,\".concat(userImage) : \"/Ellipse 8.png\",\n                            className: \"h-[50px]\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                            lineNumber: 37,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-signature\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            className: \"text-black text-4xl\",\n                            href: \"/Login\",\n                            target: \"_blank\",\n                            rel: \"noreferrer\",\n                            children: userName\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                            lineNumber: 47,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 46,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, this);\n}\n_s(NavBar, \"FeVZzYjKcs7DeIBKW3l2rjzJ6rU=\");\n_c = NavBar;\nvar _c;\n$RefreshReg$(_c, \"NavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9Db21wb25lbnRzL25hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNtRDtBQUN0QjtBQUNvQjtBQUVsQyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ00sV0FBV0MsYUFBYSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUUzQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNUyxLQUFLQyxhQUFhQyxPQUFPLENBQUM7UUFDaEMsSUFBSUYsSUFBSTtZQUNOLE1BQU1HLFNBQVNDLEtBQUtDLEtBQUssQ0FBQ0w7WUFFMUIsSUFBSUcsVUFBVUEsT0FBT0csSUFBSSxFQUFFO2dCQUN6QlQsWUFBWU0sT0FBT0csSUFBSTtnQkFDdkJaLDBEQUFjQSxDQUFDUyxPQUFPSCxFQUFFLEVBQ3JCTyxJQUFJLENBQUMsQ0FBQ0M7b0JBQ0xDLFFBQVFDLEdBQUcsQ0FBQyxZQUFZRjtvQkFDeEJULGFBQWFTLFNBQVNHLEtBQUs7Z0JBQzdCLEdBQ0NDLEtBQUssQ0FBQyxDQUFDQztvQkFDTkosUUFBUUksS0FBSyxDQUFDLDhCQUE4QkE7Z0JBQzlDO1lBQ0o7UUFDRjtJQUNGLEdBQUcsRUFBRTtJQUlMLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQWtEOzs7Ozs7MEJBQ2hFLDhEQUFDRDtnQkFBSUMsV0FBVTs7a0NBRWIsOERBQUNFO3dCQUFFQyxNQUFLO3dCQUFXQyxRQUFRO3dCQUFDSixXQUFVO2tDQUNwQyw0RUFBQ0s7NEJBQ0NDLEtBQ0V2QixhQUFhQSxjQUFjLE1BQU1BLGNBQWMsV0FDM0MsMEJBQW9DLE9BQVZBLGFBQzFCOzRCQUVOaUIsV0FBVTs7Ozs7Ozs7Ozs7a0NBR2QsOERBQUNPO3dCQUFHUCxXQUFVO2tDQUNaLDRFQUFDdEIsaURBQUlBOzRCQUNIc0IsV0FBVTs0QkFDVkcsTUFBSzs0QkFDTEssUUFBTzs0QkFDUEMsS0FBSTtzQ0FFSDVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9iO0dBdER3QkQ7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL0NvbXBvbmVudHMvbmF2YmFyLmpzP2U1NDgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgZmV0Y2hVc2VySW1hZ2UgfSBmcm9tIFwiLi4vLi4vQXBpcy9hcGlzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOYXZCYXIoKSB7XHJcbiAgY29uc3QgW3VzZXJOYW1lLCBzZXRVc2VyTmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbdXNlckltYWdlLCBzZXRVc2VySW1hZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTG9naW5EYXRhXCIpO1xyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIGNvbnN0IGlkRGF0YSA9IEpTT04ucGFyc2UoaWQpXHJcbiAgICAgICAgO1xyXG4gICAgICBpZiAoaWREYXRhICYmIGlkRGF0YS5uYW1lKSB7XHJcbiAgICAgICAgc2V0VXNlck5hbWUoaWREYXRhLm5hbWUpO1xyXG4gICAgICAgIGZldGNoVXNlckltYWdlKGlkRGF0YS5pZClcclxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgc2V0VXNlckltYWdlKHJlc3BvbnNlLmltYWdlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGltYWdlOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBoLTI2IHB4LTM2IGJnLW5hdmJhci1jb2xvclwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXItNSBtbC1XZWxjb21lLXRleHRcIj5XZWxjb21lPC9oMj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtbC1hdXRvIGZsZXggaXRlbXMtY2VudGVyIG1yLVVzZXJOYW1lLXRleHRcIj5cclxuXHJcbiAgICAgICAgPGEgaHJlZj1cIi9Qcm9maWxlXCIgcGFzc0hyZWYgY2xhc3NOYW1lPVwibm8tdW5kZXJsaW5lXCI+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIHNyYz17XHJcbiAgICAgICAgICAgICAgdXNlckltYWdlICYmIHVzZXJJbWFnZSAhPT0gXCJcIiAmJiB1c2VySW1hZ2UgIT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgID8gYGRhdGE6aW1hZ2UvanBlZztiYXNlNjQsJHt1c2VySW1hZ2V9YFxyXG4gICAgICAgICAgICAgICAgOiBcIi9FbGxpcHNlIDgucG5nXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJoLVs1MHB4XVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zaWduYXR1cmVcIj5cclxuICAgICAgICAgIDxMaW5rXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdGV4dC00eGxcIlxyXG4gICAgICAgICAgICBocmVmPVwiL0xvZ2luXCJcclxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt1c2VyTmFtZX1cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L2gxPlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTGluayIsImZldGNoVXNlckltYWdlIiwiTmF2QmFyIiwidXNlck5hbWUiLCJzZXRVc2VyTmFtZSIsInVzZXJJbWFnZSIsInNldFVzZXJJbWFnZSIsImlkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlkRGF0YSIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiaW1hZ2UiLCJjYXRjaCIsImVycm9yIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJhIiwiaHJlZiIsInBhc3NIcmVmIiwiaW1nIiwic3JjIiwiaDEiLCJ0YXJnZXQiLCJyZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/Components/navbar.js\n"));

/***/ })

});