properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/hypery2k/grunt-galenframework'],
]

node {
  def buildNumber = env.BUILD_NUMBER
  def workspace = env.WORKSPACE
  def buildUrl = env.BUILD_URL

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
  echo "PATH is $env.PATH"

  try {
    stage('Checkout') {
      checkout scm
    }

    stage('Build') {
      sh "npm install"
    }

    stage('Test') {
      sh "npm run test"
      junit '*/target/tests.js.xml'
    }

    stage('Publish NPM snapshot') {
      def currentVersionCore = sh(returnStdout: true, script: "npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 2").trim()
      def newVersionCore = "${currentVersionCore}-${buildNumber}"
      sh "npm version ${newVersionCore} --no-git-tag-version && npm publish --tag next"
    }

  } catch (e) {
    mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
    throw e
  }
}
