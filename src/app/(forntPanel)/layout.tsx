import StairAnimataionLoader from '@/components/custom-ui/animation/page-stairs';
import { Fragment } from 'react';
// import AppFooter from '@/components/custom-ui/app-footer';

export default function PageScreenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      {children}
      <StairAnimataionLoader />
      {/* <AppFooter /> */}
    </Fragment>
  );
}
