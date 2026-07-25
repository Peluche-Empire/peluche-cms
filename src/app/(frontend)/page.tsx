import React from 'react'

import './styles.css'

// Deliberately free of any Payload import or `headers()` call. Touching either would opt
// this route into dynamic rendering, which meant booting the whole Payload config and a
// round trip to D1 in Singapore just to render a splash screen.
export const dynamic = 'force-static'

export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1>Peluche Empire</h1>
        <p className="tagline">Content Management System</p>
        <div className="links">
          {/*
            eslint-disable-next-line @next/next/no-html-link-for-pages --
            The admin panel is a separate app shell with its own bundle. A plain <a> gives it
            a clean full page load; <Link> would only add prefetching of a route that boots
            Payload and hits D1.
          */}
          <a className="admin" href="/admin" rel="noopener noreferrer">
            Go to admin panel
          </a>
        </div>
      </div>
    </div>
  )
}
