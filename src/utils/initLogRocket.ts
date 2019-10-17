import LogRocket from 'logrocket';

export const initLogRocket = async () => {
  LogRocket.init(process.env.LOGROCKET_APP_ID || '');

  try {
    const geoResponse = await fetch('https://json.geoiplookup.io/');
    const data = await geoResponse.json();

    LogRocket.identify(data.ip === process.env.MY_IP_ADDRESS ? 'Me' : data.ip, {
      name: data.ip,
      email: data.city,
    });
  } catch (error) {
    LogRocket.captureException(error);
  }
};
