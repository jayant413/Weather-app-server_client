
import Head from 'next/head'
import Main from '../Components/Main'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Weatherly</title>
        <meta name="description" content="A weather app " />
        <link rel="icon" href="src/weather.png" />
      </Head>
      <div className="flex">
        <Main />

      </div>
    </div>
  )
}
