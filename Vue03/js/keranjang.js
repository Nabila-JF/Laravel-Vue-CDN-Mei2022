var Keranjang = {
    template: `
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h2 align="center">List di Cart</h2>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in getcart" :key="cart.id">
                            <td>{{cart.nama_barang}}</td>
                            <td>{{cart.quantity}}</td>
                            <td>Rp. {{cart.quantity*cart.harga}}</td>
                            <td><button class="btn btn-danger" v-on:click="removeItem(cart)">X</button>
                            <button class="btn btn-primary" v-on:click="addToCart(cart)">Add</button></td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary" v-on:click="simpan_db()">CHECKOUT</button>
            </div>
        </div>
    </div>
    `,
    computed:{
        getcart(){
            return this.$store.getters.cartItems
        },
    },
    methods: {
        simpan_db(){
            var option = {
                headers:{
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            };
            var data={
                datapost: this.$store.getters.cartItems
            }
            axios.post("http://localhost/toko_online/public/api/storecarttodb", data, option).then((result)=>{
                if(result.data.status==true){
                    alert(result.data.message)
                    this.$store.commit('reset')
                    this.$router.push('/barang')
                }
            })
        },
        addToCart(produk){
            this.$store.commit('addToCart', produk)
        },
        removeItem(produk){
            this.$store.commit('removeFromProduct',produk)
        },
    }
}