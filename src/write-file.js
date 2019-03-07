const fs = require('fs')
const mkdirp = require('mkdirp')

const logger = require('./create-logger')(__filename)

module.exports = writeFile

async function writeFile (data) {
  const outputDir = `${process.cwd()}/output`
  mkdirp.sync(outputDir)
  const outputFilePath = `${outputDir}/publications.json`

  logger.info(`Saving data to ${outputFilePath}`)
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2))
}
