import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_REGION,
});

const s3 = new AWS.S3();
export const dynamodb = new AWS.DynamoDB.DocumentClient();

export const uploadFilesAWS = async (
  userId: any,
  projectName: any,
  files: any
) => {
  try {
    const folderName = `user_${userId}`;
    console.log(files);

    // Create an array of promises for each file upload
    const uploadPromises = files.map((file: any) => {
      const params = {
        Bucket: "multiple-file-chatbot",
        Key: `${folderName}/${projectName}/${file.name}`,
        Body: files,
      };

      const reader = new FileReader();
      const fileContentPromise = new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target?.result);
        reader.onerror = (error) => reject(error);
      });

      reader.readAsArrayBuffer(file); // Read file content as ArrayBuffer

      return fileContentPromise.then((fileContent: any) => {
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
