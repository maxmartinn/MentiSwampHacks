import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
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
import { Switch, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import LoginPage from './LoginPage';
import Main from './Main';
import Friends from './Friends';
import TimeLine from './TimeLine';
import About from './About';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider h="100%">
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/main" component={Home} />
        <Route path="/friends" component={Friends} />
        <Route path="/timeline" component={TimeLine} />
        <Route exact path="/about" component={About} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
