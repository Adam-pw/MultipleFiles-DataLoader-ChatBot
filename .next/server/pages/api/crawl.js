"use strict";
(() => {
var exports = {};
exports.id = 617;
exports.ids = [617];
exports.modules = {

/***/ 5462:
/***/ ((module) => {

module.exports = import("puppeteer");;

/***/ }),

/***/ 164:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5462);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer__WEBPACK_IMPORTED_MODULE_0__]);
puppeteer__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    const { url  } = req.query;
    if (!url) {
        res.status(400).send("Missing URL");
        return;
    }
    const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_0__["default"].launch();
    const page = await browser.newPage();
    // Navigate to the provided URL
    await page.goto(url);
    const links = await page.evaluate(()=>{
        const anchors = Array.from(document.querySelectorAll("a"));
        return anchors.map((anchor)=>anchor.href);
    });
    // Send the crawled URLs in the response
    let response = [];
    links.forEach((link)=>{
        if (link.length > 0 && link[0] == "h") {
            response.push(link);
        }
    });
    res.json(response);
    await browser.close();
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(164));
module.exports = __webpack_exports__;

})();