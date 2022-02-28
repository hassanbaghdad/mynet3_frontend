<template>
  <!-- App.vue -->

  <v-app>
    <Drawer/>

    <v-app-bar app dark elevation="5" >
      <v-app-bar-nav-icon @click="$store.state.drawer=!$store.state.drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="f-en">MYNET3</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$vuetify.rtl = !$vuetify.rtl">
        <v-icon>mdi-google-translate</v-icon>
      </v-btn>

      <v-btn icon @click="$vuetify.theme.dark=!$vuetify.theme.dark">
        <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
        <v-icon v-if="!$vuetify.theme.dark">mdi-moon-waning-crescent</v-icon>
      </v-btn>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->

      <v-container fluid>
        <!-----LOADING----->
        <v-sheet elevation="0" v-if="$store.state.loading">
          <div  style="width: 100%;height: 100%;position: absolute;background-color: white;">
            <div  style="width: 100%;height: 100%;position: relative;background-color: white;">
              <div class="d-flex" style="width: 100%;height: 100%;position: absolute;background-color: white;z-index: 2">
                <!--                            <v-progress-circular-->
                <!--                                    class="align-self-center ma-auto"-->
                <!--                                    indeterminate-->
                <!--                                    size="64"-->
                <!--                                    color="primary"-->
                <!--                            ></v-progress-circular>-->
                <div class="container2 text-center ma-auto" style="direction: ltr;">
                  <div class="loading2 text-center ma-auto" >
                    <div class="loading__letter">M</div>
                    <div class="loading__letter">Y</div>
                    <div class="loading__letter" style="color: #ff8a10 !important;">N</div>
                    <div class="loading__letter">E</div>
                    <div class="loading__letter">T</div>
                    <div class="loading__letter">.</div>
                    <div class="loading__letter">.</div>
                    <div class="loading__letter">.</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </v-sheet>
        <!-----LOADING----->


        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from "@/components/Drawer";
export default {
  name: 'App',
  components:{
    Drawer
  },

  data: () => ({
    //
  }),
  created(){
    this.$store.state.drawer = true;
  }
};
</script>
<style>

  .v-list-item__title,.v-select__selections{
    line-height: 30px !important;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #5a5a5a;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: orange;
    border-radius: 10px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
  .f-en{
    font-family: 'Righteous', cursive;
  }
  .f14b{
    font-size: 14px !important;
    font-weight: bold !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f15b{
    font-size: 15px !important;
    font-weight: bold !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f16b{
    font-size: 16px !important;
    font-weight: bold !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f18b{
    font-size: 18px !important;
    font-weight: bold !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f20b{
    font-size: 20px !important;
    font-weight: bold !important;
    font-family: 'Cairo', sans-serif !Important;
  }

  .f14{
    font-size: 14px !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f15{
    font-size: 15px !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f16{
    font-size: 16px !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f18{
    font-size: 18px !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  .f20{
    font-size: 20px !important;
    font-family: 'Cairo', sans-serif !Important;
  }
  /*.v-input input*/
  /*{*/
  /*  transition: .5s linear !important;*/
  /*}*/



  .container2 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading2 {
    display: flex;
    flex-direction: row;
  }

  @import url(https://fonts.googleapis.com/css?family=Audiowide);



  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    40% {
      transform: translateY(-40px);
    }
    80%,
    100% {
      transform: translateY(0px);
    }
  }

  .loading__letter {
    font-size: 88px;
    font-weight: normal;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-family: "Audiowide";
    color: #585555;
  }


  .loading__letter {
    font-size: 88px;
    font-weight: normal;
    letter-spacing: 4px;
    text-transform: uppercase;
    animation-name: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @media only screen and (max-width: 600px) {
    .loading__letter {
      font-size: 60px;
      font-weight: normal;
      letter-spacing: 4px;
      text-transform: uppercase;
      font-family: "Audiowide";
      color: #585555;
    }


    .loading__letter {
      font-size: 60px;
      font-weight: normal;
      letter-spacing: 4px;
      text-transform: uppercase;
      animation-name: bounce;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

  }


  .loading__letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading__letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading__letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loading__letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loading__letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loading__letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loading__letter:nth-child(8) {
    animation-delay: 0.8s;
  }
  .loading__letter:nth-child(9) {
    animation-delay: 1s;
  }
  .loading__letter:nth-child(10) {
    animation-delay: 1.2s;
  }
</style>
