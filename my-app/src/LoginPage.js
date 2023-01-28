import { ChakraProvider, FormControl,
    FormLabel,
    Input,
    Button,
    Tabs,
    TabList,
    Tab,
    Stack,
    Link,theme, Colorscheme, Heading, Text, Box, useDisclosure, Flex } from '@chakra-ui/react'
    import { FaBars } from 'react-icons/fa'
    import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton } from "@chakra-ui/react";
    import { FiMenu } from "react-icons/fi";
    import {
      Switch,
      useColorMode,
      useColorModeValue, Icon
    } from '@chakra-ui/react';
    import { withRouter } from 'react-router-dom';

  import { FaBrain } from "react-icons/fa";


  import { useState, useEffect } from "react";

function LoginPage(props) {
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    //0 is login, 1 is signup
    const [TabID, setTabID] = useState(0);
    const [inputs, setinputs] = useState([]);

    useEffect(() => {
      if (TabID == 0) {
        setinputs([
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          mb={6}
        />,
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={9}
        />
      ])
      } else {
        console.log("Sign Up")
        setinputs([
          <Input
            placeholder="Email"
            type="email"
            variant="filled"
            mb={6}
          />,
          <Input
            placeholder="Name"
            type="name"
            variant="filled"
            mb={6}
          />,
          <Input
            placeholder="Password"
            type="password"
            variant="filled"
            mb={9}
          />
        ])
    }}, [TabID])


    return (
      <Flex h="100vh" alignItems="center" justifyContent="center" >
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Flex mb = {5} px="4" py="5" alignItems="center" justifyContent= "center">
            <Icon as={FaBrain} h={8} w={8} />
            <Heading ml = {3}>Menty</Heading>
          </Flex>
  
          <Tabs isFitted variant="soft-rounded" colorScheme="teal" mb={8} 
          onChange={(index) => setTabID(index)} >
            <TabList>
              <Tab color="black">Login</Tab>
              <Tab color="black">Sign Up</Tab>
            </TabList>
          </Tabs>

          {inputs}
          
          <Button colorScheme="teal" onClick = {() => props.history.push('/main')}>
            Submit
          </Button>
        </Flex>
      </Flex>
    );
  };

export default withRouter(LoginPage);