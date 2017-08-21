<template>
   <div class="strawarp">
    <div class="star" :class="starType">
        <span v-for="clsItem in items" class="starItem" :class="clsItem"></span>
    </div>
   </div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'star-on';
    const CLS_OFF = 'star-off';
    const CLS_HALF = 'star-half';
export default {
        name: 'star',
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            items() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let interger = Math.floor(score);
                for (let i = 0; i < interger; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
};
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl';
      .strawarp
        font-size :0
        .star-24
            .starItem
                display :inline-block
                width :10px
                height :10px
                background-size :10px 10px
                margin-right :6px
                &:last-child
                    margin-right :0
                &.star-on
                    bg_icon('star24_on')
                &.star-off
                    bg_icon('star24_off')
                &.star-half
                    bg_icon('star24_half')
        .star-36
            .starItem
                display :inline-block
                width :15px
                height :15px
                background-size :15px 15px
                margin-right :10px
                &:last-child
                    margin-right :0
                &.star-on
                    bg_icon('star36_on')
                &.star-off
                    bg_icon('star36_off')
                &.star-half
                    bg_icon('star36_half')
        .star-48
            .starItem
                display :inline-block
                width :20px
                height :20px
                background-size :20px 20px
                margin-right :20px
                &:last-child
                    margin-right :0
                &.star-on
                    bg_icon('star48_on')
                &.star-off
                    bg_icon('star48_off')
                &.star-half
                    bg_icon('star48_half')
</style>
