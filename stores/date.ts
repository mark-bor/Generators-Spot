import { reactive } from 'vue';

type DateStorageData = {
  fromYear: number,
  toYear: number,
  quantity: number,
};

function getlocalData() {
  // const localData: any = localStorage.getItem('date');
  // localData ? JSON.parse(localData) : 
  return {
    fromYear: 1,
    toYear: new Date().getFullYear(),
    quantity: 1,
  }
}

function dateStore() {
  const localData: DateStorageData = getlocalData();

  return {
    dates: [] as string[],
    fromYear: localData.fromYear,
    toYear: localData.toYear,
    quantity: localData.quantity,

    // setlocalData() {
    //   localStorage.setItem('date', JSON.stringify({
    //     fromYear: fromYear,
    //     toYear: toYear,
    //     quantity: quantity,
    //   }));
    // }

    setFromYear(prop: number) {
      this.fromYear = prop;
      // setlocalData()
    },
    setToYear(prop: number) {
      this.toYear = prop;
      // setlocalData()
    },
    setQuantity(prop: number) {
      this.quantity = prop;
      // setlocalData()
    },
    
    reset() {
      this.dates = [];
      this.fromYear = 1;
      this.toYear = new Date().getFullYear();
      this.quantity = 1;
      // localStorage.removeItem('date');
    },

    generate() {
      this.dates = [];

      $fetch('/api/date', {
        method: 'post',
        body: {
          fromYear: this.fromYear,
          toYear: this.toYear,
          quantity: this.quantity,
        }
      }).then(res => {
        if (res) this.dates = [...res];
      });
    }
  }  
}

export const date = reactive(dateStore());
