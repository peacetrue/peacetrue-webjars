(function () {
    Vue.component('image-display', {
        props: {
            items: {type: Array, required: true}
        },
        template:
            `<ul class="image-display">
                <li v-for="item in items" class="image-display-item">
                    <img :src="item"/>
                </li>                    
             </ul>`
    });
})();