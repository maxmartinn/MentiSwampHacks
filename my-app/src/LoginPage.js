import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  Stack,
  Link,
  theme,
  Colorscheme,
  Heading,
  Text,
  Box,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import {
  Switch,
  useColorMode,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';

import { FaBrain } from 'react-icons/fa';

import { useState, useEffect } from 'react';

import { useAuth } from './contexts/AuthContext';

function LoginPage(props) {
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  const { login, signup, currentUser } = useAuth();

  useEffect(() => {
    console.log(password);
  }, [password]);

  let handleLogin = async e => {
    if (TabID == 0) {
      try {
        await login(email, password);
        props.history.push('/about');
      } catch (error) {
        console.log(error);
      }
    } else {
      await signup(name, email, password);
      setPassword('');
      setEmail('');
      setName('');
      console.log('Done');
      alert('You have successfully signed up');
    }
  };

  let handleNameChange = e => {
    setName(e.target.value);
  };

  let handleEmailChange = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  let handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const formBackground = useColorModeValue('gray.100', 'gray.700');
  //0 is login, 1 is signup
  const [TabID, setTabID] = useState(0);
  const [inputs, setinputs] = useState([]);

  useEffect(() => {
    setEmail('');
    if (TabID == 0) {
      setinputs([
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          mb={6}
          onChange={handleEmailChange}
        />,
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={9}
          onChange={handlePasswordChange}
        />,
      ]);
    } else {
      console.log('Sign Up');
      setinputs([
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          mb={6}
          onChange={handleEmailChange}
        />,
        <Input
          placeholder="Name"
          type="name"
          variant="filled"
          mb={6}
          onChange={handleNameChange}
        />,

        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={9}
          onChange={handlePasswordChange}
        />,
      ]);
    }
  }, [TabID]);

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Flex mb={5} px="4" py="5" alignItems="center" justifyContent="center">
          <Icon as={FaBrain} h={8} w={8} />
          <Heading ml={3}>Menty</Heading>
        </Flex>

        <Tabs
          isFitted
          variant="soft-rounded"
          colorScheme="teal"
          mb={8}
          onChange={index => setTabID(index)}
        >
          <TabList>
            <Tab color="black">Login</Tab>
            <Tab color="black">Sign Up</Tab>
          </TabList>
        </Tabs>

        {inputs}

        <Button colorScheme="teal" onClick={() => handleLogin()}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}

export default withRouter(LoginPage);
