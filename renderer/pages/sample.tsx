import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout'

const SamplePage = () => {
    // const [stars, setStars] = React.useState(0);
    // const url = "http://localhost:8000/"
    // React.useEffect(() => {
    //     console.log('Fetch data start')
    //     fetch(url)
    //         .then((r) => r.json())
    //         .then((j) => setStars(j.stargazers_count))
    //         .then(() => console.log('Fetch data end'));
    // }, []);

    return (
        <Layout title="Sample | Next.js + TypeScript + Electron Example">
            <h1>Sample</h1>
            <p>This is the Sample page</p>
            {/* <div>{stars}</div> */}
            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    )
}

export default SamplePage
