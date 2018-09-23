<template>
    <div class="container">
        <div class="col-md-15 box">
            <div class="details">
                <h1>Article Details</h1>
                    <div class="lead">
                        Title : {{ articledata.title }}
                        <br/>
                        <div class=row v-if= "token !== '' && articledata.userId === userid">
                            <hr/>
                            <div class="col-md-10"></div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-warning">
                                  <router-link :to="{ name: 'editarticle', params: { id: articledata._id }}">
                                    <font style="color: white">Edit</font>
                                  </router-link>
                                </button>
                            </div>
                            <div class="col-md-2">
                               <button type="button" class="btn btn-danger" v-on:click= "deletearticle()">Delete</button>
                            </div>
                            <hr/>
                        </div>
                    </div>
                <br/>
                Description :
                <br/>
                <h5>{{ articledata.description }}</h5>
                <br/>
                <br/>
                Commentary Section:
                <hr>
                <div v-if= "commentslist.length !== 0">
                  <ul class="list-group" v-for="(comment,index) in commentslist" :key="index">
                     <li class="list-group-item">{{ comment.content }}</li>
                  </ul>
                </div>
                <div v-else>
                   <p>No comments available</p>
                </div>
                <hr>
                <div v-if= "token !== '' && userid !== ''">
                   <h4>Add comment</h4>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Comment</label>
                            <textarea class="form-control" rows="5" id="comment" placeholder="tell your story here" v-model= "newcomment"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click= "addcomment()">Add Comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detail',
  props: ['id', 'token', 'userid'],
  data () {
    return {
      articleid: '',
      articledata: {},
      commentslist: [],
      newcomment: ''
    }
  },
  methods: {
    // delete individual article
    deletearticle () {
      // Note: it's not necessary to put this validation since we have hide the button
      // yet double validation is better
      if (this.articledata.userId === this.userid) {
        let self = this
        axios({
          method: 'delete',
          url: `http://localhost:3000/articles/delete/${self.id}`,
          headers: {
            token: self.token
          }
        })
          .then(article => {
            this.$router.push({ path: '/articles' })
          })
          .catch(error => {
            console.log('ERROR: ', error)
          })
      }
    },

    // add new comment
    addcomment () {
      let self = this
      axios({
        method: 'POST',
        url: `http://localhost:3000/comments`,
        headers: {
          token: self.token
        },
        data: {
          content: self.newcomment,
          articleId: self.id
        }
      })
        .then(comment => {
          this.$router.push({ path: `/articles/${self.id} `})
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
    }
  },
  watch: {
    id: function (val) {
      this.articleid = val

      // get data
      let self = this
      axios({
        method: 'GET',
        url: `http://localhost:3000/articles/details/${this.articleid}`
      })
        .then(result => {
          self.articledata = result.data.data
          self.commentslist = result.data.data.commentsList
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
    }
  }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    font-family: Quicksand, Arvo, Amiri,Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

body {
    padding-top: 65px;
  }

.navbar-right p {
float: right;
line-height: 50px;
color: white;
margin-left: 10px;
margin-bottom: 0px;
}

.row {
    display: flex;
}

.row > div {
flex: 1;
/* border: 1px solid grey; */
margin-top:10px;
}

.row-body {
height: 100vw;
}

.row-body .box {
border-right: 1px solid #eee;
}

.row-body div:last-child {
border-right: none;
}

input.search {
    margin-bottom: 10px;
}

.divScroll {
    height: 300px;
    overflow-y:scroll;
    overflow-x:hidden;
    width: 50%;
}

.divScrollDetails {
    height: 500px;
    overflow-y:scroll;
    overflow-x:hidden;
}

.details {
    background: rgb(155, 223, 181);
    width: 800px;
    border-radius: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
