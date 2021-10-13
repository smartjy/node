#!/usr/bin/env groovy
import groovy.json.JsonOutput

serverList = ['sample']
buildList = []
deliveryCli = []

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
        stage('Build') {
            steps {
                dockerBuild()
            }
        }
        stage('Push') {
            steps {
                dockerPush()
            }
        }

        // stage('Clean') {
        //     steps {
        //         dockerclean()
        //     }
        // }    
    }
    post {
        success {
            script {
                notifySlack("", [
                    [
                        title: "Build Success ",
                        // title_link: "${BUILD_URL}",
                        // color: "#1E8449",
                        // author_name: "${gitAuthor}",
                        // fields: notiFields.flatten(),
                        // footer: "${JOB_NAME} - ${buildTagName}",
                        ts: System.currentTimeMillis() / 1000
                    ]
                ]                
            }
        }
        failure {
            echo 'failure'
        }
    }    
}

def dockerBuild() {
    for (int i = 0; i < serverList.size(); i++) {
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

def delivery() {
    for (int i = 0; i < serverList.size(); i++) {
        deliverySvr = serverList[i]
        deliveryCli.add([
            title: "Command for ${deliverySvr} deployment",
            value: "```kubectl --record set image " +
                    // "deployment/${deliverySvr} " +
                    "deployment/dev-sample " +
                    "${deliverySvr}=${REGISTRYURL}/${REPOSITORY}:${BRANCH_NAME}-${BUILD_NUMBER} " +
                    "--namespace default```",
            short: false
        ])
    }
    
    notifySlack("", [
        [
            title: "Build Success",
            title_link: "${BUILD_URL}",
            color: "#1E8449",
            author_name: "test",
            // fields: notiFields.flatten(),
            footer: "${JOB_NAME}",
            ts: System.currentTimeMillis() / 1000
        ]
    ])
}

def notifySlack(text, attachments) {
    def slackURL = 'https://hooks.slack.com/services/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'
    def jenkinsIcon = 'https://avatars.slack-edge.com/2019-05-08/628787263668_7a9ee5e84462be745c7a_48.jpg'

    def payload = JsonOutput.toJson([text: text,
        channel: 'notification_test',
        username: "Jenkins",
        icon_url: jenkinsIcon,
        attachments: attachments
    ])

    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}
