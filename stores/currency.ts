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
    async getCurrency() {
        const runtimeConfig = useRuntimeConfig()
        const {data} : {data: any} = await axios(`${runtimeConfig.public.apiBase}/v3/latest?apikey=${runtimeConfig.public.apiSecret}`)
        for(let x in data.data){
            let a = data.data
            this.filtersList.push(a[x])
        } 
        this.filteredCurrency = [...this.filtersList]
        console.log('type of filtered',typeof this.filtersList)            
        console.log(data.data)
    },
    search(q:string) {
        this.filteredCurrency = this.filtersList.filter((el) => el.code.includes(q.toUpperCase()));
    },
    paginate(page: number){
        let perPage = 10
        this.filteredCurrency = this.filtersList.slice(Math.abs((page*perPage)-perPage),page*perPage)
        console.log(page,this.filteredCurrency)
    },
    sortByNameAsc() {
      this.filteredCurrency.sort((a,b) => (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0))
    },
    sortByNameDesc() {
      this.filteredCurrency.sort((a,b) => a.code < b.code ? 1 : -1)

    },
    sortByValAsc() {
        this.filteredCurrency.sort((a,b) => a.value - b.value)
    },
    sortByValDesc() {
        this.filteredCurrency.sort((a,b) => b.value - a.value)
    }
  },
  getters: {
    getfiltersList: state => state.filteredCurrency.slice(0,9)
  }
})