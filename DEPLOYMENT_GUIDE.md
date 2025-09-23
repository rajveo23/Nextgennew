# 🚀 Complete Deployment Guide: New Website to Hostinger with GoDaddy Domain

## 📋 Overview
- **Current**: Old website on developer's computer with GoDaddy domain
- **Goal**: Deploy new NextGen website on Hostinger using same domain
- **Domain**: https://www.nextgenregistry.com/ (GoDaddy)
- **New Hosting**: Hostinger

---

## 🎯 Step-by-Step Deployment Process

### **PHASE 1: Prepare Your Website for Deployment**

#### Step 1: Build Your Next.js Website
```bash
# In your project folder (New Nextgen)
npm run build
```
This creates an optimized production version of your website.

#### Step 2: Test the Build Locally
```bash
npm start
```
Make sure everything works perfectly before deployment.

---

### **PHASE 2: Set Up Hostinger Hosting**

#### Step 3: Purchase Hostinger Hosting Plan
1. Go to [Hostinger.com](https://www.hostinger.com)
2. Choose a hosting plan:
   - **Recommended**: Premium Web Hosting or Business Web Hosting
   - **For Next.js**: You need Node.js support
3. Complete the purchase

#### Step 4: Access Hostinger Control Panel
1. Log into your Hostinger account
2. Go to "Hosting" section
3. Click "Manage" on your hosting plan
4. You'll see the hPanel (Hostinger Control Panel)

#### Step 5: Set Up Node.js Environment
1. In hPanel, find "Node.js" section
2. Click "Create Application"
3. Choose:
   - **Node.js Version**: Latest (18.x or higher)
   - **Application Mode**: Production
   - **Application Root**: `/public_html` (or create a folder)
   - **Application URL**: Your domain will be added later

---

### **PHASE 3: Upload Your Website**

#### Step 6: Upload Website Files
**Option A: Using File Manager (Easier for beginners)**
1. In hPanel, go to "File Manager"
2. Navigate to your application folder
3. Upload your entire project:
   - All files from `c:\Users\mlb\Desktop\New Nextgen\`
   - Make sure to upload: `package.json`, `next.config.js`, `src/` folder, etc.

**Option B: Using FTP (Alternative)**
1. Get FTP credentials from hPanel → "FTP Accounts"
2. Use FileZilla or similar FTP client
3. Upload all project files

#### Step 7: Install Dependencies
1. In hPanel, go to "Node.js" section
2. Click on your application
3. Open "Terminal" or use the built-in terminal
4. Run:
```bash
npm install
```

#### Step 8: Configure Application
1. In Node.js settings, set:
   - **Startup File**: `server.js` (you may need to create this)
   - **Application Mode**: Production
2. If needed, create `server.js`:
```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

---

### **PHASE 4: Connect Your GoDaddy Domain**

#### Step 9: Get Hostinger Nameservers
1. In hPanel, go to "Domains" section
2. Find your nameservers (usually):
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
   (These may be different - copy the exact ones shown)

#### Step 10: Update Domain DNS at GoDaddy
1. Log into your [GoDaddy account](https://www.godaddy.com)
2. Go to "My Products" → "Domains"
3. Find `nextgenregistry.com` and click "DNS"
4. Change Nameservers:
   - Click "Change Nameservers"
   - Select "Custom"
   - Enter Hostinger's nameservers
   - Save changes

**⚠️ Important**: DNS changes take 24-48 hours to propagate worldwide.

---

### **PHASE 5: Configure Domain in Hostinger**

#### Step 11: Add Domain to Hostinger
1. In hPanel, go to "Domains" section
2. Click "Add Domain"
3. Enter: `nextgenregistry.com`
4. Point it to your Node.js application folder

#### Step 12: Set Up SSL Certificate
1. In hPanel, go to "SSL/TLS"
2. Enable "Free SSL Certificate" for your domain
3. This ensures HTTPS (secure connection)

---

### **PHASE 6: Final Configuration & Testing**

#### Step 13: Update Application Settings
1. In Node.js section, update:
   - **Application URL**: `https://www.nextgenregistry.com`
   - **Environment**: Production
2. Restart the application

#### Step 14: Test Your Website
1. Wait for DNS propagation (up to 48 hours)
2. Visit `https://www.nextgenregistry.com`
3. Test all pages and functionality
4. Check mobile responsiveness

#### Step 15: Set Up Redirects (Optional but Recommended)
In hPanel → "Redirects", set up:
- `nextgenregistry.com` → `www.nextgenregistry.com`
- Any old URLs to new URLs if structure changed

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "Application Not Starting"
**Solution**:
1. Check Node.js version compatibility
2. Verify `package.json` and dependencies
3. Check application logs in hPanel

### Issue 2: "Domain Not Resolving"
**Solution**:
1. Wait longer (DNS can take 48 hours)
2. Clear browser cache
3. Check nameservers are correctly set

### Issue 3: "SSL Certificate Issues"
**Solution**:
1. Wait for domain to fully propagate first
2. Then enable SSL in hPanel
3. Force HTTPS redirects

---

## 📊 Timeline Expectations

| Phase | Time Required | What Happens |
|-------|---------------|--------------|
| Website Upload | 1-2 hours | Files uploaded, dependencies installed |
| DNS Propagation | 24-48 hours | Domain starts pointing to new server |
| SSL Setup | 1-2 hours | Secure HTTPS connection enabled |
| Full Deployment | 2-3 days total | Everything working perfectly |

---

## ✅ Pre-Deployment Checklist

Before starting, make sure you have:
- [ ] Hostinger hosting account with Node.js support
- [ ] GoDaddy account access
- [ ] Your website files ready (`New Nextgen` folder)
- [ ] All website functionality tested locally
- [ ] Backup of current website (just in case)

---

## 🚨 Important Notes

### **Backup First!**
Before making any changes:
1. Download current website files from developer's computer
2. Export any databases if applicable
3. Note current DNS settings

### **Minimize Downtime**
- DNS changes happen gradually
- Some users may see old site, others new site during transition
- This is normal and temporary

### **SEO Considerations**
- Keep same domain = Keep SEO value ✅
- Set up 301 redirects for any changed URLs
- Submit new sitemap to Google Search Console

---

## 📞 Support Resources

### Hostinger Support:
- Live Chat: Available 24/7
- Knowledge Base: help.hostinger.com
- Video Tutorials: YouTube "Hostinger Tutorials"

### GoDaddy Support:
- Phone: Available on their website
- Help Center: godaddy.com/help

### Next.js Deployment:
- Official Guide: nextjs.org/docs/deployment
- Hostinger Next.js Guide: Search "Hostinger Next.js deployment"

---

## 🎉 After Successful Deployment

Once everything is working:
1. **Update Google Search Console** with new hosting details
2. **Test all contact forms** and functionality
3. **Monitor website performance** for first few days
4. **Update any hardcoded URLs** in your code if needed
5. **Set up website monitoring** (UptimeRobot, etc.)

---

## 💡 Pro Tips

1. **Test on staging first**: Some hosting providers offer staging environments
2. **Keep local backup**: Always keep your local development environment
3. **Monitor after deployment**: Watch for any broken links or issues
4. **Update regularly**: Keep Next.js and dependencies updated

---

**🚀 You're ready to deploy! Follow these steps carefully, and your new website will be live on your existing domain within 2-3 days.**
