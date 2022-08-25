


var routes = [
    { path: '/', name:"Home", component: Home },
    { path: '/about', component: About },
    { path: '/getCust', component: GetCustomer },
    { path: '/tambah_customer', component: tambah_customer },
    { path: '/editCustomer/:id', component: editCustomer },
    { path: '/login', name:'login', component: login },
    { path: '/barang', name:'barang', component: barang },
    { path: '/keranjang', name:'Keranjang', component: Keranjang },
  ];

var router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  });

var app = Vue.createApp({
    data() {
      return {
        judul: 'Belajar Vue 3', 
        authenticated:(localStorage.getItem('status')=='true'?true:false),
        data:[],
      }
    },
    methods: {
      setAuthenticated(status){
        this.authenticated=status
      },
      logout(){
        this.authenticated=false;
        localStorage.clear();
        // this.redirectlogin()
        location.reload();
      },
      redirectlogin(){
        if(!this.authenticated){
          this.$router.replace({name:"login"})
        }
      },
    },
    mounted(){
      this.redirectlogin()
      if(JSON.parse(localStorage.getItem('user'))!=null){
        this.data=JSON.parse(localStorage.getItem('user'))
      }
      this.$store.commit("updateCartFromLocalStorage")
    }
  });

app.use(router);
app.use(store);
app.mount('#app');