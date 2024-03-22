import { reactive } from 'vue';
import { saveAs } from 'file-saver';


type ProviderData = {
  name: string,
  url(): string,
  headers: any
};

type QRCodeLocalData = {
  provider: ProviderData | undefined
  data: string
  format?: string
  type?: string
  logo?: string
  file?: any
};


function getlocalData(): QRCodeLocalData {
  // const localData: any = localStorage.getItem('date');
  // localData ? JSON.parse(localData) : 
  return {
    provider: undefined,
    data: 'https://kitsune-diary.vercel.app/',
    format: 'png',
    type: 'url',
    logo: '',
    file: '',
  }
}


function qrCodeStore() {
  const localData: QRCodeLocalData = getlocalData();

  return {
    providers: ['Ajith Joseph', 'Nara Wira Digital'] as string[],
    types: ['url', 'text', 'telno', 'mailto', 'smsto'] as string[],
    formats: ['QR_CODE', 'UPC_A', 'UPC_E', 'EAN_8', 'EAN_13', 'CODE_39', 'CODE_93', 'CODE_128', 'CODABAR', 'INTERLEAVED_2_5', 'STANDARD_2_5', 'MSI_CHECKSUM', 'POSTNET', 'PLANET', 'RMS4CC', 'KIX'] as string[],

    provider: localData.provider,
    data: localData.data,

    type: localData.type,
    format: localData.format,
    logo: localData.logo,
    file: localData.file,

    resultURL: '' as any,
    resultSVG: '' as any,

    // setlocalData() {
    //   localStorage.setItem('date', JSON.stringify({
    //     fromYear: fromYear,
    //     toYear: toYear,
    //     quantity: quantity,
    //   }));
    // }

    setProvider(prop: string) {
      switch (prop) {
        case 'Ajith Joseph':
          this.provider = {
            name: 'Ajith Joseph',
            url: () => `https://codzz-qr-cods.p.rapidapi.com/getQrcode?type=${this.type}&value=${this.data}`,
            headers: {
              'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com'
            }
          }
          break;
          
        case 'Nara Wira Digital':
          this.provider = {
            name: 'Nara Wira Digital',
            url: () => `https://zebra-code.p.rapidapi.com/?data=${this.data}&type=QR_CODE`,
            headers: {
              'X-RapidAPI-Host': 'zebra-code.p.rapidapi.com',
            },
          }
          break;
          
        default:
          break;
      }
    },
    setData(event: any) {
      this.data = event.target.value;
    },
    setFormat(event: any) {
      this.format = event.target.value;
    },
    setType(event: any) {
      this.type = event.target.value;
    },
    setLogo(event: any) {
      this.logo = event.target.value;
    },
    setFile(event: any) {
      this.file = event.target.value;
    },
    
    reset() {
      this.provider = undefined;
      this.data = '';
      this.format = 'png';
      this.type = 'url';
      this.logo = '';
      this.resultURL = '';
      this.resultSVG = '';
    },

    async generate() {
      this.resultURL = '';
      this.resultSVG = '';

      if (!this.provider || !this.data) return;

      fetch(this.provider.url(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '619624cca8msh0c9a9a85b5368a3p137753jsnbf1583a2183a',
          ...this.provider.headers
        },
      })
      .then(res => res.json())
      .then(res => {
        if (this.provider?.name==='Ajith Joseph') this.resultURL = res.url;
        if (this.provider?.name==='Nara Wira Digital') this.resultSVG = res.image;
      })
      .catch(err => {
        console.error('Error: ', err);
      });
    },

    download() {
      const fileName: string = this.resultURL.split('').slice(this.resultURL.lastIndexOf('/')+1).join('');
      const blob = new Blob([this.resultURL]);
      saveAs(blob, fileName);
    }
  };
}

export const qrCode = reactive(qrCodeStore());