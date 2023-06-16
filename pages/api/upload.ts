import multer from "multer";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disabling the built-in body parsing
  },
};

const uploadApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uploadFolder = "public/upload";
    const files = fs.readdirSync(uploadFolder);

    // Delete all previous files
    for (const file of files) {
      fs.unlinkSync(`${uploadFolder}/${file}`);
    }

    await upload.array("files")(req as any, res as any, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      exec("npm run ingest && npm run build", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
          return;
        }
        console.log(`Command output: ${stdout}`);
      });

      // Files are uploaded successfully
      return res.status(200).json({ message: "Files uploaded successfully" });
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }

  // Return the response to the client
};

export default uploadApi;
