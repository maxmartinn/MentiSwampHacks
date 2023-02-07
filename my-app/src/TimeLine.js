import React, { useState, useEffect } from 'react';
import Main from './Main';
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
  Input,
} from '@chakra-ui/react';

import axios from 'axios';
import { withRouter } from 'react-router';
import { useAuth } from './contexts/AuthContext';

const Timeline = props => {
  const {
    addFriend,
    currentUser,
    addJournalEntry,
    pointIncrease,
    displayFriendList,
    friendList,
    leaderboardEval,
    getOwnPoints,
    readJournal,
  } = useAuth();

  const d = new Date();
  const days = {
    6: 'Sunday',
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
  };
  const [date, setDate] = useState(
    days[d.getDay() - 1 < 0 ? 6 : d.getDay() - 1]
  );
  const [currentText, setCurrentText] = useState('');
  const [jounralEntries, setJournalEntries] = useState([
    'M',
    'T',
    'W',
    'Th',
    'F',
    'S',
    'Su',
  ]);
  const [displaying, setDisplaying] = useState(null);
  const [fill, setFill] = useState([
    '0.5',
    '0.5',
    '0.5',
    '0.5',
    '0.5',
    '0.5',
    '0.5',
  ]);

  useEffect(() => {}, [displaying, date]);

  useEffect(() => {}, [fill]);

  // ----------------------------/
  let handleLeaderboard = async () => {
    await leaderboardEval(friendList).then(res => {
      const sortByValue = (a, b) => a.value - b.value;
      const objectAsArray = Object.entries(res).map(([key, value]) => ({
        key,
        value,
      }));
      const sortedArray = objectAsArray.sort(sortByValue);
      const sortedObject = Object.fromEntries(
        sortedArray.map(({ key, value }) => [key, value])
      );
    });
  };

  let HandledisplayFriendList = async currentUser => {
    if (currentUser.email) {
      await displayFriendList(currentUser.email);
    }
  };

  useEffect(() => {
    handleLeaderboard();
  }, [friendList]);

  let handleReadingJournals = async () => {
    let journalData = await readJournal(currentUser.email);
    let tmpList = jounralEntries;
    let tmpFillList = fill;
    journalData.forEach(entry => {
      tmpList[entry.createdAt] = entry.journalEntryText;
      let sentimentVal = entry.sentiment;
      tmpFillList[entry.createdAt] = sentimentVal;
    });

    setJournalEntries(tmpList);
    setFill(tmpFillList);
    console.log(fill);
  };

  useEffect(() => {
    HandledisplayFriendList(currentUser);
  }, [currentUser]);

  useEffect(() => {
    handleReadingJournals();
  }, [currentUser]);

  async function handleSubmit() {
    let day = d.getDay() - 1 < 0 ? 6 : d.getDay() - 1;

    if (day < 0) {
      day = 6;
    }
    let data = 0;
    await axios
      .post('http://localhost:3001/predict', {
        sentence: currentText.toString(),
      })
      .then(async response => {
        let newFill = fill;
        data = ((response.data + 1) / 2) * 0.5 + 0.5;
      })
      .catch(error => {
        console.log(error);
      });
    console.log(data);
    if (data <= 0.6) {
      await axios.post('http://localhost:3001/send', {
        user: currentUser.displayName,
        recipient_emails: friendList,
      });
    }
    console.log(data);
    await addJournalEntry(currentUser.email, currentText, day, data);
    await handleReadingJournals();

    setCurrentText('');
    console.log(fill);
  }

  return (
    // <Box
    //   as="section"
    //   bg={useColorModeValue('gray.50', 'gray.700')}
    //   minH="100vh"
    // >
    //   <Main />
    //   {/* <Box ml="60" p="4">
    //         <Flex justifyContent="space-between" alignItems="center">
    //             <Text fontSize="2xl" fontWeight="semibold">Friends</Text>
    //         </Flex>
    //     </Box> */}
    //   <Flex
    //     ml="60"
    //     p="4"
    //     mt="15"
    //     alignItems="center"
    //     justifyContent="center"
    //     flexDirection="column"
    //   >
    //     <Text fontWeight="semibold" fontSize={20} color="black">
    //       Timeline
    //     </Text>
    //     <Flex alignItems="center">
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[0]}
    //             color="white"
    //           >
    //             Su
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           opacity="0.1"
    //           borderRadius="lg"
    //           justifyContent="center"
    //           outline={'black'}
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[1]}
    //             color="white"
    //           >
    //             M
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[2]}
    //             color="white"
    //           >
    //             T
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[3]}
    //             color="white"
    //           >
    //             W
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[4]}
    //             color="white"
    //           >
    //             Th
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[5]}
    //             color="white"
    //           >
    //             F
    //           </Text>
    //         </Flex>
    //       </Flex>
    //       <Flex flexDirection="column" justifyContent="center">
    //         <Flex
    //           width={20}
    //           height={20}
    //           ml={2}
    //           bg="teal"
    //           borderRadius="lg"
    //           justifyContent="center"
    //         >
    //           <Text
    //             fontWeight="semibold"
    //             fontSize={20}
    //             opacity={opacity[6]}
    //             color="white"
    //           >
    //             Sa
    //           </Text>
    //         </Flex>
    //       </Flex>
    //     </Flex>
    //     <Text fontWeight="normal" fontSize={20} color="black" mt={10}>
    //       {' '}
    //       {date} Journal Entry{' '}
    //     </Text>
    //     <Textarea
    //       placeholder="Type Your Journal Entry Here"
    //       size="lg"
    //       resize="vertical"
    //       mt="5"
    //       colorScheme="teal"
    //       variant="filled"
    //       value={currentText}
    //       onChange={e => setCurrentText(e.target.value)}
    //     />
    //     <Button ml={2} mt={4} colorScheme="teal" onClick={handleSubmit}>
    //       Submit Entry
    //     </Button>
    //   </Flex>
    // </Box>
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
      <Flex
        ml="60"
        p="4"
        mt="15"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text fontWeight="semibold" fontSize={20} color="black" mb={8}>
          Weekly Journaling
        </Text>
        <Flex alignItems="center">
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(0)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[0]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  M
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(1)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[1]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  T
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(2)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[2]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  W
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(3)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[3]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  Th
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(4)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[4]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  F
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(5)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[5]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  Sa
                </Text>
              </Flex>
            </Flex>
          </Button>
          <Button
            size="xs"
            bg="transparent"
            onClick={() => setDisplaying(6)}
            mr={1}
            ml={1}
            _hover={{ bg: 'transparent' }}
          >
            <Flex flexDirection="column" justifyContent="center">
              <Flex
                width={20}
                height={20}
                ml={2}
                bg="teal"
                borderRadius="lg"
                justifyContent="center"
                opacity={fill[6]}
              >
                <Text fontWeight="semibold" fontSize={20} color="white">
                  Su
                </Text>
              </Flex>
            </Flex>
          </Button>
        </Flex>
        <Text fontWeight="normal" fontSize={20} color="black" mt={10}>
          {' '}
          {date} Journal Entry{' '}
        </Text>
        <Textarea
          placeholder="Type Your Journal Entry Here"
          size="lg"
          resize="vertical"
          mt="5"
          colorScheme="teal"
          variant="filled"
          value={currentText}
          onChange={e => setCurrentText(e.target.value)}
        />
        <Button ml={2} mt={4} colorScheme="teal" onClick={handleSubmit}>
          Submit Entry
        </Button>
        {displaying === null && (
          <Text fontWeight="normal" fontSize={20} color="black" mt={10}>
            {' '}
            Select a Day
          </Text>
        )}
        {displaying !== null && (
          <Text fontWeight="normal" fontSize={20} color="black" mt={10}>
            {' '}
            {days[displaying]}'s Journal Entry:{' '}
          </Text>
        )}
        {displaying !== null && (
          <Text fontWeight="normal" fontSize={20} color="black" mt={10}>
            {' '}
            {jounralEntries[displaying]}{' '}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default withRouter(Timeline);
