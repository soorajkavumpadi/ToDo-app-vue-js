<template>
  <div class="container-fluid">
    <Navbar></Navbar>

    <div class="row">
      <div class="col">
        <br />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card" style="width: 45rem">
          <div class="card-body">
            <h5>Search Task</h5>
            <form action="" method="POST">
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >Name</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Creator Name"
                    v-model="Search.name"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >Task Titile</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Task Title"
                    v-model="Search.title"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >Task Status</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Task Status"
                    v-model="Search.status"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >From</label
                >
                <div class="col-sm-10">
                  <input
                    type="date"
                    class="form-control"
                    id="Fromdate"
                    placeholder="From Date"
                    v-model="Search.fromdate"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"
                  >To</label
                >
                <div class="col-sm-10">
                  <input
                    type="date"
                    class="form-control"
                    id="Todate"
                    placeholder="To Date"
                    v-model="Search.todate"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10">
                  <button
                    class="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                    @click.prevent="onFilter()"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col"></div>
    </div>

    <div class="row">
      <div class="col">
        <br />
      </div>
    </div>
    <div class="row">
      <div class="col-8"></div>
      <div class="col-2"></div>

      <div class="col-2">
        <button type="button" class="btn btn-primary" @click.prevent="onTask()">
          Add Task
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Creator</th>
                  <th scope="col">status</th>
                  <th scope="col">view</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in alls">
                  <td>{{ row.title }}</td>
                  <td>{{ row.userName }}</td>
                  <td>{{ row.status }}</td>

                  <td>
                    <button
                      class="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                      @click="onView(row.id)"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form class="form-inline" action="" method="POST">
          <div class="form-group mb-2">
            <label for="staticEmail2">Total pages:{{ totalpageno }}</label>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <label for="inputPage">Select Page:</label>
            <input
              type="text"
              class="form-control"
              id="inputPageno"
              v-model="Search.page"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary mb-2"
            @click.prevent="onFilter()"
          >
            Show
          </button>
        </form>
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
      alls: null,
      totalpageno: 1,

      Search: {
        name: null,
        tilte: null,
        status: null,
        fromdate: null,
        todate: null,
        page: 1,
      },
    };
  },
  methods: {
    onTask: function () {
      this.$router.push("Add");
    },
    onView: function (taskId) {
      store.commit("addTask", {
        taskid: taskId,
      });

      this.$router.push("Viewtask");
    },
    onFilter: function () {
      
      var flag = 1;

      var data = {
        name: this.Search.name,
        title: this.Search.title,
        status: this.Search.status,
        fromDate: this.Search.fromdate,
        toDate: this.Search.todate,
        page: this.Search.page,
      };
      if (this.Search.fromdate != null) {
        var date1 = new Date(this.Search.fromdate);

        var date3 = Date.now();
        if (date1 > date3) {
          alert("From date is invalid");
          flag = 0;
        }
        if (this.Search.todate != null) {
          var date2 = new Date(this.Search.todate);
          if (date1 > date3 || date1 > date2) {
            alert("date is invalid");
            flag = 0;
          }
        }
      }
      if (flag == 1) {
        axios.post("http://training.test/v1/task/search", data).then(
          function (response) {
            
            this.alls = response.data.data;
            this.totalpageno = this.alls[this.alls.length - 1];
            //this.totalpageno=end(response.data.data)

            this.alls.pop();
          }.bind(this)
        );
      }
      this.Search.name = null;
      this.Search.title = null;
      this.Search.status = null;
      this.Search.fromdate = null;
      this.Search.todate = null;
    },
  },
  created: function () {
    this.onFilter();
  },
};
</script>