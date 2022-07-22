import Phaser from "phaser";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../authencation/firebase-config";


const provider = new FacebookAuthProvider();
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
class Login extends Phaser.Scene {
    constructor() {
        super({ key: 'login' })
    }
    preload() {


    }

    create() {
        const app = initializeApp(firebaseConfig);
        const provider = new FacebookAuthProvider();
        // provider.addScope('user_birthday');
        //provider.addScope('gaming_profile');
        // provider.addScope('gaming_user_picture')

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;




                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
        var user = app.auth().currentUser;
        if (user != null) {
            var name = user.displayName;
            var email = user.email;
            var photoUrl = user.photoURL;
            var emailVerified = user.emailVerified;
            var uid = user.uid;
        }

    }


}

export default Login;