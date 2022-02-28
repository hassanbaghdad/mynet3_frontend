import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    rtl:true,
    theme:{
        themes:{
            light:{
                cardtitle:'#8071a1',
                cardtitleblack:'#35383a'
            }
        }
    }
});
