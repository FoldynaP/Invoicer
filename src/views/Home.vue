<template>
  <div class="home" @click="closeFilter" ref="filter">
    <HeaderNavigation/>
    <div class="container">
      <!-- Header -->
      <div class="header flex">
        <div class="left flex flex-column">
          <h1>Invoices</h1>
          <span>There are {{ invoiceData.length }} total invoices</span>
        </div>
        <div class="right flex">
          <div @click="toggleFilterMenu"  class="filter flex">
              <span>Filter by status <span v-if="filteredInvoice">: {{filteredInvoice}}</span></span>
              <img :class="{ active: filterMenu}" src="@/assets/icon-arrow-down.svg" alt="">
              <ul v-show="filterMenu" class="filter-menu">
                <li @click="filteredInvoices">Draft</li>
                <li @click="filteredInvoices">Pending</li>
                <li @click="filteredInvoices">Paid</li>
                <li @click="filteredInvoices">Clear Filter</li>
              </ul>
          </div>
          <div @click="newInvoice" class="button flex">
            <div class="inner-button flex">
              <img src="@/assets/icon-plus.svg" alt="">
            </div>
            <span>New Invoice</span>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="search">
        <div class="input flex flex-column">
          <input placeholder="Search invoice..." id="search" type="text" v-model="search">
          <img class="search-icon" src="@/assets/search.svg" alt="">
        </div>  
      </div>
      <!-- Invoices -->
      <div v-if="invoiceData.length > 0" class="invoice-wrap">
        <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />
      </div>
      <div v-else class="empty flex flex-column">
        <img src="@/assets/illustration-empty.svg" alt="">
        <h3>There is nothing here</h3>
        <p>Create a new invoice by clicking the "New invoice" button and get started</p>
      </div>
    </div>
  </div>
</template>

<script>
import Invoice  from "../components/Invoice";
import HeaderNavigation  from "../components/HeaderNavigation";
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: "Home",
  data () {
    return {
      filterMenu: null,
      searchFilterMenu: null,
      filteredInvoice: null,
      searchedInvoice: null,
      search: "",
    };
  },
  created() {
    this.DELETE_INVOICE_DATA();
    this.GET_INVOICES();
  },
  components: {
    Invoice,
    HeaderNavigation,
  },
  methods: {
    ...mapActions(['GET_INVOICES']), 
    ...mapMutations(["TOGGLE_INVOICE", "DELETE_INVOICE_DATA"]),

    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    filteredInvoices(e) {
      if (e.target.innerText === 'Clear Filter') {
        this.filteredInvoice = null;
        return;
      }
      this.filteredInvoice = e.target.innerText;
    },
    searchedInvoices(e) {
      this.searchedInvoice = e.target.innerText;
      this.searchFilterMenu = null;
    },
    closeFilter(e) {
      if (e.target == this.$refs.filter && this.filterMenu) {
        this.toggleFilterMenu()
      }
    }
  },
  computed: {
    ...mapState(['invoiceData']),

    filteredData() {
      if (this.search.length > 0) {
        return this.invoiceData
        .filter(
          (invoice) => this.invoiceData.length
            ? Object.keys(this.invoiceData[0])
                .some(key => ('' + invoice[key]).toLowerCase().includes(this.search.toLowerCase()))
            : true
        );
      } else {
        return this.invoiceData.filter(invoice => {
          if (this.filteredInvoice === "Draft") {
            return invoice.invoiceDraft === true;
          }
          if (this.filteredInvoice === "Pending") {
            return invoice.invoicePending === true;
          }
          if (this.filteredInvoice === "Paid") {
            return invoice.invoicePaid === true;
          }
          return invoice;
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  .header {
    margin-bottom: 35px;
    .left,
    .right {
      flex: 1;
    }
    .right {
      justify-content: flex-end;
      align-items: center;
      .button,
      .filter {
        align-items: center;
        span {
          font-size: 12px;
        }
      }
      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;
        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
          &.active {
            transform: rotate(180deg);
          }
        }
        .filter-menu {
          min-width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          border-radius: 15px;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 10;
          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;
            border-radius: 15px;
            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }
      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;
        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .search {
    margin-bottom: 65px;
    .input {
      position: relative;
      input {
        background-color: #1e2139;
        border: none;
        outline: none;
        border-radius: 25px;
        padding: 10px 15px 10px 40px;
        color: #fff;

      }
      label {
        margin-bottom: 10px;
      }
      .search-icon {
        position: absolute;
        max-width: 20px;
        max-height: 20px;
        top: 10px;
        left: 15px;

      }
    }
  }
  .empty {
    margin-top: 160px;
    align-items: center;
    img {
      width: 214px;
      height: 200px;
    }
    h3 {
      font-size: 20px;
      margin-top: 40px;
    }
    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
