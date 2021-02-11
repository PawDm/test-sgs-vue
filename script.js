// Инициализация данных
const cities = {
  Moscow: {
    first: ['Ivanov', 'Petrov'],
    second: ['Sidorov', 'Kozlov'],
  },
  SaintPetersburg: {
    first1: ['Mamaev', 'Sosnov'],
    second1: ['Сидоров', 'Козлов'],
    third1: ['Mamaev', 'Козлов'],
  },
  Kaluga: {
    first2: ['Максимов', 'Дмитриев'],
    second2: ['Николаев', 'Леонтьев'],
  },
};
//********************

// Установка дефолтных значений
const defaultCity = Object.keys(cities)[0];
const defaultShop = Object.keys(cities[defaultCity])[0];
const defaultWorker = Object.values(cities[defaultCity][defaultShop])[0];
// **********************

// Данные для списка бригад + триггер, срабатывающий на время
const brigades = ['8:00 - 20:00', '20:00 - 8:00'];
let currentHour = new Date().getHours();
let trigger = getTrigger(currentHour);
let currentBrigade = [];
currentBrigade.push(brigades[trigger]);

// *********************************


// Инициализация рабочих смен
const workShifts = ['Первая', 'Вторая'];
const defaultWorkShifts = workShifts[0];
//*********************


// Функци триггер
function getTrigger(currentHour) {
  let trigger = 7 < currentHour && currentHour < 20 ? 0 : 1;
  return trigger;
}
//********************************


// Чистка куков
function clearCookie() {
  var mydate = new Date();
  mydate.setTime(mydate.getTime() - 1);
  document.cookie = 'CookieForTest=; expires=' + mydate.toGMTString();
}
//******************************


// Установка и отправка куков
function setAndSendCookie(forCookie) {
  document.cookie =
    'CookieForTest=' +
    JSON.stringify(forCookie) +
    '; expires=' +
    new Date(Date.now() + 7 * 86400000).toGMTString();
}

//*****************************

Vue.createApp({
  data() {
    return {
      cities: cities,
      selectedCity: defaultCity,
      selectedShop: defaultShop,
      selectedWorker: defaultWorker,
      brigades: currentBrigade,
      selectedBrigades: brigades[trigger],
      workShifts: workShifts,
      selectedWorkShifts: defaultWorkShifts,
    };
  },
  methods: {
    // Метод, заполняющий листы цехов, работников. При изменении города
    changeCity() {
      this.selectedShop = Object.keys(this.cities[this.selectedCity])[0];
      this.selectedWorker = Object.values(
        this.cities[this.selectedCity][this.selectedShop]
      )[0];
    },
    //*************************
    
    // Метод, заполняющий лист роботников, при изменении цеха
    changeShop() {
      this.selectedWorker = Object.values(
        this.cities[this.selectedCity][this.selectedShop]
      )[0];
    },
    //*******************
    
    // Отправляем куки
    sendCookie() {
      clearCookie();
      let forCookie = [
        { city: this.selectedCity },
        { shop: this.selectedShop },
        { worker: this.selectedWorker },
        { brigades: this.selectedBrigades },
        { workShift: this.selectedWorkShifts },
      ];
      setAndSendCookie(forCookie);
    },
  },
 //*****************************
  
  computed: {
    //Массив данных для заполнения листа Воркеров
    workers: function () {
      if (this.selectedCity != '' && this.selectedShop != '') {
        return this.cities[this.selectedCity][this.selectedShop];
      }
      //***************************
    },
  },
}).mount('#app');
