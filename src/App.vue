<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border1px">
      <div class="tab-btn">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-btn">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-btn">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/header/header.vue';

const ERR_NO = 0;
export default {
    name: 'app',
    data() {
        return {
            seller: {}
        };
    },
    created() {
        this.$http.get('/api/seller', {})
      .then((resp) => {
          if (resp.body.errno === ERR_NO) {
              this.seller = resp.body.data;
          }
      }, (err) => {
          console.log(err);
      });
    },
    components: {
        'v-header': header
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/index.styl';
  #app
    .tab
      width:100%
      display:flex
      height:40px
      line-height:40px
      background:#fff
      border_1px(rgba(7,17,27,0.1))
      .tab-btn
        flex: 1
        text-align:center
        & > a
          display:block
          color:rgb(75,85,93)
        & .btn-active
          color:rgb(240,20,20)
</style>
