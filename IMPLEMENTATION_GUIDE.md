# Archon Website Implementation Guide

## Overview

This guide documents the current state of the Archon website project and the changes made to transition from a static homepage to a dynamic, multi-page CMS-driven platform.

## What Has Been Done

### 1. Sanity CMS Integration
- **Installed Dependencies**: `next-sanity`, `sanity`, `@sanity/image-url`, `@portabletext/react`
- **Created Configuration Files**:
  - `lib/sanity.client.ts` - Sanity client configuration
  - `lib/sanity.queries.ts` - GROQ queries for all content types
  - `lib/sanity.types.ts` - TypeScript type definitions
  - `.env.local` - Environment variables (Project ID: `kee145i5r98s3r1dbysd0m52`)

### 2. Multi-Page Architecture
Created new routes with dynamic content fetching:
- `/insights` - Insights listing page
- `/insights/[slug]` - Individual insight detail page
- `/products` - Products listing page
- `/products/[slug]` - Individual product detail page
- `/careers` - Careers listing page
- `/careers/[slug]` - Individual career detail page
- `/about` - About page with team, partners, and global presence

### 3. Updated Navigation
- **Navbar Component**: Updated to support both homepage section scrolling and multi-page routing
- **Dynamic Links**: Navigation intelligently handles both internal links and external routes

### 4. Content Collections Ready in Sanity

The following Sanity collections are ready to be populated:

| Collection | Purpose | Fields |
| :--- | :--- | :--- |
| **Insight** | Blog articles and thought leadership | title, slug, excerpt, body, category, author, publishedDate, featuredImage, seoTitle, seoDescription, tags |
| **Product** | Product showcase | name, slug, description, status, featuredImage, content, seoTitle, seoDescription |
| **Career** | Job postings | title, slug, description, department, location, employmentType, publishedDate, content |
| **Organisation** | Partners and ecosystem | name, relationshipType, industry, region, description, website, logo |
| **TeamMember** | Team profiles | name, role, bio, image, socialLinks |
| **Program** | Learning programs | title, slug, description, label, featuredImage, content |
| **SuccessStory** | Success stories | title, description, number, featuredImage, content |
| **FAQ** | Frequently asked questions | question, answer, category |
| **Testimonial** | User testimonials | name, role, company, quote, image, featured |
| **SiteSettings** | Global site configuration | companyName, tagline, contactEmail, contactPhone, socialLinks, statistics |

## Next Steps

### Phase 1: Populate Sanity CMS (Immediate)
1. **Go to your Sanity Studio**: https://www.sanity.io/@orwuvcKpD/studio/kee145i5r98s3r1dbysd0m52/default/structure/organisation
2. **Create the following collections** in Sanity:
   - Insight (for blog articles)
   - Product (for product pages)
   - Career (for job postings)
   - Program (for learning programs)
   - TeamMember (for team profiles)
   - SuccessStory (for success stories)
   - Testimonial (for testimonials)
   - FAQ (for FAQs)
   - SiteSettings (for global settings)

3. **Add sample content** to each collection to test the integration

### Phase 2: Connect Homepage to CMS (Next)
Currently, the homepage still uses static data from `Data/home.ts`. We need to:
1. Create a `Homepage` collection in Sanity
2. Update homepage sections to fetch from Sanity
3. Remove static data dependencies

### Phase 3: AI Assistant Integration
1. Set up the Universal Archon AI assistant
2. Integrate on the website (chat widget)
3. Connect to WhatsApp, Instagram, and other channels

### Phase 4: Advanced Features
1. Search functionality
2. Analytics integration
3. Email newsletter
4. Contact form backend
5. User authentication (if needed)

## Environment Variables

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=kee145i5r98s3r1dbysd0m52
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Optional** (for draft content and mutations):
```
SANITY_API_TOKEN=your_sanity_api_token_here
```

To get your Sanity API Token:
1. Go to your Sanity project settings
2. Navigate to **Settings > API settings > Tokens**
3. Create a new token with appropriate permissions
4. Add it to `.env.local`

## Running the Project Locally

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## File Structure

```
archon_project/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── insights/
│   │   ├── page.tsx             # Insights listing
│   │   └── [slug]/page.tsx      # Insight detail
│   ├── products/
│   │   ├── page.tsx             # Products listing
│   │   └── [slug]/page.tsx      # Product detail
│   ├── careers/
│   │   ├── page.tsx             # Careers listing
│   │   └── [slug]/page.tsx      # Career detail
│   └── about/
│       └── page.tsx             # About page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Updated with routing
│   │   ├── Footer.tsx
│   │   └── ScrollProgress.tsx
│   ├── scenes/                  # Homepage sections
│   ├── ui/                      # Reusable UI components
│   ├── effects/                 # Visual effects
│   └── animations/              # Animation utilities
├── lib/
│   ├── sanity.client.ts         # Sanity client config
│   ├── sanity.queries.ts        # GROQ queries
│   ├── sanity.types.ts          # TypeScript types
│   └── utils.ts                 # Utility functions
├── Data/
│   └── home.ts                  # Static data (to be migrated)
└── public/                      # Static assets
```

## Key Architectural Decisions

1. **Server Components**: All page components are Server Components for optimal performance and SEO
2. **Static Generation**: Pages use `generateStaticParams()` for static site generation
3. **Fallback Content**: All components gracefully handle missing CMS data
4. **Type Safety**: Full TypeScript support with Sanity types
5. **Image Optimization**: Using Sanity's image CDN for optimal delivery

## Important Notes

- **No API Token Required Yet**: The current setup uses public access. If you need to fetch draft content, you'll need to add a Sanity API Token.
- **Image URLs**: Images are served from Sanity's CDN using the project ID and dataset
- **Slug Stability**: Once published, article/product slugs should not change to preserve SEO
- **CMS-First Philosophy**: All dynamic content should be managed through Sanity, not hardcoded

## Troubleshooting

### Pages show "No content available"
- Check that you've created the corresponding Sanity collection
- Verify the collection has published documents
- Check the browser console for any fetch errors

### Images not loading
- Verify the Sanity project ID is correct
- Ensure images are uploaded to Sanity
- Check that the image reference format is correct

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Next Developer Handoff

When handing this project to another developer:
1. Share this guide
2. Provide Sanity project access
3. Provide `.env.local` file (or API token)
4. Run `npm install` and `npm run dev` to verify setup
5. Test a few pages to ensure CMS connection works

## Support & Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Portable Text**: https://www.sanity.io/docs/portable-text

---

**Last Updated**: January 2025
**Project**: Archon Website
**Status**: Phase 2 - Multi-page Architecture Complete, Awaiting CMS Population
