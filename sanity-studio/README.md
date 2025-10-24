# Sanity Studio for UITS ACI Student Chapter

This is the content management interface for the UITS ACI Student Chapter website.

## Project Details
- **Project ID**: f5ktsz1i
- **Organization ID**: oeVzJczUI
- **Dataset**: production

## Quick Start

### First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Login to Sanity:**
   ```bash
   npx sanity login
   ```

3. **Start the studio:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit http://localhost:3333

### Daily Use

Just run:
```bash
npm run dev
```

## Available Commands

```bash
npm run dev      # Start development server (port 3333)
npm run build    # Build for production
npm run deploy   # Deploy studio online
```

## Content Types

### Panel Member
Individual members with their information:
- Name, Position, Department
- Email, Phone
- Profile Image
- Bio (optional)
- Display Order

### Panel Year
Groups members by academic year:
- Year (e.g., "2024-2025")
- Title
- List of members
- Active status

## How to Use

See the main project's documentation files:
- `../SANITY_QUICK_START.md` - Complete setup guide
- `../HOW_TO_CHANGE_CONTENT.md` - Step-by-step content management
- `../SANITY_SETUP.md` - Detailed technical documentation

## Deployment

Deploy the studio online so it's accessible from anywhere:

```bash
npm run deploy
```

Your team can then access it at:
`https://uits-aci-chapter.sanity.studio`

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Help](https://www.sanity.io/help)
- Project Dashboard: https://www.sanity.io/manage/project/f5ktsz1i
