import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBurgerMenuStore = defineStore('burger', () => {
  const isBurgerOpen = ref(false);

  const isToggleButton = () => {
    isBurgerOpen.value = !isBurgerOpen.value;
    handleBodyOverflow();
  }

  const closeBurger = () => {
    isBurgerOpen.value = false;
    handleBodyOverflow();
  }

  const handleBodyOverflow = () => {
    if (isBurgerOpen.value) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  return {
    isBurgerOpen,
    isToggleButton,
    closeBurger
  }
})
