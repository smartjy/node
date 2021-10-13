def serverList = ['sample']
def buildList = []
pipeline {
    agent {
        label 'agent-leo'
    }

    environment {
        REPOSITORY = 'gorela/test'
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
                    dir("sample"){
                        app = docker.build(REPOSITORY, "--no-cache --network host .")
                        buildList.add(app)
                    }
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRYURL}", REGISTRYCREDENTIAL) {
                        buildList[0].push("${BRANCH_NAME}-${BUILD_NUMBER}")
                    }
                }
            }
        }        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }

        stage('Clean') {
            steps {
                script {
                    sh "docker rmi -f \$(docker images -q -f reference=*/${REPOSITORY} -f reference=${REPOSITORY} )" 
                }
            }
        }        
    }
}

def dockerizing() {
    for ( int i = 0; i < serverList.size(); i++) {
        def targetSvr = serverList[i]

        // docker build 
        dir("${targetSvr}") {
            buildApp = docker.build(REPOSITORY, "--no-cache --network host .")
        }
        // docker push 
        docker.withRegistry("https://${REGISTRYURL}", REGISTRYCREDENTIAL) {
            buildApp.push("${BRANCH_NAME}-${BUILD_NUMBER}")
        }
    }
}

def dockerclean() {
   sh "docker rmi -f \$(docker images -q -f reference=*/${REPOSITORY} -f reference=${REPOSITORY} )" 
}