import { getSettingsApi } from 'api/settings';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import whatsapp from 'images/WhatsApp.svg.png';

function Chatbot(): JSX.Element | null {
  const location = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getSettings = async (): Promise<void> => {
      try {
        const settings = await getSettingsApi();
        if (settings) {
          setUrl(settings.url);
        }
      } catch (error) {
        //
      }
    };

    getSettings();
  }, []);

  const noChat = <></>;

  return (
    <>
      {location.pathname === '/new-shipping/unitary' ||
      location.pathname === '/new-shipping/multi' ||
      location.pathname === '/new-shipping/massive' ||
      location.pathname === '/price-quote' ? (
        noChat
      ) : (
        <div className={styles.container}>
          <a href={url} target='_blank' rel='noreferrer'>
            <img src={whatsapp} alt='whatsapp' />
          </a>
        </div>
      )}
    </>
  );
}

export default Chatbot;
