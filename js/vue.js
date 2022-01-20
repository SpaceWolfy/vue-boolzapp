new Vue({
  el: "#app",
  data: {
    contactIndex: 0,
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: false,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: false,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Fabiolo",
        avatar: "_2",
        visible: false,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao Fabiolo",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Ciao Samuel",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Come sta Fabio?",
            status: "sent",
          },
        ],
      },
    ],
    yesOrNo: ["si", "no"],
    sendAMsg: "",
    indexArray: [0],
    timer: null,
    search: "",
    selected: undefined,
  },
  methods: {
    avatarPic: function (person) {
      return `img/avatar${person.avatar}.jpg`;
    },

    /* Cliccando sul contatto specifico, questa funzione eguaglierà il mio contactIndex all'index cliccato, successivamente 
    lo pusherà in un array nel quale sarà immagazzinato  */
    mostraChat: function (index) {
      this.contactIndex = index;
      this.indexArray.push(this.contactIndex);
    },

    /* Questa funzione gestisce un evento temporale, una volta richiamata 
    garantirà il ricevimento di un messaggio randomico da parte dell'altro utente nell'arco di un secondo */
    ricevoUnMessaggio: function () {
      this.timer = setTimeout(() => {
        const randomAnswer =
          Math.floor(Math.random() * this.yesOrNo.length - 1) + 1;
        this.contacts[this.indexArray.slice(-1)].messages.push({
          date: this.getTodayDate(),
          text: this.yesOrNo[randomAnswer],
          status: "received",
          return: this.getTodayDate,
        });
      }, 1000);
    },

    /* Questa funzione rende maiuscola la prima lettera del testo prelevato dall'input - message-text dell'html 
    e risalva la parola in una variabile let.
    Esegue inoltre un controllo per determinare se il testo del messaggio che si vuole inviare sia vuoto o meno.
    - In caso di riscontro positivo procederà ad avvisare l'utente di scrivere qualcosa prima di mandare il messaggio.
    - In caso di riscontro negativo pusherà il messaggio, la data di invio e lo status all'interno dell'array di oggetti messages,
    provvederà poi a richiamare la funzione 'ricevoUnMessaggio(), successivamente resetterà il campo testuale dell'input di partenza'
    */
    invioUnMex: function () {
      let upperCItem =
        this.sendAMsg.charAt(0).toUpperCase() + this.sendAMsg.slice(1);
      if (this.sendAMsg === "") {
        alert("Prima di inviare, inserisci qualcosa!");
      } else {
        this.contacts[this.indexArray.slice(-1)].messages.push({
          date: this.getTodayDate(),
          text: upperCItem,
          status: "sent",
        });
        this.ricevoUnMessaggio();
        this.sendAMsg = "";
      }
    },

    getTodayDate: function () {
      return dayjs().format("DD/MM/YYYY HH:mm:ss");
    },

    /* Se il nome della persona che cerco inizia con le lettere inserite nell'input di ricerca
    allora mostrami tale nome - true, altrimenti ritornami con false
    */
    findAPerson: function (person) {
      if (person.name.toLowerCase().startsWith(this.search)) {
        return true;
      }
      return false;
    },
  },
});
