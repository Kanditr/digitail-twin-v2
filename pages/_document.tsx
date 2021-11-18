import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          {/* mount our modal portal */}
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
