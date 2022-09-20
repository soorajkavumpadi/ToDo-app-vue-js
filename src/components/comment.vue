

<template>
  <div class="container">

  <div :style="nodeMargin">
          
          <template v-for="row in reply">
            
              <div class="card">
                <div class="card-header text-left">
                  {{ row.name }} Replied at {{ row.created_date }}
                </div>
                <div class="card-body">
                  <p class="card-text">{{ row.comment }}</p>

                  <form class="form-inline float-right">
                    <div class="form-group mx-sm-3 mb-2">
                      <input
                        type="text"
                        class="form-control"
                        id="reply"
                        v-model="replies"
                        placeholder="Reply message"
                      />
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                        @click.prevent="addComment(row.id)"
                      >
                        Reply
                      </button>
                    </div>
                  </form>
                </div>
                <div></div>
              </div>

              <comment
                v-bind:key="row.id"
                v-bind:pid="row.id"
                
                v-bind:spacing="spacing + 10"
              >
              </comment>
            
          </template>
        </div>
      </div>
  
        
</template>





<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "comment",
  props: {
    
    spacing: {
      type: Number,
      default: 0,
    },
    pid: {
      type: String,
    },
  },
  data() {
    
replies: null;
    return {
      
      taskId: null,
      reply:null,

      parentId: null,
      userId: null,
      id: 0,
    };
  },

  computed: {
    nodeMargin() {
      return {
        "margin-left": `${this.spacing}px`,
      };
    },
  },
  methods: {
    viewcomment: function () {
      var commentId = this.pid;
      
      var data = {
        commentId: commentId,
      };

      axios.post("http://training.test/v1/task/viewcomment", data).then(
        function (response) {
          this.reply=response.data.data
          
          
        }.bind(this)
      );
    },
    addComment: function (parentId) {
     
      if (this.replies != null) {
        

        var taskId = store.getters.getTaskId;

        var userId = localStorage.getItem("id");

        var data = {
          taskId: taskId,
          userId: userId,
          commentId: parentId,
          comment: this.replies,
        };

        

        axios.post("http://training.test/v1/task/addcomment", data).then(
          function (response) {
            console.log(response)
            try {
              this.id = response.data.data.id;
              console.log(this.id)

              
            } catch (error) {}
            if (this.id > 0) {
              var newReplyData = {
                id: this.id,

                name: localStorage.getItem("name"),
                comment_id: parentId,
                comment: this.replies,
                created_date: new Date(),
              };
              try {
                this.reply.push(newReplyData);
                console.log(this.reply)
              } catch (error) {}
              this.replies = null;
            } else {
              alert("reply cannot be added");
              this.replies = null;
            }
          }.bind(this)
        );
      } else {
        alert("enter reply message");
      }
    },
  },
  created: function(){
    this.viewcomment();
  }
};
</script>