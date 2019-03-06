const AWS = require('aws-sdk')

AWS.config.update({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID.trim(),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.trim()
  },
  region: process.env.S3_REGION.trim()
})

const s3 = new AWS.S3()

module.exports = saveToS3

async function saveToS3 (dataObject) {
  const Key = (process.env.S3_KEY)
    ? process.env.S3_KEY.trim()
    : 'publications/publications.json'

  const params = {
    // ACL: 'public-read',
    Body: JSON.stringify(dataObject, null, 2),
    Bucket: process.env.S3_BUCKET.trim(),
    Key,
  }

  await s3
    .putObject(params)
    .promise()
}
