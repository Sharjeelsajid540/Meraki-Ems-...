"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/Leaves/page",{

/***/ "(app-pages-browser)/./Apis/apis.js":
/*!**********************!*\
  !*** ./Apis/apis.js ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CheckInUser: function() { return /* binding */ CheckInUser; },\n/* harmony export */   CheckOutUser: function() { return /* binding */ CheckOutUser; },\n/* harmony export */   FineCount: function() { return /* binding */ FineCount; },\n/* harmony export */   LoginUser: function() { return /* binding */ LoginUser; },\n/* harmony export */   UpdateFineStatus: function() { return /* binding */ UpdateFineStatus; },\n/* harmony export */   addLeave: function() { return /* binding */ addLeave; },\n/* harmony export */   addUser: function() { return /* binding */ addUser; },\n/* harmony export */   fetchAllUsersData: function() { return /* binding */ fetchAllUsersData; },\n/* harmony export */   fetchAttendanceData: function() { return /* binding */ fetchAttendanceData; },\n/* harmony export */   fetchLeave: function() { return /* binding */ fetchLeave; },\n/* harmony export */   getAllUsers: function() { return /* binding */ getAllUsers; },\n/* harmony export */   getLate: function() { return /* binding */ getLate; },\n/* harmony export */   getManagers: function() { return /* binding */ getManagers; },\n/* harmony export */   getPendingLeaves: function() { return /* binding */ getPendingLeaves; },\n/* harmony export */   getRoles: function() { return /* binding */ getRoles; },\n/* harmony export */   sendEmail: function() { return /* binding */ sendEmail; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst apiUrl = \"https://localhost:7206/\";\n// const apiUrl = \"http://www.meraki-ams.local/\";\n///////////   Login   //////////\nconst LoginUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/Login\", data);\n        if (response.status === 200) {\n            if (response.data.isSuccess == true) {\n                localStorage.setItem(\"LoginData\", JSON.stringify(response.data));\n            }\n            console.log(response.data);\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c = LoginUser;\n/////////   CheckIn    ///////\nconst CheckInUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserCheckIn\", data);\n        if (response.status === 200) {\n            if (response.data.isRequestSuccessfull == \"true\") {\n                localStorage.setItem(\"AttendanceID\", JSON.stringify(response.data));\n            }\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c1 = CheckInUser;\n////////   CheckOut    ///////\nconst CheckOutUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserCheckOut\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c2 = CheckOutUser;\n/////////   Attendance List    ///////\nconst fetchAttendanceData = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserAttendance\", data);\n        if (response.status == 200) {\n            localStorage.setItem(\"attendList\", JSON.stringify(response.data));\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fine Count   //////////\nconst FineCount = async (id)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/FineCount?UserID=\".concat(id));\n        if (response.status == 200) {\n            console.log(response.data);\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c3 = FineCount;\n///////////   Add Leave    //////////\nconst addLeave = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/AddLeave\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fetch Leave    //////////\nconst fetchLeave = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/GetLeave\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Send Leave Email    //////////\nconst sendEmail = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/SendEmail\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Add User   //////////\nconst addUser = async (data)=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Admin/AddUser\", data);\n        if (result.data.isRequestSuccessful === true) {\n            return {\n                success: true,\n                message: \"User has been Added\"\n            };\n        } else {\n            return {\n                success: false,\n                message: result.data.successResponse\n            };\n        }\n    } catch (error) {\n        throw error;\n    }\n};\n///////////   Get Late Records   //////////\nconst getLate = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/AllUserAttendance\", data);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fetch All Users Data   //////////\nconst fetchAllUsersData = async ()=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/User/GetAllUsers\");\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Get AllUsers  //////////\nconst getAllUsers = async ()=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Admin/Getuserid\");\n        if (response.status == 200) {\n            localStorage.setItem(\"UserData\", JSON.stringify(response.data));\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n////// Update Leaves Api //////\nconst UpdateFineStatus = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/FinePaid\", data);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (err) {\n        return err.response;\n    }\n};\n_c4 = UpdateFineStatus;\n///////////   Get Managers   //////////\nconst getManagers = async ()=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/Admin/ManagerList\");\n        return result.data;\n    } catch (error) {\n        throw error; // Propagate the error back to the caller for handling\n    }\n};\n///////////   Get Roles   //////////\nconst getRoles = async ()=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/Admin/UserRole\");\n        return result.data;\n    } catch (error) {\n        throw error; // Propagate the error back to the caller for handling\n    }\n};\n// ///////////   Add User   //////////\n// export const addUser = async (data) => {\n//   try {\n//     const result = await axios.post(apiUrl + \"api/Admin/AddUser\", data);\n//     if (result.data.isRequestSuccessful === true) {\n//       return { success: true, message: \"User has been Added\" };\n//     } else {\n//       return { success: false, message: result.data.successResponse };\n//     }\n//   } catch (error) {\n//     throw error;\n//   }\n// };\n///////////   Get Late Records   //////////\nconst getPendingLeaves = async (isLeaveFilter, name, status)=>{\n    try {\n        let apiUrlWithParams = apiUrl + \"api/Leaves/GetAllLeave?isLeaveFilter=\".concat(isLeaveFilter);\n        if (name !== null) {\n            apiUrlWithParams += \"&Name=\".concat(name);\n        }\n        if (status !== null) {\n            apiUrlWithParams += \"&Status=\".concat(status);\n        }\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrlWithParams);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\nvar _c, _c1, _c2, _c3, _c4;\n$RefreshReg$(_c, \"LoginUser\");\n$RefreshReg$(_c1, \"CheckInUser\");\n$RefreshReg$(_c2, \"CheckOutUser\");\n$RefreshReg$(_c3, \"FineCount\");\n$RefreshReg$(_c4, \"UpdateFineStatus\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTEQ7UUFDL0I7UUFFQSxJQUFJbEMsV0FBVyxNQUFNO1lBQ25CbUMsb0JBQW9CLFdBQWtCLE9BQVBuQztRQUNqQztRQUVBLE1BQU1GLFdBQVcsTUFBTUosNkNBQUtBLENBQUNnQyxHQUFHLENBQUNTO1FBQ2pDLElBQUlyQyxTQUFTRSxNQUFNLElBQUksS0FBSztZQUMxQixPQUFPRixTQUFTRCxJQUFJO1FBQ3RCLE9BQU87WUFDTCxPQUFPO1FBQ1Q7SUFDRixFQUFFLE9BQU9XLE9BQU87UUFDZCxPQUFPQSxNQUFNVixRQUFRO0lBQ3ZCO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9BcGlzL2FwaXMuanM/MGVlZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmNvbnN0IGFwaVVybCA9IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIwNi9cIjtcclxuLy8gY29uc3QgYXBpVXJsID0gXCJodHRwOi8vd3d3Lm1lcmFraS1hbXMubG9jYWwvXCI7XHJcblxyXG4vLy8vLy8vLy8vLyAgIExvZ2luICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IExvZ2luVXNlciA9IGFzeW5jIChkYXRhKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9Vc2VyL0xvZ2luXCIsIGRhdGEpO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YS5pc1N1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTG9naW5EYXRhXCIsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vICAgQ2hlY2tJbiAgICAvLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgQ2hlY2tJblVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoXHJcbiAgICAgIGFwaVVybCArIFwiYXBpL0F0dGVuZGFuY2UvVXNlckNoZWNrSW5cIixcclxuICAgICAgZGF0YVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuaXNSZXF1ZXN0U3VjY2Vzc2Z1bGwgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkF0dGVuZGFuY2VJRFwiLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8gICBDaGVja091dCAgICAvLy8vLy8vXHJcbmV4cG9ydCBjb25zdCBDaGVja091dFVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoXHJcbiAgICAgIGFwaVVybCArIFwiYXBpL0F0dGVuZGFuY2UvVXNlckNoZWNrT3V0XCIsXHJcbiAgICAgIGRhdGFcclxuICAgICk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8gICBBdHRlbmRhbmNlIExpc3QgICAgLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoQXR0ZW5kYW5jZURhdGEgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoXHJcbiAgICAgIGFwaVVybCArIFwiYXBpL0F0dGVuZGFuY2UvVXNlckF0dGVuZGFuY2VcIixcclxuICAgICAgZGF0YVxyXG4gICAgKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYXR0ZW5kTGlzdFwiLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLy8vICAgRmluZSBDb3VudCAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBGaW5lQ291bnQgPSBhc3luYyAoaWQpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBhcGlVcmwgKyBgYXBpL1VzZXIvRmluZUNvdW50P1VzZXJJRD0ke2lkfWBcclxuICAgICk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEFkZCBMZWF2ZSAgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgYWRkTGVhdmUgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYXBpVXJsICsgXCJhcGkvTGVhdmVzL0FkZExlYXZlXCIsIGRhdGEpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8gICBGZXRjaCBMZWF2ZSAgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hMZWF2ZSA9IGFzeW5jIChkYXRhKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9MZWF2ZXMvR2V0TGVhdmVcIiwgZGF0YSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcbi8vLy8vLy8vLy8vICAgU2VuZCBMZWF2ZSBFbWFpbCAgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZEVtYWlsID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KGFwaVVybCArIFwiYXBpL0xlYXZlcy9TZW5kRW1haWxcIiwgZGF0YSk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEFkZCBVc2VyICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5wb3N0KGFwaVVybCArIFwiYXBpL0FkbWluL0FkZFVzZXJcIiwgZGF0YSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdC5kYXRhLmlzUmVxdWVzdFN1Y2Nlc3NmdWwgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJVc2VyIGhhcyBiZWVuIEFkZGVkXCIgfTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogcmVzdWx0LmRhdGEuc3VjY2Vzc1Jlc3BvbnNlIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLy8vICAgR2V0IExhdGUgUmVjb3JkcyAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRMYXRlID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBhcGlVcmwgKyBcImFwaS9BdHRlbmRhbmNlL0FsbFVzZXJBdHRlbmRhbmNlXCIsXHJcbiAgICAgIGRhdGFcclxuICAgICk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuLy8vLy8vLy8vLy8gICBGZXRjaCBBbGwgVXNlcnMgRGF0YSAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEFsbFVzZXJzRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYXBpVXJsICsgXCJhcGkvVXNlci9HZXRBbGxVc2Vyc1wiKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcblxyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLy8vICAgR2V0IEFsbFVzZXJzICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsVXNlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9BZG1pbi9HZXR1c2VyaWRcIik7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8gVXBkYXRlIExlYXZlcyBBcGkgLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgVXBkYXRlRmluZVN0YXR1cyA9IGFzeW5jIChkYXRhKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9Vc2VyL0ZpbmVQYWlkXCIsIGRhdGEpO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVyci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEdldCBNYW5hZ2VycyAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRNYW5hZ2VycyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MuZ2V0KGFwaVVybCArIFwiYXBpL0FkbWluL01hbmFnZXJMaXN0XCIpO1xyXG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBlcnJvcjsgLy8gUHJvcGFnYXRlIHRoZSBlcnJvciBiYWNrIHRvIHRoZSBjYWxsZXIgZm9yIGhhbmRsaW5nXHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8vLy8vLy8vLy8vICAgR2V0IFJvbGVzICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFJvbGVzID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5nZXQoYXBpVXJsICsgXCJhcGkvQWRtaW4vVXNlclJvbGVcIik7XHJcbiAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IGVycm9yOyAvLyBQcm9wYWdhdGUgdGhlIGVycm9yIGJhY2sgdG8gdGhlIGNhbGxlciBmb3IgaGFuZGxpbmdcclxuICB9XHJcbn07XHJcblxyXG4vLyAvLy8vLy8vLy8vLyAgIEFkZCBVc2VyICAgLy8vLy8vLy8vL1xyXG5cclxuLy8gZXhwb3J0IGNvbnN0IGFkZFVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4vLyAgIHRyeSB7XHJcbi8vICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5wb3N0KGFwaVVybCArIFwiYXBpL0FkbWluL0FkZFVzZXJcIiwgZGF0YSk7XHJcblxyXG4vLyAgICAgaWYgKHJlc3VsdC5kYXRhLmlzUmVxdWVzdFN1Y2Nlc3NmdWwgPT09IHRydWUpIHtcclxuLy8gICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJVc2VyIGhhcyBiZWVuIEFkZGVkXCIgfTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiByZXN1bHQuZGF0YS5zdWNjZXNzUmVzcG9uc2UgfTtcclxuLy8gICAgIH1cclxuLy8gICB9IGNhdGNoIChlcnJvcikge1xyXG4vLyAgICAgdGhyb3cgZXJyb3I7XHJcbi8vICAgfVxyXG4vLyB9O1xyXG5cclxuLy8vLy8vLy8vLy8gICBHZXQgTGF0ZSBSZWNvcmRzICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBlbmRpbmdMZWF2ZXMgPSBhc3luYyAoaXNMZWF2ZUZpbHRlciwgbmFtZSwgc3RhdHVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBhcGlVcmxXaXRoUGFyYW1zID1cclxuICAgICAgYXBpVXJsICsgYGFwaS9MZWF2ZXMvR2V0QWxsTGVhdmU/aXNMZWF2ZUZpbHRlcj0ke2lzTGVhdmVGaWx0ZXJ9YDtcclxuXHJcbiAgICBpZiAobmFtZSAhPT0gbnVsbCkge1xyXG4gICAgICBhcGlVcmxXaXRoUGFyYW1zICs9IGAmTmFtZT0ke25hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhdHVzICE9PSBudWxsKSB7XHJcbiAgICAgIGFwaVVybFdpdGhQYXJhbXMgKz0gYCZTdGF0dXM9JHtzdGF0dXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChhcGlVcmxXaXRoUGFyYW1zKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59OyJdLCJuYW1lcyI6WyJheGlvcyIsImFwaVVybCIsIkxvZ2luVXNlciIsImRhdGEiLCJyZXNwb25zZSIsInBvc3QiLCJzdGF0dXMiLCJpc1N1Y2Nlc3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIkNoZWNrSW5Vc2VyIiwiaXNSZXF1ZXN0U3VjY2Vzc2Z1bGwiLCJDaGVja091dFVzZXIiLCJmZXRjaEF0dGVuZGFuY2VEYXRhIiwiRmluZUNvdW50IiwiaWQiLCJhZGRMZWF2ZSIsImZldGNoTGVhdmUiLCJzZW5kRW1haWwiLCJhZGRVc2VyIiwicmVzdWx0IiwiaXNSZXF1ZXN0U3VjY2Vzc2Z1bCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3VjY2Vzc1Jlc3BvbnNlIiwiZ2V0TGF0ZSIsImZldGNoQWxsVXNlcnNEYXRhIiwiZ2V0IiwiZ2V0QWxsVXNlcnMiLCJVcGRhdGVGaW5lU3RhdHVzIiwiZXJyIiwiZ2V0TWFuYWdlcnMiLCJnZXRSb2xlcyIsImdldFBlbmRpbmdMZWF2ZXMiLCJpc0xlYXZlRmlsdGVyIiwibmFtZSIsImFwaVVybFdpdGhQYXJhbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./Apis/apis.js\n"));

/***/ })

});