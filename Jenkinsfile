serverList = ['sample']
pipeline {
    agent {
        label 'agent-leo'
    }

    environment {
        REGISTRYURL = '653983231979.dkr.ecr.ap-northeast-2.amazonaws.com'
        REGISTRYCREDENTIAL = 'ecr:ap-northeast-2:aws-ecr'
    }

    stages {
        // stage('env') {
        //     steps {
        //         sh 'printenv'
        //     }
        // }
        stage('Build') {
            steps {
                script {
                    dockerizing()
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

def dockerizing() {
    for ( int i = 0; i < serverList.size(); i++) {
        def targetSvr = serverList[i]

        // docker build 
        dir("${targetSvr}") {
            def buildApp = docker.build("gorela/test:${BUILD_ID}", "--no-cache --network host .")
        }
        // docker push 
        docker.withRegistry("https://${REGISTRYURL}", REGISTRYCREDENTIAL) {
            buildApp.push(BRANCH_NAME)
        }
    }
}