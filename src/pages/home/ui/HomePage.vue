<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

const sliderCurrent = ref<string>('first');
const sliderList = ref([
  {
    text: 'Мама — сердце семьи',
    value: 'mama',
    description: 'Ты даешь любовь, заботу и тепло каждый день. \nНа Mameliya мы верим: чтобы заботиться о других, важно не забывать и о себе. \n\nЗдесь ты найдешь: \n\nПростые ритуалы для отдыха и восстановления. \nУдобные списки дел и напоминания, чтобы всё было под контролем. \nИдеи для маленьких радостей каждый день. \nПоддержку и вдохновение от других мам. \n\nСоздай пространство, где ты — не только мама, но и женщина с мечтами, желаниями и правом на передышку.',
    img: 'mama.webp'
  },
  {
    text: 'Семья — команда, где важен каждый',
    value: 'family',
    description: 'Здесь всё, чтобы жизнь всей семьи стала чуть проще и спокойнее: \n\n Общее семейное расписание — чтобы все всё помнили \nИдеи для совместных ужинов и семейных традиций \nПодсказки для праздников, дат и маленьких радостей \nПростые инструменты, чтобы каждый чувствовал себя услышанным.\n\n  Всё, чтобы семья была как команда.\n\nОбщее расписание, идеи для совместного времяпрепровождения и немного волшебства на каждый день. \n\n Чтобы каждый день напоминал, как хорошо быть вместе.',
    img: 'family.webp',
  },
  {
    text: 'Дети — маленькие большие чудеса',
    value: 'children',
    description: 'Здесь ты можешь сохранить важные моменты роста, отметить первые шаги, слова и победы. \n\n Всё, что касается малыша — в одном месте: \n\n Отмечай важные этапы и маленькие победы \nНаходи идеи для игр, занятий и сказочных вечеров \nСледи за ростом, привычками и самочувствием \nСохраняй тёплые воспоминания и забавные моменты. \n\n Ты рядом каждый день — а мы помогаем сделать этот путь чуть легче и уютнее.',
    img: 'children.webp',
  },
  {
    text: 'Ментальное здоровье — забота о себе внутри',
    value: 'mental_health',
    description: 'Раздел, где ты можешь остановиться и выдохнуть. \n\nВ этом разделе: \n\n Простые практики для успокоения и восстановления \nДневник эмоций и мыслей — чтобы услышать себя \nПоддерживающие заметки и напоминания о важном \nУютное пространство для внутреннего баланса. \n\nТы важна. А забота о себе — это не роскошь, а необходимость. \n\nПусть здесь начинается твоя история мягкой заботы о себе.',
    img: 'mental_health.webp',
  },
  {
    text: 'Ритуалы красоты — время для себя с любовью',
    value: 'rituals',
    description: 'Маленькие моменты, которые помогают чувствовать себя хорошо:\n\n Личный уход — от волос до кончиков пальцев \nНапоминания и трекеры для регулярности \nСоветы и вдохновение без давления \nПространство, где красота — это про заботу, а не про идеал \n\nПусть уход за собой будет не обязанностью, а приятным ритуалом.\n\nИногда достаточно просто услышать свои чувства, чтобы встретиться с собой настоящей.\nЭто пространство для бережного диалога с собой и тихих внутренних перемен.',
    img: 'rituals.webp',
  }
])

</script>

<template>
  <main class="flex justify-center items-center bg-gradient flex-1 self-stretch">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :modules="[Navigation]"
      navigation
      class="cursor-pointer w-full h-full"
    >
      <SwiperSlide
        v-for="item in sliderList"
        :key="item.value"
        @click="sliderCurrent = item.value"
        class="flex justify-center items-center h-full"
      >
        <div class="flex sm:flex-row xs:justify-between h-full xs:flex-col xs:items-stretch lg:items-center " >
          <div class="p-5 xl:pl-10 lg:w-[40%] sm:h-full xl:h-fit xs:pl-5 xs:w-full lg:text-left">
            <p class="mb-5 font-semibold xl:text-xl xs:text-base">{{ item.text }}</p>
            <p class="whitespace-pre-line xl:text-lg xs:text-base" >{{ item.description }}</p>
          </div>

          <div class="lg:w-[70%] xs:h-[400px] sm:h-full overflow-hidden" >
            <img :src="`../../src/shared/assets/images/${item.img}`" alt="slider image" class="w-full h-full object-cover lg:aspect-video"/>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </main>

</template>

<style scoped>
::v-deep .swiper-button-prev::after,
::v-deep .swiper-button-next::after {
  display: none;
}
.bg-gradient {
  background: linear-gradient(4deg, rgb(245 218 145) 10%, rgb(241 239 192 / 68%) 70%);
}
</style>
