import "./globals.css";

export const metadata = {
  title: "Attendance Management for Universities",
  description:
    "Presently helps lecturers run attendance in seconds and gives institutions a clear, reliable record of engagement — from session QR check-in to organized reporting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
