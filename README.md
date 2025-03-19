# Train Booking System - Bulk Upload

A modern web application for searching and booking train tickets with support for bulk uploads. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚆 Features

- **Train Search**: Search for available trains between stations with specific dates
- **Real-time Availability**: Check real-time train availability with detailed pricing
- **User-friendly Interface**: Modern, responsive UI with intuitive controls
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **API Integration**: Seamless integration with external train booking APIs

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **API Communication**: Fetch API, Axios
- **Form Handling**: React Hook Form
- **Notifications**: Sonner Toast
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bulk-upload
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   BASE_URL=<your-api-base-url>
   API_KEY=<your-api-key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📋 Usage

1. **Search for Trains**:
   - Select departure and arrival stations
   - Choose departure date
   - Specify number of passengers
   - Click "Search" to find available trains

2. **View Results**:
   - Browse through available trains
   - View pricing and schedule details
   - Select preferred train for booking

## ⚠️ Known Issues

- The API request to `/api/trains` may time out on Vercel's serverless environment for complex searches
- Solution implemented: Extended timeout settings and improved error handling

## 🔧 Troubleshooting

If you encounter a timeout error when searching for trains:
- Try simplifying your search criteria
- Reduce the number of passengers
- Try again during off-peak hours

## 📝 Environment Variables

The following environment variables are required:

- `BASE_URL`: The base URL for the train booking API
- `API_KEY`: API key for authentication with the train booking service

## 📦 Project Structure

```
bulk-upload/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── trains/       # Train search API
│   │   ├── routes/       # Available routes API
│   │   └── auth/         # Authentication API
│   ├── page.tsx          # Main application page
│   └── layout.tsx        # Root layout
├── shared/               # Shared components and utilities
│   ├── components/       # Reusable UI components
│   └── lib/              # Utility functions
├── public/               # Static assets
└── ...                   # Configuration files
```

## 🌐 Deployment

The application is deployed on Vercel. For deployment:

1. Push your changes to the connected repository
2. Vercel will automatically build and deploy the application
3. Ensure environment variables are properly set in the Vercel dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Bulk Upload Feature

The bulk upload feature allows administrators to upload CSV files containing train data directly to an FTP server. This feature streamlines the process of updating train information in bulk.

### How to Use Bulk Upload

1. Navigate to the Bulk Upload page from the dashboard or sidebar
2. Select a CSV file using the file input (only CSV files are accepted)
3. Click "Upload to FTP" to transfer the file to the configured FTP server
4. You'll receive real-time feedback on the upload process via toast notifications

### CSV File Format

Your CSV file should follow this format:

```
train_id,train_name,departure_station,arrival_station,departure_time,arrival_time,capacity,price
T001,Express A,Riyadh,Dammam,08:00,10:30,120,150
T002,Express B,Jeddah,Makkah,09:15,10:45,100,75
```

## Configuration

To configure the FTP server settings, create a `.env` file based on the provided `.env.example`:

```
FTP_HOST=your-ftp-server.com
FTP_PORT=21
FTP_USER=your-username
FTP_PASSWORD=your-password
FTP_REMOTE_DIR=/your-upload-directory
```
