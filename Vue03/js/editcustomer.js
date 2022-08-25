var editCustomer = {
    template: `
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <h2 align="center"> Update Customer </h2>
                <form v-on:submit="simpan(this.$route.params.id)">
    
                    <div class="form-group">
                    <label for="nama_customer">Nama Customer</label>
                    <input v-model="nama_customer" type="text" class="form-control" id="nama_customer">
                    </div>
                    
                    <div class="form-group">
                    <label for="alamat">Alamat</label>
                    <input v-model="alamat" type="text" class="form-control" id="alamat">
                    </div>

                    <div class="form-group">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" class="form-control" id="username">
                    </div>

                    <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                    </div>

                    <input type="submit" value="Submit" class="btn btn-outline-dark">
                </form>
                <div v-if="alert">
                    <div v-bind:class="style_alert">{{message}}</div>
                </div>
            </div>
        </div>
    </div>`,
    data(){
        return {
            nama_customer: '',
            alamat: '',
            username: '',
            password: '',
            alert: false,
            message: '',
            style_alert: '',
        }
    },
    methods:{
        async getdetail(id){
            var option = {
                headers: {'Authorization' : 'bearer ' + localStorage.getItem('token')}
            };
            var res = await axios.get("http://localhost/tokoonline/public/api/detailcustomer/"+id, option);
            this.nama_customer=res.data.nama_customer;
            this.alamat=res.data.alamat;
            this.username=res.data.username;
            this.password=res.data.password;
            console.log(res);
        },
        async simpan(id){
            var data ={
                nama_customer:this.nama_customer,
                alamat:this.alamat,
                username:this.username,
                password:this.password,
            };
            var option = {
                headers: {'Authorization' : 'bearer ' + localStorage.getItem('token')}
            };
            var res = await axios.put("http://localhost/tokoonline/public/api/update_customer/"+id, data, option);
            console.log(res);
            if(res.data.status==true){
                this.alert=true;
                this.message=res.data.message;
                this.style_alert='alert alert-success';
                setTimeout(()=>{
                    this.$router.push('/getCust')
                },2000)
            }else{
                this.alert=true;
                this.message=res.data.message;
                this.style_alert='alert alert-danger';
            }
        }
    },
    mounted(){
        this.getdetail(this.$route.params.id);
    }
};