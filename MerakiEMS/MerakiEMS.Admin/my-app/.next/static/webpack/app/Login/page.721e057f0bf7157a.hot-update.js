"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/Login/page",{

/***/ "(app-pages-browser)/./Apis/apis.js":
/*!**********************!*\
  !*** ./Apis/apis.js ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CheckInUser: function() { return /* binding */ CheckInUser; },\n/* harmony export */   CheckOutUser: function() { return /* binding */ CheckOutUser; },\n/* harmony export */   FineCount: function() { return /* binding */ FineCount; },\n/* harmony export */   LoginUser: function() { return /* binding */ LoginUser; },\n/* harmony export */   UpdateFineStatus: function() { return /* binding */ UpdateFineStatus; },\n/* harmony export */   addLeave: function() { return /* binding */ addLeave; },\n/* harmony export */   addUser: function() { return /* binding */ addUser; },\n/* harmony export */   fetchAllUsersData: function() { return /* binding */ fetchAllUsersData; },\n/* harmony export */   fetchAttendanceData: function() { return /* binding */ fetchAttendanceData; },\n/* harmony export */   fetchLeave: function() { return /* binding */ fetchLeave; },\n/* harmony export */   getAllImage: function() { return /* binding */ getAllImage; },\n/* harmony export */   getAllUsers: function() { return /* binding */ getAllUsers; },\n/* harmony export */   getLate: function() { return /* binding */ getLate; },\n/* harmony export */   getManagers: function() { return /* binding */ getManagers; },\n/* harmony export */   getPendingLeaves: function() { return /* binding */ getPendingLeaves; },\n/* harmony export */   getRoles: function() { return /* binding */ getRoles; },\n/* harmony export */   sendEmail: function() { return /* binding */ sendEmail; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst apiUrl = \"https://localhost:7206/\";\n// const apiUrl = \"http://www.meraki-ams.local/\";\n///////////   Login   //////////\nconst LoginUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/Login\", data);\n        if (response.status === 200) {\n            if (response.data.isSuccess == true) {\n                localStorage.setItem(\"LoginData\", JSON.stringify(response.data));\n            }\n            console.log(response.data);\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c = LoginUser;\n/////////   CheckIn    ///////\nconst CheckInUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserCheckIn\", data);\n        if (response.status === 200) {\n            if (response.data.isRequestSuccessfull == \"true\") {\n                localStorage.setItem(\"AttendanceID\", JSON.stringify(response.data));\n            }\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c1 = CheckInUser;\n////////   CheckOut    ///////\nconst CheckOutUser = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserCheckOut\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c2 = CheckOutUser;\n/////////   Attendance List    ///////\nconst fetchAttendanceData = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/UserAttendance\", data);\n        if (response.status == 200) {\n            localStorage.setItem(\"attendList\", JSON.stringify(response.data));\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fine Count   //////////\nconst FineCount = async (id)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/FineCount?UserID=\".concat(id));\n        if (response.status == 200) {\n            console.log(response.data);\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n_c3 = FineCount;\n///////////   Add Leave    //////////\nconst addLeave = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/AddLeave\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fetch Leave    //////////\nconst fetchLeave = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/GetLeave\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Send Leave Email    //////////\nconst sendEmail = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Leaves/SendEmail\", data);\n        if (response.status === 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Add User   //////////\nconst addUser = async (data)=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Admin/AddUser\", data);\n        if (result.data.isRequestSuccessful === true) {\n            return {\n                success: true,\n                message: \"User has been Added\"\n            };\n        } else {\n            return {\n                success: false,\n                message: result.data.successResponse\n            };\n        }\n    } catch (error) {\n        throw error;\n    }\n};\n///////////   Get Late Records   //////////\nconst getLate = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Attendance/AllUserAttendance\", data);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Fetch All Users Data   //////////\nconst fetchAllUsersData = async ()=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/User/GetAllUsers\");\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Get AllUsers  //////////\nconst getAllUsers = async ()=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/Admin/Getuserid\");\n        if (response.status == 200) {\n            localStorage.setItem(\"UserData\", JSON.stringify(response.data));\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n////// Update Leaves Api //////\nconst UpdateFineStatus = async (data)=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/FinePaid\", data);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (err) {\n        return err.response;\n    }\n};\n_c4 = UpdateFineStatus;\n///////////   Get Managers   //////////\nconst getManagers = async ()=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/Admin/ManagerList\");\n        return result.data;\n    } catch (error) {\n        throw error; // Propagate the error back to the caller for handling\n    }\n};\n///////////   Get Roles   //////////\nconst getRoles = async ()=>{\n    try {\n        const result = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrl + \"api/Admin/UserRole\");\n        return result.data;\n    } catch (error) {\n        throw error; // Propagate the error back to the caller for handling\n    }\n};\n// ///////////   Add User   //////////\n// export const addUser = async (data) => {\n//   try {\n//     const result = await axios.post(apiUrl + \"api/Admin/AddUser\", data);\n//     if (result.data.isRequestSuccessful === true) {\n//       return { success: true, message: \"User has been Added\" };\n//     } else {\n//       return { success: false, message: result.data.successResponse };\n//     }\n//   } catch (error) {\n//     throw error;\n//   }\n// };\n///////////   Get Late Records   //////////\nconst getPendingLeaves = async (isLeaveFilter, name, status)=>{\n    try {\n        let apiUrlWithParams = apiUrl + \"api/Leaves/GetAllLeave?isLeaveFilter=\".concat(isLeaveFilter);\n        if (name !== null) {\n            apiUrlWithParams += \"&Name=\".concat(name);\n        }\n        if (status !== null) {\n            apiUrlWithParams += \"&Status=\".concat(status);\n        }\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(apiUrlWithParams);\n        if (response.status == 200) {\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\n///////////   Get AllImage  //////////\nconst getAllImage = async ()=>{\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(apiUrl + \"api/User/Getimage\");\n        if (response.status == 200) {\n            localStorage.setItem(\"imageId\", JSON.stringify(response.data));\n            return response.data;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        return error.response;\n    }\n};\nvar _c, _c1, _c2, _c3, _c4;\n$RefreshReg$(_c, \"LoginUser\");\n$RefreshReg$(_c1, \"CheckInUser\");\n$RefreshReg$(_c2, \"CheckOutUser\");\n$RefreshReg$(_c3, \"FineCount\");\n$RefreshReg$(_c4, \"UpdateFineStatus\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQUxEO1FBQy9CO1FBRUEsSUFBSWxDLFdBQVcsTUFBTTtZQUNuQm1DLG9CQUFvQixXQUFrQixPQUFQbkM7UUFDakM7UUFFQSxNQUFNRixXQUFXLE1BQU1KLDZDQUFLQSxDQUFDZ0MsR0FBRyxDQUFDUztRQUNqQyxJQUFJckMsU0FBU0UsTUFBTSxJQUFJLEtBQUs7WUFDMUIsT0FBT0YsU0FBU0QsSUFBSTtRQUN0QixPQUFPO1lBQ0wsT0FBTztRQUNUO0lBQ0YsRUFBRSxPQUFPVyxPQUFPO1FBQ2QsT0FBT0EsTUFBTVYsUUFBUTtJQUN2QjtBQUNGLEVBQUU7QUFFRixzQ0FBc0M7QUFFL0IsTUFBTXNDLGNBQWM7SUFDekIsSUFBSTtRQUNGLE1BQU10QyxXQUFXLE1BQU1KLDZDQUFLQSxDQUFDSyxJQUFJLENBQUNKLFNBQVM7UUFDM0MsSUFBSUcsU0FBU0UsTUFBTSxJQUFJLEtBQUs7WUFDMUJFLGFBQWFDLE9BQU8sQ0FBQyxXQUFXQyxLQUFLQyxTQUFTLENBQUNQLFNBQVNELElBQUk7WUFDNUQsT0FBT0MsU0FBU0QsSUFBSTtRQUN0QixPQUFPO1lBQ0wsT0FBTztRQUNUO0lBQ0YsRUFBRSxPQUFPVyxPQUFPO1FBQ2QsT0FBT0EsTUFBTVYsUUFBUTtJQUN2QjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vQXBpcy9hcGlzLmpzPzBlZWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5jb25zdCBhcGlVcmwgPSBcImh0dHBzOi8vbG9jYWxob3N0OjcyMDYvXCI7XHJcbi8vIGNvbnN0IGFwaVVybCA9IFwiaHR0cDovL3d3dy5tZXJha2ktYW1zLmxvY2FsL1wiO1xyXG5cclxuLy8vLy8vLy8vLy8gICBMb2dpbiAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBMb2dpblVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYXBpVXJsICsgXCJhcGkvVXNlci9Mb2dpblwiLCBkYXRhKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuaXNTdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkxvZ2luRGF0YVwiLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLyAgIENoZWNrSW4gICAgLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZWNrSW5Vc2VyID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBhcGlVcmwgKyBcImFwaS9BdHRlbmRhbmNlL1VzZXJDaGVja0luXCIsXHJcbiAgICAgIGRhdGFcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLmlzUmVxdWVzdFN1Y2Nlc3NmdWxsID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBdHRlbmRhbmNlSURcIiwgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vICAgQ2hlY2tPdXQgICAgLy8vLy8vL1xyXG5leHBvcnQgY29uc3QgQ2hlY2tPdXRVc2VyID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBhcGlVcmwgKyBcImFwaS9BdHRlbmRhbmNlL1VzZXJDaGVja091dFwiLFxyXG4gICAgICBkYXRhXHJcbiAgICApO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vICAgQXR0ZW5kYW5jZSBMaXN0ICAgIC8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEF0dGVuZGFuY2VEYXRhID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBhcGlVcmwgKyBcImFwaS9BdHRlbmRhbmNlL1VzZXJBdHRlbmRhbmNlXCIsXHJcbiAgICAgIGRhdGFcclxuICAgICk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF0dGVuZExpc3RcIiwgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSkpO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEZpbmUgQ291bnQgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgRmluZUNvdW50ID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcclxuICAgICAgYXBpVXJsICsgYGFwaS9Vc2VyL0ZpbmVDb3VudD9Vc2VySUQ9JHtpZH1gXHJcbiAgICApO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8gICBBZGQgTGVhdmUgICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZExlYXZlID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KGFwaVVybCArIFwiYXBpL0xlYXZlcy9BZGRMZWF2ZVwiLCBkYXRhKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLy8vICAgRmV0Y2ggTGVhdmUgICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTGVhdmUgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYXBpVXJsICsgXCJhcGkvTGVhdmVzL0dldExlYXZlXCIsIGRhdGEpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG4vLy8vLy8vLy8vLyAgIFNlbmQgTGVhdmUgRW1haWwgICAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRFbWFpbCA9IGFzeW5jIChkYXRhKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9MZWF2ZXMvU2VuZEVtYWlsXCIsIGRhdGEpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8gICBBZGQgVXNlciAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRVc2VyID0gYXN5bmMgKGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9BZG1pbi9BZGRVc2VyXCIsIGRhdGEpO1xyXG5cclxuICAgIGlmIChyZXN1bHQuZGF0YS5pc1JlcXVlc3RTdWNjZXNzZnVsID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiVXNlciBoYXMgYmVlbiBBZGRlZFwiIH07XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IHJlc3VsdC5kYXRhLnN1Y2Nlc3NSZXNwb25zZSB9O1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEdldCBMYXRlIFJlY29yZHMgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TGF0ZSA9IGFzeW5jIChkYXRhKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcclxuICAgICAgYXBpVXJsICsgXCJhcGkvQXR0ZW5kYW5jZS9BbGxVc2VyQXR0ZW5kYW5jZVwiLFxyXG4gICAgICBkYXRhXHJcbiAgICApO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcbi8vLy8vLy8vLy8vICAgRmV0Y2ggQWxsIFVzZXJzIERhdGEgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxVc2Vyc0RhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGFwaVVybCArIFwiYXBpL1VzZXIvR2V0QWxsVXNlcnNcIik7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLyAgIEdldCBBbGxVc2VycyAgLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbFVzZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYXBpVXJsICsgXCJhcGkvQWRtaW4vR2V0dXNlcmlkXCIpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJVc2VyRGF0YVwiLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vIFVwZGF0ZSBMZWF2ZXMgQXBpIC8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IFVwZGF0ZUZpbmVTdGF0dXMgPSBhc3luYyAoZGF0YSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYXBpVXJsICsgXCJhcGkvVXNlci9GaW5lUGFpZFwiLCBkYXRhKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnIucmVzcG9uc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8gICBHZXQgTWFuYWdlcnMgICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWFuYWdlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zLmdldChhcGlVcmwgKyBcImFwaS9BZG1pbi9NYW5hZ2VyTGlzdFwiKTtcclxuICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdGhyb3cgZXJyb3I7IC8vIFByb3BhZ2F0ZSB0aGUgZXJyb3IgYmFjayB0byB0aGUgY2FsbGVyIGZvciBoYW5kbGluZ1xyXG4gIH1cclxufTtcclxuXHJcblxyXG4vLy8vLy8vLy8vLyAgIEdldCBSb2xlcyAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRSb2xlcyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MuZ2V0KGFwaVVybCArIFwiYXBpL0FkbWluL1VzZXJSb2xlXCIpO1xyXG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBlcnJvcjsgLy8gUHJvcGFnYXRlIHRoZSBlcnJvciBiYWNrIHRvIHRoZSBjYWxsZXIgZm9yIGhhbmRsaW5nXHJcbiAgfVxyXG59O1xyXG5cclxuLy8gLy8vLy8vLy8vLy8gICBBZGQgVXNlciAgIC8vLy8vLy8vLy9cclxuXHJcbi8vIGV4cG9ydCBjb25zdCBhZGRVc2VyID0gYXN5bmMgKGRhdGEpID0+IHtcclxuLy8gICB0cnkge1xyXG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9BZG1pbi9BZGRVc2VyXCIsIGRhdGEpO1xyXG5cclxuLy8gICAgIGlmIChyZXN1bHQuZGF0YS5pc1JlcXVlc3RTdWNjZXNzZnVsID09PSB0cnVlKSB7XHJcbi8vICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiVXNlciBoYXMgYmVlbiBBZGRlZFwiIH07XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogcmVzdWx0LmRhdGEuc3VjY2Vzc1Jlc3BvbnNlIH07XHJcbi8vICAgICB9XHJcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgIHRocm93IGVycm9yO1xyXG4vLyAgIH1cclxuLy8gfTtcclxuXHJcbi8vLy8vLy8vLy8vICAgR2V0IExhdGUgUmVjb3JkcyAgIC8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQZW5kaW5nTGVhdmVzID0gYXN5bmMgKGlzTGVhdmVGaWx0ZXIsIG5hbWUsIHN0YXR1cykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgYXBpVXJsV2l0aFBhcmFtcyA9XHJcbiAgICAgIGFwaVVybCArIGBhcGkvTGVhdmVzL0dldEFsbExlYXZlP2lzTGVhdmVGaWx0ZXI9JHtpc0xlYXZlRmlsdGVyfWA7XHJcblxyXG4gICAgaWYgKG5hbWUgIT09IG51bGwpIHtcclxuICAgICAgYXBpVXJsV2l0aFBhcmFtcyArPSBgJk5hbWU9JHtuYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXR1cyAhPT0gbnVsbCkge1xyXG4gICAgICBhcGlVcmxXaXRoUGFyYW1zICs9IGAmU3RhdHVzPSR7c3RhdHVzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYXBpVXJsV2l0aFBhcmFtcyk7XHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIGVycm9yLnJlc3BvbnNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLy8vLy8vLy8vICAgR2V0IEFsbEltYWdlICAvLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsSW1hZ2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChhcGlVcmwgKyBcImFwaS9Vc2VyL0dldGltYWdlXCIpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbWFnZUlkXCIsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcclxuICB9XHJcbn07Il0sIm5hbWVzIjpbImF4aW9zIiwiYXBpVXJsIiwiTG9naW5Vc2VyIiwiZGF0YSIsInJlc3BvbnNlIiwicG9zdCIsInN0YXR1cyIsImlzU3VjY2VzcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiQ2hlY2tJblVzZXIiLCJpc1JlcXVlc3RTdWNjZXNzZnVsbCIsIkNoZWNrT3V0VXNlciIsImZldGNoQXR0ZW5kYW5jZURhdGEiLCJGaW5lQ291bnQiLCJpZCIsImFkZExlYXZlIiwiZmV0Y2hMZWF2ZSIsInNlbmRFbWFpbCIsImFkZFVzZXIiLCJyZXN1bHQiLCJpc1JlcXVlc3RTdWNjZXNzZnVsIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdWNjZXNzUmVzcG9uc2UiLCJnZXRMYXRlIiwiZmV0Y2hBbGxVc2Vyc0RhdGEiLCJnZXQiLCJnZXRBbGxVc2VycyIsIlVwZGF0ZUZpbmVTdGF0dXMiLCJlcnIiLCJnZXRNYW5hZ2VycyIsImdldFJvbGVzIiwiZ2V0UGVuZGluZ0xlYXZlcyIsImlzTGVhdmVGaWx0ZXIiLCJuYW1lIiwiYXBpVXJsV2l0aFBhcmFtcyIsImdldEFsbEltYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./Apis/apis.js\n"));

/***/ })

});