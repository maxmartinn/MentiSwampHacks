import React,{useState,useEffect} from 'react'
import Main from './Main'
import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Textarea,
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
    useColorModeValue,
    propNames,
    Input
  } from '@chakra-ui/react';
  
import axios from 'axios';
import { withRouter } from 'react-router';

const Timeline = (props) => {
    const d = new Date;
    const days = {0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};
    const [date, setDate] = useState(days[d.getDay()]);
    const [currentText, setCurrentText] = useState("");
    const [opacity, setOpacity] = useState([1, 1, 1, 1, 1, 1, 1]);

    useEffect(() => {}, [opacity]);

    function handleSubmit() {
        axios.post('http://localhost:3001/flask/predict', { "sentence": currentText.toString() })
        .then(response => {
            const newOpacity = opacity;
            newOpacity[d.getDay()] = (parseFloat(response.data) + 1) / 2;
            setOpacity(newOpacity);
        })
        .catch(error => {
          console.log(error);
        });
        setCurrentText("");
    }

  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
        <Main />
        {/* <Box ml="60" p="4">
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="semibold">Friends</Text>
            </Flex>
        </Box> */}
        <Flex ml="60" p="4" mt = "15" alignItems="center" justifyContent="center" flexDirection = "column">
            <Text fontWeight="semibold" fontSize={20} color="black">
                                    Timeline
            </Text>
            <Flex alignItems="center" >
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[0]} color="white">
                                    Su
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" opacity = "0.1" borderRadius= "lg" justifyContent="center" outline={"black"}>
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[1]} color="white">
                                    M
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[2]} color="white">
                                    T
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[3]} color="white">
                                    W
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[4]} color="white">
                                    Th
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[5]} color="white">
                                    F
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" justifyContent="center">
                    <Flex width={20} height = {20} ml = {2} bg = "teal" borderRadius= "lg" justifyContent="center">
                        <Text fontWeight="semibold" fontSize={20} opacity={opacity[6]} color="white">
                                    Sa
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Text fontWeight = "normal" fontSize={20} color="black" mt={10}> {date} Journal Entry </Text>
            <Textarea
            placeholder='Type Your Journal Entry Here'
            size='lg'
            resize = "vertical"
            mt = "5"
            colorScheme="teal"
            variant = "filled"
            value = {currentText}
            onChange = {(e) => setCurrentText(e.target.value)}
            />
            <Button ml= {2} mt={4} colorScheme="teal" onClick = {handleSubmit}>
                    Submit Entry
            </Button>
        </Flex>


        
    </Box>
  )
}

export default withRouter(Timeline)