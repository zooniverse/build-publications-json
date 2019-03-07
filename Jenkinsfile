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
  }
}
