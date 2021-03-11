import React, { useState } from 'react';
import Link from 'next/Link';

import { DisplayText, Stack, Button, Card, Icon } from '@shopify/polaris';
import {
  resetServerContext,
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

import { SelectMinor } from '@shopify/polaris-icons';
const sampleData = [
  {
    id: 'item-1',
    fieldName: 'Field 1',
    fieldSize: 'singleline',
    fieldLabel: 'Enter phone',
    placeholder: 'Enter phone',
    fontSize: 14,
    fieldWidthOption: 'auto',
    maxFieldLengthOption: 'Yes',
    maxFieldLength: '50',
    showField: 'allProducts',
    fieldVariant: 'allVarients',
  },
  {
    id: 'item-2',
    fieldName: 'Field 2',
    fieldSize: 'singleline',
    fieldLabel: 'Enter phone',
    placeholder: 'Enter phone',
    fontSize: 14,
    fieldWidthOption: 'auto',
    maxFieldLengthOption: 'Yes',
    maxFieldLength: '50',
    showField: 'allProducts',
    fieldVariant: 'allVarients',
  },
];
export default function Dashboard() {
  const [data, setData] = useState(sampleData);

  resetServerContext();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);

    setData(items);
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 3 * 2,
    //margin: `0 0 8px 0`,
    marginTop: '2em',
    // change background colour if dragging
    background: isDragging ? 'grey' : 'inherit',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgrey' : 'inherit',
    padding: 8,
    width: '100%',
  });

  return (
    <>
      {/* Top Buttons */}
      <Stack distribution="fillEvenly">
        <Stack.Item>
          <p style={{ fontWeight: '700' }}>
            <DisplayText size="large">Your text fields</DisplayText>
          </p>
        </Stack.Item>
        <Stack.Item>
          <div style={{ float: 'right' }}>
            <Link href="/">
              <Button primary>New text field</Button>
            </Link>
          </div>
        </Stack.Item>
      </Stack>
      {/* Cards */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided, snapshot) => (
            <div
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
              //style={getListStyle(snapshot.isDraggingOver)}
            >
              {data &&
                data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Card>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div
                              style={{
                                height: '100%',
                                marginLeft: '0.5em',
                                marginRight: '0.5em',
                              }}
                            >
                              <img src="/vertical.png" width="30" height="30" />
                            </div>

                            {/* <Stack.Item>
                         <div style={{borderLeft:"1px solid gray",height:"100px"}}/>
 
                        
                    </Stack.Item> */}
                            <div
                              style={{
                                flex: 1,
                                padding: '1.5em',
                                cursor: 'default',
                                borderLeft: '0.4px solid #EFEFEF',
                              }}
                            >
                              <Stack vertical>
                                <Stack.Item>
                                  <p
                                    style={{
                                      fontWeight: '700',
                                      fontSize: '1.5rem',
                                    }}
                                  >
                                    {item.fieldName}
                                  </p>
                                </Stack.Item>
                                <Stack.Item>
                                  <p>
                                    This field will be displayed on{' '}
                                    <span style={{ fontWeight: 'bold' }}>
                                      {item.showField}
                                    </span>
                                  </p>
                                </Stack.Item>
                                <Stack.Item>
                                  <p>
                                    This field will be displayed on{' '}
                                    <span style={{ fontWeight: 'bold' }}>
                                      {item.fieldVariant}
                                    </span>
                                  </p>
                                </Stack.Item>
                                <Stack.Item>
                                  <Stack alignment="center">
                                    <Stack.Item>
                                      <Button>Edit</Button>
                                    </Stack.Item>
                                    <Stack.Item>
                                      <Button plain>Duplicate</Button>
                                    </Stack.Item>
                                    <Stack.Item fill>
                                      <div style={{ float: 'right' }}>
                                        <Button destructive>Delete</Button>
                                      </div>
                                    </Stack.Item>
                                  </Stack>
                                </Stack.Item>
                              </Stack>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
