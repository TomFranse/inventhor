import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit as firestoreLimit, 
  CollectionReference,
  DocumentData,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration from environment variables
// Note: All these values must be set in .env.local for this to work
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required Firebase config values are present
const isFirebaseConfigured = (): boolean => {
  const requiredKeys = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];
  
  return requiredKeys.every(key => !!firebaseConfig[key as keyof typeof firebaseConfig]);
};

// Firebase app instance, DB, and Auth references
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Collection references
let conversationsRef: CollectionReference<DocumentData> | null = null;
let userInstructionsRef: CollectionReference<DocumentData> | null = null;

try {
  if (isFirebaseConfigured()) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Initialize collection references
    if (db) {
      conversationsRef = collection(db, 'conversations');
      userInstructionsRef = collection(db, 'userInstructions');
    }
    
    console.log('Firebase initialized successfully');
  } else {
    console.warn(
      'Firebase not initialized: Missing configuration values in environment variables. ' +
      'Chat persistence will be disabled.'
    );
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  app = null;
  db = null;
  auth = null;
  conversationsRef = null;
  userInstructionsRef = null;
}

// Firestore helper functions for chat conversations
export const saveConversation = async (conversationId: string, messages: any[]) => {
  if (!db || !conversationsRef) return null;
  
  try {
    const conversationDoc = doc(conversationsRef, conversationId);
    await setDoc(conversationDoc, {
      messages,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return null;
  }
};

export const getConversation = async (conversationId: string) => {
  if (!db || !conversationsRef) return null;
  
  try {
    const conversationDoc = doc(conversationsRef, conversationId);
    const snapshot = await getDoc(conversationDoc);
    
    if (snapshot.exists()) {
      return snapshot.data();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting conversation:', error);
    return null;
  }
};

export const getRecentConversations = async (limitCount = 10) => {
  if (!db || !conversationsRef) return [];
  
  try {
    const q = query(
      conversationsRef,
      orderBy('updatedAt', 'desc'),
      firestoreLimit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting recent conversations:', error);
    return [];
  }
};

// Helper functions for user instructions
export const saveUserInstructions = async (userId: string, instructions: string) => {
  if (!db || !userInstructionsRef) return null;
  
  try {
    const instructionsDoc = doc(userInstructionsRef, userId);
    await setDoc(instructionsDoc, {
      instructions,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error saving user instructions:', error);
    return null;
  }
};

export const getUserInstructions = async (userId: string) => {
  if (!db || !userInstructionsRef) return null;
  
  try {
    const instructionsDoc = doc(userInstructionsRef, userId);
    const snapshot = await getDoc(instructionsDoc);
    
    if (snapshot.exists()) {
      return snapshot.data().instructions;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user instructions:', error);
    return null;
  }
};

// Export Firebase services
export { db, auth, conversationsRef, userInstructionsRef };
export default app; 