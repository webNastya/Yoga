/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {}; dot
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/        }
/******/    };
/******/
/******/    // define __esModule on exports
/******/    __webpack_require__.r = function(exports) {
/******/        if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/        }
/******/        Object.defineProperty(exports, '__esModule', { value: true });
/******/    };
/******/
/******/    // create a fake namespace object
/******/    // mode & 1: value is a module id, require it
/******/    // mode & 2: merge all properties of value into the ns
/******/    // mode & 4: return value when already ns object
/******/    // mode & 8|1: behave like require
/******/    __webpack_require__.t = function(value, mode) {
/******/        if(mode & 1) value = __webpack_require__(value);
/******/        if(mode & 8) return value;
/******/        if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/        var ns = Object.create(null);
/******/        __webpack_require__.r(ns);
/******/        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/        if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/        return ns;
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {

    // modal calc
    let glazingSection = document.querySelector(".glazing"),
        popupCalc = document.querySelector(".popup_calc"),
        closeCalc = document.querySelectorAll('.popup_calc_close'),
        allModalCalc = document.querySelectorAll('.popup_calc, .popup_calc_profile, .popup_calc_end'),
        form = document.querySelector('.end_form'),
        popupCalcInputs = popupCalc.getElementsByTagName("input");

    glazingSection.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("popup_calc_btn")) {
            popupCalc.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });

    function setValidationCalc(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("input", () => {
                inputs[i].value = inputs[i].value.replace(/[^0-9]/ig, "");
            });
        }
    }
    setValidationCalc(popupCalcInputs);

    // tab calc
    let popupCalcBalconIcons = popupCalc.querySelector(".balcon_icons"),
        smallPictures = popupCalc.querySelectorAll(".picture"),
        bigPictures = popupCalc.querySelectorAll(".big_img img");

    function hidePictures(a) {
        for (let i = a; i < bigPictures.length; i++) {
            bigPictures[i].style.display = "none";
            smallPictures[i].classList.remove("do_image_more");
        }
    }

    function showPictures(b) {
        if (bigPictures[b].style.display = "none") {
            bigPictures[b].style.display = "inline-block";
            smallPictures[b].classList.add("do_image_more");
        }
    }

    popupCalcBalconIcons.addEventListener("click", (event) => {
        let target = event.target;
        event.preventDefault();
        if (target && target.classList.contains("picture")) {
            for (let i = 0; i < smallPictures.length; i++) {
                if (target == smallPictures[i]) {
                    hidePictures(0);
                    showPictures(i);
                    break;
                }
            }
        }
    });

    // modal calc profile
    let popupCalcButton = popupCalc.querySelector(".popup_calc_button"),
        popupCalcProfile = document.querySelector(".popup_calc_profile"),
        popupCalcContent = document.querySelector(".popup_calc_content"),
        popupCalcProfileButton = document.querySelector(".popup_calc_profile_button"),
        popupCalcEnd = document.querySelector(".popup_calc_end");


    popupCalcButton.addEventListener("click", () => {

        let statusMessageInput = document.createElement("div");
        statusMessageInput.classList.add("status");

        if (popupCalcInputs[0].value == "" && popupCalcInputs[1].value == "") {
            popupCalc.style.display = "block";
            popupCalcContent.appendChild(statusMessageInput);
            statusMessageInput.textContent = "Заполните все поля!";
        } else {
            popupCalcProfile.style.display = "block";
            document.body.style.overflow = "hidden";
            popupCalc.style.display = "none";
        }

    });

    document.getElementById('Check2').addEventListener('change', () => {
        document.getElementById('Check1').checked = !document.getElementById('Check2').checked;
    });

    document.getElementById('Check1').addEventListener('change', () => {
        document.getElementById('Check2').checked = !document.getElementById('Check1').checked;
    });

    popupCalcProfileButton.addEventListener("click", () => {
        popupCalcProfile.style.display = "none";
        popupCalcEnd.style.display = "block";
    });

    function closeModalCalc() {
        for (let i = 0; i < closeCalc.length; i++) {
            closeCalc[i].addEventListener('click', function () {
                for (let c = 0; c < allModalCalc.length; c++) {
                    allModalCalc[c].style.display = 'none';
                    document.body.style.overflow = '';
                }
            })
        }

    }
    closeModalCalc();

    // send
    let obj = {},
        message = {
        loading: 'Идёт отправка',
        success: 'Отправлено',
        failure: 'Ошибка'
    },
    statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

        for (let i = 0; i < smallPictures.length; i++) {
            smallPictures[i].addEventListener('click', function (e) {
                let target = e.target;
                if (target == smallPictures[i]) {
                    obj.type = smallPictures[i].getAttribute('alt');
                }
            })
        }

        popupCalcButton.addEventListener('click', function() {
            obj.width_window = document.getElementById('width').value;
            obj.height_window = document.getElementById('height').value;
        });

        document.querySelector('.popup_calc_profile_button').addEventListener('click', function() {
            if (document.getElementById('Check1').checked) {
                obj.weather = 'Холодное';
            } else {
                obj.weather = 'Тёплое';
            }
        });

    function sendFormCalc() {
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);
            input = form.querySelectorAll('.form-control');

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(form);

            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);
            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
        }
        sendFormCalc();
}

module.exports = calc;

/***/ }),

/***/ "./src/js/parts/decor-tabs.js":
/*!************************************!*\
  !*** ./src/js/parts/decor-tabs.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function decorTabs() {
    let tab = document.querySelectorAll('.decoration_item'),
        tabContent = document.querySelectorAll('.decoration_slider__content'),
        link = document.querySelectorAll('div.decoration_item > div');
        

        for (let i = 0; i < tab.length; i++){
            tab[i].addEventListener('click', function(){
                for (let u = 0; u < tab.length; u++){
                link[u].classList.remove('after_click');
                tabContent[u].style.display = 'none';
        }

            link[i].classList.add('after_click');
            tabContent[i].style.display = 'flex';
            });
        }
}
module.exports = decorTabs;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
    
    let message = {
        loading: 'Идет отправка',
        success: 'Отправлено',
        failure: 'Ошибка'
    };

    let input = document.getElementsByTagName('input'),
        contactForm = document.querySelectorAll('.second_form, .main_form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    // Модальное окно
    let sendForm = (form, input) => {
        contactForm.forEach(function (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                let formData = new FormData(form);

                let postData = (data) => {

                    return new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');

                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                        let obj = {};
                        formData.forEach((value, key) => {
                            obj[key] = value;
                        });

                        let data = JSON.stringify(obj);

                        request.onreadystatechange = function () {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4 && request.status == 200) {
                                resolve()
                            } else {
                                reject()
                            }
                        }

                        request.send(data);
                    })

                } // Конец postData

                let clearInput = () => {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => {
                        statusMessage.innerHTML = message.success;
                    })
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInput)
            });
        });
    }

    sendForm(contactForm, input);

    let validTel = document.querySelectorAll('input[name="user_phone"]');

    validTel.forEach(function (item) {
        item.oninput = function () {
            item.value = item.value.replace(/[^\d]/g, '');
        }
    });
}
module.exports = form;

/***/ }),

/***/ "./src/js/parts/glazing-tabs.js":
/*!**************************************!*\
  !*** ./src/js/parts/glazing-tabs.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function glazingTabs() {
    let tab = document.querySelectorAll('.glazing_block'),
        info = document.querySelector('.glazing_slider'),        
        tabContent = document.querySelectorAll('.glazing_slider__content'),
        link = info.getElementsByTagName('a');

        for (let i = 0; i < tab.length; i++){
            tab[i].addEventListener('click', function(){
                for (let u = 0; u < tab.length; u++){
                link[u].classList.remove('active');
                tabContent[u].style.display = 'none';
        }

            link[i].classList.add('active');
            tabContent[i].style.display = 'flex';
            });
        }
}

module.exports = glazingTabs;

/***/ }),

/***/ "./src/js/parts/img.js":
/*!*****************************!*\
  !*** ./src/js/parts/img.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function img() {
    
    let photoSmall = document.querySelectorAll('.work_img'),
        overlay = document.querySelector('.overlay');

    for (let i = 0; i < photoSmall.length; i++) {
        photoSmall[i].addEventListener('click', () => {
            event.preventDefault();
            let div = document.createElement('div'),
                a = photoSmall[i].parentElement.href;
            div.innerHTML = photoSmall[i].parentElement.innerHTML;
            overlay.appendChild(div);
            overlay.querySelector('img').src = a;
            overlay.style.cssText = 'display: flex; justify-content: center; align-items: center;';
            document.body.style.overflow = 'hidden';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == overlay) {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
            document.body.style.overflow = '';
        }
    });

}
module.exports = img;

/***/ }),

/***/ "./src/js/parts/popup.js":
/*!*******************************!*\
  !*** ./src/js/parts/popup.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function popup() {
    let call = document.querySelectorAll('.phone_link'),
        popup = document.querySelector('.popup'),
        close = document.querySelector('.popup_close');
    
    call.forEach(function(item) {
        item.addEventListener('click', () => {
            event.preventDefault();
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target == popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';            
        }
    });
}
module.exports = popup;

/***/ }),

/***/ "./src/js/parts/popupEngineer.js":
/*!***************************************!*\
  !*** ./src/js/parts/popupEngineer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function popupEngineer() {
    let call = document.querySelector('.popup_engineer_btn'),
        popup = document.querySelector('.popup_engineer'),
        close = document.querySelectorAll('.popup_close');
    
    call.addEventListener('click', () => {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    

    close.forEach(function(item) {
        item.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target == popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';            
        }
    });
}
module.exports = popupEngineer;

/***/ }),

/***/ "./src/js/parts/popupInterval.js":
/*!***************************************!*\
  !*** ./src/js/parts/popupInterval.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function popupInterval() {
    let popup = document.querySelector('.popup');

    let popupInterval = () => {
        popup.style.display = 'block';
    }

    setTimeout (popupInterval, 60000);

}
module.exports = popupInterval;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    let deadline = '2019-12-18';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60), 
            minutes = Math.floor((t/1000/60) % 60), 
            hours = Math.floor((t/1000/60/60) % 24),
            days = Math.floor((t/(1000*60*60*24)));        

        return { 
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    };

    let setClock = (id, endtime) => { 
        let timer = document.getElementById(id),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
                days.textContent = t.days;
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;
                
            if (t.days < 10) {
                days.textContent = '0' + t.days;
            }
    
            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            }

            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            }

            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }
    setClock('timer', deadline);
}
module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function() { 

  'use strict';
  let calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
      form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
      popup = __webpack_require__(/*! ./parts/popup.js */ "./src/js/parts/popup.js"),
      popupEngineer = __webpack_require__(/*! ./parts/popupEngineer.js */ "./src/js/parts/popupEngineer.js"),
      popupInterval = __webpack_require__(/*! ./parts/popupInterval.js */ "./src/js/parts/popupInterval.js"),
      img = __webpack_require__(/*! ./parts/img.js */ "./src/js/parts/img.js"),
      glazingTabs = __webpack_require__(/*! ./parts/glazing-tabs.js */ "./src/js/parts/glazing-tabs.js"),
      decorTabs = __webpack_require__(/*! ./parts/decor-tabs.js */ "./src/js/parts/decor-tabs.js"),
      timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js");
  
  calc();
  form();
  popup();
  popupEngineer();
  popupInterval();
  img();
  glazingTabs();
  decorTabs();
  timer();
});

/***/ })

/******/ });