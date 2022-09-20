<template>
  <div class="task">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>

                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                  <th scope="col">Delete</th>

                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in alls">
                  <td>{{ row.title }}</td>

                  <td>{{ row.status }}</td>
                  <td>
                    <button
                      class="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                      @click.prevent="onView(row.id)"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                      @click.prevent="onDelete(row.id)"
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <!-- Button trigger modal -->
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      @click.prevent="storeTaskId(row.id)"
                      data-target="#exampleModal"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label"
                    >Title</label
                  >
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Title"
                      v-model="Update.title"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label"
                    >Description</label
                  >
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Description"
                      v-model="Update.description"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="status" class="col-sm-2 col-form-label"
                    >Status</label
                  >
                  <div class="col-sm-10">
                    <select
                      class="custom-select"
                      v-model="Update.status"
                      id="inputGroupSelect02"
                    >
                      <option value="completed">completed</option>
                      <option value="pending">pending</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="updateTask()"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "CurrentUserTask",

  data() {
    status: null;
    return {
      alls: null,
      Update: {
        title: null,
        status: null,
        description: null,
        taskId: null,
      },
    };
  },
  methods: {
    onDelete: function (taskId) {
      var data = {
        id: taskId,
      };

      axios
        .post("http://training.test/v1/task/delete", data)
        .then(function (response) {}.bind(this));
      var objIndex = this.alls.findIndex((obj) => obj.id == taskId);

      this.alls.splice(objIndex, 1);
    },
    onTask: function () {
      this.$router.push("Add");
    },
    onView: function (taskId) {
      store.commit("addTask", {
        taskid: taskId,
      });

      this.$router.push("Viewtask");
    },
    Task: function () {
      var userId = localStorage.getItem("id");

      var data = {
        userId: userId,
      };

      axios.post("http://training.test/v1/task/userview", data).then(
        function (response) {
          this.alls = response.data.data;
          
          
        }.bind(this)
      );
    },
    updateTask: function () {
      var data = {
        id: this.Update.taskId,
        title: this.Update.title,
        description: this.Update.description,

        status: this.Update.status,
      };
      var flag = 0;
      axios
        .post("http://training.test/v1/task/update", data)
        .then(function (response) {}.bind(this));

      if (this.Update.title != null) {
        var objIndex = this.alls.findIndex(
          (obj) => obj.id == this.Update.taskId
        );
        this.alls[objIndex].title = this.Update.title;
        flag = 1;
      }
      if (this.Update.description != null) {
        flag = 1;
      }
      if (this.Update.status != null) {
        var objIndex = this.alls.findIndex(
          (obj) => obj.id == this.Update.taskId
        );
        this.alls[objIndex].status = this.Update.status;
        flag = 1;
      }
      if (flag == 1) {
        alert("updated!");
      }
      else {
        alert("cannot be updated")
      }
      this.Update.taskId = null;
      this.Update.title = null;
      this.Update.description = null;
      this.Update.status = null;
    },
    storeTaskId: function (taskId) {
      this.Update.taskId = taskId;
    },
  },

  created: function () {
    this.Task();
  },
};
</script>
 