<script lang="ts" setup>
interface Doctor {
  id: number
  name: string
  email: string
  specializations: string[]
  experience?: number 
  rating?: number 
}

interface Symptom {
  id: number
  name: string
}

const currentStep = ref<number>(1)
const selectedSymptoms = ref<number[]>([])
const filters = reactive({
  experience: 'any' as 'any' | '5' | '10'
})

const symptoms = ref<Symptom[]>([
  { id: 1, name: 'Депрессивные расстройства' },
  { id: 2, name: 'Сексуальные расстройства' },
  { id: 3, name: 'Тревожность' },
  { id: 4, name: 'Страхи и фобии' },
  { id: 5, name: 'Апатия' },
  { id: 6, name: 'Проблемы с общением' },
  { id: 7, name: 'Самореализация' },
  { id: 8, name: 'Проблемы со сном' },
  { id: 9, name: 'Стрессовое состояние' },
  { id: 10, name: 'Низкая самооценка и неуверенность в себе' }
])


const { data: doctors, pending: loading, refresh: refreshDoctors } = await useFetch<{ data: Doctor[] }>(
  '/api/doctors',
  {
    query: {
      symptoms: computed(() => selectedSymptoms.value.join(',')),
      experience: computed(() => filters.experience)
    },
    immediate: false
  }
)

const updateDoctorsList = async () => {
  await refreshDoctors()
  if (currentStep.value < 3) {
    currentStep.value++
  }
}


const handleCheckboxChange = (e: Event, symptomId: number) => {
  const target = e.target as HTMLInputElement
  if (target.checked) {
    selectedSymptoms.value = [...selectedSymptoms.value, symptomId]
  } else {
    selectedSymptoms.value = selectedSymptoms.value.filter(id => id !== symptomId)
  }
}


const nextStep = () => {
  if (currentStep.value === 1 && selectedSymptoms.value.length === 0) {
    alert('Пожалуйста, выберите хотя бы один симптом')
    return
  }
  if (currentStep.value === 2) {
    updateDoctorsList()
  } else {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const resetTest = () => {
  currentStep.value = 1
  selectedSymptoms.value = []
  filters.experience = 'any'
}
</script>

<template>
  <div class="max-w-200 mx-auto bg-background rounded-2xl p-5">
    <h2 class="text-5xl text-center">Подбор врача</h2>

    <!-- Шаг 1: Выбор симптомов -->
    <div v-if="currentStep === 1">
      <h3 class="text-3xl mb-4">Какие у вас симптомы?</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div 
          v-for="symptom in symptoms" 
          :key="symptom.id" 
          class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="selectedSymptoms.includes(symptom.id) 
            ? selectedSymptoms = selectedSymptoms.filter(id => id !== symptom.id)
            : selectedSymptoms.push(symptom.id)"
        >
          <input 
            type="checkbox" 
            :id="'symptom-' + symptom.id" 
            :checked="selectedSymptoms.includes(symptom.id)"
            class="w-5 h-5 mr-3"
            @change="(e) => handleCheckboxChange(e, symptom.id)"
          >
          <label :for="'symptom-' + symptom.id" class="text-xl cursor-pointer flex-1">
            {{ symptom.name }}
          </label>
        </div>
      </div>

      <ButtonMain 
        @click="nextStep" 
        :disabled="selectedSymptoms.length === 0"
        class="w-full md:w-auto"
      >
        Далее
      </ButtonMain>
    </div>


    <div v-if="currentStep === 2">
      <h3 class="text-3xl">Дополнительные критерии</h3>

      <div class="text-xl my-6">
        <label class="block mb-3">Опыт работы:</label>
        <select 
          v-model="filters.experience"
          class="w-full p-3 border rounded-lg text-xl"
        >
          <option value="any">Любой</option>
          <option value="5">Более 5 лет</option>
          <option value="10">Более 10 лет</option>
        </select>
      </div>

      <div class="flex justify-between items-center gap-4 mt-8">
        <ButtonMain @click="prevStep" class="flex-1">Назад</ButtonMain>
        <ButtonMain @click="nextStep" class="flex-1">Найти врача</ButtonMain>
      </div>
    </div>

    <div v-if="currentStep === 3">
      <h3 class="text-3xl mb-6">Рекомендуемые специалисты</h3>

      <div v-if="loading" class="text-xl my-4">
        <p>Загрузка...</p>
      </div>
      <div v-else-if="doctors?.data?.length" class="grid gap-4 my-4">
        <div 
          v-for="doctor in doctors.data" 
          :key="doctor.id" 
          class="bg-white border border-white-200 p-5 rounded-xl hover:shadow-md transition-shadow"
        >
          <h4 class="text-2xl font-semibold">{{ doctor.name }}</h4>
          <p class="text-lg mt-2">Специализации: {{ doctor.specializations.join(', ') }}</p>
          <p v-if="doctor.experience" class="text-lg mt-1">Опыт: {{ doctor.experience }} лет</p>
          <ButtonMain class="mt-4">Записаться на консультацию</ButtonMain>
        </div>
      </div>
      <div v-else class="text-xl my-4">
        <p>По вашим критериям не найдено подходящих специалистов.</p>
        <p class="mt-2">Попробуйте изменить параметры поиска.</p>
      </div>

      <ButtonMain @click="resetTest" class="mt-6">Начать заново</ButtonMain>
    </div>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  accent-color: #4f46e5;
  cursor: pointer;
}

select {
  background-color: white;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}
</style>