import React, {useState} from 'react'
import Link from 'next/Link'

import {DisplayText,Stack,Button,Card,Icon} from '@shopify/polaris';
import {
    SelectMinor
  } from '@shopify/polaris-icons';
const sampleData = [
    {
        id: 1,
        fieldName:"Field 1",
        fieldSize:"singleline",
        fieldLabel: "Enter phone",
        placeholder: "Enter phone",
        fontSize: 14,
        fieldWidthOption:"auto",
        maxFieldLengthOption:"Yes",
        maxFieldLength:"50",
        showField:"allProducts",
        fieldVariant:"allVarients"
    },
    {
        id:2,
        fieldName:"Field 1",
        fieldSize:"singleline",
        fieldLabel: "Enter phone",
        placeholder: "Enter phone",
        fontSize: 14,
        fieldWidthOption:"auto",
        maxFieldLengthOption:"Yes",
        maxFieldLength:"50",
        showField:"allProducts",
        fieldVariant:"allVarients"
    }
]
export default function Dashboard() {
     const [data,setData] = useState(sampleData)
    return (
        <>
             {/* Top Buttons */}
      <Stack distribution="fillEvenly">
        <Stack.Item>
            <p style={{fontWeight:"700"}}>
           <DisplayText size="large">Your text fields</DisplayText>
           </p>
        </Stack.Item>
        <Stack.Item>
          <div style={{ float: 'right' }}>
              <Link href="/">
            <Button  primary>
              New text field
            </Button>
            </Link>
          </div>
        </Stack.Item>
      </Stack>
        {data && data.map(item=> (
            <div key={item.id} style={{marginTop:"2em"}}>
            <Card>
                <div style={{display:"flex",alignItems:"center"}}>
              
                    <div  style={{border:"1px solid red",height:"100%",marginLeft:"1em"}}>
                        <div style={{display:"flex",flexDirection:"column",flex:1,height:"100%"}}>
                            
                                <img src="/vertical.png" width="30" height="30"/>
                        </div>      
                    </div>
                        
                    {/* <Stack.Item>
                         <div style={{borderLeft:"1px solid gray",height:"100px"}}/>
 
                        
                    </Stack.Item> */}
                    <div style={{flex:1,padding:"1.5em"}} >
                        <Stack vertical>
                            <Stack.Item>
                            <p style={{fontWeight:"700",fontSize:"1.5rem"}}>
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
            <Button  destructive>
              Delete
            </Button>
          </div>
                                            </Stack.Item>
                                    </Stack>
                                </Stack.Item>
                        </Stack>
                 
                    </div>
                </div>
            </Card>
            </div>
        ))}
        
        </>
    )
}