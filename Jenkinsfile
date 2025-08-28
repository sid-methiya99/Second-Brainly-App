
pipeline {
    agent any

    triggers {
        // Poll SCM every 1 minute to detect changes

        pollSCM('H/1 * * * *')
    }

    environment {
        // Use an absolute path for the Docker Compose file within the workspace
        DOCKER_COMPOSE_FILE = "${WORKSPACE}/docker-compose.yml"
        // Define repository and image names for potential future webhook use
        BACKEND_IMAGE_NAME = "sidmethiya99/second-brainly-backend"
        FRONTEND_IMAGE_NAME = "sidmethiya99/second-brainly-frontend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    echo "Stopping existing containers (keeping volumes)..."
                    sh "docker compose -f ${DOCKER_COMPOSE_FILE} down --timeout 0 || true"
                    echo "Stopped existing containers."
                }
            }
        }

        stage('Build and Run Containers') {
            steps {
                script {
                    echo "Building and starting Docker Compose services..."
                    sh "docker compose -f ${DOCKER_COMPOSE_FILE} up --build -d"
                    echo "Docker Compose services started and will remain running."
                }
            }
        }

        stage('Debug Environment') {
            steps {
                sh '''
                    echo "=== Jenkins Environment ==="
                    whoami
                    hostname
                    echo "Jenkins running in container: $(cat /.dockerenv 2>/dev/null && echo 'YES' || echo 'NO')"

                    echo "\\n=== Docker Version ==="
                    docker version || echo "Docker not accessible"

                    echo "\\n=== Container Status ==="
                    docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}\\t{{.Networks}}"

                    echo "\\n=== Network Information ==="
                    docker network inspect $(docker network ls --filter name=second-brainly-default -q) || echo "Could not inspect default network"
                '''
            }
        }

        stage('Service Status') {
            steps {
                sh '''
                    echo "=== Final Status Check ==="
                    docker ps --format "table {{.Names}}\\t{{.Status}}"

                    echo "\\n=== Container Health ==="
                    for container in second-brainly-backend second-brainly-frontend second-brainly-mongo; do
                        echo "$container status: $(docker inspect -f '{{.State.Status}}' $container 2>/dev/null || echo 'not found')"
                        if [[ "$(docker inspect -f '{{.State.Status}}' $container 2>/dev/null)" != "running" ]]; then
                            echo "Last 10 lines of $container logs:"
                            docker logs --tail 10 $container || true
                        fi
                    done
                    
                    echo "\\n=== Access URLs ==="
                    echo "Frontend: http://localhost:5173"
                    echo "Backend API: http://localhost:3000"
                    echo "Mongo Express: http://localhost:8081"
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline finished! Containers are still running."
            echo "Access your application at: http://localhost:5173"
            cleanWs()
        }
        failure {
            echo "❌ Pipeline failed!"
            sh '''
                echo "=== Failure Debug ==="
                echo "Backend logs:"
                docker logs --tail 50 second-brainly-backend || true
                echo "\\nFrontend logs:"
                docker logs --tail 50 second-brainly-frontend || true
                echo "\\nMongo logs:"
                docker logs --tail 50 second-brainly-mongo || true
            '''
        }
        success {
            echo "✅ Pipeline succeeded! Your app is running at http://localhost:5173"
        }
    }
}
