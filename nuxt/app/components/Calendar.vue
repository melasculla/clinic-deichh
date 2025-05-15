<script setup lang="ts">
import { ref, computed } from 'vue';

const currentDate = ref(new Date()); // Июнь 2025
const selectedDate = ref(new Date());

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 0);
  const lastDay = new Date(year, month + 1, 0);
  
  
  const prevLastDay = new Date(year, month, 0).getDate();
  const days = [];
  
  // Заполняем дни предыдущего месяца
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ 
      day: prevLastDay - firstDay.getDay() + i + 1, 
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Заполняем дни текущего месяца
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({ 
      day: i, 
      isCurrentMonth: true,
      isToday: date.toDateString() === new Date().toDateString()
    });
  }
  
  // Заполняем дни следующего месяца
  const daysToAdd = 42 - days.length;
  for (let i = 1; i <= daysToAdd; i++) {
    days.push({ 
      day: i, 
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Разбиваем на недели
  const weeks = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(days.slice(i * 7, (i + 1) * 7));
  }
  
  return weeks;
});

const currentMonthName = computed(() => {
  return monthNames[currentDate.value.getMonth()] + ' ' + currentDate.value.getFullYear();
});

const selectDate = (day: {day: number, isCurrentMonth: boolean}) => {
  if (!day.isCurrentMonth) return;
  selectedDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day.day
  );
};

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};
</script>

<template>
  <div class="bg-white rounded-xl  p-4 w-full">
    <!-- Заголовок календаря -->
    <div class="flex items-center justify-between mb-4">
      <button 
        @click="prevMonth"
        class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <h2 class="text-lg font-semibold text-gray-800">
        {{ currentMonthName }}
      </h2>
      
      <button 
        @click="nextMonth"
        class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Дни недели -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div 
        v-for="(dayName, index) in dayNames" 
        :key="index"
        class="text-center text-xs font-medium text-gray-500 py-1"
      >
        {{ dayName }}
      </div>
    </div>
    
    <!-- Ячейки календаря -->
    <div class="grid grid-cols-7 gap-1">
      <template v-for="(week, weekIndex) in daysInMonth" :key="weekIndex">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          @click="selectDate(day)"
          :class="[
            'h-8 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors',
            day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400',
            day.isToday ? 'bg-gray-200 font-medium' : '',
            selectedDate.getDate() === day.day && 
            selectedDate.getMonth() === currentDate.getMonth() && 
            selectedDate.getFullYear() === currentDate.getFullYear() && 
            day.isCurrentMonth 
              ? 'bg-[#58A791] text-white font-medium' 
              : 'hover:bg-[#DAE9DB]'
          ]"
        >
          {{ day.day }}
        </div>
      </template>
    </div>
  </div>
</template>