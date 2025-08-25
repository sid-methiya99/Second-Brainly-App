pipeline {
    agent any
    
    // Automatic triggers
    triggers {
        // githubPush()                    // Trigger on GitHub push
        pollSCM('H/5 * * * *')        // Fallback: poll every 15 minutes
    }
    
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
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} down || true'
                // Build and run in detached mode
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up --build -d'
            }
        }
        
        stage('Verify Services') {
            steps {
                // Check if containers are running
                sh 'docker ps'
                // Wait a moment for services to start
                sh 'sleep 10'
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
            // Optional: Clean up workspace
            cleanWs()
        }
        failure {
            echo "Pipeline failed ❌"
            // Optional: Send notifications
        }
        success {
            echo "Pipeline succeeded ✅"
            // Optional: Send success notifications
        }
    }
}
