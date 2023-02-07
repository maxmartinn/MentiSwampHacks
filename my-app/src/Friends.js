import React, { useState, useEffect } from 'react';
import Main from './Main';
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
  useColorModeValue,
  propNames,
  Input,
} from '@chakra-ui/react';
import { FiAlignRight } from 'react-icons/fi';
import { withRouter } from 'react-router';
import { useAuth } from './contexts/AuthContext';
const Friends = props => {
  const {
    addFriend,
    currentUser,
    addJournalEntry,
    pointIncrease,
    displayFriendList,
    friendList,
    leaderboardEval,
    getOwnPoints,
    getGeneralData,
  } = useAuth();

  let handleLeaderboard = async () => {
    await leaderboardEval(friendList).then(res => {
      res.reverse();
      setFriends(res);
    });
  };

  let [friendName, setFriend] = useState('');

  let handleFriendChange = e => {
    setFriend(e.target.value);
    console.log(friendName);
  };

  let handleFriend = async (currentUser, friendName) => {
    await addFriend(currentUser.email, friendName);
    await HandledisplayFriendList(currentUser.email);
    await handleLeaderboard();
    console.log(friendList);
  };

  let HandledisplayFriendList = async currentUser => {
    if (currentUser.email) {
      console.log(currentUser.email);
      await displayFriendList(currentUser.email);
    }
  };

  const imageURLs = {
    bone: 'https://img.icons8.com/3d-fluency/2x/dog-bone.png',
    crab: 'https://img.icons8.com/3d-fluency/2x/crab.png',
    crab: 'https://img.icons8.com/3d-fluency/2x/crab.png',
    fish: 'https://img.icons8.com/3d-fluency/2x/fish.png',
    octopus: 'https://img.icons8.com/3d-fluency/2x/octopus.png',
    shark: 'https://img.icons8.com/3d-fluency/2x/shark.png',
    squid: 'https://img.icons8.com/3d-fluency/2x/squid.png',
    turtle: 'httrps://img.icons8.com/3d-fluency/2x/turtle.png',
    //get more images from https://icons8.com/ouch
  };

  useEffect(() => {
    handleLeaderboard();
  }, [friendList]);

  useEffect(() => {
    HandledisplayFriendList(currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log(friendList);
  }, [friendList]);

  const [friends, setFriends] = useState([
    {
      name: 'John',
      id: 1,
      image: imageURLs.crab,
      points: 0,
    },
    {
      name: 'Jane',
      id: 2,
      image: imageURLs.fish,
      points: 0,
    },
    {
      name: 'Joe',
      id: 3,
      image: imageURLs.octopus,
      points: 0,
    },
  ]);

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <Main />
      {/* <Box ml="60" p="4">
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="semibold">Friends</Text>
            </Flex>
        </Box> */}
      <Box ml="60" p="4">
        <Flex alignItems="center" justifyContent="center">
          <Input
            placeholder="Add Friends"
            size="lg"
            type="search"
            width="50%"
            mt={4}
            onChange={handleFriendChange}
          />
          <Button
            ml={2}
            mt={4}
            colorScheme="teal"
            onClick={() => handleFriend(currentUser, friendName)}
          >
            Add
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          bg={useColorModeValue('gray.50', 'gray.700')}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          mt={5}
          alignItems="center"
        >
          {friends.map(friend => (
            <Flex
              key={friend.id}
              mt={5}
              justifyContent="space-between"
              w="100%"
            >
              <Flex flexDirection="row" alignItems="center">
                <Avatar size="lg" src={friend.currentIcon} />
                <Text ml={8} fontWeight="semibold" fontSize={20}>
                  {friend.name}
                </Text>
              </Flex>
              <Text ml={8} fontWeight="semibold" fontSize={20}>
                Points: {friend.points}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default withRouter(Friends);
