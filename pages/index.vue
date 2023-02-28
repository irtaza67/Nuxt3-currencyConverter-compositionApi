<template>
  <div class="wrapper">
    <CurrencyTable
      :currency="currencies"
      :totalCurrencies="totalCurrencies"
      @paginate="paginate"
      @sortByName="sortByName"
      @sortByVal="sortByval"
      @searchByQuery="searchByQuery"
    />
  </div>
</template>
<script setup>
import { ref, computed,provide,onMounted  } from "vue";
import { useFiltersStore } from '~/stores/currency'
import { storeToRefs } from 'pinia'
import CurrencyTable from '~/components/CurrencyTable.vue'

    const store = useFiltersStore()
    const filterMethod = ref('')
    const query = ref('')

// call the action as a method of the store
    onMounted(async () => {
          store.getCurrency()
    })

    const currencies = computed(() => store.getfiltersList)
    const currenciesUnFiltered = computed(() => store.filtersList)
    const totalCurrencies = computed(() => store.filtersList.length || 20)
    provide('currencyUnfiltered', currenciesUnFiltered)

    const searchByQuery = ((q)=> {
        store.search(q)
  })

   const sortByval = (function (o) {
    let order = o
    return function () {
      if(order === 'asc') {
      store.sortByValAsc()
          order = 'desc'
      } else {
      store.sortByValDesc()
          order='asc'
      }
    }
  })();
  const sortByName = (function (o) {
    let order = o
    return function () {
      if(order === 'asc') {
          console.log('order asc')
      store.sortByNameAsc()
          order = 'reverse'
      } else {
      store.sortByNameDesc()
          order='asc'
      }
    }
  })();
    // console.log('Name from env file', runtimeConfig, store.getfiltersList)
    const paginate = (page) => {
      console.log('page',page)
      store.paginate(page)
  };
</script>
