<template>
  <div class="doctor-test">
    <h2>Подбор врача</h2>
    
    <!-- Шаг 1: Выбор симптомов -->
    <div v-if="currentStep === 1">
      <h3>Какие у вас симптомы?</h3>
      <div v-for="symptom in symptoms" :key="symptom.id" class="symptom-item">
        <input 
          type="checkbox" 
          :id="'symptom-' + symptom.id" 
          v-model="selectedSymptoms" 
          :value="symptom.id"
        >
        <label :for="'symptom-' + symptom.id">{{ symptom.name }}</label>
      </div>
      <button @click="nextStep">Далее</button>
    </div>
    
    <!-- Шаг 2: Выбор дополнительных критериев -->
    <div v-if="currentStep === 2">
      <h3>Дополнительные критерии</h3>
      <div class="filter-item">
        <label>Опыт работы:</label>
        <select v-model="filters.experience">
          <option value="any">Любой</option>
          <option value="5">Более 5 лет</option>
          <option value="10">Более 10 лет</option>
        </select>
      </div>
      <button @click="prevStep">Назад</button>
      <button @click="findDoctors">Найти врача</button>
    </div>
    
    <!-- Результаты -->
    <div v-if="currentStep === 3">
      <h3>Рекомендуемые специалисты</h3>
      <div v-if="filteredDoctors.length > 0">
        <div v-for="doctor in filteredDoctors" :key="doctor.id" class="doctor-card">
          <h4>{{ doctor.name }}</h4>
          <p>Специализации: {{ doctor.specialties.join(', ') }}</p>
          <p>Опыт: {{ doctor.experience }} лет</p>
          <p>Рейтинг: {{ doctor.rating }}/5</p>
        </div>
      </div>
      <div v-else>
        <p>По вашим критериям не найдено подходящих специалистов.</p>
      </div>
      <button @click="resetTest">Начать заново</button>
    </div>
  </div>
</template>

<script setup>
const currentStep = ref(1);
const selectedSymptoms = ref([]);
const filters = reactive({
  experience: 'any'
});
const filteredDoctors = ref([]);

// Загрузка данных (можно заменить на API запрос)
const { data: symptoms } = await useFetch('/api/symptoms');
const { data: doctors } = await useFetch('/api/doctors');

const nextStep = () => {
  if (selectedSymptoms.value.length > 0) {
    currentStep.value++;
  } else {
    alert('Пожалуйста, выберите хотя бы один симптом');
  }
};

const prevStep = () => {
  currentStep.value--;
};

const findDoctors = () => {
  // Фильтрация врачей по симптомам (можно заменить на API запрос с параметрами)
  filteredDoctors.value = doctors.value.filter(doctor => {
    // Здесь должна быть логика сопоставления симптомов и специализаций
    const matchesSymptoms = selectedSymptoms.value.some(symptomId => 
      doctor.specialties.includes(getSpecialtyBySymptom(symptomId))
    );
    
    // Фильтрация по опыту
    const matchesExperience = filters.experience === 'any' || 
      doctor.experience >= parseInt(filters.experience);
    
    return matchesSymptoms && matchesExperience;
  });
  
  // Сортировка по рейтингу
  filteredDoctors.value.sort((a, b) => b.rating - a.rating);
  
  currentStep.value = 3;
};

const resetTest = () => {
  currentStep.value = 1;
  selectedSymptoms.value = [];
  filters.experience = 'any';
  filteredDoctors.value = [];
};

// Вспомогательная функция для сопоставления симптомов и специализаций
const getSpecialtyBySymptom = (symptomId) => {
  // Здесь должна быть ваша логика сопоставления
  // Например, можно хранить это в базе данных
  const symptomToSpecialty = {
    1: 'кардиолог',
    2: 'невролог',
    // ...
  };
  return symptomToSpecialty[symptomId] || '';
};
</script>

<style scoped>
.doctor-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.symptom-item, .filter-item {
  margin: 10px 0;
}
.doctor-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
}
button {
  margin: 10px 5px;
  padding: 8px 16px;
}
</style>