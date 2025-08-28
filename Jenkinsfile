pipeline {
    agent any

    triggers {
        // Poll SCM will detect changes in your Git repository.
        // If you were using webhooks for Docker image changes (as discussed previously),
        // this is where you'd add the genericWebhook trigger.
        pollSCM('H/5 * * * *')
    }

    environment {
        // Use an absolute path for the Docker Compose file within the workspace
        DOCKER_COMPOSE_FILE = "${workspace}/docker-compose.yml"
        // Define repository and image names for potential future webhook use
        BACKEND_IMAGE_NAME = "sidmethiya99/second-brainly-backend" // Example, replace with your actual repo/image
        FRONTEND_IMAGE_NAME = "sidmethiya99/second-brainly-frontend" // Example, replace with your actual repo/image
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Ensure clean checkout on each run
                    checkout scm
                }
            }
        }

        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    echo "Attempting to stop and remove existing Docker Compose services..."
                    // Use --timeout 0 to avoid waiting if a container is stuck
                    // Use --rmi all to remove all images, ensuring a fresh build. Be careful with this in production.
                    // The '|| true' allows the step to succeed even if containers aren't running
                    sh "docker compose -f ${DOCKER_COMPOSE_FILE} down --timeout 0 --rmi all || true"
                    echo "Cleaned up old containers and images (if any)."
                }
            }
        }

        stage('Build and Run Containers') {
            steps {
                script {
                    echo "Building and starting Docker Compose services..."
                    // --build ensures images are rebuilt based on the Dockerfiles
                    // -d runs in detached mode
                    sh "docker compose -f ${DOCKER_COMPOSE_FILE} up --build -d"
                    echo "Docker Compose services started."
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
                    # ip addr show docker0 might not work reliably inside the Jenkins container,
                    # as it refers to the host's bridge.
                    # We can inspect the network from Docker itself
                    docker network inspect $(docker network ls --filter name=second-brainly-default -q) || echo "Could not inspect default network"

                    echo "\\n=== Processes Listening (on host via Jenkins DooD) ==="
                    # ss -tulpn is for the host, not the Jenkins container.
                    # This will show if the host is listening on these ports.
                    # For inside the Jenkins container, netstat/ss won't show the services running in *other* containers.
                    # For services inside other containers, you'd use 'docker exec'.
                    echo "Checking host ports: 3000, 5173, 27017, 8081"
                    # Using 'sudo' might be needed depending on your host's ss/netstat setup.
                    # For a Jenkins container mounting docker.sock, it's operating with host privileges.
                    # The 'ss' command might not be available or directly reflect the host's ports within the Jenkins container's view
                    # unless it's explicitly run on the host or accessed differently.
                    # Let's rely on 'docker ps' for port mappings and 'curl' for connectivity.
                    echo "This stage cannot reliably show processes on *host* ports from within Jenkins container without special setup."
                '''
            }
        }

        stage('Wait for Services to be Ready') {
            steps {
                script {
                    echo "Waiting for services to become ready (up to 90 seconds)..."
                    // Use wait-for-it.sh or a custom script for robust health checks
                    // For now, a simple sleep with repeated checks
                    sh '''
                        max_retries=15
                        retry_interval=6
                        retries=0
                        while [ $retries -lt $max_retries ]; do
                            echo "Attempt $((retries + 1)) of $max_retries: Checking service readiness..."
                            if curl -f http://localhost:3000/api/v1/health && \
                               curl -f http://localhost:5173; then # Assuming frontend root path also responds
                                echo "Services are up and responding!"
                                break
                            else
                                echo "Services not ready yet. Waiting ${retry_interval}s..."
                                sleep $retry_interval
                                retries=$((retries + 1))
                            fi
                        done

                        if [ $retries -eq $max_retries ]; then
                            echo "Timed out waiting for services to become ready."
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Verify Services') {
            steps {
                sh '''
                    echo "=== Testing Different Connection Methods ==="

                    # Method 1: localhost (This works because Docker maps the container ports to host's localhost)
                    echo "Testing localhost..."
                    curl -f -I http://localhost:3000 && echo "✅ Backend on localhost:3000" || echo "❌ Backend localhost failed"
                    curl -f -I http://localhost:5173 && echo "✅ Frontend on localhost:5173" || echo "❌ Frontend localhost failed"

                    # Method 2: 127.0.0.1 (Same as localhost)
                    echo "\\nTesting 127.0.0.1..."
                    curl -f -I http://127.0.0.1:3000 && echo "✅ Backend on 127.0.0.1:3000" || echo "❌ Backend 127.0.0.1 failed"
                    curl -f -I http://127.0.0.1:5173 && echo "✅ Frontend on 127.0.0.1:5173" || echo "❌ Frontend 127.0.0.1 failed"

                    # Method 3: Container exec (internal check) - These are important for testing inter-service communication
                    echo "\\nTesting from inside containers (internal endpoints)..."
                    # Test backend's own health endpoint (assuming /health)
                    docker exec second-brainly-backend curl -f http://localhost:3000/api/v1/health && echo "✅ Backend internal (self-check)" || echo "❌ Backend internal (self-check) failed"
                    # Test frontend's own health endpoint or just root
                    docker exec second-brainly-frontend curl -f http://localhost:5173 && echo "✅ Frontend internal (self-check)" || echo "❌ Frontend internal (self-check) failed"
                    # Test frontend to backend communication
                    docker exec second-brainly-frontend curl -f http://backend:3000/api/v1/health && echo "✅ Frontend to Backend communication" || echo "❌ Frontend to Backend communication failed"


                    # Method 4: Container IP - Less reliable as IPs can change, but good for debugging
                    echo "\\nTesting container IPs (for debugging, IPs can change)..."
                    BACKEND_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' second-brainly-backend)
                    FRONTEND_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' second-brainly-frontend)
                    echo "Backend IP: $BACKEND_IP, Frontend IP: $FRONTEND_IP"

                    if [ ! -z "$BACKEND_IP" ]; then
                        curl -f -I http://$BACKEND_IP:3000 && echo "✅ Backend via container IP" || echo "❌ Backend container IP failed"
                    fi
                    if [ ! -z "$FRONTEND_IP" ]; then
                        curl -f -I http://$FRONTEND_IP:5173 && echo "✅ Frontend via container IP" || echo "❌ Frontend container IP failed"
                    fi
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
                        # Optional: Print logs if status is not 'running'
                        if [[ "$(docker inspect -f '{{.State.Status}}' $container 2>/dev/null)" != "running" ]]; then
                            echo "Last 10 lines of $container logs:"
                            docker logs --tail 10 $container || true
                        fi
                    done
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
            // Clean up Docker Compose services after the run, regardless of success or failure.
            // This prevents old containers from interfering with new builds.
            script {
                echo "Tearing down Docker Compose services..."
                sh "docker compose -f ${DOCKER_COMPOSE_FILE} down --timeout 0 --volumes || true"
                echo "Cleaned workspace."
                cleanWs() // Cleans the Jenkins workspace directory
            }
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
            echo "✅ Pipeline succeeded!"
        }
    }
}
