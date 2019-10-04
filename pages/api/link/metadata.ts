import { NextApiRequest, NextApiResponse } from 'next';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDesc from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import fetch from 'node-fetch';
import { isValidURL } from 'utils/isValidUrl';

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
    if (!isValidURL(url)) {
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
