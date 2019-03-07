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
          def dockerRepoName = 'zooniverse/build-publications-json'
          def dockerImageName = "${dockerRepoName}:latest"
          def newImage = null

          newImage = docker.build(dockerImageName)
          if (BRANCH_NAME == 'master') {
            newImage.push()
          }
        }
      }
    }
  }
  post {
    failure {
      script {
        if (BRANCH_NAME == 'master') {
          slackSend (
            color: '#FF0000',
            message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#ops"
          )
        }
      }
    }
  }
}
