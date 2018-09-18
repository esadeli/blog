<template>
    <div class="col-md3-box">
        <h1>List articles</h1>
        <div class="list divScroll">
            <div>
                <h5>Dummy Post 1</h5>
                <h5>Dummy Post 2</h5>
                <h5>Dummy Post 3</h5>
                <h5>Dummy Post 4</h5>
                <h5>Dummy Post 5</h5>
                <h5>Dummy Post 6</h5>
                <h5>Dummy Post 7</h5>
                <h5>Dummy Post 8</h5>
                <h5>Dummy Post 7</h5>
                <h5>Dummy Post 8</h5>
                <h5>Dummy Post 9</h5>
                <h5>Dummy Post 10</h5>
                <h5>Dummy Post 11</h5>
                <h5>Dummy Post 12</h5>
                <h5>Dummy Post 13</h5>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Sidemenu',
  data: function () {
    return {
      articleslist: []
    }
  },
  created () {
    // let self = this
    axios({
      method: 'GET',
      url: 'http://localhost:3000/articles/lists'
    })
      .then(result => {
        console.log('List Articles: ', result)
        //   this.articleslist = result
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
