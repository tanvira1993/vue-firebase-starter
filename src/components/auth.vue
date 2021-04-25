<template>
  <v-app>
    <v-card
      style="margin: 10px"
      class="overflow-hidden"
      color="purple lighten-1"
      dark
      v-if="login === false"
    >
      <v-toolbar flat color="purple">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          User Signup
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="signup.email"
          color="white"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="signup.password"
          color="white"
          item-text="name"
          label="Password"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="Signup">
          Signup
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      style="margin: 10px"
      class="overflow-hidden"
      color="purple lighten-1"
      dark
      v-if="login === false"
    >
      <v-toolbar flat color="purple">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          Login
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="signin.email"
          color="white"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="signin.password"
          color="white"
          label="Password"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="Signin">
          Signin
        </v-btn>
      </v-card-actions>
    </v-card>
    <h1 v-if="login === true">Home</h1>
    <v-btn @click="Signout()" v-if="login === true" color="error">
      Signout
    </v-btn>
    <v-card style="margin: 20px">
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      small-chips
      multiple
      label="File input w/ small chips"
      @change="handleImage"

    ></v-file-input>
    <v-btn @click="uploadImage()"  color="success">
      Upload
    </v-btn>
  </v-card>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Auth",
  data: function() {
    
    return {
      rules: [
        value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
      ],
      signup: {
        email: "",
        password: "",
      },
      signin: {
        email: "",
        password: "",
      },
      login: false,
      files:[]
    };
  },

  onBeforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("Unauthenticated!");
        this.login = false;
      } else {
        console.log("Authenticated!");
        this.login = true;
      }
    });
  },

  mounted() {
    const config = {
      apiKey: "AIzaSyDXZYp6nrvvlqTXCfcO61fcfDg6wVrPGIA",
      authDomain: "vue-firebase-6f2e8.firebaseapp.com",
      databaseURL: "https://vue-firebase-6f2e8.firebaseio.com", // firestore DB
      // databaseURL: "https://vue-firebase-6f2e8-default-rtdb.firebaseio.com", // Real-Time DB
      projectId: "vue-firebase-6f2e8",
      storageBucket: "vue-firebase-6f2e8.appspot.com",
      messagingSenderId: "1039405568601",
      appId: "1:1039405568601:web:73388790506f4918221748",
      measurementId: "G-VEN1W2MXNL",
    };

    firebase.initializeApp(config);
  },

  methods: {
    Signup() {
      if (this.signup.email == "" || this.signup.password == "") {
        alert("Fields are required!!");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signup.email,
            this.signup.password
          )
          .then((res) => {
            console.log("succ", res);
            alert("Registration success!");
            this.signup = {
              email: "",
              password: "",
            };
            this.login = false;
          })
          .catch((err) => {
            console.log("error", err);
            this.login = false;
          });
      }
    },
    Signin() {
      // console.log("value",this.signin.password)
      if (this.signin.email == "" || this.signin.password == "") {
        alert("Fields are required!!");
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.signin.email, this.signin.password)
          .then((res) => {
            console.log("success", res);
            alert("Login success!");
            this.login = true;
            this.signin = {
              email: "",
              password: "",
            };
          })
          .catch((err) => {
            console.log("error", err);
            this.login = false;
          });
      }
    },
    Signout() {
      console.log("sign out");
      let user = firebase.auth().currentUser;
      console.log("okoko", user);
      firebase
        .auth()
        .signOut()
        .then((res) => {
          console.log("success", res);
          alert("Logout success!");
          this.login = false;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleImage(e){ 
      this.files = []     
      let length = e.length
      for(let i =0; i<length; i++){
        this.files.push(e[i])
      }
      console.log("images",this.files) 
    },

    uploadImage(){
      console.log("image upload")
      for(let i =0; i<this.files.length; i++){
      let storageRef = firebase.storage().ref('images/'+ Math.random() + '_'  + this.files[i].name);
       let uploadTask =storageRef.put(this.files[i]);
       console.log('chk',this.files[i])
       uploadTask.on('state_changed', (snapshot) => {
            console.warn(snapshot)
          }, (error) => {
            console.warn(error)
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // this.product.images.push(downloadURL);
              console.log("download url",downloadURL)
            });
          });
      }
      alert("upload success!")

    }
  },
};
</script>
