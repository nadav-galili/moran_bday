# Memory Lane Timeline App - Setup Guide

Welcome to your wife's 40th birthday Memory Lane Timeline App! 🎉💕

## What's Included

✅ **Beautiful Timeline Interface** - Scrollable decades view (1980s-2020s)
✅ **Multiple Memory Types**:
  - 🎯 Milestones (first date, wedding, births, achievements)
  - 📸 Photos
  - 🎥 Videos
  - 📝 Stories
  - 🎵 Audio recordings (birthday wishes, family memories)

✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
✅ **Interactive Features** - Click memories to view details, smooth scrolling navigation
✅ **Beautiful Styling** - Warm color scheme with animations and effects

## Quick Start

1. **Run the App**:
   ```bash
   bun run dev
   ```
   Then visit http://localhost:5174/ in your browser

2. **Add Your Content**:
   - Edit the `sampleMemories` array in `src/App.tsx`
   - Add your photos to `public/photos/`
   - Add your videos to `public/videos/`
   - Add voice recordings to `public/audio/`

## Customizing Your Memories

### Adding New Memories

Edit the `sampleMemories` array in `src/App.tsx`. Here's the structure:

```typescript
{
  id: 'unique-id',
  date: new Date('YYYY-MM-DD'),
  title: 'Memory Title',
  description: 'Detailed description of this special moment...',
  type: 'milestone' | 'photo' | 'video' | 'story' | 'audio',
  media: '/photos/your-photo.jpg', // For photos/videos
  audioPath: '/audio/your-audio.mp3', // For audio files
  category: 'Relationship' | 'Family' | 'Travel' | 'Achievement' | 'Life Event'
}
```

### Memory Types & Colors:
- 🟢 **Milestone** (green) - Major life events
- 🟡 **Photo** (yellow) - Photo memories
- 🟣 **Video** (purple) - Video memories
- 🩷 **Story** (pink) - Written memories
- 🟦 **Audio** (teal) - Voice recordings

### Example Memories to Replace:

Replace the sample data with real memories like:
- First date details and location
- Proposal story
- Wedding day moments
- Birth of children
- Favorite vacations
- Career achievements
- Funny family stories
- Special anniversaries

## Adding Media Files

### Photos (`public/photos/`)
- Supported: JPG, PNG, GIF, WebP
- Keep under 5MB each
- Use descriptive names: `wedding-day-2008.jpg`

### Videos (`public/videos/`)
- Supported: MP4, MOV, WebM
- Keep under 50MB each
- Use descriptive names: `first-dance-2008.mp4`

### Audio (`public/audio/`)
- Supported: MP3, WAV, OGG
- Keep under 10MB each
- Perfect for: birthday wishes, family stories, voice memos
- Use descriptive names: `mom-birthday-wishes-2024.mp3`

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Option 2: Netlify
1. Run `bun run build`
2. Upload `dist` folder to Netlify
3. Deploy

### Option 3: Local Network
Perfect for showing at home on a tablet or laptop

## Personal Touches to Add

1. **Update the title and subtitle** in the header
2. **Add more decades** if needed (just update the `decades` array)
3. **Include voice messages** from family members wishing her happy birthday
4. **Add recent photos** from the past year
5. **Include inside jokes** and personal references she'll love

## Development Commands

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
bun run lint     # Check code quality
```

## Tips for the Best Experience

- **Mobile-first**: The app looks great on phones and tablets
- **Interactive**: Encourage her to tap/click on memories to see details
- **Chronological**: Memories are automatically sorted by date within each decade
- **Responsive**: Works perfectly on any device

---

**Made with 💕 for an amazing 40th birthday celebration!**

This timeline app will let her scroll through decades of beautiful memories, relive special moments, and hear birthday wishes from loved ones. What a thoughtful and personal gift! 🎂✨