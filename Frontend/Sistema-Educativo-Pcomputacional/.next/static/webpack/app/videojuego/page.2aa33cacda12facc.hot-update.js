"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/videojuego/page",{

/***/ "(app-pages-browser)/./src/app/videojuego/page.tsx":
/*!*************************************!*\
  !*** ./src/app/videojuego/page.tsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var kaplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kaplay */ \"(app-pages-browser)/./node_modules/kaplay/dist/kaplay.mjs\");\n/* harmony import */ var _PanelJuegos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PanelJuegos */ \"(app-pages-browser)/./src/app/videojuego/PanelJuegos.tsx\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.css */ \"(app-pages-browser)/./src/app/videojuego/styles.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\nlet respuesta = 1;\nfunction Cartel(props) {\n    _s();\n    // Declaración del estado con useState dentro del cuerpo del componente\n    const [cambiarMostrar, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    // Función para manejar el clic del botón\n    const amoALuis = ()=>{\n        setState(false); // Cambia el estado a false para ocultar el cartel\n    };\n    if (props.respuesta == 1) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"button-container\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: amoALuis,\n                        children: \"Mensaje condicional\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                        lineNumber: 21,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 7\n                }, this),\n                cambiarMostrar && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"message-container\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"Me duele la tripa\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                    lineNumber: 24,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true);\n    } else {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n            children: [\n                \" \",\n                cambiarMostrar && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"message-container\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: \"No Me duele la tripa\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false)\n            ]\n        }, void 0, true);\n    }\n}\n_s(Cartel, \"rFCGgPM/bgLhHw7BrnaJlx4yumY=\");\n_c = Cartel;\nconst SCREEN_RESOLUTION_X = window.innerWidth;\nconst SCREEN_RESOLUTION_Y = window.innerHeight;\nfunction Page() {\n    _s1();\n    const juegoKaplayRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Page.useEffect\": ()=>{\n            const resizeCanvas = {\n                \"Page.useEffect.resizeCanvas\": ()=>{\n                    const canvas = document.getElementById(\"game\");\n                    if (canvas) {\n                        canvas.width = window.innerWidth //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_WIDTH;\n                        ;\n                        canvas.height = window.innerHeight //TILED_PIXEL_DIMENSION * MAX_TILED_PIXEL_HEIGTH;\n                        ;\n                    }\n                }\n            }[\"Page.useEffect.resizeCanvas\"];\n            // Inicializar Kaplay solo si no está creado\n            if (!juegoKaplayRef.current) {\n                juegoKaplayRef.current = (0,kaplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n                    width: SCREEN_RESOLUTION_X,\n                    height: SCREEN_RESOLUTION_Y,\n                    /*TILED_PIXEL_DIMENSION * 15, */ letterbox: false,\n                    global: false,\n                    debug: true,\n                    debugKey: \"f1\",\n                    canvas: document.getElementById(\"game\"),\n                    pixelDensity: 1\n                });\n                const juegoKaplay = juegoKaplayRef.current;\n                juegoKaplay.setBackground(71, 171, 169);\n                juegoKaplay.loadRoot(\"./\");\n                // Nivel1(juegoKaplay);\n                (0,_PanelJuegos__WEBPACK_IMPORTED_MODULE_3__.Panel)(juegoKaplay);\n            }\n            resizeCanvas(); // Ajustar en la carga inicial\n            return ({\n                \"Page.useEffect\": ()=>{\n                    window.removeEventListener(\"resize\", resizeCanvas);\n                }\n            })[\"Page.useEffect\"];\n        }\n    }[\"Page.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                id: \"game\",\n                style: {\n                    width: \"100vw\",\n                    height: \"100vh\",\n                    position: \"relative\"\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                lineNumber: 96,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Cartel, {\n                respuesta: respuesta\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\WINDOWS 11\\\\Documents\\\\Sistema-Educativo-Pcomputacional\\\\Frontend\\\\Sistema-Educativo-Pcomputacional\\\\src\\\\app\\\\videojuego\\\\page.tsx\",\n                lineNumber: 97,\n                columnNumber: 9\n            }, this),\n            \"\\xa0\"\n        ]\n    }, void 0, true);\n}\n_s1(Page, \"tRXKI5EVi2vDvs1oN8G1SPgeyXs=\");\n_c1 = Page;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);\nvar _c, _c1;\n$RefreshReg$(_c, \"Cartel\");\n$RefreshReg$(_c1, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdmlkZW9qdWVnby9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDcUQ7QUFDeUM7QUFFdkQ7QUFDaEI7QUFFdEIsSUFBSUssWUFBVTtBQUVkLFNBQVNDLE9BQU9DLEtBQVM7O0lBQ3hCLHVFQUF1RTtJQUN2RSxNQUFNLENBQUNDLGdCQUFnQkMsU0FBUyxHQUFHUCwrQ0FBUUEsQ0FBQztJQUU1Qyx5Q0FBeUM7SUFDekMsTUFBTVEsV0FBVztRQUNmRCxTQUFTLFFBQVEsa0RBQWtEO0lBQ3JFO0lBQ0EsSUFBR0YsTUFBTUYsU0FBUyxJQUFFLEdBQUU7UUFBRyxxQkFDdkI7OzhCQUNFLDhEQUFDTTtvQkFBSUMsV0FBVTs4QkFDYiw0RUFBQ0M7d0JBQU9DLFNBQVNKO2tDQUFVOzs7Ozs7Ozs7OztnQkFFNUJGLGdDQUNDLDhEQUFDRztvQkFBSUMsV0FBVTs4QkFDYiw0RUFBQ0c7a0NBQUU7Ozs7Ozs7Ozs7Ozs7SUFJVCxPQUFLO1FBQ0wscUJBQVE7O2dCQUFFO2dCQUFFUCxnQ0FDVjs4QkFDRSw0RUFBQ0c7d0JBQUlDLFdBQVU7a0NBQ2IsNEVBQUNHO3NDQUFFOzs7Ozs7Ozs7Ozs7OztJQU1YO0FBRUY7R0EvQlVUO0tBQUFBO0FBZ0NULE1BQU1VLHNCQUE4QkMsT0FBT0MsVUFBVTtBQUNyRCxNQUFNQyxzQkFBOEJGLE9BQU9HLFdBQVc7QUFFdEQsU0FBU0M7O0lBRVAsTUFBTUMsaUJBQWlCckIsNkNBQU1BLENBQU07SUFFbkNELGdEQUFTQTswQkFBQztZQUdSLE1BQU11QjsrQ0FBZTtvQkFDbkIsTUFBTUMsU0FBU0MsU0FBU0MsY0FBYyxDQUFDO29CQUN2QyxJQUFJRixRQUFRO3dCQUNWQSxPQUFPRyxLQUFLLEdBQUdWLE9BQU9DLFVBQVUsQ0FBQyxnREFBZ0Q7O3dCQUNqRk0sT0FBT0ksTUFBTSxHQUFHWCxPQUFPRyxXQUFXLENBQUMsaURBQWlEOztvQkFDdEY7Z0JBQ0Y7O1lBR0EsNENBQTRDO1lBQzVDLElBQUksQ0FBQ0UsZUFBZU8sT0FBTyxFQUFFO2dCQUMzQlAsZUFBZU8sT0FBTyxHQUFHMUIsa0RBQU1BLENBQUM7b0JBQzlCd0IsT0FBUVg7b0JBQ1JZLFFBQVFUO29CQUFvQiw4QkFBOEIsR0FDMURXLFdBQVc7b0JBQ1hDLFFBQVE7b0JBQ1JDLE9BQU87b0JBQ1BDLFVBQVU7b0JBQ1ZULFFBQVFDLFNBQVNDLGNBQWMsQ0FBQztvQkFDaENRLGNBQWM7Z0JBQ2hCO2dCQUVBLE1BQU1DLGNBQWNiLGVBQWVPLE9BQU87Z0JBQzFDTSxZQUFZQyxhQUFhLENBQUMsSUFBRyxLQUFJO2dCQUNqQ0QsWUFBWUUsUUFBUSxDQUFDO2dCQUN0Qix1QkFBdUI7Z0JBQ3ZCakMsbURBQUtBLENBQUMrQjtZQUVMO1lBRUZaLGdCQUFnQiw4QkFBOEI7WUFHOUM7a0NBQU87b0JBQ0xOLE9BQU9xQixtQkFBbUIsQ0FBQyxVQUFVZjtnQkFDdkM7O1FBR0Y7eUJBQUcsRUFBRTtJQUlMLHFCQUFROzswQkFFSCw4REFBQ0M7Z0JBQU9lLElBQUc7Z0JBQU9DLE9BQU87b0JBQUViLE9BQU87b0JBQVNDLFFBQVE7b0JBQVNhLFVBQVM7Z0JBQVc7Ozs7OzswQkFDaEYsOERBQUNuQztnQkFBT0QsV0FBV0E7Ozs7OztZQUFZOzs7QUFJdEM7SUF4RFNnQjtNQUFBQTtBQTREVCxpRUFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxXSU5ET1dTIDExXFxEb2N1bWVudHNcXFNpc3RlbWEtRWR1Y2F0aXZvLVBjb21wdXRhY2lvbmFsXFxGcm9udGVuZFxcU2lzdGVtYS1FZHVjYXRpdm8tUGNvbXB1dGFjaW9uYWxcXHNyY1xcYXBwXFx2aWRlb2p1ZWdvXFxwYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcclxuIGltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG4gaW1wb3J0IGthcGxheSwgeyBBc3NldCwgR2FtZU9iaiwgS0FQTEFZQ3R4LCBMZXZlbE9wdCwgUmVjdCwgU3ByaXRlRGF0YSwgVmVjMiB9IGZyb20gXCJrYXBsYXlcIjtcclxuIGltcG9ydCB7IE5pdmVsMSB9IGZyb20gXCIuLzFzdExldmVsXCI7XHJcbiBpbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuL1BhbmVsSnVlZ29zXCI7XHJcbiBpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XHJcblxyXG4gbGV0IHJlc3B1ZXN0YT0xO1xyXG4gXHJcbiBmdW5jdGlvbiBDYXJ0ZWwocHJvcHM6YW55KSB7XHJcbiAgLy8gRGVjbGFyYWNpw7NuIGRlbCBlc3RhZG8gY29uIHVzZVN0YXRlIGRlbnRybyBkZWwgY3VlcnBvIGRlbCBjb21wb25lbnRlXHJcbiAgY29uc3QgW2NhbWJpYXJNb3N0cmFyLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgLy8gRnVuY2nDs24gcGFyYSBtYW5lamFyIGVsIGNsaWMgZGVsIGJvdMOzblxyXG4gIGNvbnN0IGFtb0FMdWlzID0gKCkgPT4ge1xyXG4gICAgc2V0U3RhdGUoZmFsc2UpOyAvLyBDYW1iaWEgZWwgZXN0YWRvIGEgZmFsc2UgcGFyYSBvY3VsdGFyIGVsIGNhcnRlbFxyXG4gIH07XHJcbiAgaWYocHJvcHMucmVzcHVlc3RhPT0xKXsgIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1jb250YWluZXJcIj5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2Ftb0FMdWlzfT5NZW5zYWplIGNvbmRpY2lvbmFsPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7Y2FtYmlhck1vc3RyYXIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgIDxwPk1lIGR1ZWxlIGxhIHRyaXBhPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKTt9ZWxzZXtcclxuICAgIHJldHVybiggPD4ge2NhbWJpYXJNb3N0cmFyICYmIChcclxuICAgICAgPD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8cD5ObyBNZSBkdWVsZSBsYSB0cmlwYTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC8+XHJcbiAgICAgIFxyXG4gICAgKX08Lz4pO1xyXG4gIFxyXG4gIH1cclxuXHJcbn1cclxuIGNvbnN0IFNDUkVFTl9SRVNPTFVUSU9OX1g6IG51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoIFxyXG4gY29uc3QgU0NSRUVOX1JFU09MVVRJT05fWTogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0IFxyXG4gXHJcbiBmdW5jdGlvbiBQYWdlKCkge1xyXG4gICBcclxuICAgY29uc3QganVlZ29LYXBsYXlSZWYgPSB1c2VSZWY8YW55PihudWxsKTtcclxuIFxyXG4gICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICBcclxuICAgICAgIFxyXG4gICAgIGNvbnN0IHJlc2l6ZUNhbnZhcyA9ICgpID0+IHtcclxuICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgICAgIGlmIChjYW52YXMpIHtcclxuICAgICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLy9USUxFRF9QSVhFTF9ESU1FTlNJT04gKiBNQVhfVElMRURfUElYRUxfV0lEVEg7XHJcbiAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLy9USUxFRF9QSVhFTF9ESU1FTlNJT04gKiBNQVhfVElMRURfUElYRUxfSEVJR1RIO1xyXG4gICAgICAgfVxyXG4gICAgIH07XHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgLy8gSW5pY2lhbGl6YXIgS2FwbGF5IHNvbG8gc2kgbm8gZXN0w6EgY3JlYWRvXHJcbiAgICAgaWYgKCFqdWVnb0thcGxheVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICBqdWVnb0thcGxheVJlZi5jdXJyZW50ID0ga2FwbGF5KHtcclxuICAgICAgICAgd2lkdGg6ICBTQ1JFRU5fUkVTT0xVVElPTl9YLC8vVElMRURfUElYRUxfRElNRU5TSU9OICogTUFYX1RJTEVEX1BJWEVMX1dJRFRILCovIC8vIEFuY2hvIGRpbsOhbWljb1xyXG4gICAgICAgICBoZWlnaHQ6IFNDUkVFTl9SRVNPTFVUSU9OX1ksLypUSUxFRF9QSVhFTF9ESU1FTlNJT04gKiAxNSwgKi8vLyBBbHRvIGRpbsOhbWljb1xyXG4gICAgICAgICBsZXR0ZXJib3g6IGZhbHNlLFxyXG4gICAgICAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgICAgICBkZWJ1ZzogdHJ1ZSwgLy8gQ2FtYmlhciBhIGZhbHNlIGVuIHByb2R1Y2Npw7NuXHJcbiAgICAgICAgIGRlYnVnS2V5OiBcImYxXCIsXHJcbiAgICAgICAgIGNhbnZhczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50LFxyXG4gICAgICAgICBwaXhlbERlbnNpdHk6IDEsXHJcbiAgICAgICB9KTtcclxuIFxyXG4gICAgICAgY29uc3QganVlZ29LYXBsYXkgPSBqdWVnb0thcGxheVJlZi5jdXJyZW50O1xyXG4gICAgICAganVlZ29LYXBsYXkuc2V0QmFja2dyb3VuZCg3MSwxNzEsMTY5KVxyXG4gICAgICAganVlZ29LYXBsYXkubG9hZFJvb3QoXCIuL1wiKTtcclxuICAgICAgLy8gTml2ZWwxKGp1ZWdvS2FwbGF5KTtcclxuICAgICAgUGFuZWwoanVlZ29LYXBsYXkpO1xyXG4gICAgICAgICBcclxuICAgICAgIH1cclxuICAgXHJcbiAgICAgcmVzaXplQ2FudmFzKCk7IC8vIEFqdXN0YXIgZW4gbGEgY2FyZ2EgaW5pY2lhbFxyXG4gXHJcbiAgICBcclxuICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplQ2FudmFzKTtcclxuICAgICB9O1xyXG4gICAgIFxyXG4gICAgIFxyXG4gICB9LCBbXSk7XHJcbiBcclxuXHJcbiBcclxuICAgcmV0dXJuICg8PiBcclxuICAgICBcclxuICAgICAgICA8Y2FudmFzIGlkPVwiZ2FtZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMHZ3XCIsIGhlaWdodDogXCIxMDB2aFwiLCBwb3NpdGlvbjpcInJlbGF0aXZlXCIgfX0gLz5cclxuICAgICAgICA8Q2FydGVsIHJlc3B1ZXN0YT17cmVzcHVlc3RhfS8+XHJcbiAgICAgIFxyXG4gICAgIMKgPC8+KVxyXG4gXHJcbiB9XHJcbiBcclxuIFxyXG4gXHJcbiBleHBvcnQgZGVmYXVsdCBQYWdlOyJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImthcGxheSIsIlBhbmVsIiwicmVzcHVlc3RhIiwiQ2FydGVsIiwicHJvcHMiLCJjYW1iaWFyTW9zdHJhciIsInNldFN0YXRlIiwiYW1vQUx1aXMiLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwicCIsIlNDUkVFTl9SRVNPTFVUSU9OX1giLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX1JFU09MVVRJT05fWSIsImlubmVySGVpZ2h0IiwiUGFnZSIsImp1ZWdvS2FwbGF5UmVmIiwicmVzaXplQ2FudmFzIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpZHRoIiwiaGVpZ2h0IiwiY3VycmVudCIsImxldHRlcmJveCIsImdsb2JhbCIsImRlYnVnIiwiZGVidWdLZXkiLCJwaXhlbERlbnNpdHkiLCJqdWVnb0thcGxheSIsInNldEJhY2tncm91bmQiLCJsb2FkUm9vdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpZCIsInN0eWxlIiwicG9zaXRpb24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/videojuego/page.tsx\n"));

/***/ })

});