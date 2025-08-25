pipeline {
    agent any
    
    triggers {
        pollSCM('H/5 * * * *')
    }
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sid-methiya99/Second-Brainly-App'
            }
        }
        
        stage('Build and Run Containers') {
            steps {
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} down || true'
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up --build -d'
            }
        }
        
        stage('Debug Environment') {
            steps {
                sh '''
                    echo "=== Jenkins Environment ==="
                    whoami
                    hostname
                    echo "Jenkins running in container: $(cat /.dockerenv 2>/dev/null && echo 'YES' || echo 'NO')"
                    
                    echo "\\n=== Container Status ==="
                    docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}\\t{{.Networks}}"
                    
                    echo "\\n=== Network Information ==="
                    ip addr show docker0 || echo "No docker0 interface"
                    
                    echo "\\n=== Processes Listening ==="
                    netstat -tulpn | grep -E ":(3000|5173|27017|8081)" || echo "No processes found on expected ports"
                    
                    echo "\\n=== Container Logs ==="
                    echo "Backend logs:"
                    docker logs --tail 10 second-brainly-backend
                    echo "\\nFrontend logs:"
                    docker logs --tail 10 second-brainly-frontend
                '''
            }
        }
        
        stage('Verify Services') {
            steps {
                sh 'sleep 30'  // Wait longer for services
                
                sh '''
                    echo "=== Testing Different Connection Methods ==="
                    
                    # Method 1: localhost (should work with host network)
                    echo "Testing localhost..."
                    curl -f -I http://localhost:3000 && echo "✅ Backend on localhost:3000" || echo "❌ Backend localhost failed"
                    curl -f -I http://localhost:5173 && echo "✅ Frontend on localhost:5173" || echo "❌ Frontend localhost failed"
                    
                    # Method 2: 127.0.0.1
                    echo "\\nTesting 127.0.0.1..."
                    curl -f -I http://127.0.0.1:3000 && echo "✅ Backend on 127.0.0.1:3000" || echo "❌ Backend 127.0.0.1 failed"
                    curl -f -I http://127.0.0.1:5173 && echo "✅ Frontend on 127.0.0.1:5173" || echo "❌ Frontend 127.0.0.1 failed"
                    
                    # Method 3: Container exec (internal check)
                    echo "\\nTesting from inside containers..."
                    docker exec second-brainly-backend curl -f http://localhost:3000 && echo "✅ Backend internal" || echo "❌ Backend internal failed"
                    docker exec second-brainly-frontend curl -f http://localhost:5173 && echo "✅ Frontend internal" || echo "❌ Frontend internal failed"
                    
                    # Method 4: Container IP (if using bridge network)
                    echo "\\nTesting container IPs..."
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
                    
                    echo "\\n=== Port Check ==="
                    # Check if processes are actually listening
                    ss -tulpn | grep -E ":(3000|5173)" || echo "No processes listening on expected ports"
                    
                    echo "\\n=== Container Health ==="
                    for container in second-brainly-backend second-brainly-frontend second-brainly-mongo; do
                        echo "$container status: $(docker inspect -f '{{.State.Status}}' $container 2>/dev/null || echo 'not found')"
                    done
                '''
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finished!"
            cleanWs()
        }
        failure {
            echo "❌ Pipeline failed!"
            sh '''
                echo "=== Failure Debug ==="
                docker logs --tail 20 second-brainly-backend || true
                docker logs --tail 20 second-brainly-frontend || true
            '''
        }
        success {
            echo "✅ Pipeline succeeded!"
        }
    }
}
