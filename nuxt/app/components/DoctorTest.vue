<script lang="ts" setup>
interface Doctor {
	id: number
	name: string
	email: string
	specializations: string[]
	experience?: number
	rating?: number
}

const currentStep = ref<number>(1)
const selectedSymptoms = ref<string[]>([])
const filters = reactive<{
	experience: 'any' | '5' | '10'
}>({
	experience: 'any'
})

const { data: symptoms } = await useFetch<{ data: { id: number, name: string }[] }>('/api/doctors/specializations')

const handleCheckboxChange = (symptom: string) => {
	if (selectedSymptoms.value.includes(symptom))
		return selectedSymptoms.value = selectedSymptoms.value.filter(name => name !== symptom)

	selectedSymptoms.value.push(symptom)
}

const fetchState = ref<'idle' | 'pending' | 'success'>('idle')
const doctors = ref<Doctor[]>([])
const fetchDoctors = async () => {
	fetchState.value = 'pending'

	try {
		const result = await $fetch<{ data: Doctor[] }>('/api/doctors', {
			query: {
				specializations: selectedSymptoms.value,
				// experience: filters.experience
			}
		})

		doctors.value = result.data

		fetchState.value = 'success'
	} catch (err: any) {
		console.log(err)
	}
}

const nextStep = () => {
	if (currentStep.value === 1) {
		if (selectedSymptoms.value.length === 0)
			return alert('Пожалуйста, выберите хотя бы один симптом')

		currentStep.value = 2
		return
	}

	if (currentStep.value === 2) {
		currentStep.value = 3
		return fetchDoctors()
	}
}

const prevStep = () => {
	if (currentStep.value > 1)
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

		<!-- Шаг 1: Выбор симптомов -->
		<div v-if="currentStep === 1">
			<h3 class="text-3xl mb-4">Какие у вас симптомы?</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div v-for="symptom in symptoms?.data" :key="symptom.id"
					class="flex items-center border rounded-lg hover:bg-gray-50 cursor-pointer">
					<input type="checkbox" :id="`symptom-${symptom.id}`" @change="handleCheckboxChange(symptom.name)"
						class="shrink-0 w-5 h-5 mr-3 ml-3 py-3" :checked="selectedSymptoms.includes(symptom.name)">
					<label :for="`symptom-${symptom.id}`" class="text-xl cursor-pointer flex-1 pr-3 py-3">
						{{ symptom.name }}
					</label>
				</div>
			</div>

			<ButtonMain @click="nextStep" :disabled="!selectedSymptoms.length" class="w-full md:w-auto">
				Далее
			</ButtonMain>
		</div>


		<div v-if="currentStep === 2">
			<h3 class="text-3xl">Дополнительные критерии</h3>

			<div class="text-xl my-6">
				<label class="block mb-3">Опыт работы:</label>
				<select v-model="filters.experience" class="w-full p-3 border rounded-lg text-xl">
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

			<div v-if="fetchState === 'pending'" class="text-xl my-4">
				<p>Загрузка...</p>
			</div>

			<div v-else-if="doctors?.length" class="grid gap-4 my-4">
				<div v-for="doctor in doctors" :key="doctor.id"
					class="bg-white border border-white-200 p-5 rounded-xl hover:shadow-md transition-shadow">
					<h4 class="text-2xl font-semibold">{{ doctor.name }}</h4>
					<p class="text-lg mt-2">Специализации: {{ doctor.specializations.join(', ') }}</p>
					<!-- <p v-if="doctor.experience" class="text-lg mt-1">Опыт: {{ doctor.experience }} лет</p> -->
					<ButtonMain class="mt-4 inline-block justify-self-start" to="/appointmentpage">Записаться на консультацию</ButtonMain>
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