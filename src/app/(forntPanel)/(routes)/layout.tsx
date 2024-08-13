import StairAnimataionLoader from '@/components/custom-ui/animation/page-stairs';
import AppFooter from '@/components/custom-ui/app-footer';
import { Fragment } from 'react';
export default function ClientInnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      {children}
      <StairAnimataionLoader />
      <AppFooter />
    </Fragment>
  );
}
