import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import ReduxProvider from '@/components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pizza Restaurant in Newyork',
  description: 'Best pizza shop in town',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
