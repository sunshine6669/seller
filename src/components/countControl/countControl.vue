<template>
  <div class="countControl">
    <transition name="move">
         <div class="count-reduce" v-show="food.count>0" @click="reduceNum($event)">
            <i class="icon-remove_circle_outline icon-reduce"></i>
         </div>
    </transition>
    <div class="count-show" v-show="food.count>0">{{food.count || 0}}</div>
    <div class="count-add" @click.stop.prevent="addNum($event)">
        <i class="icon-add_circle icon-add"></i>
    </div>
  </div>
</template>

<style lang="stylus" type="text/css">
    .countControl
        font-size :0
        .count-reduce
            display :inline-block
            background :#fff
            width :24px
            height :24px
            vertical-align :top
            border-radius: 50%
            transition :all 0.5s linear
            &.move-enter-active,&.move-leave-active
                opacity :1
                transform :translate3d(0,0,0) rotate(0deg)
             .icon-reduce
                display :inline-block
                line-height :24px
                color :rgb(0,160,220)
                font-size :24px
                transition :all 0.5s linear
                vertical-align :top
            &.move-enter,&.move-leave-active
                transform :translate3d(24px,0,0) rotate(180deg)
                opacity :0
        .count-show
            display :inline-block
            padding :0 4px
            line-height :24px
            font-size :10px
            color :rgb(147,153,159)
            vertical-align: top;
        .count-add
            display :inline-block
            width :24px
            height :24px
            background :#fff
            border-radius :50%
            text-align :center
            vertical-align :top
            .icon-add
                color :rgb(0,160,220)
                font-size :24px
</style>

<script>
    import Vue from 'vue';
    export default {
        name: 'countControl',
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addNum(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    //Vue.set( target, key, value )
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                //console.log(event);
                this.$root.eventHub.$emit('cart.add', event.target);
            },
            reduceNum(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

