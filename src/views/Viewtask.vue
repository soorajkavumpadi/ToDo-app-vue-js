<template>
  <div class="container-fluid">
    <Navbar></Navbar>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col">
            <p class="text-left">Title:{{ alls.title }}</p>
            <p class="text-left">Created by:{{ alls.userName }}</p>
            <p class="text-left">Status:{{ alls.status }}</p>
            <p class="text-left">Description:{{ alls.description }}</p>
          </div>
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <div class="row">
      <div class="col">
        <form action="" method="POST">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">comment</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="comment"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" @click.prevent="addcomment()">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul id="example">
          <template v-for="row in alls.comments">
            
              <div class="card">
                <div class="card-header text-left">
                  {{ row.userName }} commented at {{ row.createdDate }}
                </div>
                <div class="card-body">
                  <p class="card-text">{{ row.comment }}</p>
                  <form class="form-inline float-right">
                    <div class="form-group mx-sm-3 mb-2">
                      <input
                        type="text"
                        class="form-control"
                        id="newdata"
                        v-model="reply"
                        placeholder="Reply message"
                        required
                      />
                      <button
                        class="btn btn-primary my-2 my-sm-0"
                        type="submit"
                        @click.prevent="addCommentReply(row.id)"
                      >
                        Reply
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <comment
                v-bind:key="row.id"
                v-bind:pid="row.id"
               
              >
              </comment>
            
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { store } from "../store";
import comment from "../components/comment.vue";
export default {
  name: "Viewtask",
  components: {
    comment,
  },
  data() {
    reply: null;
    return {
      alls: null,
      taskId: null,
      cmnt: null,
      parentId: null,
      userId: null,
      allComments: null,
      row: null,
      pid: null,
      id: 0,
      replyId: 0,
      comment: null,
    };
  },
  methods: {
    addCommentReply: function (parentId) {
      if (this.reply != null) {
        console.log(this.reply);

        

        var taskId = store.getters.getTaskId;

        var parentId = parentId;

        var userId = localStorage.getItem("id");

        var replyData = {
          taskId: taskId,
          userId: userId,
          commentId: parentId,
          comment: this.reply,
        };
        axios.post("http://training.test/v1/task/addcomment", replyData).then(
          function (response) {
            try {
              this.id = response.data.data.id;
              
            } catch (error) {}
            if (this.id > 0) {
              var newData = {
                id: this.id,

                name: localStorage.getItem("name"),
                comment_id: parentId,
                comment: this.reply,
                created_date: new Date(),
              };
              try {
                this.alls.comments.push(newData);
              } catch (error) {}
              this.reply = null;
            } else {
              alert("reply cannot be added");
              this.reply = null;
            }
          }.bind(this)
        );
      } else {
        alert("enter reply message ");
      }
    },

    addcomment: function () {
      console.log(this.comment)
      if (this.comment != null) {
        var taskId = store.getters.getTaskId;

        

        var userId = localStorage.getItem("id");

        var data = {
          taskId: taskId,
          userId: userId,
          commentId: 0,
          comment: this.comment,
        };

        axios.post("http://training.test/v1/task/addcomment", data).then(
          function (response) {
            try {
              console.log(response)
              this.id = response.data.data.id;
              
            } catch (error) {}
            if (this.id > 0) {
              var newData = {
                id: this.id,

                userName: localStorage.getItem("name"),
                comment_id: 0,
                comment: this.comment,
                createdDate: new Date(),
              };
              try {
                this.alls.comments.push(newData);
              } catch (error) {
                this.viewcomment();
              }
              this.comment = null;
            }
            this.comment = null;
          }.bind(this)
        );
      } else {
        alert("enter the comment to submit");
      }
    },

    displaytask: function () {
      var taskId = store.getters.getTaskId;
      var data = {
        id: taskId,
      };

      axios.post("http://training.test/v1/task/view", data).then(
        function (response) {
          
          this.alls = response.data.data[0];
          console.log(this.alls.comments)
        }.bind(this)
      );
      this.cmnt = null;
    },

    
  },
  created: function () {
    this.displaytask();
    
  },
};
</script>