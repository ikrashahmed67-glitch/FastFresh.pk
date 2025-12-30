import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { getCurrentUser } from "@/lib/auth"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-fastfresh.vercel.app"),
  title: {
    default: "FastFresh - Fresh & Clean Groceries Delivered in Multan | Free Delivery Above Rs. 2000",
    template: "%s | FastFresh Multan",
  },
  description:
    "FastFresh delivers fresh vegetables, fruits, dairy, meat & groceries to your doorstep in Multan. We provide you with all the fresh and clean equipment. Free delivery on orders above Rs. 2000. Order online now!",
  keywords: [
    "grocery delivery Multan",
    "fresh groceries Multan",
    "online grocery shopping Multan",
    "vegetables delivery Multan",
    "fruits delivery Multan",
    "dairy products Multan",
    "meat delivery Multan",
    "FastFresh",
    "fresh and clean equipment",
    "free delivery Multan",
    "same day delivery groceries",
    "Multan online store",
    "grocery store Multan",
    "sabzi delivery Multan",
    "atta delivery Multan",
    "rice delivery Multan",
    "cooking oil Multan",
    "household items Multan",
  ],
  authors: [{ name: "FastFresh", url: "https://v0-fastfresh.vercel.app" }],
  creator: "FastFresh",
  publisher: "FastFresh",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://v0-fastfresh.vercel.app",
    siteName: "FastFresh - Fresh Groceries Multan",
    title: "FastFresh - Fresh & Clean Groceries Delivered in Multan",
    description:
      "We provide you with all the fresh and clean equipment. Quality vegetables, fruits, dairy, meat delivered fast. Free delivery on orders above Rs. 2000!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastFresh - Fresh Groceries Delivery in Multan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FastFresh - Fresh & Clean Groceries Delivered in Multan",
    description:
      "We provide you with all the fresh and clean equipment. Quality groceries delivered fast in Multan. Free delivery above Rs. 2000!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://v0-fastfresh.vercel.app",
  },
  category: "E-commerce",
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
}

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://v0-fastfresh.vercel.app/#organization",
        name: "FastFresh",
        url: "https://v0-fastfresh.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://v0-fastfresh.vercel.app/logo.png",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-300-7902508",
          contactType: "customer service",
          email: "ikrashahmed67@gmail.com",
          areaServed: "Multan",
          availableLanguage: ["English", "Urdu"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Multan",
          addressCountry: "PK",
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://v0-fastfresh.vercel.app/#website",
        url: "https://v0-fastfresh.vercel.app",
        name: "FastFresh - Fresh Groceries Multan",
        description: "We provide you with all the fresh and clean equipment",
        publisher: {
          "@id": "https://v0-fastfresh.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://v0-fastfresh.vercel.app/shop?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://v0-fastfresh.vercel.app/#localbusiness",
        name: "FastFresh Grocery Delivery",
        image: "https://v0-fastfresh.vercel.app/og-image.jpg",
        telephone: "+92-300-7902508",
        email: "ikrashahmed67@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Multan",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "30.1575",
          longitude: "71.5249",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "22:00",
        },
        priceRange: "$$",
        servesCuisine: "Groceries",
        areaServed: {
          "@type": "City",
          name: "Multan",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://v0-fastfresh.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://v0-fastfresh.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://v0-fastfresh.vercel.app/shop",
          },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <head>
        <JsonLd />
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Multan" />
        <meta name="geo.position" content="30.1575;71.5249" />
        <meta name="ICBM" content="30.1575, 71.5249" />
        <link rel="canonical" href="https://v0-fastfresh.vercel.app" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider initialUser={user}>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
