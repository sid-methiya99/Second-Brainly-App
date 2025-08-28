# Second Brainly App

A full-stack application for managing and sharing your digital content with a beautiful React frontend and Node.js backend.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- Git

### Step 1: Setup Jenkins (CI/CD Pipeline)

First, set up Jenkins with Docker-in-Docker capabilities:

```bash
# Set Docker group ID (run this first)
export HOST_DOCKER_GID=$(getent group docker | cut -d: -f3)

# Create Jenkins network
docker network create jenkins-network

# Run Jenkins container
docker run -d -p 8080:8080 -p 50000:50000 \
  --name jenkins-controller \
  --restart=on-failure \
  -v jenkins_home_data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock:rw \
  --group-add "$HOST_DOCKER_GID" \
  --network jenkins-network \
  my-jenkins-with-docker-cli
```

**Access Jenkins**: http://localhost:8080

### Step 2: Clone and Run the Application

#### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/sid-methiya99/Second-Brainly-App.git
   cd Second-Brainly-App
   ```

2. **Start all services**
   ```bash
   docker compose up --build -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB Express: http://localhost:8081

#### Option 2: Local Development

#### Backend Setup
```bash
cd backend
npm install
npm run build
npm start
```

#### Frontend Setup
```bash
cd brainly-frontend
npm install
npm run dev
```

## 🏗️ Project Structure

```
Second-Brainly-App/
├── backend/                 # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── db/            # Database schemas
│   │   └── utils/         # Utility functions
│   ├── Dockerfile
│   └── package.json
├── brainly-frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── hooks/        # Custom hooks
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-container setup
└── Jenkinsfile            # CI/CD pipeline
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=3000
MONGO_URL=mongodb://admin:password123@mongo:27017/second-brainly?authSource=admin
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (Vite)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🐳 Docker Services

### Services Overview
- **Frontend**: React app served on port 5173
- **Backend**: Node.js API on port 3000
- **MongoDB**: Database on port 27017
- **Mongo Express**: Database UI on port 8081

### Docker Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild and start
docker compose up --build -d

# View running containers
docker ps
```

## 🔄 CI/CD with Jenkins

### Jenkins Setup
The project uses Jenkins for continuous integration and deployment. Jenkins is configured with Docker-in-Docker capabilities to build and run containers.

### Automatic Deployment
This project includes a Jenkins pipeline for automatic deployment:

1. **Polling**: Checks for changes every minute
2. **Auto-build**: Rebuilds containers when changes detected
3. **Hot reloading**: Updates are live within 1-2 minutes

### Jenkins Pipeline Features
- ✅ Automatic code checkout
- ✅ Docker container management
- ✅ Health checks
- ✅ Persistent containers (no downtime)
- ✅ Automatic rebuilds on git push

### Manual Trigger
If you need to manually trigger a build:
1. Go to Jenkins dashboard (http://localhost:8080)
2. Select your project
3. Click "Build Now"

### Jenkins Management
```bash
# View Jenkins logs
docker logs jenkins-controller

# Restart Jenkins
docker restart jenkins-controller

# Stop Jenkins
docker stop jenkins-controller

# Start Jenkins
docker start jenkins-controller
```

## 🛠️ Development Workflow

### Making Changes
1. **Edit your code** (frontend/backend)
2. **Commit changes**: `git add . && git commit -m "Your message"`
3. **Push to Git**: `git push`
4. **Jenkins automatically** rebuilds and deploys
5. **Access updated app** at http://localhost:5173

### Testing Changes
```bash
# Test backend API
curl http://localhost:3000/api/v1/user/signin

# Test frontend
curl http://localhost:5173
```

## 📊 Monitoring

### Container Status
```bash
# Check all containers
docker ps

# View specific container logs
docker logs second-brainly-frontend
docker logs second-brainly-backend
docker logs second-brainly-mongo
```

### Health Checks
- Backend: http://localhost:3000/api/v1/user/signin
- Frontend: http://localhost:5173
- MongoDB: http://localhost:8081

## 🚨 Troubleshooting

### Common Issues

#### Frontend not loading
```bash
# Check frontend container
docker logs second-brainly-frontend

# Restart frontend
docker compose restart frontend
```

#### Backend API errors
```bash
# Check backend container
docker logs second-brainly-backend

# Check MongoDB connection
docker logs second-brainly-mongo
```

#### Jenkins not detecting changes
1. Check Jenkins job configuration
2. Verify polling is enabled
3. Check Jenkins logs for errors
4. Consider using webhook instead of polling

#### Jenkins setup issues
```bash
# Check if Jenkins container is running
docker ps | grep jenkins

# Check Jenkins logs
docker logs jenkins-controller

# Verify Docker socket access
docker exec jenkins-controller docker ps
```

### Reset Everything
```bash
# Stop and remove all containers
docker compose down -v

# Remove all images
docker system prune -a

# Start fresh
docker compose up --build -d
```

## 🔐 Security Notes

- Change default passwords in production
- Use HTTPS in production
- Configure proper CORS settings
- Set secure JWT secrets

## 📝 API Documentation

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Content Management
- `POST /api/v1/content` - Add content
- `GET /api/v1/content` - Get user content
- `DELETE /api/v1/content` - Delete content

### Sharing
- `POST /api/v1/brain/share` - Enable/disable sharing
- `GET /api/v1/brain/:shareLink` - Access shared content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review container logs
3. Verify environment configuration
4. Create an issue on GitHub

---

**Happy coding! 🎉**

