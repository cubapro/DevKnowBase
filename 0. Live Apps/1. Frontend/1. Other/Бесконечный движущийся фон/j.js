/*//============================================////
////																						////
////           j.js - движущийся фон						////
////																					  ////
////============================================////
//// 			        		 		  ////
//// 			 Оглавление  			////
//// 			         				  ////
////========================////


  0. Описание сути задачи

	1. Подготовить функцию AddEvent для назначения обработчика событияю
	2. Запустить движение фона

  3. Назначить DOM-элементу-фону обработчик события mouseover
  4. Назначить DOM-элементу-фону обработчик события mouseout


////==========================================================//*/

/*-------------------------//
// 0. Описание сути задачи //
//-------------------------//

	Сделать бесконечно медленно движущийся влево фон
	------------------------------------------------
		- У нас имеется div заданных размеров.
		- У него в качестве фона назначена картинка.
		- Она назначена ему через css-свойство background.
		- Требуется сделать фон бесконечно движущимся влево.
		- Он должен быть зациклен.

	Скорость движения
	-----------------
		- Скорость движения: 25px в секунду.
		- Смысл здесь тот же, что и в кино с его 25 кадрами в секунду.
		- глазу будет казаться, что движение происходит планов и непрерывно.
		- Потому что глаз воспринимает ~25 кадров всекунду.
		- Это значит, что за 1000 миллисекунд фон должен 25 раз сдвинуться на 1 пиксель влево.
		- Итого, таймер должен запускать функцию сдвига 1 раз в 40мс.

	Остановка движения фона при наведении мыши
	------------------------------------------
		- Требуется останавливать движение, когда курсор находится над div'ом.
		- Для этого мы заранее подготавливаем переменную id.
		- И при каждом применении setInterval сохраняем id таймера в эту переменную.
		- Назначаем функцию-обработчик события mouseover DOM-элементу div с фоном.
		- И в этом обработчике, с помощью clearTimeout и переменной id останавливаем
		  таймер при наведении мыши на DOM-элемент div с фоном.

	Возобновление движения фона при уводе курсора мыши с DOM-элемента div с фоном
	-----------------------------------------------------------------------------
		- Для этого назначаем функцию-обработчик события mouseout DOM-элементу div с фоном.
		- В ней мы снова устанавливаем таймер на 40мс, который выполняет ф-ию shiftLeft.
		- При этом, сохраняем новый id этого таймера в ту же самую переменную id. 

//-------------------------*/


//---------------------------------------------------------------------//
// 1. Подготовить функцию AddEvent для назначения обработчика событияю //
//---------------------------------------------------------------------//
/*
| Назначить эл-ту функ.обработчик событи(ю/ий) [кроссбраузерно]

	Аргументы:
		- element		| ссылка на элемент
		-	event			| имя события без приставки "on"
		- handler		| ссылка на функцию-обработчик
		- params		| обработчику можно передать параметры в params
		- phase			| фаза, в которой ловить событие (только для addEventListener, в IE<=8 не работает)

	Возвращает:
		- Ничего

	Пример:

		addEvent(button_cancel, 'click', function(event, params){

			// ...

		}, {x: 10, y: 20});

//---------------------------------------------------------------------*/
function addEvent(element, event, handler, params, phase) {

	// 1. Завернуть handler в замыкание, в которое положить params
	var handlerWithParams = function handlerWithParams(event){

		var self = this;
		return handler.bind(self)(event, params, handlerWithParams);

	};

	// 2. Подготовить функцию для подписки ф-ии handler на событие element
	var subscribe = function(event) {

		// Проверить, существует ли в этом браузере метод addEventListener
		// - Если да, то использовать его.
		// - Если нет, значит это старый IE, и использовать attachEvent

			// Если да, то использовать его.
			if (document.addEventListener) {
				element.addEventListener(event, handlerWithParams, phase);
			}

			// Если нет, значит это старый IE, и использовать attachEvent
			else {

				// Если скрипт выполняется в IE<=8 и event == 'blur':
				if((document.all && !document.addEventListener) && event == 'blur') {
					element.onfocusout = handlerWithParams;
					return;
				}

				// Если скрипт выполняется в IE>=9
				element.attachEvent("on" + event, handlerWithParams);

			}

	};

	// 3. Если event является массивом, то:
	//    - Значит это массив событий.
	//    - Для каждого из них надо добавить обработчиком handler
	if({}.toString.call(event).slice(8,-1) == 'Array') {
		for(var i=0; i<event.length; i++) {
			subscribe(event[i]);
		}
	}

	// 4. Если event - строка, то...
	else subscribe(event);

	// 5. Вернуть ссылку на handlerWithParams
	return handlerWithParams;

}


//----------------------------//
// 2. Запустить движение фона //
//----------------------------//

	// 2.1. Написать функцию, которая сдвигает фон на 1 px влево. //
	//------------------------------------------------------------//
	shiftLeft = function(elem) {

		// Получить текущее значение CSS-свойства background-position
		var bgPos = window.getComputedStyle(div,'').backgroundPosition;	// 'Xpx Ypx'

		// Разбить полученную строку bgPos на 2 отдельные составляющие: по X и по Y
		var bgPosArr = bgPos.split(' ');

		// Получить текущую позицию по X в виде числа
		var bgPosNumX = parseInt(bgPosArr[0]);


		// Вычесть 1 px из составляющей по X и установить результирующее значение
		// элементу elem
		elem.style.backgroundPosition = bgPosNumX-1 + 'px 0px';

	};

	// 2.2. С помощью setTimeout исполнять shiftLeft 1 раз в 40 мс //
	//------------------------------------------------------------//

		// Получить ссылку на элемент
		var div = document.getElementById('container');

		// Запустить таймер
		var id = setInterval(function run(){

			shiftLeft(div);

		}, 40);


//-------------------------------------------------------------//
// 3. Назначить DOM-элементу-фону обработчик события mouseover //
//-------------------------------------------------------------//
addEvent(div, 'mouseover', function(event, params){

	// Остановить выполнение заданного в 4. setInterval, используя его id
	// - ID передан сюда в качестве параметра.
	clearTimeout(id);

}, {id: id});


//------------------------------------------------------------//
// 4. Назначить DOM-элементу-фону обработчик события mouseout //
//-----------------------------------------------------------//
addEvent(div, 'mouseout', function(event, params){

	// Снова запустить выполнение функции shiftLeft каждые 40мс, с помощью setInterval
	// - Ссылки на shiftLeft и div переданы в обработчик, как параметры
	id = setInterval(function run(){

		shiftLeft(div);

	}, 40);

}, {shiftLeft: shiftLeft, div: div});
