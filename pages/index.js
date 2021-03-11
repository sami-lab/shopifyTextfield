import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  Icon,
  Stack,
  Heading,
  Modal,
  Card,
  Layout,
  TextField,
  FormLayout,
  Select,
  RadioButton,
  ResourceItem,
  ResourceList,
  Avatar,
  TextStyle,
  Checkbox,
} from '@shopify/polaris';

import {
  HomeMajor,
  MobileCancelMajor,
  CancelSmallMinor,
  SearchMajor,
} from '@shopify/polaris-icons';

//handleAlertClose  //alert(renderAlert,message,backgroundColor)
const Alert = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.handleAlertClose();
    }, [3000]);
  }, [props.alert.renderAlert]);
  return (
    <>
      {props.alert.renderAlert && (
        <div
          style={{
            backgroundColor: props.alert.backgroundColor,
            padding: '1em',
            marginTop: '1em',
            borderRadius: 2,
          }}
        >
          <Stack alignment="center">
            <Stack.Item fill>
              <h1
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: '700',
                }}
              >
                {props.alert.message}
              </h1>
            </Stack.Item>
            <Stack.Item>
              <p
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontWeight: '700',
                  fontSize: '3rem',
                  cursor: 'pointer',
                }}
                onClick={props.handleAlertClose}
              >
                <Icon source={MobileCancelMajor} color="subdued" />
              </p>
            </Stack.Item>
          </Stack>
        </div>
      )}
    </>
  );
};

const testData = [
  {
    id: 1,
    imageUrl: 'https://www.logodesign.net/images/illustration-logo.png',
    title: 'illustration',
    uploadedBy: 'John erick',
  },
  {
    id: 2,
    imageUrl:
      'data:image/png;base64,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',
    title: 'Foodies',
    uploadedBy: 'Jack ma',
  },
];

//this requires data otherwise undefine error will appear
//showModal  //handleModalChange //handleSubmit //data //option //activator
function RenderModal(props) {
  //const activator = <Button onClick={props.handleModalChange}>Open</Button>;

  return (
    <Modal
      //activator={activator}

      open={props.showModal}
      onClose={props.handleModalChange}
      title={'Add ' + props.option + '(s)'}
      primaryAction={{
        content: 'Add',
        onAction: props.handleModalSubmit,
        disabled:
          !props.data.filter((item) => item.checkBoxSelected).length > 0,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: props.handleModalChange,
        },
      ]}
      footer={
        <p>
          {props.data.filter((it) => it.checkBoxSelected).length} {props.option}
          (s) selected
        </p>
      }
    >
      <Modal.Section>
        <TextField
          placeholder={'Search ' + props.option + 's'}
          value={props.search}
          onChange={(val) => props.setSearch(val)}
          prefix={<Icon source={SearchMajor} />}
        />
      </Modal.Section>
      <Modal.Section>
        {props.data.map((item, i) => {
          return (
            <Card.Section key={i} subdued>
              <Stack wrap={false} alignment="center">
                <Stack.Item>
                  <Checkbox
                    checked={item.checkBoxSelected}
                    onChange={() => props.handleSelectChange(i)}
                  />
                </Stack.Item>
                <Stack.Item>
                  <Avatar
                    source={item.imageUrl}
                    customer
                    size="medium"
                    name={item.title}
                  />
                </Stack.Item>
                <Stack.Item>
                  <h3>
                    <TextStyle variation="strong">{item.title}</TextStyle>
                  </h3>
                  <div>by {item.uploadedBy}</div>
                </Stack.Item>
              </Stack>
            </Card.Section>
          );
        })}
      </Modal.Section>
    </Modal>
  );
}

//fieldName //fieldSize //fieldLabel //placeholder //fontSize //fieldWidthOption
//maxFieldLengthOption //maxFieldLength
//showField //fieldVariant

// [productsCondition, equalityCondition,searchCondition,showProducts: true]
// [attribute,equalityCondition,searchCondition]

//some of the conditions are
//Condition
//{ label: 'Product is one of', value: 'productIsOneOf' },
//{ label: 'Product Title', value: 'productTitle' },
//{ label: 'Collection is one of', value: 'collectionIsOneOf' },
//{ label: 'Collection Title', value: 'collectionTitle' },
//Equality Condition
//{ label: 'Equals', value: 'equals' },
//{ label: 'Contain', value: 'contain' },

export default function Home() {
  const [livePreview, setLivePreview] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [fieldSize, setFieldSize] = useState('multiline');
  const fieldSizeOptions = [
    { label: 'Single-line', value: 'singleline' },
    { label: 'Multi-line', value: 'multiline' },
  ];
  const [fieldLabel, setFieldLabel] = useState('Here you can write notes:');
  const [placeholder, setPlaceHolder] = useState('I am a sample text.');
  const [fontSize, setFontSize] = useState('14');
  const [fieldWidthOption, setFieldWidthOption] = useState('Auto');
  const fieldWidthOptions = [
    { label: 'Auto', value: 'auto' },
    { label: 'Full', value: 'fill' },
  ];
  const [maxFieldLengthOption, setMaxFieldLengthOption] = useState('Yes');
  const maxFieldLengthOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const [maxFieldLength, setMaxFieldLength] = useState('50');

  const [textFieldRequiredOption, setTextFieldRequiredOption] = useState('No');
  const textFieldRequiredOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  //allProducts,anyProduct, allProduct
  const [showField, setShowField] = useState('allProducts');
  //allVarients,anyVarient, allVarient,noneVarient
  const [fieldVariant, setFieldVariant] = useState('allVarients');

  //This is to render alert
  const [showAlert, setShowAlert] = useState({
    renderAlert: false,
    message: '',
    backgroundColor: '',
  });
  //This is for error
  const [error, setError] = useState(false);

  //To Show model
  const [showModal, setShowModal] = useState(false);
  const [showModalFor, setShowModalFor] = useState('');

  //array

  const [productsdata, setProductsData] = useState(
    testData.map((obj) => {
      return {
        ...obj,
        selected: false, //this is selected products after add button click
        checkBoxSelected: false, //this is just for ui checkboxes
      };
    })
  );
  //must set it through initail response
  const [initialProductData, setInitialProductData] = useState(productsdata);

  const [searchProducts, setSearchProducts] = useState('');

  const [collectionData, setCollectionData] = useState(
    testData.map((obj) => {
      return {
        ...obj,
        selected: false, //this is selected products after add button click
        checkBoxSelected: false,
      };
    })
  );
  const [initialCollectionData, setInitialCollection] = useState(
    collectionData
  );
  const [searchCollections, setSearchCollection] = useState('');

  //this is for product conition
  const [conditions, setCondition] = useState([
    {
      productsCondition: 'productIsOneOf',
      equalityCondition: 'Equals',
      searchCondition: '', //input
      showProducts: true,
    },
  ]);

  const [variantConditions, setVariantCondition] = useState([
    {
      attribute: '', //input
      equalityCondition: 'Equals',
      searchCondition: '', //input
    },
  ]);
  //This store current condition index to check products already exist for that products
  const [conditionIndex, setConditionIndex] = useState('0');
  const productsConditions = [
    { label: 'Product is one of', value: 'productIsOneOf' },
    { label: 'Product Title', value: 'productTitle' },
    { label: 'Collection is one of', value: 'collectionIsOneOf' },
    { label: 'Collection Title', value: 'collectionTitle' },
  ];

  const equalityConditions = [
    { label: 'Equals', value: 'equals' },
    { label: 'Contain', value: 'contain' },
  ];

  useEffect(() => {
    setProductsData(
      initialProductData.filter((x) => x.title.includes(searchProducts))
    );
  }, [searchProducts]);

  useEffect(() => {
    setCollectionData(
      initialCollectionData.filter((x) => x.title.includes(searchCollections))
    );
  }, [searchCollections]);
  //This is for checkbox selection
  const handleSelectChange = (i) => {
    if (showModalFor === 'product') {
      let p = [...productsdata];
      let p1 = [...initialProductData];

      let productObj = { ...p[i] };
      let productObj1 = { ...p1[i] };
      productObj.checkBoxSelected = !productObj.checkBoxSelected;
      productObj1.checkBoxSelected = !productObj1.checkBoxSelected;
      p[i] = productObj;
      p1[i] = productObj1;

      setProductsData(p);
      setInitialProductData(p1);
    } else {
      let p = [...collectionData];
      let p1 = [...collectionData];

      let collectionObj = { ...p[i] };
      let collectionObj1 = { ...p1[i] };

      collectionObj.checkBoxSelected = !collectionObj.checkBoxSelected;
      collectionObj1.checkBoxSelected = !collectionObj1.checkBoxSelected;

      p[i] = collectionObj;
      p1[i] = collectionObj;

      setCollectionData(p);
      setInitialCollection(p1);
    }
  };

  const handleModalChange = useCallback(() => {
    if (showModalFor === 'product') {
      let p = [...productsdata];
      let p1 = [...initialProductData];
      const updatedData = p.map((item) => {
        if (item.selected) {
          item.checkBoxSelected = true;
        } else {
          item.checkBoxSelected = false;
        }
        return item;
      });
      setProductsData(updatedData);

      const updatedData1 = p1.map((item) => {
        if (item.selected) {
          item.checkBoxSelected = true;
        } else {
          item.checkBoxSelected = false;
        }
        return item;
      });
      setInitialProductData(updatedData1);
    } else {
      let p = [...collectionData];
      let p1 = [...collectionData];

      const updatedData = p.map((item) => {
        if (item.selected) {
          item.checkBoxSelected = true;
        } else {
          item.checkBoxSelected = false;
        }
        return item;
      });
      setCollectionData(updatedData);

      const updatedData1 = p1.map((item) => {
        if (item.selected) {
          item.checkBoxSelected = true;
        } else {
          item.checkBoxSelected = false;
        }
        return item;
      });
      setInitialCollection(updatedData1);
    }
    setShowModal(!showModal);
  }, [showModal]);

  //this is to remove product or collection through chip cancel button
  const handleChipCancelButton = (index, element) => {
    if (element === 'product') {
      let p = [...productsdata];
      const updatedData = p.map((item, ind) => {
        if (ind == index) {
          item.selected = false;
          item.checkBoxSelected = false;
        }

        return item;
      });
      setProductsData(updatedData);

      let p1 = [...initialProductData];
      const updatedData1 = p1.map((item, ind) => {
        if (ind == index) {
          item.selected = false;
          item.checkBoxSelected = false;
        }

        return item;
      });
      setInitialProductData(updatedData1);
    } else {
      let p = [...collectionData];
      const updatedData = p.map((item, ind) => {
        if (ind == index) {
          item.selected = false;
          item.checkBoxSelected = false;
        }

        return item;
      });
      setCollectionData(updatedData);

      let p1 = [...initialCollectionData];
      const updatedData1 = p1.map((item, ind) => {
        if (ind == index) {
          item.selected = false;
          item.checkBoxSelected = false;
        }

        return item;
      });
      setCollectionData(updatedData1);
    }
  };

  const handleModalSubmit = () => {
    if (conditionIndex >= 0) {
      const conditionsCopy = [...conditions];
      const condition = { ...conditionsCopy[conditionIndex] };
      //if condition property already exist them remove that condition index
      //remove one which showProduct is false
      const itemExist = conditionsCopy.filter(
        (x) => x.productsCondition == condition.productsCondition
      );
      if (itemExist.length > 1) {
        //mean exist more than 1time
        //removing that index which exist more than one with showProduct ==false
        setCondition(conditionsCopy.filter((ele) => ele.showProducts));
      } else {
        condition.showProducts = true;
        conditionsCopy[conditionIndex] = condition;
        setCondition(conditionsCopy);
      }
    }
    //Check which checkbox is selected to save them
    if (showModalFor === 'product') {
      let p = [...productsdata];
      const updatedData = p.map((item) => {
        if (item.checkBoxSelected) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      setProductsData(updatedData);

      let p1 = [...initialProductData];
      const updatedData1 = p1.map((item) => {
        if (item.checkBoxSelected) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      setInitialProductData(updatedData1);
    } else {
      let p = [...collectionData];
      const updatedData = p.map((item) => {
        if (item.checkBoxSelected) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      setCollectionData(updatedData);

      let p1 = [...initialCollectionData];
      const updatedData1 = p1.map((item) => {
        if (item.checkBoxSelected) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      setInitialCollection(updatedData1);
    }

    setShowModal(!showModal);
  };

  //this is for adding condition in product
  const handleAddCondition = () => {
    let c = [...conditions];
    const newObj = {
      productsCondition: 'productIsOneOf',
      equalityCondition: 'Equals',
      searchCondition: '',
      showProducts: false,
    };
    c.push(newObj);
    setCondition(c);
  };

  //this is for remove condition in product
  const handleRemoveCondition = (ind) => {
    setCondition(conditions.filter((c, i) => i !== ind));
  };

  //this is for adding condition in variant
  const handleAddVariantCondition = () => {
    let c = [...variantConditions];
    const newObj = {
      attribute: '', //input
      equalityCondition: 'Equals',
      searchCondition: '', //input
    };
    c.push(newObj);
    setVariantCondition(c);
  };

  //this is for remove condition in product
  const handleRemoveVariantCondition = (ind) => {
    setVariantCondition(variantConditions.filter((c, i) => i !== ind));
  };

  const handleAlertClose = () => {
    setShowAlert({
      renderAlert: false,
      message: '',
      backgroundColor: '',
    });
  };

  //Send data to backend
  const saveClickHandler = () => {
    if (fieldName && fieldName !== '') {
      setShowAlert({
        renderAlert: true,
        message: 'Submitted Successfully',
        backgroundColor: 'green',
      });
      setError(false);
    } else {
      setError(true);
      setShowAlert({
        renderAlert: true,
        message: 'Text field name cannot be empty',
        backgroundColor: 'red',
      });
    }
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Head>
        <title>Create Textfield</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* Top Buttons */}
      <Stack distribution="fillEvenly">
        <Stack.Item>
          <Link href="/dashboard">
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

      <RenderModal
        showModal={showModal}
        handleModalChange={handleModalChange}
        handleModalSubmit={
          showModalFor === 'product' ? handleModalSubmit : handleModalSubmit
        }
        option={showModalFor}
        data={showModalFor === 'product' ? productsdata : collectionData}
        search={showModalFor === 'product' ? searchProducts : searchCollections}
        setSearch={
          showModalFor === 'product' ? setSearchProducts : setSearchCollection
        }
        handleSelectChange={handleSelectChange}
      />
      {/* Showing Error or Success Alert */}
      <Alert alert={showAlert} handleAlertClose={handleAlertClose} />
      {/* Follow Guide Card */}
      <div style={{ marginTop: '2em' }}>
        <Card title="Set up your text field" sectioned>
          <p style={{ color: 'gray' }}>
            Follow this guide and you will be up and running in no time
          </p>
        </Card>
      </div>

      {/* Input starts */}
      {/* field name */}
      <div style={{ marginTop: '2em' }}>
        <Layout>
          <Layout.AnnotatedSection
            title="Field Name"
            description="Define a unique name."
          >
            <Card sectioned>
              <FormLayout>
                <div style={{ color: error ? 'red' : undefined }}>
                  <TextField
                    label="Field name"
                    value={fieldName}
                    onChange={(newValue) => setFieldName(newValue)}
                    error={error}
                  />
                  <p>
                    The name of this field will also be displayed in the
                    shopping cart, checkout and order listing.{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      To avoid overlaps, please name each upload field uniquely.
                    </span>
                  </p>
                </div>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
      {/* Live preview */}
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
                    label={
                      <p style={{ fontSize: `${fontSize}px` }}>{fieldLabel}</p>
                    }
                    value={livePreview}
                    onChange={(newVal) => setLivePreview(newVal)}
                    multiline={4}
                    placeholder={placeholder}
                    maxLength={
                      maxFieldLengthOption === 'Yes' ? maxFieldLength : 'auto'
                    }
                    showCharacterCount={
                      maxFieldLengthOption === 'Yes' ? true : false
                    }
                  />
                ) : (
                  <TextField
                    label={
                      <p style={{ fontSize: `${fontSize}px` }}>{fieldLabel}</p>
                    }
                    value={livePreview}
                    onChange={(newVal) => setLivePreview(newVal)}
                    placeholder={placeholder}
                    maxLength={
                      maxFieldLengthOption === 'Yes' ? maxFieldLength : 'auto'
                    }
                    showCharacterCount={
                      maxFieldLengthOption === 'Yes' ? true : false
                    }
                  />
                )}
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>

      {/* setting inputs */}
      <div style={{ marginTop: '2em' }}>
        <Layout>
          <Layout.AnnotatedSection
            title="Text field settings"
            description="Here you can label your textfield, make settings and set reqirements"
          >
            <Card sectioned>
              <FormLayout>
                <Select
                  label="Field size"
                  options={fieldSizeOptions}
                  onChange={(newValue) => setFieldSize(newValue)}
                  value={fieldSize}
                />
                <TextField
                  label="Text field heading"
                  value={fieldLabel}
                  onChange={(newValue) => setFieldLabel(newValue)}
                />
                <TextField
                  label="Helptext (placeholder)"
                  value={placeholder}
                  onChange={(newValue) => setPlaceHolder(newValue)}
                />
                <TextField
                  label="General font size"
                  type="number"
                  value={fontSize}
                  onChange={(val) => setFontSize(val)}
                  prefix="px"
                />

                <Select
                  label="Field Width"
                  options={fieldWidthOptions}
                  onChange={(newValue) => setFieldWidthOption(newValue)}
                  value={fieldWidthOption}
                />
                <Select
                  label="Enforce a maximum length?"
                  options={maxFieldLengthOptions}
                  onChange={(newValue) => setMaxFieldLengthOption(newValue)}
                  value={maxFieldLengthOption}
                />
                {maxFieldLengthOption === 'Yes' && (
                  <TextField
                    label="Text field maximum length"
                    type="number"
                    value={maxFieldLength}
                    onChange={(val) => setMaxFieldLength(val)}
                    suffix="characters"
                  />
                )}
                <Select
                  label="Make the text field required?"
                  options={textFieldRequiredOptions}
                  onChange={(newValue) => setTextFieldRequiredOption(newValue)}
                  value={textFieldRequiredOption}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
      {/* Text field Targeting */}
      {/* show field */}
      <div style={{ marginTop: '2em' }}>
        <Layout>
          <Layout.AnnotatedSection
            title="Text field targeting"
            description="Define for which products your text field
            should be displayed.
            "
          >
            <Card>
              <Card.Section>
                <FormLayout>
                  <Stack vertical>
                    <RadioButton
                      label={
                        <p>
                          Show fields on{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            all products
                          </span>
                        </p>
                      }
                      checked={showField === 'allProducts'}
                      id="allProducts"
                      name="showField"
                      onChange={(_checked, newValue) => setShowField(newValue)}
                    />
                    <RadioButton
                      label={
                        <p>
                          Show fields on products that match{' '}
                          <span style={{ fontWeight: 'bold' }}>any</span> of
                          these condition
                        </p>
                      }
                      checked={showField === 'anyProduct'}
                      id="anyProduct"
                      name="showField"
                      onChange={(_checked, newValue) => setShowField(newValue)}
                    />
                    <RadioButton
                      label={
                        <p>
                          Show fields on products that match{' '}
                          <span style={{ fontWeight: 'bold' }}>all</span> of
                          these condition
                        </p>
                      }
                      checked={showField === 'allProduct'}
                      id="allProduct"
                      name="showField"
                      onChange={(_checked, newValue) => setShowField(newValue)}
                    />
                  </Stack>
                </FormLayout>
              </Card.Section>
              {/* Conditional Rendering  */}
              {showField !== 'allProducts' && (
                <>
                  {/*------- This is conditions Card */}
                  {conditions.map((item, i) => (
                    <Card.Section key={i}>
                      <Stack>
                        <Stack.Item>
                          <Select
                            options={productsConditions}
                            onChange={(newValue) => {
                              let c = [...conditions];
                              let productObj = { ...c[i] };
                              productObj.productsCondition = newValue;
                              c[i] = productObj;
                              setCondition(c);
                            }}
                            value={item.productsCondition}
                          />
                        </Stack.Item>
                        <Stack.Item>
                          {item.productsCondition === 'productIsOneOf' ? (
                            <Stack vertical>
                              {item.showProducts &&
                                productsdata
                                  .filter((x) => x.selected)
                                  .map((pro, index) => (
                                    <Stack.Item key={index}>
                                      <div
                                        style={{
                                          backgroundColor: '#DFE3E8',
                                          padding: '0.5em 0.9em',
                                          borderRadius: 3,
                                        }}
                                      >
                                        <Stack
                                          alignment="center"
                                          distribution="equalSpacing"
                                        >
                                          <Stack.Item>
                                            <p>{pro.title}</p>
                                          </Stack.Item>
                                          <Stack.Item>
                                            <p
                                              style={{
                                                color: '#7A8894',
                                                cursor: 'pointer',
                                              }}
                                              onClick={() =>
                                                handleChipCancelButton(
                                                  index,
                                                  'product'
                                                )
                                              }
                                            >
                                              <Icon
                                                source={CancelSmallMinor}
                                                color="subdued"
                                              />
                                            </p>
                                          </Stack.Item>
                                        </Stack>
                                      </div>
                                    </Stack.Item>
                                  ))}
                              <Stack.Item>
                                <Button
                                  ariaControls="Choose-Button"
                                  onClick={() => {
                                    setShowModal(true);
                                    setConditionIndex(i);
                                    setShowModalFor('product');
                                  }}
                                >
                                  Choose Product
                                </Button>
                              </Stack.Item>
                            </Stack>
                          ) : item.productsCondition === 'collectionIsOneOf' ? (
                            <Stack vertical>
                              {item.showProducts &&
                                collectionData
                                  .filter((x) => x.selected)
                                  .map((pro, index) => (
                                    <Stack.Item key={index}>
                                      <div
                                        style={{
                                          backgroundColor: '#DFE3E8',
                                          padding: '0.5em 0.9em',
                                          borderRadius: 3,
                                        }}
                                      >
                                        <Stack
                                          alignment="center"
                                          distribution="equalSpacing"
                                        >
                                          <Stack.Item>
                                            <p>{pro.title}</p>
                                          </Stack.Item>
                                          <Stack.Item>
                                            <p
                                              style={{
                                                color: '#7A8894',
                                                cursor: 'pointer',
                                              }}
                                              onClick={() =>
                                                handleChipCancelButton(
                                                  index,
                                                  'collection'
                                                )
                                              }
                                            >
                                              <Icon
                                                source={CancelSmallMinor}
                                                color="subdued"
                                              />
                                            </p>
                                          </Stack.Item>
                                        </Stack>
                                      </div>
                                    </Stack.Item>
                                  ))}
                              <Stack.Item>
                                <Button
                                  ariaControls="Choose-Button"
                                  onClick={() => {
                                    setShowModal(true);
                                    setConditionIndex(i);
                                    setShowModalFor('collection');
                                  }}
                                >
                                  Choose Collection
                                </Button>
                              </Stack.Item>
                            </Stack>
                          ) : (
                            <Select
                              options={equalityConditions}
                              onChange={(newValue) => {
                                let c = [...conditions];
                                let conditionObj = { ...c[i] };
                                conditionObj.equalityCondition = newValue;
                                c[i] = conditionObj;
                                setCondition(c);
                                //setEqualityCondition(newValue)
                              }}
                              value={item.equalityCondition}
                            />
                          )}
                        </Stack.Item>
                        {item.productsCondition !== 'productIsOneOf' &&
                          item.productsCondition !== 'collectionIsOneOf' && (
                            <Stack.Item>
                              <TextField
                                value={item.searchCondition}
                                onChange={(newValue) => {
                                  //if search is based on id then use filter
                                  let c = [...conditions];
                                  let productObj = { ...c[i] };
                                  productObj.searchCondition = newValue;
                                  c[i] = productObj;
                                  setCondition(c);
                                }}
                              />
                            </Stack.Item>
                          )}
                        {i !== 0 && (
                          <Stack.Item>
                            <div style={{ marginTop: '0.5em' }}>
                              <Button
                                plain
                                ariaControls="Remove-Button"
                                onClick={() => handleRemoveCondition(i)}
                              >
                                Remove
                              </Button>
                            </div>
                          </Stack.Item>
                        )}
                      </Stack>
                    </Card.Section>
                  ))}

                  {/* ------------conditions Card end*/}
                  {/* Add condition button */}
                  <Card.Section subdued>
                    <Button
                      ariaControls="Add-Condition"
                      onClick={handleAddCondition}
                    >
                      Add Condition
                    </Button>
                  </Card.Section>
                </>
              )}
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
      {/* field Varients */}
      <div style={{ marginTop: '1em' }}>
        <Layout>
          <Layout.AnnotatedSection>
            <Card>
              <Card.Section>
                <FormLayout>
                  <Stack vertical>
                    <RadioButton
                      label={
                        <p>
                          For matching products, show for{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {' '}
                            all variants
                          </span>
                        </p>
                      }
                      checked={fieldVariant === 'allVarients'}
                      id="allVarients"
                      name="fieldVariant"
                      onChange={(_checked, newValue) =>
                        setFieldVariant(newValue)
                      }
                    />
                    <RadioButton
                      label={
                        <p>
                          Show on variants that match{' '}
                          <span style={{ fontWeight: 'bold' }}>any</span> of
                          these conditions
                        </p>
                      }
                      checked={fieldVariant === 'anyVarient'}
                      id="anyVarient"
                      name="fieldVariant"
                      onChange={(_checked, newValue) =>
                        setFieldVariant(newValue)
                      }
                    />
                    <RadioButton
                      label={
                        <p>
                          Show on variants that match{' '}
                          <span style={{ fontWeight: 'bold' }}>all</span> of
                          these conditions
                        </p>
                      }
                      checked={fieldVariant === 'allVarient'}
                      id="allVarient"
                      name="fieldVariant"
                      onChange={(_checked, newValue) =>
                        setFieldVariant(newValue)
                      }
                    />
                    <RadioButton
                      label={
                        <p>
                          Show on variants that match{' '}
                          <span style={{ fontWeight: 'bold' }}>none</span> of
                          these condition
                        </p>
                      }
                      checked={fieldVariant === 'noneVarient'}
                      id="noneVarient"
                      name="fieldVariant"
                      onChange={(_checked, newValue) =>
                        setFieldVariant(newValue)
                      }
                    />
                  </Stack>
                </FormLayout>
              </Card.Section>
              {fieldVariant !== 'allVarients' && (
                <>
                  {/*------- This is varaint conditions Card */}
                  {variantConditions.map((item, i) => (
                    <Card.Section key={i}>
                      <Stack>
                        <Stack.Item>
                          <TextField
                            value={item.attribute}
                            placeholder="e.g Size"
                            onChange={(newValue) => {
                              //if search is based on id then use filter
                              let c = [...variantConditions];
                              let productObj = { ...c[i] };
                              productObj.attribute = newValue;
                              c[i] = productObj;
                              setVariantCondition(c);
                            }}
                          />
                        </Stack.Item>
                        <Stack.Item>
                          <Select
                            options={equalityConditions}
                            onChange={(newValue) => {
                              let c = [...variantConditions];
                              let conditionObj = { ...c[i] };
                              conditionObj.equalityCondition = newValue;
                              c[i] = conditionObj;
                              setVariantCondition(c);
                            }}
                            value={item.equalityCondition}
                          />
                        </Stack.Item>
                        <Stack.Item>
                          <TextField
                            placeholder="e.g 30x40 cm"
                            value={item.searchCondition}
                            onChange={(newValue) => {
                              //if search is based on id then use filter
                              let c = [...variantConditions];
                              let productObj = { ...c[i] };
                              productObj.searchCondition = newValue;
                              c[i] = productObj;
                              setVariantCondition(c);
                            }}
                          />
                        </Stack.Item>
                        {i !== 0 && (
                          <Stack.Item>
                            <div style={{ marginTop: '0.5em' }}>
                              <Button
                                plain
                                ariaControls="Remove-Button"
                                onClick={() => handleRemoveVariantCondition(i)}
                              >
                                Remove
                              </Button>
                            </div>
                          </Stack.Item>
                        )}
                      </Stack>
                    </Card.Section>
                  ))}

                  {/* ------------conditions Card end*/}
                  {/* Add condition button */}
                  <Card.Section subdued>
                    <Button
                      ariaControls="Add-Condition"
                      onClick={handleAddVariantCondition}
                    >
                      Add Condition
                    </Button>
                  </Card.Section>
                </>
              )}
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
      {/* Save Button */}
      <div style={{ marginTop: '1em', height: '200px', width: '100%' }}>
        <Card sectioned>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Button
              primary
              onClick={saveClickHandler}
              ariaControls="Save-button"
            >
              Save
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
