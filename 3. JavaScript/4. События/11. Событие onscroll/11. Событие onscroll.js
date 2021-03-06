/* --------------------------------------------------
---------------- О Г Л А В Л Е Н И Е ----------------
JavaScript -> События
11. Событие onscroll


	> Размера прокрученной области в px




-------------------------------------------------- */


// Размера прокрученной области в px
// > Отображается на экране
// > Обновляется при прокрутке страницы
window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  document.getElementById('showScroll').innerHTML = scrolled;
};









/* --------------------------------------------------
---------------- И Н Ф О Р М А Ц И Я ----------------


Ссылки:


	> Глава 'Событие "onscroll"'
		учебника по JavaScript от Ильи Кантора:
				http://learn.javascript.ru/event-onscroll



*****************************************************
Оглавление:


	> Общая информация
	> Живые примеры:
		> Фиксация меню при прокрутке в верхней части окна
		> Кнопка помощи в навигации при прокрутке



*****************************************************


> Общая информация
	> Событие scroll возбуждается при прокрутке элемента - но уже после
		действий браузера "по умолчанию" по прокрутке.
		> Т.О. в обработчике этого события текущее значение прокрутки - это
			будет уже новое значение, а не старое.
	> Генерировать событие scroll могут только прокручиваемые элементы.
	> При прокрутке окна срабатывает событие window.onscroll.
		> Например, следующая функция при прокрутке окна выдает кол-во
			прокрученных пикселей:

			window.onscroll = function() {
				var scrolled = window.pageYOffset || document.documentElement.scrollTop;
				document.getElementById('showScroll').innerHTML = scrolled + 'px';
			}


> Живые примеры:
	> Фиксация меню при прокрутке в верхней части окна:

			3. JavaScript ->
			2. Events ->
			30. Scroll - fixing of menu

	> Кнопка помощи в навигации при прокрутке

			3. JavaScript ->
			2. Events ->
			31. Scroll - scroll up button




-------------------------------------------------- */


















