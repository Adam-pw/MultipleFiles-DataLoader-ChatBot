"use strict";
exports.id = 202;
exports.ids = [202];
exports.modules = {

/***/ 6168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ PINECONE_NAME_SPACE),
/* harmony export */   "_": () => (/* binding */ PINECONE_INDEX_NAME)
/* harmony export */ });
/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */ if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error("Missing Pinecone index name in .env file");
}
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? "";
const PINECONE_NAME_SPACE = process.env.PINECONE_NAME_SPACE ?? "";



/***/ }),

/***/ 9018:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ pinecone)
/* harmony export */ });
/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4379);
/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone environment or api key vars missing");
}
async function initPinecone() {
    try {
        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT ?? "",
            apiKey: process.env.PINECONE_API_KEY ?? ""
        });
        return pinecone;
    } catch (error) {
        console.log("error", error);
        throw new Error("Failed to initialize Pinecone Client");
    }
}
const pinecone = await initPinecone();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;