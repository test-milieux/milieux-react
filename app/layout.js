export const metadata = {
  title: 'Milieux | 2019-20 Interactive Annual Report',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const CSS = '/_annual-reports/2019/assets/css/'

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href={`${CSS}tachyons.min.css`} />
        <link rel="stylesheet" href={`${CSS}micromodal.css`} />
        <link rel="stylesheet" href={`${CSS}highlights.css`} />
        <link rel="stylesheet" href={`${CSS}nav.css`} />
        <link rel="stylesheet" href={`${CSS}style.css`} />
      </head>
      <body className="ano-regular bg-brown-gray">{children}</body>
    </html>
  )
}