<template>
  <div class="goods">
    <div class="menuWarp" ref="menuScroll">
      <ul>
        <li v-for="(menu,index) in goods" class="menuItem" @click="_selectMenu(index,$event)" :class="{currentCur:index==currentIndex}"><span class="goodText"><span class="goods-icon" v-if="menu.type>0" :class="activeIcon[menu.type]"></span>{{menu.name}}</span></li>
      </ul>
    </div>
    <div class="foodWarp" ref="foodScroll">
      <ul>
        <li v-for="item in goods" class="food-list-hook">
           <h2 class="fdTitle">{{item.name}}</h2>
            <ul class="fdUl">
              <li v-for="str in item.foods" class="fdList"  @click="showDetail(str,$event)">
                  <div class="fdlPic"><img :src="str.icon" alt="" /></div>
                  <div class="fdlDesc">
                    <h3>{{str.name}}</h3>
                    <p v-show="str.description" class="description">{{str.description}}</p>
                    <p class="mouthSell"><span class="sellCount">月售{{str.sellCount}}份</span><span class="ratings">好评率{{str.rating}}%</span></p>
                    <p><span class="price">￥{{str.price}}</span><span v-show="str.oldPrice" class="oldPrice">￥{{str.oldPrice}}</span></p>
                    <div class="countWarp">
                        <v-countControl :food='str'></v-countControl>
                    </div>
                  </div>
              </li>              
            </ul>
        </li>
      </ul>
    </div>
    <v-shopCart ref="shopCart" :selectFood ="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" ></v-shopCart>
    <v-food :food="selectedFood"  ref="liItem"></v-food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCart from 'components/shopCart/shopCart';
import countControl from 'components/countControl/countControl';
import food from 'components/food/food';
const ERR_OK = 0;
export default {
    name: 'goods',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            scollHeight: 0,
            listHeight: [],
            selectedFood: {}
        };
    },
    created() {
        this.activeIcon = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        this.$http.get('/api/goods', {})
      .then((resp) => {
          //console.log(resp);
          if (resp.body.errno === ERR_OK) {
              this.goods = resp.body.data;
              this.$nextTick(() => {
                  this._initScroll();
                  this._cacluteHeight();
              });
          }
      })
      .then((error) => {
          console.log(error);
      });
        this.$root.eventHub.$on('cart.add', (target) => {
            this._drop(target);
        });
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scollHeight >= height1 && this.scollHeight < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFood() {
            let foods = [];
            this.goods.forEach(function(good) {
                good.foods.forEach(function(food) {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    components: {
        'v-shopCart': shopCart,
        'v-countControl': countControl,
        'v-food': food
    },
    methods: {
        _selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
            });
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
                click: true,
                'probeType': 3
            });

            this.foodScroll.on('scroll', (pos) => {
                this.scollHeight = Math.abs(Math.round(pos.y));
            });
        },
        _cacluteHeight() {
            let liHeight = 0;
            this.listHeight.push(liHeight);
            let liList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
            for (let i = 0; i < liList.length; i++) {
                liHeight += liList[i].clientHeight;
                this.listHeight.push(liHeight);
            }
        },
        _drop(target) {
            //异步执行优化体验
            this.$nextTick(() => {
                this.$refs.shopCart.drop(target);
            });
        },
        showDetail(food, event) {
            if (!event._constructed) {
                return;
            }
            this.selectedFood = food;
            this.$refs.liItem.show();
        }
    }
};
</script>

<style lang="stylus" type="text/css">
  @import '../../common/stylus/mixin.styl';
    .goods
      position :absolute
      top :175px
      bottom :40px
      display :flex
      width :100%
      .menuWarp
        flex :0 0 80px
        width :80px
        background :#f3f5f7
        overflow :hidden
        .menuItem
          display :table
          height :54px
          width :56px
          padding :0 12px
          text-align: center;
          &.currentCur
            background:#fff
            color :#333
            line-height :14px
            font-weight :700
            position :relative
            z-index :100
            margin-top :-1px
            .goodText
                border_none()
          .goods-icon
              width:12px
              height:12px
              display:inline-block
              background-size:12px 12px
              margin-right:2px
              vertical-align: top;
              &.decrease
                  bg_icon('decrease_3')
              &.discount
                  bg_icon('discount_3')  
              &.guarantee
                  bg_icon('guarantee_3') 
              &.invoice
                  bg_icon('invoice_3') 
              &.special
                  bg_icon('special_3')
          .goodText
              display :table-cell
              font-size :12px
              font-weight :200
              line-height :14px
              width :56px
              border_1px(rgba(7,17,27,0.1))
              vertical-align :middle
        .menuItem:last-child
           .goodText
              border_none()   
      .foodWarp
        overflow :hidden
        flex: 1;
        .fdTitle 
            height :26px
            line-height :26px
            background :#f3f5f7
            font-size :12px
            color :rgb(147,153,159)
            &::before
                content :""
                background :#d9dde1
                display :inline-block
                width :2px
                height :100%
                vertical-align: top;
                margin-right :14px
        .fdUl
            padding 0 18px
            .fdList
                display: flex;
                font-size :0
                padding :18px 0
                border_1px(rgba(7,17,27,0.1))
                .fdlPic
                    display :inline-block
                    margin-right :10px
                    vertical-align: top
                    width :57px
                    height :57px
                    &>img
                        width :100%
                        height :100%
                .fdlDesc
                  font-size :10px
                  flex: 1;
                  position :relative
                  &>.countWarp
                    position :absolute
                    right :0
                    bottom :-6px
                  &>h3
                   font-size :14px
                   color :rgb(7,17,27)
                   line-height :14px
                  &>.description
                    margin :8px 0 0
                  &>.mouthSell
                     margin :8px 0
                    .sellCount,.ratings
                        font-size :10px
                        color :rgb(147,153,149)
                        line-height :10px
                        margin-right :12px
                  .price
                    font-size :14px
                    color :red
                    font-weight :700
                    line-height :14px
                    margin-right :8px
                  .oldPrice
                    text-decoration :line-through
                    font-weight :700
             .fdList:last-child:after
                border-bottom :0
</style>