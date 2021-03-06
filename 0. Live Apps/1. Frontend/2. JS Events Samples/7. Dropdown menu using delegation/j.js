/**
 * Задача:
 *
 * > Усовершенствовать меню из задачи "6. Menu using delegation" - теперь
 * 	 при наведении на кнопку меню курсора мыши под ней должно появляться
 * 	 drop-down меню.
 * > Drop-down меню должно быть представлено в HTML списком ul, который вложен
 * 	 в элемент li кнопки в меню после элемента a.
 * > JS-код менять нельзя, drop-down меню сделать с помощью CSS.
 *
 *
 *
 * Техника:
 *
 *> В этой задаче, благодаря технике делегирования событий, не придется
 *	вообще изменять JS-код, чтобы усовершенствовать обычное меню до
 *	drop-down мнею.
 *
 *
 *
 *
 */






// ------- JS-код из задачи "6. Menu using delegation"
//       > Его в этой задаче не меняем

var ul,
		href;


// Повесить 1 общий обработчик события click на ul
ul = document.getElementById('menu');
ul.onclick = function(event) {

	// Кроссбраузерно получить событие
	event = event || window.event;

	// Кроссбраузерно получить target-элемент
	var target = 	event && event.target ||
								event.srcElement;

  // Проверим, интересует ли нас этот клик

		// если клик был не на ссылке, то нет
		if (target.tagName != 'A') return;

		// если клик был по ссылке, то обработать его
		href = target.getAttribute('href');
		console.log(href);

	// Отменить действие браузера по умолчанию в ответ на событие
	// click по элементу с тегом 'A'

		// Кроссбраузерно отменить действия браузера "по умолчанию" в ответ
		// на возникновение события:
		event.preventDefault ? event.preventDefault() :
													(event.returnValue=false);

};