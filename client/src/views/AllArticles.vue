<template>
 <div class="container">
    <br/>
    <br/>
    <div class="col-md-15 box">
        <h1>Article Newsfeed</h1>
        <div v-for="(articledata, index) in articleslist" :key="index">
            <div class="details">
                <p class="lead">
                Title : {{ articledata.title }}
                </p>
                <br/>
                Description :
                <br/>
                <h5>{{ articledata.description }}</h5>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AllArticles',
  data () {
    return {
      articleslist: []
    }
  },
  created () {
    let self = this
    axios({
      method: 'GET',
      url: 'http://localhost:3000/articles/lists'
    })
      .then(result => {
        // console.log('List Articles: ', result.data.data)
        self.articleslist = result.data.data
        this.$emit('result-articles-list', self.articleslist)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
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
