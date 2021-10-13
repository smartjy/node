pipeline {
    agent {
        dockerfile {
            dir './sample'
            filename 'Dockerfile'
        }
    }

    stages {
        stage('env') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
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