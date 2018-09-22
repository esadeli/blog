<template>
  <div>
    <div v-if= "gettoken!== ''">
      <div class="row">
        <div class="col-md3-box">
            <button class="btn btn-secondary">
              <router-link :to="{ name: 'addarticle'}">
                  <font style="color: white">Add Article</font>
              </router-link>
            </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md3-box">
         <h1>Search Articles</h1>

      </div>
    </div>
    <div class="row">
      <div class="col-md3-box">
          <h1>List articles</h1>
          <ul class="list-group" v-for="(article, index) in articleslist" :key="index">
              <li class="list-group-item">
                <router-link :to="{ name: 'id', params: { id: article._id }}">{{ article.title }}</router-link>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Sidemenu',
  props: ['token', 'updatedarticles'],
  data: function () {
    return {
      articleslist: [],
      articledetail: {},
      gettoken: ''
    }
  },
  methods: {
    getdetail (input) {
      this.articledetail = input
    }
  },
  created () {
    let self = this
    axios({
      method: 'GET',
      url: 'http://localhost:3000/articles/lists'
    })
      .then(result => {
        self.articleslist = result.data.data
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  },
  watch: {
    token: function () {
      this.gettoken = this.token
    },
    updatedarticles: function () {
      this.articleslist = this.updatedarticles
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

#addarticle {
  background: white;
}
</style>
