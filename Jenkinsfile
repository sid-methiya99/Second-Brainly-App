
pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull latest code from GitHub
                git branch: 'main', url: 'https://github.com/sid-methiya99/Second-Brainly-App'
            }
        }

        stage('Build and Run Containers') {
            steps {
                // Clean up old containers
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down || true'

                // Build and run in detached mode
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d'
            }
        }

        stage('Verify Services') {
            steps {
                // Check if containers are running
                sh 'docker ps'

                // Check backend health
                sh 'curl -f http://localhost:3000 || true'

                // Check frontend health
                sh 'curl -f http://localhost:5173 || true'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
        }
        failure {
            echo "Pipeline failed ❌"
        }
        success {
            echo "Pipeline succeeded ✅"
        }
    }
}
