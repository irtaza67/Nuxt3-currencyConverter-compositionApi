<template>
  <div class="wrapper">
    <CurrencyTable :currency='currencies' :totalCurrencies='totalCurrencies' @sortByName="sortByName" @sortByVal='sortByval' @searchByQuery='searchByQuery' />
  </div>
</template>
<script setup>
import { ref, computed,provide,onMounted  } from "vue";
import { useFiltersStore } from '~/stores/currency'
import { storeToRefs } from 'pinia'
import CurrencyTable from '~/components/CurrencyTable.vue'

    const runtimeConfig = useRuntimeConfig()
    const store = useFiltersStore()
    const filterMethod = ref('')
    const query = ref('')

// call the action as a method of the store
 store.addValueToFilterList(runtimeConfig.apiSecret)

    const currencies = computed(() => store.getfiltersList)
    const currenciesUnFiltered = computed(() => store.filtersList)
    const totalCurrencies = computed(() => currencies.value.length || 20)
    provide('currencyUnfiltered', currenciesUnFiltered)

    const searchByQuery = ((q)=> {
        store.search(q)
})

const sortByval = (function (o) {
  let order = o
  console.log('i am closure', order)
  return function () {
    console.log('i am closure before asign', order)
    if(order === 'asc') {
        console.log('order asc')
    store.sortByValAsc()
        order = 'desc'
    } else {
        console.log('order desc')
    store.sortByValDesc()
        order='asc'
    }
      console.log('i am closure inside')
  }
})();
const sortByName = (function (o) {
  let order = o
  console.log('i am closure', order)
  return function () {
    console.log('i am closure before asign', order)
    if(order === 'asc') {
        console.log('order asc')
    store.sortByNameAsc()
        order = 'reverse'
    } else {
        console.log('order desc')
    store.sortByNameDesc()
        order='asc'
    }
      console.log('i am closure inside')
  }
})();
    // console.log('Name from env file', runtimeConfig, store.getfiltersList)
    const onClickHandler = (page) => {
    console.log(page);
  };

  const currentPage = ref(1);
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
