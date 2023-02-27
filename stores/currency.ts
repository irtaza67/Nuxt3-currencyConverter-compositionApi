import { defineStore } from 'pinia'
import axios from "axios";

export interface currency {
    filtersList: any[],
    filteredCurrency:any[]
  }

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: (): currency  => { 
    return {
      filtersList: [],
      filteredCurrency:[]
    }
  },
  actions: {
    async addValueToFilterList() {
        const runtimeConfig = useRuntimeConfig()
        console.log('i am called', runtimeConfig,runtimeConfig.public)
        const {data} : {data: any} = await axios(`${runtimeConfig.public.apiBase}/v3/latest?apikey=${runtimeConfig.public.apiSecret}`)
        for(let x in data.data){
            let a = data.data
            this.filtersList.push(a[x])
        } 
        this.filtersList = this.filtersList.slice(0,50)
        this.filteredCurrency = [...this.filtersList]
        console.log('type of filtered',typeof this.filtersList)            
        console.log(data.data)
    },
    search(q) {
        this.filteredCurrency = this.filtersList.filter((el) => el.code.includes(q.toUpperCase()));
    },
    paginate(){

    },
    sortByNameAsc() {
        // this.filteredCurrency = this.filtersList.sort((a,b)=> a.value > b.value)
    },
    sortByNameDesc() {
        this.filteredCurrency.reverse()
    },
    sortByValAsc() {
        this.filteredCurrency.sort((a,b) => a.value - b.value)
    },
    sortByValDesc() {
        this.filteredCurrency.sort((a,b) => b.value - a.value)
    }
  },
  getters: {
    getfiltersList: state => state.filteredCurrency.slice(0,50),
    currencyUnfiltered: state => state.filtersList.slice(0,50),

  }
})