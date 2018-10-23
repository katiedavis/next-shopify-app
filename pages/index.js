import Link from 'next/link';
import '@shopify/polaris/styles.css';
import { Card, Page, Button } from '@shopify/polaris';
import withData from '../lib/apollo';
import CreateProduct from '../components/CreateProduct';

export default withData(props => (
  <Page>
    <Link href="/about">
      <Button>Go to About Page</Button>
    </Link>

    <CreateProduct />
  </Page>
));
