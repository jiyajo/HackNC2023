import { collection, addDoc, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'

// Function to create new user
// Param: Name, phone #

export let username = localStorage.getItem('username') || '-';

export async function create_user(name, phoneNumber) {
  try {
    await setDoc(doc(db, "users", name), {
      username: name,
      phoneNumber: phoneNumber
    });
      console.log('User added to Firestore.');
      username = name;
      localStorage.setItem('username', name);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
}

// Function to add pills to user's schedule
// Param: Pill Name, Dosage, Time of Day
export async function add_pills(userId, dosage, isNotified, pillName, time, day, notes) {
  try {
      const userDocRef = doc(db, 'users', userId); // Replace with the actual user ID
      const subcollectionRef = collection(userDocRef, 'notifications');
      // Add a new document to the subcollection
      await addDoc(subcollectionRef, {
          dosage: dosage,
          isNotified: isNotified,
          pillName: pillName,
          time: time,
          day: day,
          notes: notes
      });
      console.log('Document added to the subcollection.');
  } catch (error) {
      console.error('Error adding document to the subcollection:', error);
  }
}

// Function to get pill schedule
export async function getPillSchedule() {
  const usersCollectionRef = collection(db, 'users');
  const DocRef = doc(usersCollectionRef, username);
  const notificationsCollectionRef = collection(DocRef, 'notifications');
  const docSnap = await getDocs(notificationsCollectionRef);

  console.log(username)
  const resultArray = [];
  docSnap.forEach((doc) => {
    const data = doc.data();
    const day = data.day;
    const time = data.time;
    const pillName = data.pillName;
    console.log(day + " " + time)
    resultArray.push([day, time, pillName]); // Add an array of [day, time] to the resultArray
  });

  console.log(resultArray)
  return resultArray;
}

// Function to send notifications
// Param: deviceID