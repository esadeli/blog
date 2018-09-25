<template>
    <div>
        <div class="container headerNavbar">
            <div class="row">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container">
                        <div class="navbar-brand">
                           <div class="row">
                               <div class="col-md-6">
                                  <router-link :to="{name: 'allarticles'}" style="color: white">Blogger Qeren</router-link>
                               </div>
                               <div class="col-md-6">
                                  <div v-if= "token !== '' && namelengkap !== ''">
                                      Welcome {{ namelengkap }}!
                                  </div>
                               </div>
                           </div>
                        </div>
                        <div class="navbar-brand">
                            <div class="row">
                                <div v-if= "namelengkap === '' ">
                                    <div class="row">
                                        <div class = "col-md-3">
                                            <div class="userRegistration">
                                                <button class="btn btn-secondary" data-toggle="modal" data-target="#registerUser" >Register</button>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                        </div>
                                        <div class="col-md-3">
                                            <div class="userNormalLogin">
                                                <button class="btn btn-secondary" data-toggle="modal" data-target="#loginUser" id="login">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="col-md-3">
                                        <div class ="logout">
                                            <button class="btn btn-secondary" v-on:click="logout()" >Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <!-- MODAL SECTION -->
        <!-- Modal Login -->
        <div class="modal fade" id="loginUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="error.length !== 0">
                            <div class="alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> {{ error }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Email :  </label>
                                </div>
                                <div class="col-md-2">
                                    <input v-model="email"  type="text" placeholder="email">
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Password :  </label>
                                </div>
                                <div class="col-md-2">
                                    <input v-model="password" type="password" placeholder="password">
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" v-on:click="loginToSite()" class="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Register -->
        <div class="modal fade" id="registerUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="error.length !== 0">
                            <div class="alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> {{ error }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Name :  </label>
                                </div>
                                <div class="col-md-2">
                                    <input v-model="namelengkap"  type="text" placeholder="name">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Email :  </label>
                                </div>
                                <div class="col-md-2">
                                    <input v-model="email"  type="text" placeholder="email">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Password :  </label>
                                </div>
                                <div class="col-md-2">
                                    <input v-model="password" type="password" placeholder="password">
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" v-on:click="registerToSite()" class="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      email: '',
      password: '',
      token: '',
      error: '',
      userId: '',
      namelengkap: ''
    }
  },
  methods: {
    loginToSite () {
      // console.log(this.email, this.password)
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
          email: self.email,
          password: self.password
        }
      })
        .then(response => {
          let jwttoken = response.data.token
          // get user credentials
          axios({
            method: 'GET',
            url: 'http://localhost:3000/users/details',
            headers: {
              token: jwttoken
            }
          })
            .then(user => {
              //   console.log('USER awal-->', user.data.data)
              self.userId = user.data.data.id
              self.namelengkap = user.data.data.name
              // empty the password
              self.password = ''
              localStorage.setItem('token', jwttoken)
              self.token = localStorage.getItem('token')

              // emit back to parent
              this.$emit('result-token', self.token)
              this.$emit('result-user-id', self.userId)
              this.$emit('result-name-lengkap', self.namelengkap)

              // hide the login page
              // warning only will not stop the operation of client
              $('#loginUser').modal('hide')
              // immediate redirect to articles after login
              this.$router.push({ path: '/articles' })
            })
            .catch(error => {
              self.error = error
            })
        })
        .catch(error => {
          self.error = JSON.stringify(error.response.data.msg)
        })
    },
    registerToSite () {
      let self = this
      //   console.log('Data awal-->', self.namelengkap, self.email, self.password)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
          name: self.namelengkap,
          email: self.email,
          password: self.password
        }
      })
        .then(response => {
        //   console.log('REGISTER-->', user)
          let jwttoken = response.data.token
          // get user credentials
          axios({
            method: 'GET',
            url: 'http://localhost:3000/users/details',
            headers: {
              token: jwttoken
            }
          })
            .then(user => {
              self.userId = user.data.data.id
              self.namelengkap = user.data.data.name
              // empty the password
              self.password = ''
              localStorage.setItem('token', jwttoken)
              self.token = localStorage.getItem('token')

              // emit back to parent
              this.$emit('result-user-id', self.userId)
              this.$emit('result-name-lengkap', self.namelengkap)
              this.$emit('result-token', self.token)
              // hide the register page
              $('#registerUser').modal('hide')
              // immediate redirect to articles after register
              this.$router.push({ path: '/articles' })
            })
            .catch(error => {
              self.error = error
            })
        })
        .catch(error => {
          // handling for email error only
          self.error = error.response.data.msg.errors.email.message
        })
    },
    logout () {
      this.userId = ''
      this.namelengkap = ''
      this.email = ''
      this.password = ''
      this.gettoken = ''
      localStorage.removeItem('token')
    //   localStorage.setItem('token', '')
      this.$router.push({ path: '/articles' })
    }
  },
  watch: {
    token: function () {
      this.token = localStorage.getItem('token')
    },
    namelengkap: function () {
      this.namelengkap = this.namelengkap
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
