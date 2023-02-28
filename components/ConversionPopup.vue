<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <div class="select-wrapper">
                  <select
                    name=""
                    id=""
                    v-model="fromCurr"
                    class="px-3 py-3 w-100"
                  >
                    <option
                      v-for="curr in currenciesUnFiltered"
                      :value="{code:curr.code,value:curr.value}"
                      :key="curr.code"
                    >
                      {{curr.code}}
                    </option>
                  </select>
                </div>
              </v-col>
              <v-col cols="12" sm="4" md="4" class="text-center">
                <img src="/images/converted.png" />
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <div class="select-wrapper">
                  <select
                    name=""
                    id=""
                    v-model="toCurr"
                    class="aa px-3 py-3 w-100"
                  >
                    <option
                      v-for="curr in currenciesUnFiltered"
                      :value="{code:curr.code,value:curr.value}"
                      :key="curr.code"
                    >
                      {{curr.code}}
                    </option>
                  </select>
                </div>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Enter amount to convert"
                  type="input"
                  v-model.number="amount"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4"></v-col>
              <v-col cols="12" sm="4" md="4">
                <v-btn color="success" @click="convert">Convert</v-btn>
              </v-col>
              <v-col cols="12">
                <v-table>
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">1 {{fromCurr.code}}</td>
                      <td class="font-weight-bold">
                        {{toCurr.value}} {{toCurr.code}}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{defaultAmount}} {{fromCurr.code}} =
                        {{convertAmount.toFixed(6)}} {{toCurr.code}}
                      </td>
                      <td>
                        {{defaultAmount}} {{toCurr.code}} =
                        {{reversConversion.toFixed(6)}} {{fromCurr.code}}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- <div class="text-center">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
              <select name="" id="" v-model="fromCurr">
                <option
                  v-for="curr in currenciesUnFiltered"
                  :value="{code:curr.code,value:curr.value}"
                  :key="curr.code"
                >
                  {{curr.code}}
                </option>
              </select>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
              <h3>Icon</h3>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
              <select name="" id="" v-model="toCurr">
                <option
                  v-for="curr in currenciesUnFiltered"
                  :value="{code:curr.code,value:curr.value}"
                  :key="curr.code"
                >
                  {{curr.code}}
                </option>
              </select>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
              <v-responsive class="mx-auto" max-width="344">
                <v-text-field
                  label="Enter amount to convert"
                  type="input"
                  v-model="amount"
                ></v-text-field> </v-responsive
            ></v-sheet>
          </v-col>
          <v-col cols="12" sm="4"> </v-col>
          <v-col cols="12" sm="4">
            <v-sheet class="ma-2 pa-2"
              ><button @click="convert">Convert</button>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="12">
            <h2>
              <v-table>
                <tbody>
                  <tr>
                    <td>1 {{fromCurr.code}}</td>
                    <td>{{toCurr.value}} {{toCurr.code}}</td>
                  </tr>

                  <tr>
                    <td>
                      {{defaultAmount}} {{fromCurr.code}} =
                      {{convertAmount.toFixed(6)}} {{toCurr.code}}
                    </td>
                    <td>
                      {{defaultAmount}} {{toCurr.code}} =
                      {{reversConversion.toFixed(6)}} {{fromCurr.code}}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </h2>
          </v-col>
        </v-row>
      </v-container>
      <v-btn color="primary" block @click="dialogClose">Close Dialog</v-btn>
    </v-dialog>
  </div> -->
</template>
<script setup>
import { inject, toRefs,reactive} from "vue";
const props = defineProps(['dialog','currencySelected'])
const {dialog,currencySelected} = toRefs(props)
const emit = defineEmits(['dialogClose'])
const currenciesUnFiltered = inject('currencyUnfiltered')
const amount = ref(1)
const defaultAmount =  ref(1)
const defulConversion = computed(() => currenciesUnFiltered.value.filter((curr)=> curr.code === 'EUR'))
const fromCurr = ref({code:defulConversion.value[0].code, value:defulConversion.value[0].value})
const toCurr = ref({code:currencySelected.value.code, value:currencySelected.value.value})
const reversConversion = computed(() => defaultAmount.value/convertAmount.value)
const convertAmount =computed(()=>{
    if(fromCurr.value.code === defulConversion.value[0].code) {
      console.log('if')
    return defaultAmount.value*toCurr.value.value
    } else {
      console.log('else')
      return (defaultAmount.value/fromCurr.value.value)*toCurr.value.value
    }
})

const convert = ()=>{
    defaultAmount.value = amount.value || 1
}

const dialogClose = ()=>{
    emit('dialogClose', false)
}

</script>
