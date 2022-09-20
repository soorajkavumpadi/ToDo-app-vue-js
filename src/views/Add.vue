<template>
  <div class="container-fluid">
    <Navbar></Navbar>

    <div class="row">
      <div class="col">
        <br />
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Task</h5>
            <form>
              <div class="form-group row">
                <label for="inputtitle" class="col-sm-2 col-form-label"
                  >Title</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Title"
                    v-model="task.title"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputDescription" class="col-sm-2 col-form-label"
                  >Description</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Description"
                    required
                    v-model="task.description"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >Status</label
                >

                <div class="col-sm-10">
                  <select
                    class="custom-select"
                    v-model="task.status"
                    id="inputGroupSelect02"
                  >
                    <option value="completed">completed</option>
                    <option value="pending">pending</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10">
                  <button
                    class="btn my-2 my-sm-0 bg-primary"
                    type="submit"
                    @click.prevent="onadd()"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
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
  name: "Dashboard",
  data() {
    return {
      task: {
        userId: null,
        tilte: null,
        status: null,
        description: null,
      },
    };
  },
  methods: {
    onadd: function () {
      this.task.userId = localStorage.getItem("id");

      var data = {
        userId: this.task.userId,
        title: this.task.title,
        status: this.task.status,
        description: this.task.description,
      };
      
      axios.post("http://training.test/v1/task/create", data).then(
        function (response) {
          if (response.data.data == null) {
            alert("task cannot be added");
          } else {
            alert("task added");
          }
        }.bind(this)
      );
      this.task.title = null;
      this.task.status = null;
      this.task.description = null;
    },
  },
};
</script>