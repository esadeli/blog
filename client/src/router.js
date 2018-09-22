import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About'
import Detail from './views/Detail.vue'
import Article from './views/Article.vue'
import AllArticles from './views/AllArticles.vue'
import FormArticle from './views/FormArticle.vue'
import EditForm from './views/EditForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Article
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: Article,
      children: [
        {
          path: '/',
          name: 'allarticles',
          component: AllArticles
        },
        {
          path: '/articles/add',
          name: 'addarticle',
          component: FormArticle
        },
        {
          path: ':id',
          name: 'id',
          component: Detail,
          props: true
        },
        {
          path: 'edit/:id',
          name: 'editarticle',
          component: EditForm,
          props: true
        }]
    }
  ]
})
