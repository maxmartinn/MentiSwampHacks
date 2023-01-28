import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'
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
import Friends from "./Friends";
import TimeLine from "./TimeLine";








function App() {
  return (
    <ChakraProvider h="100%">
        <Route exact path="/" component={LoginPage} />
        <Route path="/main" component={Home} />
        <Route path="/friends" component={Friends} />
        <Route path="/timeline" component={TimeLine} />        
    </ChakraProvider>
  );
}

export default App