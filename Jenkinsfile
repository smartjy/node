serverList = ['sample']
buildList = []
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
                dockerBuild()
                // script {
                //     dir("sample"){
                //         app = docker.build(REPOSITORY, "--no-cache --network host .")
                //         buildList.add(app)
                //     }
                // }
            }
        }

        stage('Push') {
            steps {
                dockerPush()
                // script {
                //     docker.withRegistry("https://${REGISTRYURL}", REGISTRYCREDENTIAL) {
                //         buildList[0].push("${BRANCH_NAME}-${BUILD_NUMBER}")
                //     }
                // }
            }
        }        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }

        stage('Clean') {
            steps {
                dockerclean()
                // script {
                //     sh "docker rmi -f \$(docker images -q -f reference=*/${REPOSITORY} -f reference=${REPOSITORY} )" 
                // }
            }
        }        
    }
}

def dockerBuild() {
    for ( int i = 0; i < serverList.size(); i++) {
        def targetSvr = serverList[i]

        // docker build 
        dir("${targetSvr}") {
            app = docker.build(REPOSITORY, "--no-cache --network host .")
            buildList.add(app)
        }
    }
}

def dockerPush() {
    for (int i = 0; i < buildList.size(); i++) {
        def buildApp = buildList[i]
        // docker push
        docker.withRegistry("https://${REGISTRYURL}", REGISTRYCREDENTIAL) {
            buildApp.push("${BRANCH_NAME}-${BUILD_NUMBER}")
        }
    }
}

def dockerclean() {
   sh "docker rmi -f \$(docker images -q -f reference=*/${REPOSITORY} -f reference=${REPOSITORY} )" 
}