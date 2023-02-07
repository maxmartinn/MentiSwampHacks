import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from './Firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [friendList, setFriendlist] = useState();
  const [locker, setLocker] = useState();
  const [avatar, setAvatar] = useState();
  const [point, setPoint] = useState(0);

  async function signup(name, email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async function (result) {
        const docRef = await addDoc(collection(db, 'users'), {
          name: name,
          email: email,
          uid: result.user.uid,
          friends: [email],
          currentIcon: 'https://img.icons8.com/3d-fluency/2x/dog-bone.png',
          locker: ['https://img.icons8.com/3d-fluency/2x/dog-bone.png'],
          points: 20,
        });
        return result.user.updateProfile({
          displayName: name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    auth.signOut();
  }

  async function addFriend(
    currentUser = 'maxmartin54321@gmail.com',
    addFriend = 'maxmartin@gmail.com'
  ) {
    let ref = query(collection(db, 'users'), where('email', '==', currentUser));

    let querySnapshot = await getDocs(ref);
    let tempUser = '';
    querySnapshot.forEach(doc => {
      tempUser = doc.id;
      return;
    });

    ref = query(collection(db, 'users'), where('email', '==', addFriend));

    querySnapshot = await getDocs(ref);
    const userRef = db.collection('users').doc(tempUser);
    if (querySnapshot.empty) {
      console.log('EMPTY');
    } else {
      querySnapshot.forEach(async doc => {
        await updateDoc(userRef, {
          friends: arrayUnion(await doc.data().email),
        });
        setFriendlist(e => [...e, doc.data().email]);
        return;
      });
    }

    await updateDoc(userRef, {
      friends: arrayUnion(),
    });

    console.log('Done');
  }

  async function changeCurrentIcon(email = 'maxmartin54321@gmail.com', icon) {
    let ref = query(collection(db, 'users'), where('email', '==', email));

    let querySnapshot = await getDocs(ref);
    let tempUser = '';
    querySnapshot.forEach(doc => {
      tempUser = doc.id;
      return;
    });

    querySnapshot = await getDocs(ref);
    const userRef = db.collection('users').doc(tempUser);
    if (querySnapshot.empty) {
      console.log('EMPTY');
    } else {
      querySnapshot.forEach(async doc => {
        await updateDoc(userRef, {
          currentIcon: icon,
        });
        return;
      });

      console.log('Done');
    }
  }

  async function addToLocker(email = 'maxmartin54321@gmail.com', icon) {
    let ref = query(collection(db, 'users'), where('email', '==', currentUser));

    let querySnapshot = await getDocs(ref);
    let tempUser = '';
    querySnapshot.forEach(doc => {
      tempUser = doc.id;
      return;
    });

    querySnapshot = await getDocs(ref);
    const userRef = db.collection('users').doc(tempUser);
    if (querySnapshot.empty) {
      console.log('EMPTY');
    } else {
      querySnapshot.forEach(async doc => {
        await updateDoc(userRef, {
          locker: arrayUnion(icon),
        });
        return;
      });

      console.log('Done');
    }
  }

  let addJournalEntry = async (
    email = 'maxmartin54321@gmail.com',
    journalEntryText = 'I had a great day today.',
    chosenDate,
    sentiment
  ) => {
    let ref = query(
      collection(db, 'JournalEntries'),
      where('email', '==', email),
      where('createdAt', '==', chosenDate)
    );
    let tempUser = '';
    let querySnapshot = await getDocs(ref);
    if (querySnapshot.empty) {
      const docRef = await addDoc(collection(db, 'JournalEntries'), {
        email: email,
        journalEntryText: journalEntryText,
        createdAt: chosenDate,
        sentiment: sentiment,
      });

      pointIncrease(email, 5);
    } else {
      querySnapshot.forEach(async doc => {
        tempUser = doc.id;
      });
      const ref = db.collection('JournalEntries').doc(tempUser);
      await updateDoc(ref, {
        email: email,
        journalEntryText: journalEntryText,
        createdAt: chosenDate,
        sentiment: sentiment,
      });

      console.log(chosenDate);
    }
  };

  let pointIncrease = async (
    email = 'maxmartin54321@gmail.com',
    amount = 10
  ) => {
    let ref = query(collection(db, 'users'), where('email', '==', email));
    let tempUser = '';
    let querySnapshot = await getDocs(ref);

    if (querySnapshot.empty) {
      console.log('EMPTY');
    } else {
      querySnapshot.forEach(async doc => {
        tempUser = doc.id;
      });
      const userRef = db.collection('users').doc(tempUser);
      await updateDoc(userRef, {
        points: firebase.firestore.FieldValue.increment(amount),
      });
      setPoint(e => e + amount);
      return;
    }
  };

  let purchaseIcon = async (email, price, icon) => {
    let ref = query(collection(db, 'users'), where('email', '==', email));
    let tempUser = '';
    let data = {};
    let querySnapshot = await getDocs(ref);

    if (querySnapshot.empty) {
      console.log('EMPTY');
    } else {
      querySnapshot.forEach(async doc => {
        tempUser = doc.id;
        data = doc.data();
      });

      if (data.locker.includes(icon)) {
        console.log('You have this item already');
        return -1;
      } else {
        const userRef = db.collection('users').doc(tempUser);
        if (data.points + price < 0) {
          console.log('Could not afford item');
          return -1;
        }
        console.log([data.points + price]);
        await updateDoc(userRef, {
          points: firebase.firestore.FieldValue.increment(price),
          locker: arrayUnion(icon),
        });
        setPoint(data.points + price);
      }

      return;
    }
  };

  let getOwnPoints = async (email = 'maxmartin54321@gmail.com') => {
    let ref = query(collection(db, 'users'), where('email', '==', email));
    let querySnapshot = await getDocs(ref);
    let points = 0;
    querySnapshot.forEach(async doc => {
      points = doc.data().points;
    });
    console.log(points);
    setPoint(points);
  };

  let leaderboardEval = async friendsList => {
    let leaderboardObject = [];
    let promises = friendsList.map(async friend => {
      let ref = query(collection(db, 'users'), where('email', '==', friend));
      let querySnapshot = await getDocs(ref);
      let data = {};
      querySnapshot.forEach(doc => {
        data = doc.data();
      });
      return data;
    });

    await Promise.all(promises).then(data => {
      leaderboardObject = data.map((obj, item) => Object.assign(obj, item), {});
    });

    return leaderboardObject;
  };

  let displayFriendList = async (email = 'maxmartin54321@gmail.com') => {
    let ref = query(collection(db, 'users'), where('email', '==', email));
    let querySnapshot = await getDocs(ref);
    let friendList = [];
    querySnapshot.forEach(async doc => {
      let docData = doc.data();
      friendList = docData.friends;
    });

    setFriendlist(friendList);
  };

  let getGeneralData = async (email = 'maxmartin54321@gmail.com') => {
    let ref = query(collection(db, 'users'), where('email', '==', email));
    let querySnapshot = await getDocs(ref);
    let friendList = [];
    let docData = {};
    querySnapshot.forEach(async doc => {
      docData = doc.data();
    });

    setLocker(docData.locker);
    setAvatar(docData.avatar);
    console.log(docData);
    return docData;
  };

  let readJournal = async (email = 'maxmartin54321@gmail.com') => {
    let ref = query(
      collection(db, 'JournalEntries'),
      where('email', '==', email)
    );
    let journalEntryArray = [];
    let querySnapshot = await getDocs(ref);
    let docData = {};
    querySnapshot.forEach(async doc => {
      docData = doc.data();
      journalEntryArray.push(docData);
    });
    return journalEntryArray;
  };

  const value = {
    currentUser,
    signup,
    login,
    signout,
    addFriend,
    addJournalEntry,
    pointIncrease,
    displayFriendList,
    friendList,
    leaderboardEval,
    readJournal,
    getOwnPoints,
    addToLocker,
    purchaseIcon,
    point,
    changeCurrentIcon,
    getGeneralData,
  };

  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
