# Webhook Setup for Instant Deployment

## 🚀 Automatic Deployment Setup

To enable instant deployment when you push changes (like changing "Second Brain" to "Third Brain"), follow these steps:

### 1. Jenkins Webhook URL
Your Jenkins webhook URL will be:
```
http://your-jenkins-server:8080/generic-webhook-trigger/invoke?token=second-brainly-webhook-token
```

### 2. GitHub/GitLab Webhook Configuration

#### For GitHub:
1. Go to your repository → Settings → Webhooks
2. Click "Add webhook"
3. **Payload URL**: `http://your-jenkins-server:8080/generic-webhook-trigger/invoke?token=second-brainly-webhook-token`
4. **Content type**: `application/json`
5. **Events**: Select "Just the push event"
6. **Active**: ✅ Checked
7. Click "Add webhook"

#### For GitLab:
1. Go to your repository → Settings → Webhooks
2. **URL**: `http://your-jenkins-server:8080/generic-webhook-trigger/invoke?token=second-brainly-webhook-token`
3. **Trigger**: Select "Push events"
4. Click "Add webhook"

### 3. Test the Webhook
1. Make a small change to your frontend (e.g., change title)
2. Commit and push: `git add . && git commit -m "Update title" && git push`
3. Check Jenkins - it should automatically start building!

### 4. Required Jenkins Plugin
Make sure you have the **Generic Webhook Trigger** plugin installed in Jenkins:
1. Go to Jenkins → Manage Jenkins → Manage Plugins
2. Search for "Generic Webhook Trigger"
3. Install if not already installed

## 🔧 Troubleshooting

### If webhook doesn't work:
1. Check Jenkins logs for webhook errors
2. Verify the webhook URL is accessible from your Git provider
3. Check if the token matches in both Jenkins and webhook URL
4. The fallback polling (every 5 minutes) will still trigger builds

### Security Note:
- The webhook token provides basic security
- Consider using HTTPS for production
- You can change the token in the Jenkinsfile if needed

## 📝 Example Workflow
1. Edit frontend title: "Second Brain" → "Third Brain"
2. Save file
3. `git add . && git commit -m "Update title to Third Brain" && git push`
4. Jenkins automatically detects the push
5. Builds and deploys within 1-2 minutes
6. Your website updates instantly! 🎉
