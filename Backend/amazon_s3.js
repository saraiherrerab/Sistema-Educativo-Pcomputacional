import {
    S3Client
} from "@aws-sdk/client-s3";

import dotenv from 'dotenv';

import multerS3 from 'multer-s3'

const { parsed } = dotenv.config();
const { AWS_REGION, AWS_USER_CREDENTIAL, AWS_PASSWORD_CREDENTIAL, AWS_BUCKET_NAME} = parsed;

const S3_CLIENT = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_USER_CREDENTIAL,
        secretAccessKey: AWS_PASSWORD_CREDENTIAL
    }
})

const AWS_BUCKET_CONNECTION = multerS3({
    s3: S3_CLIENT,
    bucket: AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const uniqueFileName = Date.now().toString() + '-' + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({
    storage: AWS_BUCKET_CONNECTION,
});

var express = require('express');
var router = express.Router();

router.post('/archivo/prueba', upload.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se recibió ningún archivo.' });
    }

    res.json({
        mensaje: 'Archivo subido correctamente a S3',
        nombre: req.file.key,
        url: req.file.location,
    });
});

module.exports = router;

