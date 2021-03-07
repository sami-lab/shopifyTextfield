import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  Icon,
  Stack,
  Heading,
  DisplayText,
  Card,
  Layout,
  TextField,
  FormLayout,
} from '@shopify/polaris';

import { HomeMajor } from '@shopify/polaris-icons';

export default function Home() {
  const [fieldName, setFieldName] = useState('');
  const [fieldSize, setFieldSize] = useState('multiline');
  const [fieldLabel, setFieldLabel] = useState('Here you can write notes:');
  const [placeholder, setPlaceHolder] = useState('I am a sample text.');

  return (
    <div>
      <Head>
        <title>Create Textfield</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* Top Buttons */}
      <Stack distribution="fillEvenly">
        <Stack.Item>
          <Link href="#">
            <a
              style={{
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <span style={{ margin: 0 }}>
                {' '}
                <Icon source={HomeMajor} />
              </span>
              <Heading>
                <span
                  style={{
                    marginLeft: '0.3em',
                  }}
                >
                  Dashboard
                </span>
              </Heading>
            </a>
          </Link>
        </Stack.Item>
        <Stack.Item>
          <div style={{ float: 'right' }}>
            <Button size="slim" destructive>
              Delete
            </Button>
          </div>
        </Stack.Item>
      </Stack>

      {/* Follow Guide Card */}
      <div style={{ marginTop: '2em' }}>
        <Card title="Set up your text field" sectioned>
          <p style={{ color: 'gray' }}>
            Follow this guide and you will be up and running in no time
          </p>
        </Card>
      </div>

      {/* Input starts */}
      <div style={{ marginTop: '2em' }}>
        <Layout>
          <Layout.AnnotatedSection
            title="Field Name"
            description="Define a unique name."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Field name"
                  value={fieldName}
                  onChange={(newValue) => setFieldName(newValue)}
                />
                <p>
                  The name of this field will also be displayed in the shopping
                  cart, checkout and order listing.{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    To avoid overlaps, please name each upload field uniquely.
                  </span>
                </p>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
      <div style={{ marginTop: '2em' }}>
        <Layout>
          <Layout.AnnotatedSection
            title="Live preview"
            description="Here you can see how your text field will
            look like."
          >
            <Card sectioned>
              <FormLayout>
                {fieldSize === 'multiline' ? (
                  <TextField
                    label={fieldLabel}
                    multiline={4}
                    placeholder={placeholder}
                  />
                ) : (
                  <TextField label={fieldLabel} placeholder={placeholder} />
                )}
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
    </div>
  );
}
