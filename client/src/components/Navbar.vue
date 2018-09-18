<template>
    <div class="container headerNavbar">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Blogger Qeren</a>
                    <div class="navbar-brand">
                        <div class="row">
                            <div class = "col-md-3">
                                <div class="userRegistration">
                                    <button class="btn btn-secondary" data-toggle="modal" data-target="#userRegister" >Register</button>
                                </div>
                            </div>
                            <div class="col-md-1">
                            </div>
                            <div class="col-md-3">
                                <div class="userNormalLogin">
                                    <button class="btn btn-secondary" data-toggle="modal" data-target="#userLogin" >Login</button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class ="logout">
                                    <button class="btn btn-secondary" onclick="logout()" >Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
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
