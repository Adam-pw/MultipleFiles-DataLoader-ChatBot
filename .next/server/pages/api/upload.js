"use strict";
(() => {
var exports = {};
exports.id = 39;
exports.ids = [39];
exports.modules = {

/***/ 4379:
/***/ ((module) => {

module.exports = require("@pinecone-database/pinecone");

/***/ }),

/***/ 1738:
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ 6785:
/***/ ((module) => {

module.exports = import("langchain/document_loaders/fs/csv");;

/***/ }),

/***/ 246:
/***/ ((module) => {

module.exports = import("langchain/document_loaders/fs/directory");;

/***/ }),

/***/ 6777:
/***/ ((module) => {

module.exports = import("langchain/document_loaders/fs/pdf");;

/***/ }),

/***/ 3331:
/***/ ((module) => {

module.exports = import("langchain/document_loaders/web/puppeteer");;

/***/ }),

/***/ 4405:
/***/ ((module) => {

module.exports = import("langchain/embeddings/openai");;

/***/ }),

/***/ 9170:
/***/ ((module) => {

module.exports = import("langchain/text_splitter");;

/***/ }),

/***/ 3244:
/***/ ((module) => {

module.exports = import("langchain/vectorstores/pinecone");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3102:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1738);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var langchain_text_splitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9170);
/* harmony import */ var langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4405);
/* harmony import */ var langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3244);
/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9018);
/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6168);
/* harmony import */ var langchain_document_loaders_fs_pdf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6777);
/* harmony import */ var langchain_document_loaders_web_puppeteer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3331);
/* harmony import */ var langchain_document_loaders_fs_csv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6785);
/* harmony import */ var langchain_document_loaders_fs_directory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(246);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_text_splitter__WEBPACK_IMPORTED_MODULE_2__, langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_3__, langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_4__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_5__, langchain_document_loaders_fs_pdf__WEBPACK_IMPORTED_MODULE_7__, langchain_document_loaders_web_puppeteer__WEBPACK_IMPORTED_MODULE_8__, langchain_document_loaders_fs_csv__WEBPACK_IMPORTED_MODULE_9__, langchain_document_loaders_fs_directory__WEBPACK_IMPORTED_MODULE_10__]);
([langchain_text_splitter__WEBPACK_IMPORTED_MODULE_2__, langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_3__, langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_4__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_5__, langchain_document_loaders_fs_pdf__WEBPACK_IMPORTED_MODULE_7__, langchain_document_loaders_web_puppeteer__WEBPACK_IMPORTED_MODULE_8__, langchain_document_loaders_fs_csv__WEBPACK_IMPORTED_MODULE_9__, langchain_document_loaders_fs_directory__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const storage = multer__WEBPACK_IMPORTED_MODULE_0___default().diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/upload");
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer__WEBPACK_IMPORTED_MODULE_0___default()({
    storage
});
const config = {
    api: {
        bodyParser: false
    }
};
const uploadApi = async (req, res)=>{
    try {
        const uploadFolder = "public/upload";
        const files = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(uploadFolder);
        // Delete all previous files
        for (const file of files){
            fs__WEBPACK_IMPORTED_MODULE_1___default().unlinkSync(`${uploadFolder}/${file}`);
        }
        await upload.array("files")(req, res, async (err)=>{
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            // Files are uploaded successfully
            const run = async ()=>{
                try {
                    const directoryLoader = new langchain_document_loaders_fs_directory__WEBPACK_IMPORTED_MODULE_10__.DirectoryLoader("public/upload", {
                        // ".json": (path) => new JSONLoader(path, "/texts"),
                        // ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
                        // ".txt": (path) => new TextLoader(path),
                        ".pdf": (path)=>new langchain_document_loaders_fs_pdf__WEBPACK_IMPORTED_MODULE_7__.PDFLoader(path),
                        ".csv": (path)=>new langchain_document_loaders_fs_csv__WEBPACK_IMPORTED_MODULE_9__.CSVLoader(path)
                    });
                    let allRawDocs = [];
                    const fileDocs = await directoryLoader.load();
                    const textSplitter = new langchain_text_splitter__WEBPACK_IMPORTED_MODULE_2__.RecursiveCharacterTextSplitter({
                        chunkSize: 1000,
                        chunkOverlap: 200
                    });
                    const docs = await textSplitter.splitDocuments(fileDocs);
                    console.log("split docs", docs);
                    allRawDocs = [
                        ...allRawDocs,
                        ...docs
                    ];
                    const loadUrls = async (urls)=>{
                        for (const url of urls){
                            try {
                                new URL(url); // this will throw an error if the URL is invalid
                            } catch (error) {
                                console.error(`Invalid URL: ${url}`);
                                continue; // skip this URL and move on to the next one
                            }
                            const loader = new langchain_document_loaders_web_puppeteer__WEBPACK_IMPORTED_MODULE_8__.PuppeteerWebBaseLoader(url);
                            const rawDocs = await loader.load();
                            allRawDocs = [
                                ...allRawDocs,
                                ...rawDocs
                            ];
                        /*create and store the embeddings in the vectorStore*/ // Wait for 1 second before moving on to the next URL
                        }
                    };
                    await loadUrls(JSON.parse(req.body.links));
                    // const loader = new PuppeteerWebBaseLoader(
                    //   "https://www.tabnews.com.br/"
                    // );
                    // const rawDocs = await loader.load();
                    // const loader = new CheerioWebBaseLoader(
                    //   "https://www.tabnews.com.br/"
                    // );
                    // const rawDocs = await loader.load();
                    // const test = await directoryLoader.load();
                    // console.log({ test });
                    // const rawDocs = await directoryLoader.load();
                    /* Split text into chunks */ const embeddings = new langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_3__.OpenAIEmbeddings();
                    console.log("creating vector store...");
                    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_5__/* .pinecone.Index */ .O.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_6__/* .PINECONE_INDEX_NAME */ ._); //change to your own index name
                    //embed the PDF documents
                    await langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_4__.PineconeStore.fromDocuments(allRawDocs, embeddings, {
                        pineconeIndex: index,
                        namespace: req.body.namespace,
                        textKey: "text"
                    });
                } catch (error) {
                    console.log("error", error);
                    throw error;
                }
            };
            await run();
            console.log("ingestion complete");
            return res.status(200).json({
                message: "Files uploaded successfully"
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uploadApi);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [202], () => (__webpack_exec__(3102)));
module.exports = __webpack_exports__;

})();