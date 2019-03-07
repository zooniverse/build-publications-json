const AWS = require('aws-sdk')

const logger = require('./create-logger')(__filename)

module.exports = saveToS3

async function saveToS3 (dataObject) {
  const { accessKeyId, Bucket, Key, region, secretAccessKey } = createConfig()

  const s3 = new AWS.S3({ accessKeyId, region, secretAccessKey })
  const json = JSON.stringify(dataObject, null, 2)
  const Body = new Buffer.from(json)

  const params = {
    ACL: 'public-read',
    Body,
    Bucket,
    Key
  }

  logger.info(`Saving data to ${s3.endpoint.href}${Bucket}/${Key}`)
  await s3
    .putObject(params)
    .promise()
    .catch(error => console.error(error))
}

function createConfig () {
  const {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET,
    S3_KEY,
    S3_REGION
  } = process.env

  const accessKeyId = AWS_ACCESS_KEY.trim()
  const Bucket = S3_BUCKET ? S3_BUCKET.trim() : 'zooniverse-static'
  const Key = S3_KEY
    ? removeLeadingSlash(S3_KEY.trim())
    : 'publications/publications.json'
  const region = S3_REGION ? S3_REGION.trim() : 'us-east-1'
  const secretAccessKey = AWS_SECRET_ACCESS_KEY.trim()

  return {
    accessKeyId,
    Bucket,
    Key,
    region,
    secretAccessKey
  }
}

function removeLeadingSlash (string) {
  return string.replace(/^\/+/g, '')
}
