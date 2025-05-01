<script lang="ts" setup>
const currentStep = ref<number>(3)
const selectedSymptoms = ref([])
const filters = reactive({
	experience: 'any'
})

// const { data: symptoms } = await useFetch('/api/symptoms')
const { data: doctors } = await useFetch('/api/doctors')

// Вспомогательная функция для сопоставления симптомов и специализаций
const getSpecialtyBySymptom = (symptomId: number) => {
	// Здесь должна быть ваша логика сопоставления
	// Например, можно хранить это в базе данных
	const symptomToSpecialty = {
		1: 'кардиолог',
		2: 'невролог',
		// ...
	}

	return symptomToSpecialty[symptomId as keyof typeof symptomToSpecialty] || ''
}

const filteredDoctors = computed(() => {
	if (!doctors.value?.data.length)
		return []

	const temp = [...doctors.value.data, ...doctors.value.data, ...doctors.value.data, ...doctors.value.data, ...doctors.value.data]
	// Фильтрация врачей по симптомам (можно заменить на API запрос с параметрами)
	// Здесь должна быть логика сопоставления симптомов и специализаций
	return temp
		.filter(doctor => {
			const matchesSymptoms = selectedSymptoms.value.some(symptomId => doctor.specializations.includes(getSpecialtyBySymptom(symptomId)))

			// Фильтрация по опыту
			// опыта нет пока
			// const matchesExperience = filters.experience === 'any' || doctor.experience >= parseInt(filters.experience)

			// у нас пока нет рейтинга
			return matchesSymptoms // && matchesExperience
		})
	// у нас пока нет рейтинга
	// .sort((a, b) => b.rating - a.rating)
})

const nextStep = () => {
	if (selectedSymptoms.value.length > 0)
		currentStep.value++
	else
		alert('Пожалуйста, выберите хотя бы один симптом')
}

const prevStep = () => {
	currentStep.value--
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

		<div v-if="currentStep === 1">
			<h3 class="text-3xl mb-4">Какие у вас симптомы?</h3>

			<!-- <div v-for="symptom in symptoms" :key="symptom.id" class="symptom-item">
				<input type="checkbox" :id="'symptom-' + symptom.id" v-model="selectedSymptoms" :value="symptom.id">
				<label :for="'symptom-' + symptom.id">{{ symptom.name }}</label>
			</div> -->

			<ButtonMain @click="nextStep">Далее</ButtonMain>
		</div>

		<div v-if="currentStep === 2">
			<h3 class="text-3xl">Дополнительные критерии</h3>

			<div class="text-2xl my-4">
				<label class="mr-5">Опыт работы:</label>

				<select v-model="filters.experience">
					<option value="any">Любой</option>
					<option value="5">Более 5 лет</option>
					<option value="10">Более 10 лет</option>
				</select>
			</div>

			<div class="flex justify-between items-center gap-4">
				<ButtonMain @click="prevStep">Назад</ButtonMain>
				<ButtonMain @click="nextStep">Найти врача</ButtonMain>
			</div>
		</div>

		<div v-if="currentStep === 3">
			<h3 class="text-3xl">Рекомендуемые специалисты</h3>

			<div v-if="filteredDoctors.length > 0" class="grid gap-4 my-4">
				<div v-for="doctor in filteredDoctors" :key="doctor.id" class="border border-gray-50 p-4 roudned text-2xl">
					<h4>{{ doctor.name }}</h4>
					<p>Специализации: {{ doctor.specializations.join(', ') }}</p>
					<!-- <p>Опыт: {{ doctor.experience }} лет</p> -->
					<!-- <p>Рейтинг: {{ doctor.rating }}/5</p> -->
				</div>
			</div>
			<div v-else class="text-2xl my-4">
				<p>По вашим критериям не найдено подходящих специалистов.</p>
			</div>

			<ButtonMain @click="resetTest">Начать заново</ButtonMain>
		</div>
	</div>
</template>

<style scoped></style>