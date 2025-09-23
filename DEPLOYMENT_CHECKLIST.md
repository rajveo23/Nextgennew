# 📋 Deployment Checklist for NextGen Registry

## Before You Start
- [ ] Test website locally (`npm run dev`)
- [ ] Build website successfully (`npm run build`)
- [ ] Have Hostinger account ready
- [ ] Have GoDaddy login credentials
- [ ] Backup current website

## Phase 1: Hostinger Setup (Day 1)
- [ ] Purchase Hostinger hosting with Node.js support
- [ ] Access hPanel control panel
- [ ] Create Node.js application
- [ ] Upload all website files via File Manager
- [ ] Install dependencies (`npm install`)
- [ ] Configure startup file as `server.js`

## Phase 2: Domain Connection (Day 1-2)
- [ ] Get Hostinger nameservers from hPanel
- [ ] Login to GoDaddy account
- [ ] Change nameservers to Hostinger's
- [ ] Add domain in Hostinger hPanel
- [ ] Wait for DNS propagation (24-48 hours)

## Phase 3: Final Setup (Day 2-3)
- [ ] Enable SSL certificate in hPanel
- [ ] Test website functionality
- [ ] Set up redirects (www vs non-www)
- [ ] Update Google Search Console
- [ ] Monitor for 24 hours

## Emergency Contacts
- **Hostinger Support**: Live chat 24/7
- **GoDaddy Support**: Available on their website
- **Your Developer**: [Add contact info if needed]

## Important Notes
- DNS changes take 24-48 hours
- Some users may see old site during transition
- Keep this checklist handy during deployment

---
**Total Time**: 2-3 days for complete deployment
