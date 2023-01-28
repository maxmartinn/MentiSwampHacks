import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Link,
    Image,
    Button,
    Heading,
    Stack,
    VStack,
    BoxProps,
    Drawer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue
  } from '@chakra-ui/react';

  // Here we have used react-icons package for the icons BsListTask
  import { AiOutlineTeam, AiFillHome, AiFillCalendar } from 'react-icons/ai';
  import { FiMenu } from 'react-icons/fi';
  import { FaBrain } from "react-icons/fa";
  import { BsFillPeopleFill, BsListTask } from "react-icons/bs";
  
  //this function will have the main/home page
  export default function Main() {
  
    return (
      <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
        <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        // pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60">
            <Flex px="4" py="5" alignItems="center" justifyContent= "center">
            <Icon as={FaBrain} h={8} w={8} />
            <Text
              fontSize="2xl"
              ml="2"
              fontWeight="semibold"
            >
              Menty
            </Text>
            </Flex>


        <Button w="full" mt={5} bg={useColorModeValue('white', 'gray.800')}>
                <Icon as={AiFillHome} w={6} h={6} />
                <Text ml="4" fontWeight="medium">Home</Text>
        </Button>

        <Button w="full" mt={5} bg={useColorModeValue('white', 'gray.800')}>
                <Icon as={BsFillPeopleFill} w={6} h={6} />
                <Text ml="4" fontWeight="medium">Friends</Text>
        </Button>

        <Button w="full" mt={5} bg={useColorModeValue('white', 'gray.800')}>
                <Icon as={AiFillCalendar} w={6} h={6} />
                <Text ml="4" fontWeight="medium">Timeline</Text>
        </Button>

        <Button w="full" mt={5} bg={useColorModeValue('white', 'gray.800')}>
                <Icon as={BsListTask} w={6} h={6} />
                <Text ml="4" fontWeight="medium">Tasks</Text>
        </Button>

        </Box>

        <Box ml="60" p="4">
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="semibold">Home</Text>
            </Flex>
        </Box>
        
      </Box>
    );
  }
  