import { Fragment } from 'react';
export default function ClientInnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
