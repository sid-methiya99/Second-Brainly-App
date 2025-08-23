pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20'
        BUN_VERSION = '1.0.0'
        DOCKER_IMAGE = 'second-brainly-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    tools {
        nodejs "NodeJS-${NODE_VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // Install Bun if not available
                    sh '''
                        if ! command -v bun &> /dev/null; then
                            echo "Installing Bun..."
                            curl -fsSL https://bun.sh/install | bash
                            export PATH="$HOME/.bun/bin:$PATH"
                        fi
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh '''
                                export PATH="$HOME/.bun/bin:$PATH"
                                bun install
                            '''
                        }
                    }
                }
                
                stage('Frontend Dependencies') {
                    steps {
                        dir('brainly-frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Lint and Type Check') {
            parallel {
                stage('Backend Type Check') {
                    steps {
                        dir('backend') {
                            sh '''
                                export PATH="$HOME/.bun/bin:$PATH"
                                npx tsc --noEmit
                            '''
                        }
                    }
                }
                
                stage('Frontend Lint and Type Check') {
                    steps {
                        dir('brainly-frontend') {
                            sh 'npm run lint'
                            sh 'npx tsc --noEmit'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Backend Build') {
                    steps {
                        dir('backend') {
                            sh '''
                                export PATH="$HOME/.bun/bin:$PATH"
                                npx tsc --b
                            '''
                        }
                    }
                }
                
                stage('Frontend Build') {
                    steps {
                        dir('brainly-frontend') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            script {
                                // Add backend tests when available
                                echo "Backend tests will be added when test scripts are implemented"
                                // sh 'npm test' // Uncomment when tests are added
                            }
                        }
                    }
                }
                
                stage('Frontend Tests') {
                    steps {
                        dir('brainly-frontend') {
                            script {
                                // Add frontend tests when available
                                echo "Frontend tests will be added when test scripts are implemented"
                                // sh 'npm test' // Uncomment when tests are added
                            }
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    // Run security scans if tools are available
                    echo "Security scanning stage - configure as needed"
                    
                    // Example: npm audit for frontend
                    dir('brainly-frontend') {
                        sh 'npm audit --audit-level moderate || true'
                    }
                    
                    // Example: npm audit for backend (if using npm)
                    dir('backend') {
                        sh 'npm audit --audit-level moderate || true'
                    }
                }
            }
        }
        
        stage('Docker Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    // Build Docker image if Dockerfile exists
                    if (fileExists('Dockerfile')) {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    } else {
                        echo "No Dockerfile found, skipping Docker build"
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Deploying to staging environment..."
                    // Add your staging deployment logic here
                    // Example: kubectl apply, docker push, etc.
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to production environment..."
                    // Add your production deployment logic here
                    // Example: kubectl apply, docker push, etc.
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup workspace
            cleanWs()
        }
        
        success {
            script {
                echo "Pipeline completed successfully!"
                // Add success notifications (Slack, email, etc.)
            }
        }
        
        failure {
            script {
                echo "Pipeline failed!"
                // Add failure notifications (Slack, email, etc.)
            }
        }
        
        unstable {
            script {
                echo "Pipeline is unstable!"
                // Add unstable notifications
            }
        }
    }
}
