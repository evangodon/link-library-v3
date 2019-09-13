import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const materialSheets = new ServerStyleSheets();

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {materialSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }
}

export default MyDocument;
