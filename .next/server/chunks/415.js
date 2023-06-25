"use strict";
exports.id = 415;
exports.ids = [415];
exports.modules = {

/***/ 5415:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ uploadFilesAWS),
/* harmony export */   "l": () => (/* binding */ dynamodb)
/* harmony export */ });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9336);
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);

aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().config.update({
    accessKeyId: "AKIASR6BAKZYEE7KBYVM",
    secretAccessKey: "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",
    region: "ap-south-1"
});
const s3 = new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().S3)();
const dynamodb = new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().DynamoDB.DocumentClient)();
const uploadFilesAWS = async (userId, projectName, files)=>{
    try {
        const folderName = `user_${userId}`;
        console.log(files);
        // Create an array of promises for each file upload
        const uploadPromises = files.map((file)=>{
            const params = {
                Bucket: "multiple-file-chatbot",
                Key: `${folderName}/${projectName}/${file.name}`,
                Body: files
            };
            const reader = new FileReader();
            const fileContentPromise = new Promise((resolve, reject)=>{
                reader.onload = (event)=>resolve(event.target?.result);
                reader.onerror = (error)=>reject(error);
            });
            reader.readAsArrayBuffer(file); // Read file content as ArrayBuffer
            return fileContentPromise.then((fileContent)=>{
                const fileBuffer = Buffer.from(fileContent); // Convert ArrayBuffer to Buffer
                params.Body = fileBuffer; // Assign file content Buffer to params.Body
                return s3.upload(params).promise();
            });
        });
        await Promise.all(uploadPromises);
        console.log(`All files uploaded successfully to "${folderName}" folder.`);
    } catch (error) {
        console.error("Error uploading files:", error);
    }
};


/***/ })

};
;