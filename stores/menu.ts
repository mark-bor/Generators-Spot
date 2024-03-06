import { reactive } from 'vue'

export const menu = reactive({
  // state
  isMenu: false,

  // actions
  toggleMenu() {
    this.isMenu = !this.isMenu;
  },
  setMenu(param: boolean) {
    this.isMenu = param;
  }
});
