import Link from 'next/link';
import '@shopify/polaris/styles.css';
import { AppProvider, Card } from '@shopify/polaris';
import '../styles.css';

const Index = () => (
  <AppProvider>
    <Card>
      <Link href="/about">
        <button>Go to About Page</button>
      </Link>
      <p>Hello Next.js</p>
    </Card>
  </AppProvider>
);

export default Index;
