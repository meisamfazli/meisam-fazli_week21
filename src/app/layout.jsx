import '../styles/global.css'

export const metadata = {
  title: 'Warehouse Admin Panel',
  description: 'Warehouse Admin Panel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}