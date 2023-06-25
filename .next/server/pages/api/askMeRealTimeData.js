"use strict";
(() => {
var exports = {};
exports.id = 432;
exports.ids = [432];
exports.modules = {

/***/ 4379:
/***/ ((module) => {

module.exports = require("@pinecone-database/pinecone");

/***/ }),

/***/ 360:
/***/ ((module) => {

module.exports = import("langchain/chains");;

/***/ }),

/***/ 4405:
/***/ ((module) => {

module.exports = import("langchain/embeddings/openai");;

/***/ }),

/***/ 1561:
/***/ ((module) => {

module.exports = import("langchain/llms/openai");;

/***/ }),

/***/ 3244:
/***/ ((module) => {

module.exports = import("langchain/vectorstores/pinecone");;

/***/ }),

/***/ 1510:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3244);
/* harmony import */ var _utils_apiHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72);
/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9018);
/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6168);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_1__, _utils_apiHelper__WEBPACK_IMPORTED_MODULE_2__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__]);
([langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_1__, _utils_apiHelper__WEBPACK_IMPORTED_MODULE_2__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





async function handler(req, res) {
    const { question , history  } = req.body;
    console.log("question", question);
    //only accept post requests
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method not allowed"
        });
        return;
    }
    if (!question) {
        return res.status(400).json({
            message: "No question in the request"
        });
    }
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    try {
        const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__/* .pinecone.Index */ .O.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__/* .PINECONE_INDEX_NAME */ ._);
        /* create vectorstore*/ const vectorStore = await langchain_vectorstores_pinecone__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(new langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({}), {
            pineconeIndex: index,
            textKey: "text",
            namespace: _config_pinecone__WEBPACK_IMPORTED_MODULE_4__/* .PINECONE_NAME_SPACE */ .E
        });
        //create chain
        const chain = (0,_utils_apiHelper__WEBPACK_IMPORTED_MODULE_2__/* .askMeRealTimeData */ .g)(vectorStore);
        //Ask a question using chat history
        const response = await chain.call({
            question: sanitizedQuestion,
            chat_history: history || []
        });
        console.log("response", response);
        res.status(200).json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 72:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ askMeRealTimeData)
/* harmony export */ });
/* harmony import */ var langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(360);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__]);
([langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
const QA_PROMPT_COMMON = `You are virtual expert on the provided files or a website. Answer all the questions related to it. If the question is not related to the context, politely respond that you dont know.`;
const QA_PROMPT = `
${QA_PROMPT_COMMON}
{context}

Question: {question}
Compassionate response in markdown:`;
const askMeRealTimeData = (vectorstore)=>{
    const model = new langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__.OpenAI({
        temperature: 0,
        modelName: process.env.OPENAI_GPT_MODEL
    });
    const chain = langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
        qaTemplate: QA_PROMPT,
        questionGeneratorTemplate: CONDENSE_PROMPT,
        returnSourceDocuments: true
    });
    return chain;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [202], () => (__webpack_exec__(1510)));
module.exports = __webpack_exports__;

})();