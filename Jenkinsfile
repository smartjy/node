#!groovy

import groovy.json.JsonOutput
import java.util.Optional
import java.text.SimpleDateFormat
import hudson.model.*
import jenkins.model.*
import hudson.model.Fingerprint.RangeSet

node {
  def scmVars
  scmVars = checkout scm
  println "current build number => " + env.BUILD_NUMBER

  currentBranch = "${scmVars.GIT_BRANCH}"
  println "current branch =>" + ${currentBranch}

}
