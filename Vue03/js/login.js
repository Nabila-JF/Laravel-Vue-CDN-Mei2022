var login = {
    template: `
    <div class="col-md-4" style="margin:100px auto">
        <div class="card">
            <div class="card-body">
                <h4 align="center">Halaman Login</h4>
                Email:
                <input type="email" name="email" class="form-control" v-model="email">
                Password:
                <input type="password" name="password" class="form-control" v-model="password"><br>
                <input type="button" value="LOGIN" v-on:click="login()" class="btn btn-success">
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        async login(){
            var data = {email:this.email,password:this.password};
            try {
                var res = await axios.post("http://localhost/toko_online/public/api/login",data);
                console.log(res);
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('user',JSON.stringify(res.data.user));
                localStorage.setItem('status',true);

                this.auntheticated = true;
                this.$router.replace({name: "Home"})
                location.reload()
            } catch(error){
                alert("Password Salah")
            }
        }
    },
    mounted(){
        if(localStorage.getItem('status')=='true'){
            this.$router.replace({name:"Home"})
          }
    }
}