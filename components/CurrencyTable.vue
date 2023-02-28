<template>
  <h2 class="text-center mt-4 mb-3">EURO CURRENCY EXCHANGE RATE</h2>
  <v-container class="bg-surface-variant">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="8">
        <div class="currency-table-wrapper">
          <v-row justify="left" no-gutters>
            <v-col cols="9" sm="5">
              <v-card-text>
                <v-text-field
                  density="compact"
                  variant="solo"
                  label="Search currency"
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  v-model="query"
                  @input="searchByQuery(query)"
                >
                </v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
          <br v-if="!currency.length && !query" />
          <div
            class="text-center ma-12 error-text"
            v-if="!currency.length && query"
          >
            <img src="/images/search-icon.png" />
            <h3>
              Hmm, we are not getting any results.Our bad-try another search
            </h3>
          </div>
          <v-progress-circular
            indeterminate
            color="primary"
            class="ma-8"
            v-if="!currency.length && !query"
            :size="90"
            :width="7"
          ></v-progress-circular>
          <br v-if="!currency.length && !query" />
          <v-table v-if="currency.length" class="currency-table mb-3">
            <thead>
              <tr>
                <th
                  class="text-left font-weight-bold"
                  @click="sortByName('revers')"
                >
                  Currency
                </th>
                <th
                  class="text-left font-weight-bold"
                  @click="sortByval('asc')"
                >
                  Exchange Rate = 1 EURO
                </th>
                <th class="text-left font-weight-bold">Convert</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="currency in currency" :key="currency.code">
                <td>{{currency.code}}</td>
                <td class="font-weight-black">{{currency.value}}</td>
                <td>
                  <img
                    @click="dialogOpen(currency)"
                    class="cursor-pointer"
                    src="/images/convert.png"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
          <vue-awesome-paginate
            :total-items="totalCurrencies"
            :items-per-page="10"
            :max-pages-shown="3"
            v-model="currentPage"
            :on-click="paginate"
          />
          <ConversionPopup
            v-if="dialog"
            :currencySelected="selectedCurr"
            :dialog="dialog"
            @dialogClose="dialogClose"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, computed, toRefs,reactive} from "vue";
import CurrencyTable from '~/components/CurrencyTable.vue'
import { defineAsyncComponent } from 'vue'
const ConversionPopup = defineAsyncComponent(() => import('~/components/ConversionPopup.vue'))

const props = defineProps(['totalCurrencies', 'currency'])
const emit = defineEmits(['sortByval','sortByName','searchByQuery','paginate'])
let dialog = ref(false)
const currentPage = ref(1)
const query = ref('')
const selectedCurr = reactive({code:'', value:''})
const  {currency}  = toRefs(props)

const sortByval = (order)=>{
    emit('sortByVal', order)
}
const sortByName = (order)=>{
    emit('sortByName', order)
}
const searchByQuery = (q)=>{
    emit('searchByQuery', q)
}
const paginate = (p)=>{
    emit('paginate', p)
}
const dialogOpen = (curr)=>{
    dialog.value = true
    selectedCurr.code = curr.code
    selectedCurr.value = curr.value
}
const dialogClose = ()=>{
    console.log('i am called')
    dialog.value= false
}
</script>
