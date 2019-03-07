#!groovy

String cron_string = BRANCH_NAME == "master" ? "@daily" : ""

pipeline {
  agent none

  options {
    disableConcurrentBuilds()
  }

  triggers { cron(cron_string) }

  stages {
    stage('Build Docker image') {
      agent any
      steps {
        script {
          if (BRANCH_NAME == 'master') {
            def dockerRepoName = 'zooniverse/build-publications-json'
            def dockerImageName = "${dockerRepoName}:latest"
            def newImage = null

            newImage = docker.build(dockerImageName)
            newImage.push()
          }
        }
      }
    }
    stage('Update publications') {
      agent any
      environment {
        CONTENTFUL_ACCESS_TOKEN = credentials('contentful-key')
      }
      steps {
        script {
          def dockerRepoName = 'zooniverse/build-publications-json'
          def dockerImageName = "${dockerRepoName}:latest"

          docker.image(dockerImageName).withRun('-e CONTENTFUL_SPACE="jt90kyhvp0qv" -e CONTENTFUL_ACCESS_TOKEN="$CONTENTFUL_ACCESS_TOKEN"')
        }
      }
    }
  }
}
