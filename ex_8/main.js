//Create a new component for product-details with a prop of details. 
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

// register the component like this  Vue.component('product', {  
// The first argument is the name we choose for the component
// the second is an options object
Vue.component('product', {  
// Props are essentially variables that are waiting to be filled with the data its parent sends down into it  
  props: {
// There is built-in props validation, where we’re specifying the data type of the premium prop as Boolean, and making it required    
    premium: {
      type: Boolean,
      required: true
    }
  },
  // template is a property to specify its HTML.
  // Inside that options object, add our template.
  // Use a template literal, with back ticks.
  // a component’s template should only return one element.
  template: `   
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{  title  }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          
          <product-details :details="details"></product-details>

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

          <div class="cart">
            <p>Cart({{ cart }})</p>
          </div>

       </div>  
    
    </div>
   `,

   // Since data is now a function that returns a data object, each component will definitely have its own data. 
   // If data weren’t a function, each product component would be sharing the same data everywhere it was used
   // defeating the purpose of it being a reusable component.
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
            variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ],
        cart: 0
    }
  },
    methods: {
      addToCart: function() {
          this.cart += 1
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
      premium: false
    }
})