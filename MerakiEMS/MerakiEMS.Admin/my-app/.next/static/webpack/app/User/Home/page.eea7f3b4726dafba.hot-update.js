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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavBar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _Apis_apis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Apis/apis */ \"(app-pages-browser)/./Apis/apis.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction NavBar() {\n    _s();\n    const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [userimage, setUserimage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const id = localStorage.getItem(\"LoginData\");\n        if (id) {\n            const idData = JSON.parse(id);\n            if (idData && idData.name) {\n                setUserName(idData.name);\n            }\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const imageId = localStorage.getItem(\"imageId\");\n        if (imageId) {\n            const idData = JSON.parse(imageId);\n            if (idData && idData.Image) {\n                setUserimage(idData.Image);\n            }\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center h-26 px-36 bg-navbar-color\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"flex justify-content-start mr-5 ml-Welcome-text\",\n                children: \"Welcome\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"ml-auto flex items-center mr-UserName-text\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: userimage,\n                        alt: \"Logo\",\n                        className: \"mr-5\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-signature\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            className: \"text-black text-4xl\",\n                            href: \"/Login\",\n                            target: \"_blank\",\n                            rel: \"noreferrer\",\n                            children: userName\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                            lineNumber: 35,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                        lineNumber: 34,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\laptop wala\\\\Desktop\\\\EMS-ui\\\\my-app\\\\src\\\\Components\\\\navbar.js\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, this);\n}\n_s(NavBar, \"qb/QabNAMF86ehGqcKwY12B7W4M=\");\n_c = NavBar;\nvar _c;\n$RefreshReg$(_c, \"NavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9Db21wb25lbnRzL25hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNtRDtBQUN0QjtBQUNpQjtBQUUvQixTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ00sV0FBV0MsYUFBYSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUUzQ0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNUyxLQUFLQyxhQUFhQyxPQUFPLENBQUM7UUFDaEMsSUFBSUYsSUFBSTtZQUNOLE1BQU1HLFNBQVNDLEtBQUtDLEtBQUssQ0FBQ0w7WUFDMUIsSUFBSUcsVUFBVUEsT0FBT0csSUFBSSxFQUFFO2dCQUN6QlQsWUFBWU0sT0FBT0csSUFBSTtZQUN6QjtRQUNGO0lBQ0YsR0FBRyxFQUFFO0lBQ0xmLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWdCLFVBQVVOLGFBQWFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJSyxTQUFTO1lBQ1gsTUFBTUosU0FBU0MsS0FBS0MsS0FBSyxDQUFDRTtZQUMxQixJQUFJSixVQUFVQSxPQUFPSyxLQUFLLEVBQUU7Z0JBQzFCVCxhQUFhSSxPQUFPSyxLQUFLO1lBQzNCO1FBQ0Y7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFHRCxXQUFVOzBCQUFrRDs7Ozs7OzBCQUNoRSw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDRTt3QkFBSUMsS0FBS2Y7d0JBQVdnQixLQUFJO3dCQUFPSixXQUFVOzs7Ozs7a0NBQzFDLDhEQUFDSzt3QkFBR0wsV0FBVTtrQ0FDWiw0RUFBQ2pCLGlEQUFJQTs0QkFDSGlCLFdBQVU7NEJBQ1ZNLE1BQUs7NEJBQ0xDLFFBQU87NEJBQ1BDLEtBQUk7c0NBRUh0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNYjtHQXpDd0JEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9Db21wb25lbnRzL25hdmJhci5qcz9lNTQ4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCB7IGdldEFsbEltYWdlIH0gZnJvbSBcIi4uLy4uL0FwaXMvYXBpc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2QmFyKCkge1xyXG4gIGNvbnN0IFt1c2VyTmFtZSwgc2V0VXNlck5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3VzZXJpbWFnZSwgc2V0VXNlcmltYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkxvZ2luRGF0YVwiKTtcclxuICAgIGlmIChpZCkge1xyXG4gICAgICBjb25zdCBpZERhdGEgPSBKU09OLnBhcnNlKGlkKTtcclxuICAgICAgaWYgKGlkRGF0YSAmJiBpZERhdGEubmFtZSkge1xyXG4gICAgICAgIHNldFVzZXJOYW1lKGlkRGF0YS5uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaW1hZ2VJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbWFnZUlkJyk7XHJcbiAgICBpZiAoaW1hZ2VJZCkge1xyXG4gICAgICBjb25zdCBpZERhdGEgPSBKU09OLnBhcnNlKGltYWdlSWQpO1xyXG4gICAgICBpZiAoaWREYXRhICYmIGlkRGF0YS5JbWFnZSkge1xyXG4gICAgICAgIHNldFVzZXJpbWFnZShpZERhdGEuSW1hZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBoLTI2IHB4LTM2IGJnLW5hdmJhci1jb2xvclwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXItNSBtbC1XZWxjb21lLXRleHRcIj5XZWxjb21lPC9oMj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtbC1hdXRvIGZsZXggaXRlbXMtY2VudGVyIG1yLVVzZXJOYW1lLXRleHRcIj5cclxuICAgICAgICA8aW1nIHNyYz17dXNlcmltYWdlfSBhbHQ9XCJMb2dvXCIgY2xhc3NOYW1lPVwibXItNVwiIC8+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2lnbmF0dXJlXCI+XHJcbiAgICAgICAgICA8TGlua1xyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHRleHQtNHhsXCJcclxuICAgICAgICAgICAgaHJlZj1cIi9Mb2dpblwiXHJcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7dXNlck5hbWV9XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTGluayIsImdldEFsbEltYWdlIiwiTmF2QmFyIiwidXNlck5hbWUiLCJzZXRVc2VyTmFtZSIsInVzZXJpbWFnZSIsInNldFVzZXJpbWFnZSIsImlkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlkRGF0YSIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJpbWFnZUlkIiwiSW1hZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsImltZyIsInNyYyIsImFsdCIsImgxIiwiaHJlZiIsInRhcmdldCIsInJlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/Components/navbar.js\n"));

/***/ })

});