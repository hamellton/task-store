import { Html, Head, Main, NextScript } from 'next/document';
import { InitializeColorMode } from 'reflexjs';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <InitializeColorMode />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
