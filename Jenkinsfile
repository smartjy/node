serverList = ['sample']
pipeline {
    agent any

    stages {
        stage('env') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerBuild()
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

def dockerBuild() {
    for ( int i = 0; i < serverList.size(); i++) {
        def targetSvr = serverList[i]

        dir("${targetSvr}") {
            def buildApp = docker.build('gorela/test', "--no-cache --network host .")
        }
    }
}