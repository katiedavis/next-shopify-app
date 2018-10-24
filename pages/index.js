import Link from 'next/link';
import { Page, Button } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';

export default () => {
  return (
    <Page>
      <Link href="/about">
        <Button>Go to About Page</Button>
      </Link>
      <CreateProduct />
    </Page>
  );
};
