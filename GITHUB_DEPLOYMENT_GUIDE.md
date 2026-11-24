# 🚀 GitHub Pages Live Demo Deployment Guide

This guide provides step-by-step instructions to host **Rahav Public School Cloud Management Software UI** live on **GitHub Pages** (free, instant, and zero build step required).

---

## 📁 Files Ready for Deployment

All files in this directory are structured for **zero-dependency static hosting**:
- `index.html` — Main Single Page Application entry point (configured with relative asset paths)
- `favicon.ico` — Custom RPS crest icon
- `.nojekyll` — Tells GitHub Pages to serve all files directly without Jekyll processing
- `.github/workflows/deploy.yml` — Automated GitHub Actions CI/CD deployment workflow
- `css/style.css` — Custom device frame and report card styles
- `js/data.js` — Comprehensive mock database (users, faculty portfolios, CCTV, fleet GPS, marksheets, complaints, leaves)
- `js/app.js` — Frontend state controller (Pure Vanilla JavaScript + Tailwind CDN)
- `rahav-school-management-ui.zip` — Complete pre-packaged zip archive ready for download or upload

---

## ⚡ Option 1: Direct GitHub Push & Enable Pages (Recommended • 2 Minutes)

### Step 1: Initialize Git and Commit Files
Open your terminal in this directory (`/Users/raghavendra/works/school-software`) and run:

```bash
# 1. Initialize git repository if not already done
git init

# 2. Stage all files
git add .

# 3. Commit the prototype
git commit -m "feat: complete Rahav Public School cloud UI prototype with CCTV, Bus GPS, and Teacher Portfolio"

# 4. Set default branch to main
git branch -M main
```

### Step 2: Create a New GitHub Repository
1. Go to [https://github.com/new](https://github.com/new).
2. Name the repository (e.g. `rahav-school-software` or `school-management-ui`).
3. Set visibility to **Public** (for free GitHub Pages) or **Private** (requires GitHub Pro/Enterprise for Pages).
4. Do **not** initialize with README, .gitignore, or license (we already have them).
5. Click **Create repository**.

### Step 3: Link Remote and Push
Copy your repository URL from GitHub and run:

```bash
# Replace with your actual GitHub username and repository name:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push code to GitHub
git push -u origin main
```

### Step 4: Turn on GitHub Pages in 3 Clicks
1. On your GitHub repository page, click the **Settings** tab (gear icon at the top).
2. On the left sidebar under *Code and automation*, click **Pages**.
3. Under **Build and deployment** -> **Source**:
   - Select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
4. In about 30–60 seconds, refresh the page. You will see:
   > **"Your site is live at `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`"**

---

## 🤖 Option 2: Automated Deployment via GitHub Actions

A pre-configured GitHub Actions workflow is already included in `.github/workflows/deploy.yml`.

1. Go to your repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Every time you push to `main`, GitHub Actions will automatically deploy the site.

---

## 🌐 Option 3: Instant 10-Second Drag-and-Drop (Netlify / Vercel)

If you need a live HTTPS URL right now to share with stakeholders before setting up git:
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `school-software` folder (or unzip `rahav-school-management-ui.zip`).
3. You will get an instant public live URL (e.g. `https://rahav-public-school.netlify.app`).

---

## ✅ What Stakeholders Can Test on the Live Demo

1. **Role-Selection Login Screen**: Test with all 6 personas (Super Admin, Admin, Principal, Class Teacher 10-A, Subject Teacher, Parent, Student).
2. **Teacher Portfolio Showcase**: Click **"Teacher Portfolio (शिक्षक मंडल)"** on the public portal to inspect qualifications, board results, and awards for all 8 educators.
3. **Class Teacher vs. Subject Teacher**: Experience daily morning attendance (P/A/L roll call) and composite marksheets vs. subject-only instruction.
4. **Super Admin vs. Admin**: Onboard staff/assign roles vs. onboard students/operate fee collection counter.
5. **Live Classroom CCTV**: Watch Class 10-A live video with front/rear angle switching and Aarav's seat highlight.
6. **Live GPS Bus Tracker**: Track Bus 04 with real-time ETA, driver contact, and highway map.
7. **6-Role Mobile App Simulator**: Test the smartphone application for Parent, Student, Teacher, Principal, Admin, and Super Admin.
