import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

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
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from "react";
import LoginPage from "./LoginPage";
import Main from "./Main";








function App() {
  return (
    <ChakraProvider  h="100%">
        <Route exact path="/" component={LoginPage} />
        <Route path="/main" component={Main} />
    </ChakraProvider>
  );
}

export default App