import * as React from 'react';
import Document, {  Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

export default class _Document extends Document {
  static getInitialProps = createGetInitialProps();
  
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
