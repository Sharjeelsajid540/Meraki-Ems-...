"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@bedrock-layout";
exports.ids = ["vendor-chunks/@bedrock-layout"];
exports.modules = {

/***/ "(ssr)/./node_modules/@bedrock-layout/use-forwarded-ref/lib/index.m.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@bedrock-layout/use-forwarded-ref/lib/index.m.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ o),\n/* harmony export */   useForwardedRef: () => (/* binding */ o)\n/* harmony export */ });\n/* harmony import */ var _bedrock_layout_use_stateful_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bedrock-layout/use-stateful-ref */ \"(ssr)/./node_modules/@bedrock-layout/use-stateful-ref/lib/index.m.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction o(t, u = { isStateful: !0 }) {\n  const n = (0,_bedrock_layout_use_stateful_ref__WEBPACK_IMPORTED_MODULE_1__.useStatefulRef)(null), f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null), e = u.isStateful ? n : f;\n  return react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {\n    !t || (typeof t == \"function\" ? t(e.current) : t.current = e.current);\n  }), e;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQGJlZHJvY2stbGF5b3V0L3VzZS1mb3J3YXJkZWQtcmVmL2xpYi9pbmRleC5tLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXVFO0FBQ2hDO0FBQ3ZDLG9CQUFvQixnQkFBZ0I7QUFDcEMsWUFBWSxnRkFBQyxZQUFZLDZDQUFDO0FBQzFCLFNBQVMsc0RBQVc7QUFDcEI7QUFDQSxHQUFHO0FBQ0g7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy9AYmVkcm9jay1sYXlvdXQvdXNlLWZvcndhcmRlZC1yZWYvbGliL2luZGV4Lm0uanM/NmI3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZWZ1bFJlZiBhcyByIH0gZnJvbSBcIkBiZWRyb2NrLWxheW91dC91c2Utc3RhdGVmdWwtcmVmXCI7XG5pbXBvcnQgcywgeyB1c2VSZWYgYXMgYyB9IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gbyh0LCB1ID0geyBpc1N0YXRlZnVsOiAhMCB9KSB7XG4gIGNvbnN0IG4gPSByKG51bGwpLCBmID0gYyhudWxsKSwgZSA9IHUuaXNTdGF0ZWZ1bCA/IG4gOiBmO1xuICByZXR1cm4gcy51c2VFZmZlY3QoKCkgPT4ge1xuICAgICF0IHx8ICh0eXBlb2YgdCA9PSBcImZ1bmN0aW9uXCIgPyB0KGUuY3VycmVudCkgOiB0LmN1cnJlbnQgPSBlLmN1cnJlbnQpO1xuICB9KSwgZTtcbn1cbmV4cG9ydCB7XG4gIG8gYXMgZGVmYXVsdCxcbiAgbyBhcyB1c2VGb3J3YXJkZWRSZWZcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@bedrock-layout/use-forwarded-ref/lib/index.m.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/@bedrock-layout/use-stateful-ref/lib/index.m.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@bedrock-layout/use-stateful-ref/lib/index.m.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ s),\n/* harmony export */   useStatefulRef: () => (/* binding */ s)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction s(c = null) {\n  let [e, f] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(c);\n  const { current: r } = react__WEBPACK_IMPORTED_MODULE_0___default().useRef({\n    current: e\n  });\n  return Object.defineProperty(r, \"current\", {\n    get: () => e,\n    set: (t) => {\n      Object.is(e, t) || (e = t, f(t));\n    }\n  }), r;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQGJlZHJvY2stbGF5b3V0L3VzZS1zdGF0ZWZ1bC1yZWYvbGliL2luZGV4Lm0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFzQjtBQUN0QjtBQUNBLGVBQWUscURBQVU7QUFDekIsVUFBVSxhQUFhLEVBQUUsbURBQVE7QUFDakM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUlFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vbm9kZV9tb2R1bGVzL0BiZWRyb2NrLWxheW91dC91c2Utc3RhdGVmdWwtcmVmL2xpYi9pbmRleC5tLmpzP2FiZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHUgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBzKGMgPSBudWxsKSB7XG4gIGxldCBbZSwgZl0gPSB1LnVzZVN0YXRlKGMpO1xuICBjb25zdCB7IGN1cnJlbnQ6IHIgfSA9IHUudXNlUmVmKHtcbiAgICBjdXJyZW50OiBlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsIFwiY3VycmVudFwiLCB7XG4gICAgZ2V0OiAoKSA9PiBlLFxuICAgIHNldDogKHQpID0+IHtcbiAgICAgIE9iamVjdC5pcyhlLCB0KSB8fCAoZSA9IHQsIGYodCkpO1xuICAgIH1cbiAgfSksIHI7XG59XG5leHBvcnQge1xuICBzIGFzIGRlZmF1bHQsXG4gIHMgYXMgdXNlU3RhdGVmdWxSZWZcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@bedrock-layout/use-stateful-ref/lib/index.m.js\n");

/***/ })

};
;