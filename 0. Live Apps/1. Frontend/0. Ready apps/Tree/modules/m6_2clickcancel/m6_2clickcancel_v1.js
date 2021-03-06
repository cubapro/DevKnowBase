/*=============================================================
/   Приложение "отмена выделение двойным кликом" - позволяет избавиться
		от выделения чего-бы то нибыло в дереве двойным кликом.






-----------------------------------------------------
---------------- И Н Ф О Р М А Ц И Я ----------------

Ссылки:







*****************************************************
Оглавление:

	> Инструкция по применению

	>	Постановка задач
		> Описание проблемы
		> Простой вариант решения
		> Как подключать приложение "отмена выделение двойным кликом" к дереву?
		> Корректная работа в 2-х и более экземплярах

	> Краткий план решения
	> Архитектура решения




*****************************************************


> Инструкция по применению приложения "отмена выделение двойным кликом"

	> Внимание!
		> Без библиотеки "treeLibrary.js" это приложение работать НЕ БУДЕТ.
		> Её надо добавить в документ ДО приложения.

	> Как использовать приложение "выделение"?
		> В разметке документа тем контейнерам div, содержащим "деревья",
			в которых требуется "выделение", добавить класс
			"tree-dblclick-unselectable".
		> В конец документа тегом script добавить библиотеку "treeLibrary.js".
		> После библиотеки также тегом script добавить фийл приложения "dbl_click_unselectable.js"


> Постановка задач

	> Описание проблемы
		> У браузера есть действие по умолчанию - при двойном кликом левой
			кнопки мыши по элементу выделять его.
		> При работе с деревом это доставляет неудобства, и желательно,
			чтобы была возможность именно для дерева это отключить.

	> Простой вариант решения
		> Добавить дереву функцию-обработчик, срабатывающую на двойной клик,
			которая отменяет всё выделение в документе.
		> Именно так решена эта проблема в приложении jsTree.

	> Как подключать приложение "отмена выделение двойным кликом" к дереву?
		> Использовать шаблон проектирования "поведение".
		> Для подключения "открывашки" к дереву, достаточно добавить эл-ту
			div, содержащему дерево, класс "tree-dblclick-unselectable". А для
			отключения - убрать его.

	> Корректная работа в 2-х и более экземплярах
		> Если на 1 странице присутствуют 2 и более экземпляров деревьев,
			"отмена выделение двойным кликом" в каждом из них должно работать
			корректно.


> Краткий план решения

	> Написать функцию-обработчик, отменяющую всё выделение на странице
		при двойном клике по тем деревьям, к которым она будет подключена.

	> Найти все деревья в документе, у которых есть класс tree-dblclick-unselectable,
		и подключить к ним вышеопределённую функцию-обработчик.


> Архитектура решения

[-----A. Добавление функции-обработчика всем деревьям в документе с "запретом выделения при 2x клике"]

a1.	Добавить функцию-обработчик no_dblclick_selection_handler в качестве
		обрабочтика события dblclick для всех деревьев в документе (эл-ты div,
		id которых выглядит как "treeUID" + номер), у которых есть класс
		"tree-dblclick-unselectable"

a2.	Написать функцию-обработчик click_open_close_handler, реализующую
		логику приложения. В этой функции должно быть выполнено
		следующее: [b]


[-----B. Внутри обработчика: отменить всё выделение на странице]

b1.	Снять браузерное выделение всего текста на странице.




[-----X. Дополнительный функционал]





*/

console.log('Загрузился: == 2xClick_cancel_v1.js == ');


//[-----A. Добавление функции-обработчика всем деревьям в документе с "запретом выделения при 2x клике"]

//a1.	Добавить функцию-обработчик no_dblclick_selection_handler в качестве
//		обрабочтика события dblclick для всех деревьев в документе (эл-ты div,
//		id которых выглядит как "treeUID" + номер), у которых есть класс
//		"tree-dblclick-unselectable"

	// Получить ссылки на все деревья в документе
	// (div с id выглядящем как "treeUID" + номер)
	var trees = getTrees();

	// Назначить обработчики
	for(var i=0; i<trees.length; i++) {

		if(checkClass('', 'tree-dblclick-unselectable', trees[i]) === 1) {
			addEvent(trees[i], 'click', false, no_dblclick_selection_handler);
		}

	}


//a2.	Написать функцию-обработчик click_open_close_handler, реализующую
//		логику приложения. В этой функции должно быть выполнено
//		следующее: [b]

function no_dblclick_selection_handler() {

//[-----B. Внутри обработчика: отменить всё выделение на странице]

	//b1.	Снять браузерное выделение всего текста на странице.
	if(document.selection && document.selection.empty) {
			document.selection.empty();
	} else if(window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
	}


}



//[-----X. Дополнительный функционал]









