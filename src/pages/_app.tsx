/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import "../../styles/globals.css"
import type { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
if (process.env.NODE_ENV === "production") {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
