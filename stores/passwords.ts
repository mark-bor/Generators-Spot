import { reactive } from 'vue';

type PasswordStorageData = {
  passwords: string[],
  options: string[],
  pLength: number,
  pQuantity: number,
};

function getlocalData() {
  // const localData: any = localStorage.getItem('passwords');
  // localData ? JSON.parse(localData) : 
  return {
    options: [],
    pLength: 4,
    pQuantity: 1,
  }
}

function passwordsState() {
  const localData: PasswordStorageData = getlocalData();
  
  return {
    // states
    passwords: localData.passwords,
    options: localData.options,
    pLength: localData.pLength,
    pQuantity: localData.pQuantity,
    
    // actions
    // setlocalData() {
    //   localStorage.setItem('passwords', JSON.stringify({
    //     options: this.options,
    //     pLength: this.pLength,
    //     pQuantity: this.pQuantity,
    //   }));
    // },

    setOptions(prop: string) {
      if (this.options.includes(prop)) {
        this.options = this.options.filter((e) => e!=prop)
      }
      else {
        this.options.push(prop);
      }
      // this.setlocalData();
    },
    setPLength(prop: number) {
      this.pLength = prop;
      // this.setlocalData()
    },
    setPQuantity(prop: number) {
      this.pQuantity = prop;
      // this.setlocalData()
    },
    
    reset() {
      this.passwords = [];
      this.options = [];
      this.pLength = 4;
      this.pQuantity = 1;
      // localStorage.removeItem('passwords');
    },

    generate() {
      this.passwords = [];

      $fetch('/api/passwords', {
        method: 'post',
        body: {
          options: this.options,
          length: this.pLength,
          quantity: this.pQuantity,
        }
      }).then(res => {
        if (res) this.passwords = [...res];
      });
    }
  }
}

export const passwords = reactive(passwordsState());
