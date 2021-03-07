import React, { useState, useCallback } from 'react';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {
  AppProvider,
  Page,
  Button,
  Popover,
  ActionList,
  Stack,
  Heading,
  DisplayText,
} from '@shopify/polaris';

function MyApp({ Component, pageProps }) {
  const [helpMenu, setHelpMenu] = useState(false);

  //This will toggle help menu
  const toggleHelpMenu = useCallback(
    () => setHelpMenu((active) => !active),
    []
  );
  const activator = (
    <Button onClick={toggleHelpMenu} disclosure>
      Help
    </Button>
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Page>
        <DisplayText size="large">Textfield for Product Page</DisplayText>
        <Stack distribution="fillEvenly">
          <Stack.Item>
            <Heading element="h2">
              The simple solution for adding a textfield to the product.
            </Heading>
          </Stack.Item>
          <Stack.Item>
            <div style={{ float: 'right' }}>
              <Popover
                active={helpMenu}
                activator={activator}
                onClose={toggleHelpMenu}
              >
                <ActionList
                  items={[
                    {
                      content: 'Import file',
                      onAction: () => console.log('Imported action'),
                    },
                    {
                      content: 'Export file',
                      onAction: () => console.log('Exported action'),
                    },
                  ]}
                />
              </Popover>
            </div>
          </Stack.Item>
        </Stack>
        <div
          style={{
            borderBottom: '0.3px solid grey',
            opacity: 0.3,
            width: '100%',
            padding: 0,
            marginBottom: '2em',
          }}
        />
        <Component {...pageProps} />
      </Page>
    </AppProvider>
  );
}

export default MyApp;
