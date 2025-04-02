# Changelog

All notable changes to the Train Booking System - Bulk Upload project will be documented in this file.

## [0.13.4] - 2025-03-21

### Fixed
- Critical: Fixed timezone issue where train departure and arrival times were displayed in user's local timezone instead of Riyadh timezone (UTC+3)
- Ensured consistent time display across all users regardless of their location

## [0.15.0] - 2025-03-20

### Fixed
- Resolved read-only filesystem error in production environment (Vercel)
- Improved file upload handling by processing files in memory instead of writing to disk
- Enhanced FTP upload reliability with proper stream handling
- Fixed buffer upload compatibility issues with basic-ftp library

### Changed
- Optimized file upload process to be more memory efficient
- Improved error handling for FTP connection issues
- Enhanced logging for better debugging in production

## [0.14.0] - 2025-03-19

### Added
- New Changelog page with interactive version history
- Color-coded sections for different types of changes (Added, Changed, Fixed, Improved)
- Scrollable changelog content with improved readability
- Changelog link in the sidebar navigation for easy access

### Changed
- Reorganized navigation items for better accessibility
- Enhanced visual hierarchy in the changelog display
- Improved mobile responsiveness of the changelog page

### Fixed
- Added proper scrolling behavior for long changelog content
- Ensured consistent styling across all changelog sections
- Fixed apostrophe escaping in changelog content

## [0.13.0] - 2025-03-18

### Added
- New bulk CSV upload feature with FTP server integration
- Dedicated upload page with file selection and validation
- Real-time feedback during upload process with toast notifications
- Secure file transfer to configured FTP server
- File type validation to ensure only CSV files are processed
- Unique filename generation to prevent file collisions on the server
- Error handling with user-friendly error messages

### Changed
- Updated navigation sidebar to include new Bulk Upload option
- Added Bulk Upload card to dashboard for quick access
- Enhanced Quick Actions section with Upload CSV File button
- Improved overall application navigation structure

### Fixed
- Proper error handling for FTP connection failures
- Added type safety throughout the upload process
- Ensured consistent UI feedback during the entire upload workflow

## [0.12.0] - 2025-03-17

### Added
- Fully responsive mobile design with hamburger menu and slide-out navigation
- Sticky footer that's always visible on mobile devices
- Mobile-optimized card layouts with appropriate spacing
- Conditional rendering for business class seats based on availability

### Changed
- Redesigned dashboard layout for better mobile compatibility
- Improved form layout for better touch interaction on small screens
- Enhanced train card UI to stack vertically on mobile devices
- Adjusted spacing and typography for better mobile readability

### Fixed
- Fixed footer visibility issues on mobile devices
- Corrected conditional rendering in train cards
- Improved dark mode support for various UI elements
- Enhanced skeleton loaders for better mobile appearance
- Optimized layout to prevent overflow issues on small screens

## [0.11.0] - 2025-03-16

### Added
- Enhanced train card display with improved visual design
- Redesigned seat availability display with colored indicators
- Added skeleton loading states that match the card design
- Implemented loading placeholders during data fetching

### Changed
- Improved train search results layout with 60-40 split design
- Enhanced visual hierarchy for time and station information
- Updated the seat availability section with better organization
- Optimized the UI for better readability and user experience

### Improved
- Better visual separation between train information and seat availability
- Enhanced typography with improved font sizes and weights
- Added subtle animations and hover effects for interactive elements
- Improved dark mode compatibility throughout the application

## [0.10.0] - 2024-09-22

### Added
- New dashboard layout with left sidebar navigation
- Company logo integrated in the sidebar header
- Created dedicated pages for different functionality sections
- Implemented a version indicator that displays in the bottom right corner
- Added placeholder pages for Templates, Bookings, and Settings
- Responsive card-based dashboard UI for quick access to key features

### Changed
- Moved train search functionality to a dedicated "/search" page
- Improved overall navigation structure with intuitive sidebar
- Enhanced user experience with consistent layout across all pages
- Restructured the application to follow a modular dashboard approach

## [0.1.0] - 2025-03-10

### Added
- Initial release of the Train Booking System
- Train search functionality with station selection
- Date picker for departure date selection
- Passenger count selection
- Real-time train availability search
- Results display with pricing information
- Integration with external train booking API
- Responsive UI design with Shadcn UI components
- Toast notifications for user feedback

### Fixed
- API timeout issues on Vercel deployment
- Extended serverless function timeout to 60 seconds
- Improved error handling for API requests
- Better JSON parsing error handling
- User-friendly error messages with toast notifications

### Changed
- Optimized API request handling
- Improved UI/UX for form submission
- Enhanced error state management

## [0.9.0] - 2025-03-02

### Added
- Authentication system integration
- API routes for train search and route information
- Basic UI components and layout
- Form validation

### Changed
- Updated project structure for better organization
- Improved API response handling

## [0.8.0] - 2025-02-25

### Added
- Project initialization with Next.js
- Setup of TypeScript configuration
- Integration of Tailwind CSS
- Basic project structure 