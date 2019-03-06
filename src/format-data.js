const _ = require('lodash')

const logger = require('./create-logger')(__filename)

module.exports = formatData

function formatData (contentfulResponse) {
  const formatted = formatPublications(contentfulResponse)
  return groupPublications(formatted)
}

function formatPublications (contentfulResponse) {
  logger.info('Formatting Contentful publications...')
  return contentfulResponse.map(item => {
    const { fields } = item
    const result = {
      category: _.lowerCase(fields.project.fields.category.fields.name),
      citation: fields.citation,
      date: fields.date,
      project: {},
      url: fields.url
    }

    if (fields.project.fields.slug) {
      result.project.slug = fields.project.fields.slug
      return result
    } else if (fields.project.fields.name) {
      result.project.name = fields.project.fields.name
      return result
    } else {
      logger.error(`Couldn't find an identifier for \`${citation}\`, skipping`)
    }
  })
}

function groupPublications (formattedResponse) {
  logger.info('Grouping publications by topic and project...')

  const grouped = {}
  formattedResponse.forEach(publication => {
    let path = ''

    // Category
    const categoryName = _.lowerCase(publication.category)
    const categoryExists = _.get(grouped, categoryName)
    if (!categoryExists) {
      logger.debug(`Couldn't find category \`${categoryName}\`, creating`)
      grouped[categoryName] = []
    }

    // Project
    const projectId = publication.project.slug ? 'slug' : 'name'

    let projectIndex = grouped[categoryName].findIndex(
      p => p[projectId] === publication.project[projectId]
    )

    if (projectIndex < 0) {
      logger.debug(
        `Couldn't find project with \`${projectId}\` of \`${
          publication.project[projectId]
        }\`, creating`
      )

      grouped[categoryName].push({
        [projectId]: publication.project[projectId],
        publications: []
      })

      projectIndex = grouped[categoryName].length - 1
    }

    // Publication
    grouped[categoryName][projectIndex].publications.push({
      citation: publication.citation,
      date: publication.date,
      href: publication.url
    })
  })

  return grouped
}
