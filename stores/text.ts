import { reactive } from 'vue';

type TextStorageData = {
  chat: {
    id: number
    who: string
    text: string
  }[]
  text: string
};

function getlocalData() {
  // const localData: any = localStorage.getItem('text');
  // localData ? JSON.parse(localData) : 
  return {
    chat: [
      // { id: 1, who: 'You', text: 'Hi' },
      // { id: 2, who: 'Chatbot', text: 'Hi' },
      // { id: 3, who: 'You', text: 'How are you doing?' },
      // { id: 4, who: 'Chatbot', text: 'Good, thanks' },
    ],
    text: ''
  }
}

function textStore() {
  const localData: TextStorageData = getlocalData();

  return { 
    // states
    chat: localData.chat,
    text: localData.text,

    // actions
    setText(prop: string) {
      this.text = prop
    },
    
    reset() {
      this.chat = [];
      this.text = '';
    },
    
    async generate() {
      if (this.chat.length>0 && this.chat[this.chat.length-1].text==='...') return;
      if (!this.text || this.text.length<1) return;

      this.chat.push({
        id: this.chat[this.chat.length-1]?.id + 1 || 0,
        who: 'You',
        text: this.text
      });
      this.chat[this.chat.length] = {
        id: this.chat[this.chat.length-1].id + 1,
        who: 'Chatbot',
        text: '...'
      };

      const menu = document.getElementById("chat");
      menu.scrollTop = menu?.scrollHeight;

      $fetch('/api/text', {
        method: 'post',
        body: {
          text: this.text
        }
      })
      .then(res => JSON.parse(res))
      .then(res => {
        this.chat[this.chat.length-1] = {
          id: this.chat[this.chat.length-1].id + 1,
          who: 'Chatbot',
          text: res.out || res.messages
        }
      })
      .catch(err => {
        this.chat[this.chat.length-1] = {
          id: this.chat[this.chat.length-1].id + 1,
          who: 'Chatbot',
          text: err.statusMessage
        }
      });

      this.text = '';
      menu.scrollTop = menu?.scrollHeight;     
    },
  }
}

export const text = reactive(textStore());
