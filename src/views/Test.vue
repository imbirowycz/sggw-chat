<template>
<div class="test" style="height: 100%; border-bottom: 3px solid blue;">
<div class="scroll">
  
    <input type="text">
    <input type="text">
    <input type="text">
    <input type="text">
    <p>lorem</p>

</div>
</div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            tab: []
        }
    },
    methods: {
        scrollBottom () {
            let z = `<p>Hello</p>`;
            this.tab.push(z)
            let div = document.querySelector('.scroll');
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            })
            
            
        }
    }, 
    mounted()  {
         
        // setInterval( () => {
        //     this.scrollBottom();
        // }, 1000)
    }   
}
</script>
<style lang="scss">
.scroll {
    // height: 100%;
    margin-right: 20px;
    max-height: 100%;
    overflow-y: scroll;
    background-color: red;
}
    
</style>

