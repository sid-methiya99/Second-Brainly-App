pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        
        // Docker Hub configuration for college project
        DOCKER_HUB_REPO = 'sid-methiya99/second-brainly'
        DOCKER_REGISTRY = credentials('docker-hub-credentials')
        
        // Simple image tags
        BACKEND_IMAGE = "${DOCKER_HUB_REPO}-backend"
        FRONTEND_IMAGE = "${DOCKER_HUB_REPO}-frontend"
        BUILD_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = "${BUILD_TAG}-${env.GIT_COMMIT_SHORT}"
                }
                echo "✅ Code checkout completed"
            }
        }

        stage('Setup Tools') {
            steps {
                sh '''
                    echo "🔧 Setting up development tools..."
                    
                    # Check if Node.js is available
                    if command -v node &> /dev/null; then
                        echo "✅ Node.js is available: $(node --version)"
                        echo "✅ NPM is available: $(npm --version)"
                    else
                        echo "❌ Node.js not found, installing..."
                        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
                        sudo apt-get install -y nodejs
                    fi
                    
                    # Check if Bun is available
                    if command -v bun &> /dev/null; then
                        echo "✅ Bun is available: $(bun --version)"
                    else
                        echo "❌ Bun not found, installing..."
                        curl -fsSL https://bun.sh/install | bash
                        export PATH="$HOME/.bun/bin:$PATH"
                        echo "✅ Bun installed: $(bun --version)"
                    fi
                '''
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "📦 Installing backend dependencies..."
                                export PATH="$HOME/.bun/bin:$PATH"
                                bun install
                                echo "✅ Backend dependencies installed"
                            '''
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('brainly-frontend') {
                            sh '''
                                echo "📦 Installing frontend dependencies..."
                                npm ci
                                echo "✅ Frontend dependencies installed"
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Applications') {
            parallel {
                stage('Backend Build') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "🔨 Building backend application..."
                                export PATH="$HOME/.bun/bin:$PATH"
                                # Add your backend build command here when ready
                                # bun run build
                                echo "✅ Backend build completed (or skipped for demo)"
                            '''
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        dir('brainly-frontend') {
                            sh '''
                                echo "🔨 Building frontend application..."
                                npm run build
                                echo "✅ Frontend build completed"
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "🐳 Building Docker images..."
                    
                    // Build backend image
                    dir('backend') {
                        def backendImage = docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}")
                        backendImage.tag('latest')
                        echo "✅ Backend Docker image built: ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    }
                    
                    // Build frontend image
                    dir('brainly-frontend') {
                        def frontendImage = docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}")
                        frontendImage.tag('latest')
                        echo "✅ Frontend Docker image built: ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "🚀 Pushing images to Docker Hub..."
                    
                    docker.withRegistry('https://registry-1.docker.io/v2/', 'docker-hub-credentials') {
                        // Push backend image
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        echo "✅ Backend image pushed to Docker Hub"
                        
                        // Push frontend image
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                        echo "✅ Frontend image pushed to Docker Hub"
                    }
                }
            }
        }

        stage('Demo Information') {
            steps {
                script {
                    echo """
                    🎓 COLLEGE PROJECT BUILD COMPLETED! 🎓
                    
                    📋 Build Summary:
                    ├── Build Number: ${env.BUILD_NUMBER}
                    ├── Git Commit: ${env.GIT_COMMIT_SHORT}
                    ├── Backend Image: ${BACKEND_IMAGE}:${IMAGE_TAG}
                    ├── Frontend Image: ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    └── Docker Hub: https://hub.docker.com/r/sid-methiya99/second-brainly
                    
                    🚀 To run your application:
                    docker run -d -p 3000:3000 ${BACKEND_IMAGE}:latest
                    docker run -d -p 5173:5173 ${FRONTEND_IMAGE}:latest
                    
                    Or use docker-compose up in your project directory!
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                echo "🧹 Cleaning up build workspace..."
                // Clean up old Docker images to save space
                sh '''
                    echo "Removing dangling Docker images..."
                    docker image prune -f || echo "No images to clean"
                '''
            }
            cleanWs()
        }
        
        success {
            script {
                echo """
                🎉 BUILD SUCCESS! 🎉
                
                Your college project has been built and pushed to Docker Hub successfully!
                Check your images at: https://hub.docker.com/r/sid-methiya99/second-brainly
                """
            }
        }
        
        failure {
            script {
                echo """
                ❌ BUILD FAILED! ❌
                
                Don't worry! Check the console output above to see what went wrong.
                Common issues for college projects:
                - Missing dependencies
                - Docker not running
                - Incorrect credentials
                - Network issues
                """
            }
        }
    }
}
