<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Title</th>
          <th class="text-left">Body</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.title }}</td>
          <td class="text-left">{{ item.body }}</td>
          <td>
            <v-btn color="blue-grey" @click="editItem(item.id)">EDIT </v-btn>
          </td>
          <td>
            <v-btn depressed color="error" @click="deleteItem(item.id)"
              >DELETE
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "List",
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    deleteItem(id) {
      this.$emit("deleteData", id);
    },
    editItem(id) {
      this.$emit("editData", id);
    },
  },
};
</script>
