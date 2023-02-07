import Main from './Main';
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
import { CgProfile } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

const tasks = [
  'Go to the Gym',
  'Take a Mindful Minute',
  'Read a Book',
  'Learn Something New',
  'Get Lost in Music',
  'Talk to a Friend/Loved one',
];
const ownedAvatars = [
  'https://img.icons8.com/3d-fluency/2x/crab.png',
  'https://img.icons8.com/3d-fluency/2x/fish.png',
  'https://img.icons8.com/3d-fluency/2x/octopus.png',
  'https://img.icons8.com/3d-fluency/2x/whale.png',
  'https://img.icons8.com/3d-fluency/2x/turtle.png',
  'https://img.icons8.com/3d-fluency/2x/unicorn.png',
];

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

function About(props) {
  //NEED TO SET POINTS FROM DATABASE
  const [point, setPoint] = useState(0);
  const [avatar, setAvatar] = useState(
    'https://img.icons8.com/3d-fluency/2x/dog-bone.png'
  );

  useEffect(() => {}, [point, avatar]);

  return (
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
          justifyContent="center"
          width="100%"
        >
          <Text ml={3} fontSize="4xl" fontWeight="semibold">
            About
          </Text>
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
          <Text ml={3} fontSize="4xl" fontWeight="semibold">
            About Menty
          </Text>
          <Text ml={3} fontSize="xl" fontWeight="semibold" color="teal" mt={3}>
            Menty is a mental health app platform that recommends certain tasks
            to promote your mental health such as journaling, listening to
            music, reading, excercising, etc. You can also gain points for based
            on the tasks you have completed. You can use these points to buy new
            avatars that you can use to represent yourself. You can also connect
            with your friends and compete with them to see who can complete the
            most tasks. What may start as simply wanting to get points and
            avatars can easily turn into mindful habits that one can continue
            with for a lifetime.
          </Text>
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
          <Text ml={3} fontSize="4xl" fontWeight="semibold">
            Technical Information
          </Text>
          <Text ml={3} fontSize="xl" fontWeight="semibold" color="teal" mt={3}>
            Menty uses React.js and ChakraUI for the frontend. The user
            authentication, storing of user information, and conditional
            rendering of elements based on the user information is done using
            Firebase. The sentiment analysis of the journal entries is done
            using a novel Machine Learning Algorithm utilizing a Tensorflow
            model that was trained on a public Kaggle dataset and implemented
            through a flask server.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default withRouter(About);
