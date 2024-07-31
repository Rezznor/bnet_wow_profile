import './globals.css'
import Script from 'next/script'
import Head from 'next/head'
import Header from './components/Header'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
    weight: ['400', '700'],
    subsets: ['latin'], 
})

export const metadata = {
  title: 'Hallowfall',
  description: 'Lookup your WoW characters!',
}

export default function RootLayout({ children }) {
    
    return (
        <html lang="en">
            
            <Script id="wowhead_tooltips">
                {'var whTooltips = {colorLinks: false, iconizeLinks: false, renameLinks: false, iconSize: "small"};'}
            </Script>
            <Script src="https://wow.zamimg.com/widgets/power.js" />
            
            <body className={`${poppins.className} bg-bg-blue text-white`}>
                <Header />
                <main className="container mx-auto">
                    {children}
                </main>
            </body>
        </html>
    )
}
