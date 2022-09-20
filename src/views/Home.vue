<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <br />
      </div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <h1 class="display-3 text-primary">Task Tracker</h1>
      </div>

      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <br />
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Signup</h5>
            <form action="" method="POST">
              <div class="form-group text-left">
                <label for="InputFullname">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter Fullname"
                  required
                  name="name"
                  v-model="Login.name"
                />
              </div>
              <div class="form-group text-left">
                <label for="Inputusername">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter username"
                  required
                  v-model="Login.username"
                />
              </div>
              <div class="form-group text-left">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="Login.password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="onCreate()"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form action="" method="POST">
              <div class="form-group text-left">
                <label for="Inputusername2">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username2"
                  placeholder="Enter username"
                  required
                  v-model="Input.username"
                />
              </div>
              <div class="form-group text-left">
                <label for="exampleInputPassword2">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password"
                  v-model="Input.password"
                />
              </div>
              <button type="submit" class="btn btn-primary" @click="onLogin()">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-2"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "Home",
  data() {
    return {
      Login: {
        name: null,
        username: null,
        password: null,
      },
      Input: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onCreate() {
      var data = {
        name: this.Login.name,
        username: this.Login.username,
        password: this.Login.password,
      };

      var num = 0;
      if(this.Login.name!=null && this.Login.username!=null && this.Login.password!=null){
      axios
        .post("http://training.test/v1/user/register", data)
        .then(function (response) {
          num = response.data.data;

          if (num > 0) {
            alert("user added wait for admin approval");
          } else {
            alert("user not added ");
          }
        });
      }else{
        alert("check input")
      }
      this.Login.name = null;
      this.Login.username = null;
      this.Login.password = null;
    },
    onLogin() {
      var data = {
        username: this.Input.username,
        password: this.Input.password,
      };

      var num = 0;
      axios
        .post("http://training.test/v1/user/login", data)
        .then(
          function (response) {
            try {
              localStorage.setItem("name", response.data.data.name);
              localStorage.setItem("id", response.data.data.id);
              num = response.data.data.id;
            } catch (error) {}
            if (num > 0) {
              localStorage.setItem("status", true);
            } else {
              alert("login failed check username and password");
            }

            store.commit("increment", {
              id: response.data.data.id,
              role: response.data.data.role,
              status: true,
            });

            num = response.data.data.id;

            this.$router.push("dashboard");
          }.bind(this)
        )
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      this.Input.username = null;
      this.Input.password = null;
    },
    redirect() {},
  },
};
</script>
