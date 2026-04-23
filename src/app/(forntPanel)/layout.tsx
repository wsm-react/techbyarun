import AppFooter from '@/components/custom-ui/app-footer';
import AppHeader from '@/components/custom-ui/app-header';
import { Fragment } from 'react';

export default function PageScreenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <AppHeader />
      {children}
      <AppFooter />
    </Fragment>
  );
}
