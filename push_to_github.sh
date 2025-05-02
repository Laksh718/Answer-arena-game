#!/bin/bash

# Remove any git lock files if they exist
rm -f .git/index.lock

# Add all changes
git add .

# Create a commit with a descriptive message
git commit -m "UI Enhancement: Improved quiz experience and result page

- Enhanced Result page with better visualization and design
- Optimized performance by removing complex animations
- Improved Question component with fluid transitions
- Streamlined Dashboard by removing duplicate buttons
- Added star rating and progress indicators
- Fixed quiz lag issues
- Improved overall UI/UX with better spacing and typography"

# Push to GitHub
git push origin main

echo "Code pushed to GitHub successfully!"
