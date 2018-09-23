<template>
    <div>
        <div v-if= "submissionok === true">
            <router-view></router-view>
        </div>
        <div v-if = "submissionok === false">
            <div class="container">
                <div class="col-md-15 box">
                    <div class="details">
                        <h1>Bagikan Cerita Kamu</h1>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model= "title" placeholder="Title">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Description</label>
                                <textarea class="form-control" rows="5" id="comment" placeholder="tell your story here" v-model= "description"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click= "createArticle()">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['token'],
  data () {
    return {
      gettoken: '',
      title: '',
      description: '',
      error: '',
      submissionok: false
    }
  },
  methods: {
    createArticle: function () {
    //   console.log('Create Article-->', inputTitle, inputDescription)
      let self = this
      this.gettoken = this.token
      axios({
        method: 'POST',
        url: 'http://localhost:3000/articles/',
        headers: {
          token: self.gettoken
        },
        data: {
          title: self.title,
          description: self.description
        }
      })
        .then(article => {
          // change a parameter that proof this is successful
          self.submissionok = true
          this.$router.push({ path: '/articles' })
        })
        .catch(error => {
          self.error = error
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
