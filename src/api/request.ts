import fetch, { RequestInit } from 'node-fetch';

export const request = async (url: string, config: RequestInit) => {
  let res = null;
  let error = null;

  try {
    const response = await fetch(url, config);
    const json = await response.json();

    res = json;
  } catch (e) {
    error = e.message;
  } finally {
    return { res, error };
  }
};
