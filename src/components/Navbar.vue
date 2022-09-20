<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Task Tracker</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link">Add Task </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            @click.prevent="onLogout()"
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  methods: {
    onLogout() {
      console.log("logoutintiated");

      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
