import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

// Function to create new user
// Param: Name, phone #

export let username = '';

export async function create_user(name, phoneNumber) {
  try {
    await setDoc(doc(db, "users", name), {
      username: name,
      phoneNumber: phoneNumber
    });
      console.log('User added to Firestore.');
      username = name
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

// Function to send notifications
// Param: deviceID