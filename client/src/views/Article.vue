<template>
    <div class="container-fluid">
      <div id="articleBodyCustom">
        <div class="row row-body">
          <Sidemenu id="sideMenuCustom" :token= "token" :updatedarticles= "updatearticleslist"></Sidemenu>
          <router-view :token= "token" :userid= "userid" @result-articles-list= "getarticleslist"></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import Sidemenu from '@/components/Sidemenu.vue'
import Detail from '@/views/Detail.vue'
import AllArticles from '@/views/AllArticles.vue'

export default {
  name: 'Article',
  props: ['sendtoken', 'senduserid'],
  data () {
    return {
      token: '',
      userid: '',
      updatearticleslist: []
    }
  },
  components: {
    Sidemenu, Detail, AllArticles
  },
  methods: {
    getarticleslist (input) {
      this.updatearticleslist = input
    }
  },
  watch: {
    sendtoken: function () {
      this.token = this.sendtoken
    },
    senduserid: function () {
      this.userid = this.senduserid
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

#articleBodyCustom {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 10px;
}

#sideMenuCustom {
  margin-right: 10px;
}
</style>
