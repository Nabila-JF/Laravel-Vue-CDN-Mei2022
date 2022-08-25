var barang = { template: `
<div class="container">
    <div class="card">
        <div class="card-body">
        <a class="btn btn-success" href="#/keranjang">Keranjang</a>
       <Modal :detail="product"/>
            <div class="row">
                <div class="col-md-3" v-for="brng in listbarang" :key="brng.id">
                    <div class="card">
                    <img class="card-img-top" v-bind:src="'http://localhost/toko_online/public/foto_produk/'+brng.foto" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ brng.nama_barang }}</h5>
                            <p class="card-text">{{ brng.deskripsi }}</p>
                            <p class="card-text">Rp. {{ brng.harga }}</p>
                            <p> Cart:
                            <span v-if="getcount(brng)!=null">({{ getcount(brng) }})</span>
                            <span v-else>(0)</span>
                            </p>
                            <a class="btn btn-primary" v-on:click="addToCart(brng)">Add To Cart</a> ||
                            <a class="btn btn-danger" v-on:click="removeItem(brng)">Kurangi</a> <br>
                            <a href="#" v-on:click="viewProduct(brng)" class="btn btn-warning" data-toggle="modal" data-target="#detail_barang">Detail Barang</a> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,

components:{
    Modal 
},

data(){
    return {
        listbarang:[],
        product:null
    }
},

methods: {
    getbarang(){
        var option = {
            headers: {'Authorization' : 'bearer ' + localStorage.getItem('token')}
        };
        axios.get("http://localhost/toko_online/public/api/get_barang", option).then((
            result)=>{
                // console.log(result);
                this.listbarang = result.data
            })
    },
    getcount(produk){
        return this.$store.getters.productQuantity(produk)
    },
    addToCart(produk){
        this.$store.commit('addToCart', produk)
    },
    removeItem(produk){
        this.$store.commit('removeFromProduct',produk)
    },
    viewProduct(produk){
        this.product=produk
    }
},
mounted(){
    this.getbarang();
}
};