import { NextApiRequest, NextApiResponse } from 'next';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDesc from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import fetch from 'node-fetch';

const metascraperWithRules = metascraper([
  metascraperImage(),
  metascraperTitle(),
  metascraperDesc(),
]);

/**
 * @todo: Fix the error capturing
 * @todo: Scrape for favicon
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = JSON.parse(req.body);
  try {
    if (!validURL(url)) {
      throw new Error('Invalid URL');
    }

    const response = await fetch(url);
    const html = await response.text();

    const metadata = await metascraperWithRules({ html, url });

    res.status(200).json(metadata);
  } catch (error) {
    res.status(406).json({ error: error.message });
  }
};

function validURL(url: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  return !!pattern.test(url);
}
