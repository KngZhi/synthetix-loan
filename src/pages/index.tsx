import Head from 'next/head';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Synthetic Loans</title>
        <meta name="description" content="Borrow Synths using other assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <span>Test</span>
      </Layout>
    </div>
  );
}
