//Add a button that removes the product from the cart array by emitting an event with the id of the product to be removed.

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div> 

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

          <button v-on:click="removeFromCart" 
            >
          Remove from cart
          </button>

      </div>  
    
    </div>
   `,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ]
    }
  },
    methods: {
      addToCart: function() {
//  @add-to-cart is essentially a radio that can receive the event emission from when the “Add to Cart” button was clicked.
//  Since this radio is on product, which is nested within our root instance, the radio can blast the announcement that a click happened, 
//  which will trigger the updateCart method, which lives on the root instance.    
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },

      removeFromCart: function() {
          this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
      },

      updateProduct: function(index) {  
          this.selectedVariant = index
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },

//  Now when our button is pressed, it triggers addToCart, which emits an announcement. 
//  Our root instance hears the announcement through the radio on its product component, 
//  and the updateCart method runs, which push the product’s id into our cart array.
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },

      removeItem(id) {
        for(var i = this.cart.length - 1; i >= 0; i--) {
          if (this.cart[i] === id) {
             this.cart.splice(i, 1);
             // The splice() method adds/removes items to/from an array, and returns the removed item(s).
             // array.splice(index, howmany, item1, ....., itemX)
             // index : Required. An integer that specifies at what position to add/remove items, 
             //   Use negative values to specify the position from the end of the array
             // howmany : Optional. The number of items to be removed. If set to 0, no items will be removed
             // item1, ..., itemX : Optional. The new item(s) to be added to the array

          }
        }
      }
    }
})