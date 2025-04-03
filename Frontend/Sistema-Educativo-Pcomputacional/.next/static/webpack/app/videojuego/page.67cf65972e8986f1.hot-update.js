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

/***/ "(app-pages-browser)/./src/app/videojuego/PanelJuegos.tsx":
/*!********************************************!*\
  !*** ./src/app/videojuego/PanelJuegos.tsx ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Panel: () => (/* binding */ Panel)\n/* harmony export */ });\n/* harmony import */ var _MapsGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../MapsGenerator */ \"(app-pages-browser)/./src/MapsGenerator.tsx\");\n/* harmony import */ var _1stLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./1stLevel */ \"(app-pages-browser)/./src/app/videojuego/1stLevel.tsx\");\n/* harmony import */ var _2ndLevel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./2ndLevel */ \"(app-pages-browser)/./src/app/videojuego/2ndLevel.tsx\");\n\n\n\nconst SCREEN_RESOLUTION_X = window.innerWidth;\nconst SCREEN_RESOLUTION_Y = window.innerHeight;\nconst TILED_MAP__WIDTH_NUMBER = 21;\nconst TILED_MAP_HEIGHT_NUMBER = 16;\nconst TILED_WIDTH = SCREEN_RESOLUTION_X / TILED_MAP__WIDTH_NUMBER;\nconst TILED_HEIGHT = SCREEN_RESOLUTION_Y / TILED_MAP_HEIGHT_NUMBER;\nfunction Panel(juegoKaplay, setState, cambiarGanar) {\n    // Referencia persistente para almacenar la instancia de Kaplay\n    juegoKaplay.loadSprite(\"robot\", \"sprites/robotin.png\", {\n        sliceX: 4,\n        sliceY: 12,\n        anims: {\n            right: {\n                from: 16,\n                to: 19,\n                loop: false\n            },\n            up: {\n                from: 20,\n                to: 23,\n                loop: false\n            },\n            down: {\n                from: 12,\n                to: 15,\n                loop: false\n            },\n            left: {\n                from: 24,\n                to: 27,\n                loop: false\n            },\n            quiet: {\n                from: 0,\n                to: 0,\n                loop: false\n            }\n        }\n    });\n    juegoKaplay.loadSprite(\"knight\", \"sprites/p_knight_official.png\", {\n        sliceX: 6,\n        sliceY: 8,\n        anims: {\n            right: {\n                from: 6,\n                to: 11,\n                loop: true\n            },\n            up: {\n                from: 36,\n                to: 38,\n                loop: true\n            },\n            down: {\n                from: 24,\n                to: 26,\n                loop: true\n            },\n            left: {\n                from: 5,\n                to: 1,\n                loop: true\n            },\n            quiet: {\n                from: 31,\n                to: 31,\n                loop: true\n            }\n        }\n    });\n    juegoKaplay.loadSprite(\"enemy\", \"sprites/TNT_Blue (1).png\", {\n        sliceX: 7,\n        sliceY: 3,\n        anims: {\n            left_a: {\n                from: 20,\n                to: 14,\n                loop: false\n            },\n            right_a: {\n                from: 7,\n                to: 13,\n                loop: false\n            },\n            quiet: {\n                from: 0,\n                to: 0,\n                loop: false\n            }\n        }\n    });\n    juegoKaplay.loadSprite(\"scarecrow\", \"sprites/scarecrow.png\", {\n        sliceX: 1,\n        sliceY: 1\n    });\n    juegoKaplay.loadSprite(\"heart\", \"sprites/heart.png\", {\n        sliceX: 1,\n        sliceY: 1\n    });\n    juegoKaplay.loadSprite(\"title-0\", \"prueba/title-0.png\", {\n        sliceX: 1,\n        sliceY: 1\n    });\n    juegoKaplay.loadSprite(\"castillo\", \"sprites/buildings/Castle_Blue.png\", {\n        sliceX: 1,\n        sliceY: 1\n    });\n    juegoKaplay.loadSprite(\"torre\", \"sprites/buildings/Tower_Blue.png\", {\n        sliceX: 1,\n        sliceY: 1\n    });\n    // Cargar sprites adicionales\n    [\n        \"up\",\n        \"down\",\n        \"left\",\n        \"right\"\n    ].forEach((dir)=>{\n        juegoKaplay.loadSprite(dir, \"sprites/\".concat(dir, \"-arrow.png\"));\n    });\n    juegoKaplay.loadSprite(\"redbox\", \"red-border-box.png\");\n    juegoKaplay.onLoad(async ()=>{\n        //Practicando aqui\n        const nivelPrincipal = (0,_MapsGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(juegoKaplay, {\n            nameFolder: \"panel\",\n            nameFile: \"panel.png\",\n            tileWidth: TILED_WIDTH,\n            tileHeight: TILED_HEIGHT,\n            pos: juegoKaplay.vec2(0, 0)\n        }, \"./panel/panelv.json\", [\n            {\n                urlTextura: \"./nivel2/Water.png\",\n                dimensionTexturasX: 2,\n                dimensionTexturasY: 2,\n                firstgid: 1 //orden en el que tiled extrae esas imagenes (esta llega a cuatro)\n            },\n            {\n                urlTextura: \"./nivel2/Tilemap_Flat.png\",\n                dimensionTexturasX: 20,\n                dimensionTexturasY: 8,\n                firstgid: 5 //(esta comienza en 5)\n            },\n            {\n                urlTextura: \"./nivel2/Tilemap_Elevation.png\",\n                dimensionTexturasX: 8,\n                dimensionTexturasY: 16,\n                firstgid: 165\n            },\n            {\n                urlTextura: \"./nivel2/Tilemap_Flat.png\",\n                dimensionTexturasX: 20,\n                dimensionTexturasY: 8,\n                firstgid: 5 //(esta comienza en 5)\n            },\n            {\n                urlTextura: \"./nivel1/Bridge_All.png\",\n                dimensionTexturasX: 6,\n                dimensionTexturasY: 8,\n                firstgid: 293 //(esta comienza en 5)\n            }\n        ]).then((resultado)=>{\n            // Jugador\n            const player = juegoKaplay.add([\n                juegoKaplay.pos(450, 109),\n                juegoKaplay.sprite(\"knight\"),\n                juegoKaplay.scale(1),\n                juegoKaplay.health(3),\n                juegoKaplay.area(),\n                \"player\",\n                {\n                    z: 2\n                } // Asegura que el jugador esté en una capa superior\n            ]);\n            const castillo = juegoKaplay.add([\n                juegoKaplay.pos(800, -20),\n                juegoKaplay.sprite(\"castillo\"),\n                juegoKaplay.scale(0.7),\n                juegoKaplay.area(),\n                \"castillo\",\n                {\n                    z: 1\n                } // Asegura que el jugador esté en una capa superior\n            ]);\n            const torre = juegoKaplay.add([\n                juegoKaplay.pos(630, -40),\n                juegoKaplay.sprite(\"torre\"),\n                juegoKaplay.scale(0.7),\n                juegoKaplay.area(),\n                \"torre\",\n                {\n                    z: 1\n                } // Asegura que el jugador esté en una capa superior\n            ]);\n            torre.use(\"torre\"); // green bean <:\n            torre.onClick(()=>{\n                juegoKaplay.destroy(torre);\n                juegoKaplay.destroy(castillo);\n                juegoKaplay.destroy(player);\n                (0,_1stLevel__WEBPACK_IMPORTED_MODULE_1__.Nivel1)(juegoKaplay, setState, cambiarGanar);\n            // We pass the component id for remove it.\n            });\n            castillo.onClick(()=>{\n                juegoKaplay.destroy(torre);\n                juegoKaplay.destroy(castillo);\n                juegoKaplay.destroy(player);\n                (0,_2ndLevel__WEBPACK_IMPORTED_MODULE_2__.Nivel2)(juegoKaplay);\n            // We pass the component id for remove it.\n            });\n            const velocidad = 100;\n            // Movimiento con teclado\n            juegoKaplay.onKeyDown(\"w\", ()=>{\n                player.play(\"up\", {\n                    speed: 15\n                });\n                player.move(0, -velocidad);\n            });\n            juegoKaplay.onKeyDown(\"s\", ()=>{\n                player.play(\"down\", {\n                    speed: 15\n                });\n                player.move(0, velocidad);\n            });\n            juegoKaplay.onKeyDown(\"a\", ()=>{\n                player.play(\"left\", {\n                    speed: 15\n                });\n                player.move(-velocidad, 0);\n            });\n            juegoKaplay.onKeyDown(\"d\", ()=>{\n                player.play(\"right\", {\n                    speed: 15\n                });\n                player.move(velocidad, 0);\n            });\n        }).catch((error)=>{\n            console.log(error);\n        });\n    }) //Fin - Onload()\n    ;\n    return ()=>{};\n}\n_c = Panel;\nvar _c;\n$RefreshReg$(_c, \"Panel\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdmlkZW9qdWVnby9QYW5lbEp1ZWdvcy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVxRDtBQUVqQjtBQUNBO0FBQ3BDLE1BQU1HLHNCQUE4QkMsT0FBT0MsVUFBVTtBQUNyRCxNQUFNQyxzQkFBOEJGLE9BQU9HLFdBQVc7QUFDdEQsTUFBTUMsMEJBQWtDO0FBQ3hDLE1BQU1DLDBCQUFrQztBQUN4QyxNQUFNQyxjQUFzQlAsc0JBQXNCSztBQUNsRCxNQUFNRyxlQUF1Qkwsc0JBQXNCRztBQUc1QyxTQUFTRyxNQUFNQyxXQUErQixFQUFFQyxRQUFZLEVBQUVDLFlBQWdCO0lBQ2pGLCtEQUErRDtJQUUvREYsWUFBWUcsVUFBVSxDQUFDLFNBQVMsdUJBQXVCO1FBQ3JEQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsT0FBTztZQUNMQyxPQUFPO2dCQUFFQyxNQUFNO2dCQUFJQyxJQUFJO2dCQUFJQyxNQUFNO1lBQU07WUFDdkNDLElBQUk7Z0JBQUVILE1BQU07Z0JBQUlDLElBQUk7Z0JBQUlDLE1BQU07WUFBSztZQUNuQ0UsTUFBTTtnQkFBRUosTUFBTTtnQkFBSUMsSUFBSTtnQkFBSUMsTUFBTTtZQUFLO1lBQ3JDRyxNQUFNO2dCQUFFTCxNQUFNO2dCQUFJQyxJQUFJO2dCQUFJQyxNQUFNO1lBQUs7WUFDckNJLE9BQU87Z0JBQUVOLE1BQU07Z0JBQUdDLElBQUk7Z0JBQUdDLE1BQU07WUFBSztRQUN0QztJQUNGO0lBRUFWLFlBQVlHLFVBQVUsQ0FBQyxVQUFVLGlDQUFpQztRQUNoRUMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLE9BQU87WUFDTEMsT0FBTztnQkFBRUMsTUFBTTtnQkFBR0MsSUFBSTtnQkFBSUMsTUFBTTtZQUFJO1lBQ3BDQyxJQUFJO2dCQUFFSCxNQUFNO2dCQUFJQyxJQUFJO2dCQUFJQyxNQUFNO1lBQUs7WUFDbkNFLE1BQU07Z0JBQUVKLE1BQU07Z0JBQUlDLElBQUk7Z0JBQUlDLE1BQU07WUFBSztZ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QUFXO1lBRTFCO1lBQ0E3QyxZQUFZOEMsU0FBUyxDQUFDLEtBQUs7Z0JBQ3pCYixPQUFPYyxJQUFJLENBQUMsU0FBUztvQkFBQ0MsT0FBTTtnQkFBRTtnQkFDOUJmLE9BQU9nQixJQUFJLENBQUNKLFdBQVc7WUFFekI7UUFLRixHQUNBSyxLQUFLLENBQ0osQ0FBQ0M7WUFDRkMsUUFBUUMsR0FBRyxDQUFDRjtRQUNaO0lBSWQsR0FBRyxnQkFBZ0I7O0lBRW5CLE9BQU8sS0FFUDtBQUVGO0tBcE5jcEQiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcV0lORE9XUyAxMVxcRG9jdW1lbnRzXFxTaXN0ZW1hLUVkdWNhdGl2by1QY29tcHV0YWNpb25hbFxcRnJvbnRlbmRcXFNpc3RlbWEtRWR1Y2F0aXZvLVBjb21wdXRhY2lvbmFsXFxzcmNcXGFwcFxcdmlkZW9qdWVnb1xcUGFuZWxKdWVnb3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBrYXBsYXksIHsgQXNzZXQsIEdhbWVPYmosIEtBUExBWUN0eCwgTGV2ZWxPcHQsIFJlY3QsIFNwcml0ZURhdGEsIFZlYzIgfSBmcm9tIFwia2FwbGF5XCI7XHJcbmltcG9ydCBnZW5lcmFyRXNxdWVtYU1hcGEgZnJvbSBcIi4uLy4uL01hcHNHZW5lcmF0b3JcIjtcclxuaW1wb3J0IGdlbmVyYXJOdW1lcm9zQXphciBmcm9tIFwiLi4vLi4vdXRpbHMvZ2VuZXJhck51bWVyb3NBemFyXCI7XHJcbmltcG9ydCB7IE5pdmVsMSB9IGZyb20gXCIuLzFzdExldmVsXCI7XHJcbmltcG9ydCB7IE5pdmVsMiB9IGZyb20gXCIuLzJuZExldmVsXCI7XHJcbmNvbnN0IFNDUkVFTl9SRVNPTFVUSU9OX1g6IG51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoIFxyXG5jb25zdCBTQ1JFRU5fUkVTT0xVVElPTl9ZOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgXHJcbmNvbnN0IFRJTEVEX01BUF9fV0lEVEhfTlVNQkVSOiBudW1iZXIgPSAyMVxyXG5jb25zdCBUSUxFRF9NQVBfSEVJR0hUX05VTUJFUjogbnVtYmVyID0gMTZcclxuY29uc3QgVElMRURfV0lEVEg6IG51bWJlciA9IFNDUkVFTl9SRVNPTFVUSU9OX1ggLyBUSUxFRF9NQVBfX1dJRFRIX05VTUJFUlxyXG5jb25zdCBUSUxFRF9IRUlHSFQ6IG51bWJlciA9IFNDUkVFTl9SRVNPTFVUSU9OX1kgLyBUSUxFRF9NQVBfSEVJR0hUX05VTUJFUlxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQYW5lbChqdWVnb0thcGxheTpLQVBMQVlDdHg8e30sbmV2ZXI+LCBzZXRTdGF0ZTphbnksIGNhbWJpYXJHYW5hcjphbnkpIHtcclxuICAgIC8vIFJlZmVyZW5jaWEgcGVyc2lzdGVudGUgcGFyYSBhbG1hY2VuYXIgbGEgaW5zdGFuY2lhIGRlIEthcGxheVxyXG4gICAgIFxyXG4gICAganVlZ29LYXBsYXkubG9hZFNwcml0ZShcInJvYm90XCIsIFwic3ByaXRlcy9yb2JvdGluLnBuZ1wiLCB7XHJcbiAgICAgIHNsaWNlWDogNCxcclxuICAgICAgc2xpY2VZOiAxMixcclxuICAgICAgYW5pbXM6IHtcclxuICAgICAgICByaWdodDogeyBmcm9tOiAxNiwgdG86IDE5LCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgIHVwOiB7IGZyb206IDIwLCB0bzogMjMsIGxvb3A6IGZhbHNlfSxcclxuICAgICAgICBkb3duOiB7IGZyb206IDEyLCB0bzogMTUsIGxvb3A6IGZhbHNlfSxcclxuICAgICAgICBsZWZ0OiB7IGZyb206IDI0LCB0bzogMjcsIGxvb3A6IGZhbHNlfSxcclxuICAgICAgICBxdWlldDogeyBmcm9tOiAwLCB0bzogMCwgbG9vcDogZmFsc2V9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAganVlZ29LYXBsYXkubG9hZFNwcml0ZShcImtuaWdodFwiLCBcInNwcml0ZXMvcF9rbmlnaHRfb2ZmaWNpYWwucG5nXCIsIHtcclxuICAgICAgc2xpY2VYOiA2LFxyXG4gICAgICBzbGljZVk6IDgsXHJcbiAgICAgIGFuaW1zOiB7XHJcbiAgICAgICAgcmlnaHQ6IHsgZnJvbTogNiwgdG86IDExLCBsb29wOiB0cnVlfSxcclxuICAgICAgICB1cDogeyBmcm9tOiAzNiwgdG86IDM4LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgZG93bjogeyBmcm9tOiAyNCwgdG86IDI2LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgbGVmdDogeyBmcm9tOiA1LCB0bzogMSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgIHF1aWV0OiB7IGZyb206IDMxLCB0bzogMzEsIGxvb3A6IHRydWUgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGp1ZWdvS2FwbGF5LmxvYWRTcHJpdGUoXCJlbmVteVwiLCBcInNwcml0ZXMvVE5UX0JsdWUgKDEpLnBuZ1wiLCB7XHJcbiAgICAgIHNsaWNlWDogNyxcclxuICAgICAgc2xpY2VZOiAzLFxyXG4gICAgICBhbmltczoge1xyXG4gICAgICAgIGxlZnRfYTogeyBmcm9tOiAyMCwgdG86IDE0LCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgIHJpZ2h0X2E6IHsgZnJvbTogNywgdG86IDEzLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgIHF1aWV0OiB7IGZyb206IDAsIHRvOiAwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAganVlZ29LYXBsYXkubG9hZFNwcml0ZShcInNjYXJlY3Jvd1wiLCBcInNwcml0ZXMvc2NhcmVjcm93LnBuZ1wiLCB7XHJcbiAgICAgIHNsaWNlWDogMSxcclxuICAgICAgc2xpY2VZOiAxLFxyXG4gICAgfSk7XHJcblxyXG4gICAganVlZ29LYXBsYXkubG9hZFNwcml0ZShcImhlYXJ0XCIsIFwic3ByaXRlcy9oZWFydC5wbmdcIiwge1xyXG4gICAgICBzbGljZVg6IDEsXHJcbiAgICAgIHNsaWNlWTogMSxcclxuICAgIH0pO1xyXG5cclxuICAgIGp1ZWdvS2FwbGF5LmxvYWRTcHJpdGUoXCJ0aXRsZS0wXCIsIFwicHJ1ZWJhL3RpdGxlLTAucG5nXCIsIHtcclxuICAgICAgc2xpY2VYOiAxLFxyXG4gICAgICBzbGljZVk6IDEsXHJcbiAgICB9KTtcclxuXHJcbiAgICBqdWVnb0thcGxheS5sb2FkU3ByaXRlKFwiY2FzdGlsbG9cIiwgXCJzcHJpdGVzL2J1aWxkaW5ncy9DYXN0bGVfQmx1ZS5wbmdcIiwge1xyXG4gICAgICBzbGljZVg6IDEsXHJcbiAgICAgIHNsaWNlWTogMSxcclxuICAgIH0pO1xyXG5cclxuICAgIGp1ZWdvS2FwbGF5LmxvYWRTcHJpdGUoXCJ0b3JyZVwiLCBcInNwcml0ZXMvYnVpbGRpbmdzL1Rvd2VyX0JsdWUucG5nXCIsIHtcclxuICAgICAgc2xpY2VYOiAxLFxyXG4gICAgICBzbGljZVk6IDEsXHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vIENhcmdhciBzcHJpdGVzIGFkaWNpb25hbGVzXHJcbiAgICBbXCJ1cFwiLCBcImRvd25cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIl0uZm9yRWFjaCgoZGlyKSA9PiB7XHJcbiAgICAgIGp1ZWdvS2FwbGF5LmxvYWRTcHJpdGUoZGlyLCBgc3ByaXRlcy8ke2Rpcn0tYXJyb3cucG5nYCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBqdWVnb0thcGxheS5sb2FkU3ByaXRlKFwicmVkYm94XCIsIFwicmVkLWJvcmRlci1ib3gucG5nXCIpO1xyXG4gICAgXHJcblxyXG4gICAganVlZ29LYXBsYXkub25Mb2FkKGFzeW5jICgpID0+IHtcclxuICAgICAgICAvL1ByYWN0aWNhbmRvIGFxdWlcclxuICAgICAgY29uc3Qgbml2ZWxQcmluY2lwYWwgPSBnZW5lcmFyRXNxdWVtYU1hcGEoXHJcbiAgICAgICAganVlZ29LYXBsYXksXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZUZvbGRlcjogXCJwYW5lbFwiLFxyXG4gICAgICAgICAgbmFtZUZpbGU6IFwicGFuZWwucG5nXCIsXHJcbiAgICAgICAgICB0aWxlV2lkdGg6IFRJTEVEX1dJRFRILFxyXG4gICAgICAgICAgdGlsZUhlaWdodDogVElMRURfSEVJR0hULFxyXG4gICAgICAgICAgcG9zOiBqdWVnb0thcGxheS52ZWMyKDAsIDApLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYC4vcGFuZWwvcGFuZWx2Lmpzb25gLCAgIC8vYXJjaGl2byBkZSBkb25kZSB2b3kgYSBleHRyYWVyIGVsIG1hcGFcclxuICAgICAgICBcclxuICAgICAgICBbIC8vQWNhIGxvIGltcG9ydGFudGUgZXMgcXVlIGRlYm8gaW50cm9kdWNpciBlbCBvcmRlbiBkZSBsYXMgdGV4dHVyYXMgZW4gZWwgcXVlIHZhLCBjYXBhIHBvciBjYXBhXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFRleHR1cmE6IFwiLi9uaXZlbDIvV2F0ZXIucG5nXCIsICBcclxuICAgICAgICAgICAgZGltZW5zaW9uVGV4dHVyYXNYOiAyLCAvL0RpbWVuc2lvbmVzIGRlIHRpbGVkXHJcbiAgICAgICAgICAgIGRpbWVuc2lvblRleHR1cmFzWTogMixcclxuICAgICAgICAgICAgZmlyc3RnaWQ6IDEgLy9vcmRlbiBlbiBlbCBxdWUgdGlsZWQgZXh0cmFlIGVzYXMgaW1hZ2VuZXMgKGVzdGEgbGxlZ2EgYSBjdWF0cm8pXHJcbiAgICAgICAgICB9LCBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsVGV4dHVyYTogXCIuL25pdmVsMi9UaWxlbWFwX0ZsYXQucG5nXCIsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvblRleHR1cmFzWDogMjAsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvblRleHR1cmFzWTogOCxcclxuICAgICAgICAgICAgZmlyc3RnaWQ6IDUgLy8oZXN0YSBjb21pZW56YSBlbiA1KVxyXG4gICAgICAgICAgfSwgICAgICAgIFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxUZXh0dXJhOiBcIi4vbml2ZWwyL1RpbGVtYXBfRWxldmF0aW9uLnBuZ1wiLFxyXG4gICAgICAgICAgICBkaW1lbnNpb25UZXh0dXJhc1g6IDgsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvblRleHR1cmFzWTogMTYsXHJcbiAgICAgICAgICAgIGZpcnN0Z2lkOiAxNjVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFRleHR1cmE6IFwiLi9uaXZlbDIvVGlsZW1hcF9GbGF0LnBuZ1wiLFxyXG4gICAgICAgICAgICBkaW1lbnNpb25UZXh0dXJhc1g6IDIwLFxyXG4gICAgICAgICAgICBkaW1lbnNpb25UZXh0dXJhc1k6IDgsXHJcbiAgICAgICAgICAgIGZpcnN0Z2lkOiA1IC8vKGVzdGEgY29taWVuemEgZW4gNSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFRleHR1cmE6IFwiLi9uaXZlbDEvQnJpZGdlX0FsbC5wbmdcIixcclxuICAgICAgICAgICAgZGltZW5zaW9uVGV4dHVyYXNYOiA2LFxyXG4gICAgICAgICAgICBkaW1lbnNpb25UZXh0dXJhc1k6IDgsXHJcbiAgICAgICAgICAgIGZpcnN0Z2lkOiAyOTMgLy8oZXN0YSBjb21pZW56YSBlbiA1KVxyXG4gICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIF1cclxuICAgICAgKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgKHJlc3VsdGFkbzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSnVnYWRvclxyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheWVyID0ganVlZ29LYXBsYXkuYWRkKFtcclxuICAgICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LnBvcyg0NTAsMTA5KSxcclxuICAgICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LnNwcml0ZShcImtuaWdodFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LnNjYWxlKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuaGVhbHRoKDMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuYXJlYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJwbGF5ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHsgejogMiB9IC8vIEFzZWd1cmEgcXVlIGVsIGp1Z2Fkb3IgZXN0w6kgZW4gdW5hIGNhcGEgc3VwZXJpb3JcclxuICAgICAgICAgICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNhc3RpbGxvID0ganVlZ29LYXBsYXkuYWRkKFtcclxuICAgICAgICAgICAgICAgICAgICBqdWVnb0thcGxheS5wb3MoODAwLC0yMCksXHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuc3ByaXRlKFwiY2FzdGlsbG9cIiksXHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuc2NhbGUoMC43KSxcclxuICAgICAgICAgICAgICAgICAgICBqdWVnb0thcGxheS5hcmVhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjYXN0aWxsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgejogMSB9IC8vIEFzZWd1cmEgcXVlIGVsIGp1Z2Fkb3IgZXN0w6kgZW4gdW5hIGNhcGEgc3VwZXJpb3JcclxuICAgICAgICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjb25zdCB0b3JyZSA9IGp1ZWdvS2FwbGF5LmFkZChbXHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkucG9zKDYzMCwtNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LnNwcml0ZShcInRvcnJlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LnNjYWxlKDAuNyksXHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuYXJlYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9ycmVcIixcclxuICAgICAgICAgICAgICAgICAgICB7IHo6IDEgfSAvLyBBc2VndXJhIHF1ZSBlbCBqdWdhZG9yIGVzdMOpIGVuIHVuYSBjYXBhIHN1cGVyaW9yXHJcbiAgICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdG9ycmUudXNlKFwidG9ycmVcIik7IC8vIGdyZWVuIGJlYW4gPDpcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICB0b3JyZS5vbkNsaWNrKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuZGVzdHJveSh0b3JyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuZGVzdHJveShjYXN0aWxsbyk7XHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkuZGVzdHJveShwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE5pdmVsMShqdWVnb0thcGxheSwgc2V0U3RhdGUsIGNhbWJpYXJHYW5hcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgcGFzcyB0aGUgY29tcG9uZW50IGlkIGZvciByZW1vdmUgaXQuXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgY2FzdGlsbG8ub25DbGljaygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LmRlc3Ryb3kodG9ycmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LmRlc3Ryb3koY2FzdGlsbG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5LmRlc3Ryb3kocGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBOaXZlbDIoanVlZ29LYXBsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHBhc3MgdGhlIGNvbXBvbmVudCBpZCBmb3IgcmVtb3ZlIGl0LlxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgXHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlbG9jaWRhZCA9IDEwMDtcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92aW1pZW50byBjb24gdGVjbGFkb1xyXG4gICAgICAgICAgICAgICAgICAgIGp1ZWdvS2FwbGF5Lm9uS2V5RG93bihcIndcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoXCJ1cFwiLHtzcGVlZDoxNX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1vdmUoMCwgLXZlbG9jaWRhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBqdWVnb0thcGxheS5vbktleURvd24oXCJzXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KFwiZG93blwiLCB7c3BlZWQ6MTV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tb3ZlKDAsIHZlbG9jaWRhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBqdWVnb0thcGxheS5vbktleURvd24oXCJhXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KFwibGVmdFwiLCB7c3BlZWQ6MTV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tb3ZlKC12ZWxvY2lkYWQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAganVlZ29LYXBsYXkub25LZXlEb3duKFwiZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheShcInJpZ2h0XCIsIHtzcGVlZDoxNX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1vdmUodmVsb2NpZGFkLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuY2F0Y2goXHJcbiAgICAgICAgICAgICAgICAgICgoZXJyb3I6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKSAgIFxyXG5cclxuXHJcbiAgICB9KSAvL0ZpbiAtIE9ubG9hZCgpXHJcbiAgXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBcclxuICAgIH07XHJcbiAgICBcclxuICB9XHJcbiJdLCJuYW1lcyI6WyJnZW5lcmFyRXNxdWVtYU1hcGEiLCJOaXZlbDEiLCJOaXZlbDIiLCJTQ1JFRU5fUkVTT0xVVElPTl9YIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9SRVNPTFVUSU9OX1kiLCJpbm5lckhlaWdodCIsIlRJTEVEX01BUF9fV0lEVEhfTlVNQkVSIiwiVElMRURfTUFQX0hFSUdIVF9OVU1CRVIiLCJUSUxFRF9XSURUSCIsIlRJTEVEX0hFSUdIVCIsIlBhbmVsIiwianVlZ29LYXBsYXkiLCJzZXRTdGF0ZSIsImNhbWJpYXJHYW5hciIsImxvYWRTcHJpdGUiLCJzbGljZVgiLCJzbGljZVkiLCJhbmltcyIsInJpZ2h0IiwiZnJvbSIsInRvIiwibG9vcCIsInVwIiwiZG93biIsImxlZnQiLCJxdWlldCIsImxlZnRfYSIsInJpZ2h0X2EiLCJmb3JFYWNoIiwiZGlyIiwib25Mb2FkIiwibml2ZWxQcmluY2lwYWwiLCJuYW1lRm9sZGVyIiwibmFtZUZpbGUiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0IiwicG9zIiwidmVjMiIsInVybFRleHR1cmEiLCJkaW1lbnNpb25UZXh0dXJhc1giLCJkaW1lbnNpb25UZXh0dXJhc1kiLCJmaXJzdGdpZCIsInRoZW4iLCJyZXN1bHRhZG8iLCJwbGF5ZXIiLCJhZGQiLCJzcHJpdGUiLCJzY2FsZSIsImhlYWx0aCIsImFyZWEiLCJ6IiwiY2FzdGlsbG8iLCJ0b3JyZSIsInVzZSIsIm9uQ2xpY2siLCJkZXN0cm95IiwidmVsb2NpZGFkIiwib25LZXlEb3duIiwicGxheSIsInNwZWVkIiwibW92ZSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/videojuego/PanelJuegos.tsx\n"));

/***/ })

});