# Deployment Guide: Next.js on Vercel

Since you are using **Next.js**, the best and easiest platform for deployment is **Vercel** (the creators of Next.js). It supports custom domains and offers excellent performance.

## 1. Prerequisites
- **GitHub Account**: You need to push your local code to a GitHub repository.
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
- **Domain Access**: Access to your domain's DNS settings (where you bought the domain).

## 2. Push Code to GitHub
1.  Create a new repository on GitHub.
2.  Push your local project to this repository:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## 3. Deploy on Vercel
1.  Log in to Vercel and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    - **Framework Preset**: Next.js (Default)
    - **Root Directory**: `./` (Default)
    - **Environment Variables**:
        - Add `ADMIN_PASSWORD` and set your desired password (e.g., `0901`).
4.  Click **"Deploy"**. Vercel will build and deploy your site.

## 4. Connect Custom Domain (Important for Workspace Users)
Since you use Google Workspace, you must be careful **NOT** to touch your MX records (which handle email). We will only modify records related to the website.

1.  Go to your Vercel Project Dashboard -> **Settings** -> **Domains**.
2.  Enter your custom domain (e.g., `example.com`) and click **Add**.
3.  Vercel will provide DNS records to add. Usually, it's one of two methods:

    ### Option A: Recommended (A Record)
    If you are using the root domain (`example.com`):
    - Go to your Domain Registrar's DNS Settings.
    - Create an **A Record**:
        - **Host/Name**: `@` (or blank)
        - **Value**: `76.76.21.21` (Vercel's IP)
    - Create a **CNAME Record** for `www`:
        - **Host/Name**: `www`
        - **Value**: `cname.vercel-dns.com`

    ### Option B: Nameservers (NOT Recommended for Workspace)
    - **Do NOT** change your Nameservers to Vercel if you want to keep your current email setup easily. Changing Nameservers moves all DNS management to Vercel, which requires re-configuring MX records manually. **Stick to Option A (A/CNAME records).**

## 5. Verification
- Wait for DNS propagation (can take minutes to hours).
- Visit your domain.
- Verify SSL (HTTPS) is active (Vercel handles this automatically)..
