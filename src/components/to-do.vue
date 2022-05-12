<template>
  <div>
    <v-app>
      <div>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="board.name"
                  :rules="nameRules"
                  :counter="10"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="board.title"
                  :rules="nameRules"
                  :counter="10"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="board.body" :rules="nameRules" label="Body" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-btn
            color="success"
            justify="center"
            @click="saveBoard()"
            v-if="updateCheck == false"
          >Add</v-btn>
          <v-btn
            color="success"
            justify="center"
            @click="update()"
            v-if="updateCheck == true"
          >Update</v-btn>
        </v-form>
      </div>
      <div style="margin: 50px">
        <List :data="boards" @deleteData="deleteBoard($event)" @editData="getBoard($event)" />
      </div>
    </v-app>
  </div>
</template>

<script>
import { db } from "../firebase";
import List from "../components/list";
export default {
  name: "ToDo",
  components: {
    List
  },
  data: function() {
    return {
      valid: false,
      updateCheck: false,
      boards: [],
      board: {
        body: "",
        title: "",
        name: "",
        id: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      updateBoard: {
        body: "",
        title: "",
        name: ""
      }
    };
  },
  created() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      db.collection("boards")
        .get()
        .then(querySnapshot => {
          console.log("querySnapshot", querySnapshot.docs.length);
          querySnapshot.forEach(doc => {
            let modifyData = {
              name: doc.data().name,
              title: doc.data().title,
              body: doc.data().body,
              id: doc.id
            };
            this.boards.push(modifyData);
          });
        });
    },

    saveBoard() {
      if (
        this.board.name == "" ||
        this.board.title == "" ||
        this.board.body == ""
      ) {
        alert("Fields are empty!!");
      } else {
        db.collection("boards").add(this.board);
        alert("success!");
        this.boards = [];
        this.board = {
          body: "",
          title: "",
          name: "",
          id: ""
        };
        this.getBoards();
      }
    },

    deleteBoard(id) {
      db.collection("boards")
        .doc(id)
        .delete()
        .then(res => {
          console.warn(res);
          alert(" delete success!");
          this.boards = [];
          this.getBoards();
        });
    },

    async getBoard(id) {
      const doc = await db
        .collection("boards")
        .doc(id)
        .get();
      if (doc.exists) {
        this.board = {
          name: doc.data().name,
          title: doc.data().title,
          body: doc.data().body,
          id: id
        };
        this.updateCheck = true;
      }
    },
    update() {
      db.collection("boards")
        .doc(this.board.id)
        .update(this.board)
        .then(res => {
          console.warn(res);
          alert("update success!");
          this.boards = [];
          this.update = false;
          this.getBoards();
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
