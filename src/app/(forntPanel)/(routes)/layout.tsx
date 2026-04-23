import StairAnimataionLoader from '@/components/custom-ui/animation/page-stairs';
import AppPageWrapper from '@/components/custom-ui/animation/page-wrapper';
import { Fragment } from 'react';
export default function ClientInnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <AppPageWrapper>
        {children}
      </AppPageWrapper>
      <StairAnimataionLoader />
    </Fragment>
  );
}
