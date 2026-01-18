// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, setDoc } from "firebase/firestore";

// import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCkd3-dp_1qikYIaAiQ8FJGuAlE-NoMM-M",
  authDomain: "sdg-quest.firebaseapp.com",
  projectId: "sdg-quest",
  storageBucket: "sdg-quest.firebasestorage.app",
  messagingSenderId: "283389884065",
  appId: "1:283389884065:web:2a741049cf9209e46ce2e0",
  measurementId: "G-NRGJ93X5XD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await sendEmailVerification(user);
        toast.info("Verification email sent!");
        await addDoc(collection(db, "users"), { // Note: "users" (plural) is more common
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        toast.success("Signup successful. Check your email for verification.");
    } catch (error) {
        console.error("Signup Error:", error);
        let errorMessage = handleAuthError(error);
        toast.error(errorMessage);
    }
};
const login=async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
    }
    const loginwithgoogle=async()=>{
        try{
        const provider=new GoogleAuthProvider();
        const result=await signInWithPopup(auth,provider)
        console.log("Full Auth Result:", result);
        const user=result.user;
    
        const userRef = doc(db, 'users', user.uid); // Assuming users collection
        const userSnapshot = await getDoc(userRef);
      
        if (!userSnapshot.exists()) {
          // Create the user document
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
            authProvider: "google"
          });
        } else {
          // Update the user document (if needed, e.g., to update profilePic)
          await updateDoc(userRef, {
            profilePic: user.photoURL // Only update the profile picture
          })
        }
        }catch(error) {
            console.log(error);
        }
    }
    const logout =()=>{
        signOut(auth);
}        

// ... other functions (login, loginWithGoogle, logout) ...

const handleAuthError = (error) => {
    switch (error.code) {
        // Add specific error handling cases for better user feedback
        case 'auth/email-already-in-use':
            return 'Email already in use. Please use a different email.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use a stronger password.';
        case 'auth/user-not-found':
            return 'User not found. Please check your email and password.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        default:
            return 'An error occurred. Please try again later.';
    }
};

export { auth, db, login, signup, logout, loginwithgoogle };
