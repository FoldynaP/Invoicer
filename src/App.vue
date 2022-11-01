<template>
 <div v-if="invoicesLoaded">
   <div v-if="!mobile" class="app flex flex-column" :class="{light : lightTheme}">
      <Navigation v-if="$route.name !== 'Login' && $route.name !== 'Register'" />
      <div class="app-content flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
   </div>
   <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on mobile devices</h2>
      <p>To use this app use computer or tablet</p>
   </div>
 </div>
</template>

<script>
import Navigation from "./components/Navigation";
import InvoiceModal from "./components/InvoiceModal";
import Modal from "./components/Modal";
import { mapState, mapActions } from "vuex";
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  data () {
    return {
      mobile: null,
      uid: null,
    };
  },
  setup () {
    const router = useRouter();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (!currentUser) {
          router.replace('/Login');
        } 
        else {
          router.replace('/');
        }
      });
    });
  },
  components: {
    Navigation,
    InvoiceModal,
    Modal,
  },
  created () {
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    ...mapActions(['GET_INVOICES']), 
    
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true; 
        return;
      }
      this.mobile = false;
    }
  },
  computed: {
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded", "lightTheme"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.app {
  background-color: #141625;
  min-height: 100vh;
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }
}
.app.light {
  background-color: #959fe9;
}
.app-content {
  padding: 0 20px;
  margin-left: 110px;
  flex: 1;
  position: relative;
}
.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

//animated invoice modal

.invoice-enter-active,
.invoice-leave-active {
  transition: .5s ease all;
}
.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

//inputs

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

// ICONS
.icon {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.icon-svg {
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: currentColor;
    pointer-events: none;
    transform: translateZ(0);
    vertical-align: middle;
}
</style>
