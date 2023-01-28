import Main from './Main'
import {
    Avatar,
    Box,
    Wrap,
    WrapItem,
    Flex,
    Icon,
    Text,
    Checkbox,
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
  import { AiFillShopping } from "react-icons/ai";


  // Here we have used react-icons package for the icons BsListTask
  import { AiOutlineTeam, AiFillHome, AiFillCalendar } from 'react-icons/ai';
  import { FiMenu } from 'react-icons/fi';
  import { FaBrain } from "react-icons/fa";
  import { BsFillPeopleFill, BsListTask } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';


    const tasks = ["Go to the Gym", "Take a Mindful Minute", "Read a Book", "Learn Something New", "Get Lost in Music", "Talk to a Friend/Loved one"]  

  //NEED VALIDATION IF USER HAS ENOUGH POINTS TO BUY ITEM
    const prices = [{
        "name": "crab",
        "price": 10,
        "image": "https://img.icons8.com/3d-fluency/2x/crab.png",
        "id": 1
    }, 
    {
        "name": "fish",
        "price": 20,
        "image": "https://img.icons8.com/3d-fluency/2x/fish.png",
        "id": 2
    },
    {
        "name": "octopus",
        "price": 30,
        "image": "https://img.icons8.com/3d-fluency/2x/octopus.png",
        "id": 3
    },
    {
        "name": "whale",
        "price": 40,
        "image": "https://img.icons8.com/3d-fluency/2x/whale.png",
        "id": 4
    },
    {
        "name": "turtle",
        "price": 50,
        "image": "https://img.icons8.com/3d-fluency/2x/turtle.png",
        "id": 5
    },
    {
        "name": "unicorn",
        "price": 60,
        "image": "https://img.icons8.com/3d-fluency/2x/unicorn.png",
        "id": 6
    },]

function Home(props){

    //NEED TO SET POINTS FROM DATABASE
    const [point, setPoint] = useState(0);

    useEffect(() => {

    }, [point])

    return(
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
        <Main />
        <Box ml="60" p = "4">
                

            <Flex
                flexDirection="row"
                bg={useColorModeValue('gray.50', 'gray.700')}
                p={12}
                borderRadius={8}
                boxShadow="lg"
                alignItems="center"
                justifyContent="space-between"
                >
                <Text ml={3} fontSize="2xl" fontWeight="semibold">Welcome Back!</Text>

                <Text ml={3} fontSize="2xl" fontWeight="semibold">Total points: {point}</Text>


                <Flex flexDirection="row" alignItems="center">
                <Avatar src='https://img.icons8.com/3d-fluency/2x/dog-bone.png' />
                <Text ml={3} fontSize="2xl" fontWeight="semibold">Aditya</Text>    
                </Flex>

            </Flex>

        </Box>

        

        <Flex ml="60" p = "4" flexDirection="row">
            <Flex
                flexDirection="column"
                bg={useColorModeValue('gray.50', 'gray.700')}
                p={12}
                w="50%"
                borderRadius={8}
                boxShadow="lg"
                alignItems="center"
                >
                    <Flex flexDirection="row" mb={6}>
                        <Icon as={AiFillShopping} h={8} w={8} />
                        <Text ml={3} fontSize="2xl" fontWeight="semibold">Shop</Text>
                    </Flex>

                    {prices.map((price) => (
                    <Flex key={price.id} alignItems="center" w="100%" justifyContent="center" mt={5}>
                            <Avatar size="lg" src = {price.image}  />

                                <Avatar ml={10} src='https://img.icons8.com/3d-fluency/2x/dollar-coin.png' />

                                <Text ml={4} fontWeight="semibold" fontSize={25}>
                                 {price.price}
                                </Text>
                                
                            {/* need onclick for the buttons */}
                            <Button ml={10} colorScheme="teal" >
                                Get
                            </Button>

                    </Flex>
                ))}
            </Flex>


            {/* tasks */}
            <Flex
                flexDirection="column"
                bg={useColorModeValue('gray.50', 'gray.700')}
                p={12}
                w="50%"
                borderRadius={8}
                boxShadow="lg"
                alignItems="center"
                >
                    <Flex flexDirection="row" mb={6} alignItems="center">
                        <Icon as={BsListTask} h={8} w={8} />
                        <Text ml={3} fontSize="2xl" fontWeight="semibold">Tasks</Text>
                    </Flex>

                    {tasks.map((task) => (
                    <Flex alignItems="center" w="100%" justifyContent="center" mt={5}>

                        <Checkbox size='lg' colorScheme='teal' mt={5}>
                            <Text ml={4} fontWeight="semibold" fontSize={25}>
                                {task}
                            </Text>
                        </Checkbox>

                                
                            {/* need onclick for the buttons */}

                    </Flex>
                ))}
            </Flex>
                
        </Flex>
    </Box>
    )
    }

    export default withRouter(Home);