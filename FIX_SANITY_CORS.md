# Fix Sanity CMS CORS Error on Netlify

## 🔴 Problem
You're getting a CORS error: `Access to XMLHttpRequest... has been blocked by CORS policy`

This happens because Sanity CMS doesn't allow requests from your Netlify domain by default.

## ✅ Solution

### Step 1: Add CORS Origins in Sanity (REQUIRED)

1. **Go to Sanity Manage:** https://www.sanity.io/manage

2. **Select your project:** `uitscivill`
   - Project ID: `f5ktsz1i`

3. **Navigate to:** Settings → API → CORS Origins

4. **Click "Add CORS origin"** and add these URLs:

   **Production:**
   ```
   https://aciuits.netlify.app
   ```
   - ✅ Check "Allow credentials"

   **Development (optional but recommended):**
   ```
   http://localhost:5173
   ```
   - ✅ Check "Allow credentials"

   ```
   http://localhost:4173
   ```
   - ✅ Check "Allow credentials"

5. **Click "Save"** for each origin

### Step 2: Set Netlify Environment Variables (RECOMMENDED)

1. **Go to Netlify Dashboard:** https://app.netlify.com

2. **Select your site:** `aciuits`

3. **Navigate to:** Site settings → Environment variables

4. **Add these variables:**

   | Variable Name | Value |
   |--------------|-------|
   | `VITE_SANITY_PROJECT_ID` | `f5ktsz1i` |
   | `VITE_SANITY_DATASET` | `production` |

5. **Click "Save"**

6. **Redeploy your site** (Netlify will auto-rebuild)

### Step 3: Verify the Fix

After adding CORS origins and redeploying:

1. Visit: https://aciuits.netlify.app/uitsCIVIL/events
2. Check browser console (F12)
3. No CORS errors should appear
4. Events should load from Sanity

## 🔍 How to Check if CORS is Set Up

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to Settings → API → CORS Origins
4. You should see `https://aciuits.netlify.app` listed

## 📝 What I Changed

Updated `src/config/sanity.js`:
- Changed default project ID from `"your-project-id"` to `"f5ktsz1i"`
- This ensures Sanity client uses correct project ID even if env vars aren't set

## ⚠️ Important Notes

1. **CORS must be added in Sanity dashboard** - This is the main fix!
2. Environment variables are optional but recommended for security
3. After adding CORS, changes take effect immediately (no rebuild needed)
4. If using a custom domain, add that to CORS origins too

## 🧪 Testing

After fixing CORS, test these pages:
- ✅ `/uitsCIVIL/events` - Should show events from Sanity
- ✅ `/uitsCIVIL/panel` - Should show panel members
- ✅ `/uitsCIVIL/achievements` - Should show achievements
- ✅ `/uitsCIVIL/articles` - Should show articles
- ✅ `/uitsCIVIL/gallery` - Should show media gallery

## 🚨 Still Not Working?

If CORS error persists after adding origins:

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R)
2. **Wait 5 minutes** for Sanity CDN to update
3. **Check Sanity status:** https://status.sanity.io
4. **Verify project ID** matches in both places:
   - Sanity dashboard
   - Your code (`f5ktsz1i`)

## 📞 Quick Fix Checklist

- [ ] Add `https://aciuits.netlify.app` to Sanity CORS origins
- [ ] Check "Allow credentials" for the origin
- [ ] Click Save in Sanity dashboard
- [ ] Wait 2-3 minutes for changes to propagate
- [ ] Hard refresh your Netlify site (Ctrl+Shift+R)
- [ ] Check browser console for errors

---

**Main Action Required:** Go to Sanity dashboard and add CORS origin now! 👆

**Direct Link:** https://www.sanity.io/manage/personal/project/f5ktsz1i/api
