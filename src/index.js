require('dotenv').config()

const logger = require('./create-logger')(__filename)
const fetchPublications = require('./fetch-publications')
const formatData = require('./format-data')
const writeFile = require('./write-file')

main()

async function main () {
  logger.info(`Logger set to level: ${logger.level}`)
  const publications = await fetchPublications().catch(logger.error)
  const formattedPublicationsData = formatData(publications)
  await writeFile(formattedPublicationsData)
  logger.info('Finished!')
}
