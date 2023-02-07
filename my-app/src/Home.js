import Main from './Main';
import { CgProfile } from 'react-icons/cg';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillShopping } from 'react-icons/ai';

// Here we have used react-icons package for the icons BsListTask
import { AiOutlineTeam, AiFillHome, AiFillCalendar } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { BsFillPeopleFill, BsListTask } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from './contexts/AuthContext';

const ownedAvatars = [
  'https://img.icons8.com/3d-fluency/2x/crab.png',
  'https://img.icons8.com/3d-fluency/2x/fish.png',
  'https://img.icons8.com/3d-fluency/2x/octopus.png',
  'https://img.icons8.com/3d-fluency/2x/whale.png',
  'https://img.icons8.com/3d-fluency/2x/turtle.png',
  'https://img.icons8.com/3d-fluency/2x/unicorn.png',
];

const tasks = [
  'Go to the Gym',
  'Take a Mindful Minute',
  'Read a Book',
  'Learn Something New',
  'Get Lost in Music',
  'Talk to a Friend/Loved one',
];

// store locker in context in a useState

//NEED VALIDATION IF USER HAS ENOUGH POINTS TO BUY ITEM
const prices = [
  {
    name: 'crab',
    price: 10,
    image: 'https://img.icons8.com/3d-fluency/2x/crab.png',
    id: 1,
  },
  {
    name: 'fish',
    price: 20,
    image: 'https://img.icons8.com/3d-fluency/2x/fish.png',
    id: 2,
  },
  {
    name: 'octopus',
    price: 30,
    image: 'https://img.icons8.com/3d-fluency/2x/octopus.png',
    id: 3,
  },
  {
    name: 'whale',
    price: 40,
    image: 'https://img.icons8.com/3d-fluency/2x/whale.png',
    id: 4,
  },
  {
    name: 'turtle',
    price: 50,
    image: 'https://img.icons8.com/3d-fluency/2x/turtle.png',
    id: 5,
  },
  {
    name: 'unicorn',
    price: 60,
    image: 'https://img.icons8.com/3d-fluency/2x/unicorn.png',
    id: 6,
  },
];

function Home(props) {
  const [locker, setLocker] = useState();
  const [avatar, setAvatar] = useState();
  const {
    getOwnPoints,
    currentUser,
    pointIncrease,
    purchaseIcon,
    point,
    changeCurrentIcon,
    getGeneralData,
    readJournal,
  } = useAuth();

  let handleCheckbox = async e => {
    if (e.target.checked) {
      pointIncrease(currentUser.email, 2);
    } else {
      pointIncrease(currentUser.email, -2);
    }
  };

  //NEED TO SET POINTS FROM DATABASE

  useEffect(() => {
    handlePoints();
  }, []);

  let handlePoints = async () => {
    await getOwnPoints(currentUser.email);
  };

  let handlePurchase = async (currentUser, price, icon) => {
    await purchaseIcon(currentUser.email, price, icon);
    await handleGeneralData();
  };
  useEffect(() => {
    handlePoints();
  }, [currentUser]);

  let handleIcon = icon => {
    changeCurrentIcon(currentUser.email, icon);
  };

  let handleGeneralData = async () => {
    let data = await getGeneralData(currentUser.email);
    setAvatar(data.currentIcon);
    setLocker(data.locker);
    console.log(data);
  };

  useEffect(() => {
    handleGeneralData();
  }, [currentUser]);

  return (
    // <Box
    //   as="section"
    //   bg={useColorModeValue('gray.50', 'gray.700')}
    //   minH="100vh"
    // >
    //   <Main />
    //   <Box ml="60" p="4">
    //     <Flex
    //       flexDirection="row"
    //       bg={useColorModeValue('gray.50', 'gray.700')}
    //       p={12}
    //       borderRadius={8}
    //       boxShadow="lg"
    //       alignItems="center"
    //       justifyContent="space-between"
    //     >
    //       <Text ml={3} fontSize="2xl" fontWeight="semibold">
    //         Welcome Back!
    //       </Text>

    //       <Text ml={3} fontSize="2xl" fontWeight="semibold">
    //         Total points: {point}
    //       </Text>

    //       <Flex flexDirection="row" alignItems="center">
    //         <Avatar src="https://img.icons8.com/3d-fluency/2x/dog-bone.png" />
    //         <Text ml={3} fontSize="2xl" fontWeight="semibold">
    //           {currentUser && currentUser.displayName}
    //         </Text>
    //       </Flex>
    //     </Flex>
    //   </Box>

    //   <Flex ml="60" p="4" flexDirection="row">
    //     <Flex
    //       flexDirection="column"
    //       bg={useColorModeValue('gray.50', 'gray.700')}
    //       p={12}
    //       w="50%"
    //       borderRadius={8}
    //       boxShadow="lg"
    //       alignItems="center"
    //     >
    //       <Flex flexDirection="row" mb={6}>
    //         <Icon as={AiFillShopping} h={8} w={8} />
    //         <Text ml={3} fontSize="2xl" fontWeight="semibold">
    //           Shop
    //         </Text>
    //       </Flex>

    //       {prices.map(price => (
    //         <Flex
    //           key={price.id}
    //           alignItems="center"
    //           w="100%"
    //           justifyContent="center"
    //           mt={5}
    //         >
    //           <Avatar size="lg" src={price.image} />

    //           <Avatar
    //             ml={10}
    //             src="https://img.icons8.com/3d-fluency/2x/dollar-coin.png"
    //           />

    //           <Text ml={4} fontWeight="semibold" fontSize={25}>
    //             {price.price}
    //           </Text>

    //           {/* need onclick for the buttons */}
    //           <Button
    //             ml={10}
    //             colorScheme="teal"
    //             onClick={() => {
    //               handlePurchase(currentUser, -price.price, price.image);
    //             }}
    //           >
    //             Get
    //           </Button>
    //         </Flex>
    //       ))}
    //     </Flex>

    //     {/* tasks */}
    //     <Flex
    //       flexDirection="column"
    //       bg={useColorModeValue('gray.50', 'gray.700')}
    //       p={12}
    //       w="50%"
    //       borderRadius={8}
    //       boxShadow="lg"
    //       alignItems="center"
    //     >
    //       <Flex flexDirection="row" mb={6} alignItems="center">
    //         <Icon as={BsListTask} h={8} w={8} />
    //         <Text ml={3} fontSize="2xl" fontWeight="semibold">
    //           Tasks
    //         </Text>
    //       </Flex>

    //       {tasks.map(task => (
    //         <Flex alignItems="center" w="100%" justifyContent="center" mt={5}>
    //           <Checkbox
    //             size="lg"
    //             colorScheme="teal"
    //             onChange={handleCheckbox}
    //             mt={5}
    //           >
    //             <Text ml={4} fontWeight="semibold" fontSize={25}>
    //               {task}
    //             </Text>
    //           </Checkbox>

    //           {/* need onclick for the buttons */}
    //         </Flex>
    //       ))}
    //     </Flex>
    //   </Flex>
    // </Box>
    <Flex
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
      flexDirection="column"
    >
      <Main />
      <Flex ml="60" p="4">
        <Flex
          flexDirection="row"
          bg={useColorModeValue('gray.50', 'gray.700')}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text ml={3} fontSize="2xl" fontWeight="semibold">
            Welcome Back!
          </Text>

          <Text ml={3} fontSize="2xl" fontWeight="semibold">
            Total points: {point}
          </Text>

          <Flex flexDirection="row" alignItems="center">
            <Avatar src={avatar} />
            <Text ml={3} fontSize="2xl" fontWeight="semibold">
              {currentUser && currentUser.displayName}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex ml="60" p="4" flexDirection="row">
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
            <Text ml={3} fontSize="2xl" fontWeight="semibold">
              Shop
            </Text>
          </Flex>

          {prices.map(price => (
            <Flex
              key={price.id}
              alignItems="center"
              w="100%"
              justifyContent="center"
              mt={5}
            >
              <Avatar size="lg" src={price.image} />

              <Avatar
                ml={10}
                src="https://img.icons8.com/3d-fluency/2x/dollar-coin.png"
              />

              <Text ml={4} fontWeight="semibold" fontSize={25}>
                {price.price}
              </Text>

              {/* need onclick for the buttons */}
              <Button
                ml={10}
                colorScheme="teal"
                onClick={() => {
                  handlePurchase(currentUser, -price.price, price.image);
                }}
              >
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
            <Text ml={3} fontSize="2xl" fontWeight="semibold">
              Tasks
            </Text>
          </Flex>

          {tasks.map(task => (
            <Flex alignItems="center" w="100%" justifyContent="center" mt={5}>
              <Checkbox
                size="lg"
                colorScheme="teal"
                mt={5}
                onChange={handleCheckbox}
              >
                <Text ml={4} fontWeight="semibold" fontSize={25}>
                  {task}
                </Text>
              </Checkbox>

              {/* need onclick for the buttons */}
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex ml="60" p="4" flexDirection="row">
        <Flex
          flexDirection="column"
          bg={useColorModeValue('gray.50', 'gray.700')}
          p={12}
          w="100%"
          borderRadius={8}
          boxShadow="lg"
          alignItems="center"
        >
          <Flex mb={6} alignItems="center" justifyContent="center">
            <Icon as={CgProfile} h={8} w={8} />
            <Text ml={3} fontSize="2xl" fontWeight="semibold">
              Your Avatars
            </Text>
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            {locker &&
              locker.map(avatar => (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  mt={5}
                  flexDirection="row"
                  ml={3}
                >
                  <Button
                    size="lg"
                    onClick={() => {
                      setAvatar(avatar);
                      handleIcon(avatar);
                    }}
                  >
                    {' '}
                    <Avatar src={avatar} />{' '}
                  </Button>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default withRouter(Home);
