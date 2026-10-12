pipeline {
  agent any
  environment {
    // Ganti 'username-dockerhub' dengan ID akun Docker Hub Anda
    IMAGE_NAME = 'nandopz/my-db-app'
    REGISTRY_CREDENTIALS = 'dockerhub-credentials'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
      }
    }
    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: REGISTRY_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh "echo $PASS | docker login -u $USER --password-stdin"
          sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
          sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest"
          sh "docker push ${IMAGE_NAME}:latest"
        }
      }
    }
  }
  post {
    always {
      echo 'Pipeline CI/CD Selesai Dijalankan!'
    }
  }
}
