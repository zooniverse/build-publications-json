const AWS = require('aws-sdk')

const logger = require('./create-logger')(__filename)

AWS.config.update({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.S3_REGION
})

const s3 = new AWS.S3()

module.exports = saveToS3

async function saveToS3 (dataObject) {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: process.env.S3_KEY || 'publications/publications.json',
    Body: Buffer.from(JSON.stringify(dataObject, null, 2)),
    ACL: 'public-read'
  }

  await s3
    .putObject(params)
    .promise()
    .catch(error => {
      logger.error(error.message)
      console.error(error)
    })
}
