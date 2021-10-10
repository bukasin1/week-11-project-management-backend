/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import multer from 'multer';
import path from 'path';

const cloudinary = require('cloudinary').v2;
const cloudKey = process.env.Cloud_Name
const apiKey = process.env.API_Key
const apiSecret = process.env.API_Secret
cloudinary.config({
  cloud_name: cloudKey,
  api_key: apiKey,
  api_secret: apiSecret
})

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: ( req: any,file, callback: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !=='.pdf' && ext !== '.zip') {
      callback(new Error('File type is not supported.'), false);
      return;
    }
    callback(null, true);
  }
}).single('avatar')

