/* --------------------------------------------------
---------------- О Г Л А В Л Е Н И Е ----------------
JavaScript -> События
8. События клавиатуры



	Все примеры в:

			3. JavaScript ->
			0. Practical samples and techniques ->
			2. Events ->




-------------------------------------------------- */








/* --------------------------------------------------
---------------- И Н Ф О Р М А Ц И Я ----------------


Ссылки:


	> Глава "События клавиатуры" учебника по JavaScript
		от Ильи Кантора:
				http://learn.javascript.ru/keyboard-events




*****************************************************
Оглавление:

	> 3 основные события клавиатуры
	> Порядок возбуждения событий при нажатии на клавишу
	> Подробнее о keydown/keyup, скан-код.
	> Подробнее о keypress. Символьные и управляющие клавиши.
	> Кроссбраузерная функция для получения символа из события keypress
	> Отмена пользовательского ввода
	> При keydown/keypress значение в input.value ещё старое
	> Автоповтор нажатия

	> Итого, рецепты
	> Живые примеры
		> Фильтрация ввода на примере поля для возраста
		> Перевод всех символов в вода в верхний регистр


*****************************************************




> 3 основные события клавиатуры:
	- keydown
	- keypress
	- keyup


> Порядок возбуждения событий при нажатии на клавишу

	> В общем случае порядок такой:
			1. keydown		| при нажатии
			2. keypress		| при нажатии
			3. keyup			| когда клавишу отпускают

	> В зависимости от типа нажатой клавиши и операционной системы может
		меняться состав возбуждаемых событий:

		> Тип - печатные клавиши.
			> Примеры: S 1 ,
			> Порядок наступления событий:
					1. keydown
					2. keypress
					3. keyup
			> Исключение - обработка caps lock в MacOS. Подробнее об этом по ссылке:
				http://learn.javascript.ru/keyboard-events

		> Тип - специальные клавиши.
			> Примеры: ALT ESC стрелка_вверх
			> Порядок наступления событий:
					1. keydown
					2. keyup

		> Тип - печатные клавиши с клавишами-модификаторами
			> Примеры: ALT+e CTRL+y CMD+1
			> Порядок наступления событий под Windows:
					1. keydown
					2. keypress
					3. keyup
			> Порядок наступления событий под MacOS:
					1. keydown
					2. keyup
			> Если сочетание вызвало браузерный диалог ("Сохранить файл",
				"Открыть файл" и т.д.), то keypress и keyup не будет.
			> В русской раскладке под MacOS в браузерах safari/firefox сочетания
				с Ctrl/Cmd не дают keyCode (ошибка в браузерах). При этом для Cmd
				происходит keypress с английским кодом символа.
				> Т.О. если использовать для обработки сочетаний только keydown,
					то в русской раскладке под MacOS в Safari/Firefox будут проблемы.
				> Для сочетаний с Cmd эти проблемы можно обойти, добавив обработку
					keypress.


> Подробнее о keydown/keyup, скан-код.
	> Событие keydown происходит при нажатии клавиши.
	> Событие keyup происходит при отпускании клавиши.
	> Свойство event.keyCode позволяет получить скан-код задействованной
		клавиши.
	> Скан-код - код клавиши.
		> Он одинаков при любой раскладке.
		> Пример: клавиша Z может означать символы 'z','Z','я','Я', при этом
			скан-код этой клавиши во всех случаях один и тот же - 90.
		> Для буквенно-цифровых клавиш, скан-код будет равен коду соотв.
			заглавной английской буквы/цифры.
			> Пример: при нажатии клавиши S (не важно, каков регистр или раскладка),
				её скан-код будет равен "S".charCodeAt(0).
		> Коды других символов (напр. пунктуационных) можно узнать из:
			- Таблицы Джона Уолтера:
						http://unixpapa.com/js/key.html
			- На тестовом стенде:
						http://learn.javascript.ru/keyboard-events#keyboard-test-stand
		> На текущий момент (11.12.2013) осталось несколько кроссбраузерных
			несовместимостей касательно скан-кодов:
						http://learn.javascript.ru/keyboard-events#какими-бывают-скан-коды


> Подробнее о keypress. Символьные и управляющие клавиши.
	> Событие keypress происходит сразу же после keydown, если нажата
		СИМВОЛЬНАЯ клавиша - Т.Е. такая, нажатие которой приводит к появлению
		символа.
	> Т.О. любые буквы/цифры и другие символьные клавиши генерируют keypress,
		а УПРАВЛЯЮЩИЕ клавиши, такие как CTRL, SHIFT, ALT, F1 и т.д. -
		событие keypress не генерируют.


> Кроссбраузерная функция для получения символа из события keypress

		// Кроссбраузерная функция для получения символа из события keypress
		// > event.type должен быть keypress
		// > Этот вариант фукнции не позволяет получить спец. символы
		function getChar(event) {
			if (event.which == null) {  // IE
				if (event.keyCode < 32) return null; // спец. символ
				return String.fromCharCode(event.keyCode)
			}

			if (event.which!=0 || event.charCode!=0) { // все кроме IE
				if (event.which < 32) return null; // спец. символ
				return String.fromCharCode(event.which); // остальные
			}

			return null; // спец. символ
		}

	> Основные браузерные особенности, учтенные в getChar():
		> Во всех браузерах, кроме IE, у события keypress есть свойство charCode,
			которое содержит код символа.
		> При этом у Opera есть некоторые баги со специальными клавишами.
			Для некоторых из них она «забывает» указать charCode, например,
			для «Backspace». А другие браузеры в этом случае код указывают.
		> Браузер IE для keypress не устанавливает charCode. Вместо этого он
			записывает код символа в keyCode (в keydown/keyup там хранится скан-код).


> Отмена пользовательского ввода

	> Чтобы отменить пользовательский ввод, требуется отменить действия
		браузера "по умолчанию" при возбуждении одного из событий:
			- keydown
			- keypress
		> Причем достаточно отмены любого 1-го из них.
		> В некоторых браузерах - например, IE и Safari/Chrome отмена действий
			"по умолчанию" для события keydown предотвращает возбуждение
			события keypress.

	> Однако, некоторые мобильные устройства не генерируют вышеуказанные
		события при вводе текста, а сразу вставляют его в поле. И для них
		вышеуказанный способ отмены пользовательского ввода не сработает.
		> Отменить пользовательский ввод и для них можно с помощью событий
			для элементов форм (см. соответствующий учебный файл).
		> А именно, использовать

	> Если требуется отменить ввод только определенных символов:
		> В функции-обработчике проверяешь, что за символ пытаются ввести.
			Если тот, который надо отменить, то отменяешь его.


> При keydown/keypress значение в input.value ещё старое
	> Описание проблемы:
		> Функции-обработчики событий keydown и keypress срабатывают еще до
			того, как ввод обработан браузером.
		> Т.О., на момент их срабатывания, значение input.value еще старое,
			потому что браузер еще не успел его обновить.
	> Решение:
		> Вариант 1 - использовать событие keyup.
		> Вариант 2 - с помощью setImmediate сделать так, чтобы обработчик
			в стеке задач потока пропустил вперед действия браузера по умолчанию
			(см. 1. Ядро JS -> 6. Таймеры).


> Автоповтор нажатия
	> При долгом нажатии клавиши возникает автоповтор.
	> По стандарту при автоповторе свойство event.repeat === true
	> Порядок и состав генерируемых событий:

		> По стандарту события должны генерироваться в следующем составе и порядке:
			- keydown
			- keypress
			... повторяется, пока клавиша не отжата ...
			- keyup

		> В Firefox под Linux порядок и состав такой:
			- keydown
			- keypress
			- keyup
			... повторяется, пока клавиша не отжата ...
			- keyup

		> В Chrome под MacOS порядок и состав такой:
			- keydown
			- keyup
			... повторяется, пока клавиша не отжата ...
			- keyup

	> Поскольку порядок и состав событий везде разный, то можно полагатсья
		только на то, что есть у них у всех одинакового. А именно:
		- Событие keydown при каждом автонажатии клавиши.
		- Событие keyup в самом конце, когда ты отпускаешь клавишу.






> Итого, рецепты


	> Реализация горячих клавиш
		> Использовать keydown.
		> Под MacOS для обработки "cmd + русский символ" потребуется еще и keypress
			(подробнее см. выше "Тип - печатные клавиши с клавишами-модификаторами")


	> Получение символа
		> Использовать keypress и пользовательскую функцию getChar().


	> Получение нового значения input.value
		> На момент срабатывания keypress/keydown символ ещё не введён в input.value.
		> Есть 3 варианта получить новое значение input.value:
			> 1 вариант - получить его в функции-обработчике onkeyup - здесь действия
			  браузера "по умолчанию" уже произошли, и там лежит новое значение.
			> 2 вариант - с помощью функции setImmediate сделать так, чтобы задача
				"выполнение функции-обработчика" пропустила вперед себя в стеке задач
				потока задачу "действия браузера по умолчанию". И тогда, вторая выполнится
				раньше первой, и первая сможет получить уже новое значение.
			> 3 вариант - рассчитать, каково будет новое значение. Взять старое значение,
				взять символ, который будет добавлен, и рассчитать. Реальный пример
				этого можно увидеть выше в задаче "Фильтрация ввода".


	> Обработка вставки с помощью ctrl+v, мыши или вообще без клавиатуры
		> В той же задаче выше "Фильтрация ввода" была учтена возможность ввода
			только с клавиатуры.
		> Но пользователь может ввести данные в input не только с клавиатуры,
			а также еще:
			- Скопировав и вставив их в input с помощью мыши.
			- Ввести с какого-нибудь мобильного устройства
			- ... И т.д. ...
		> Самый надежный способ это отслеживать - событытия формы. Например,
			oninput - оно срабатывает после любого ввода в поле, и срабатывает
			вне зависимости от того, каким способом данные были вставлены в input.




> Живые примеры

	> Фильтрация ввода на примере поля для возраста:
		- В поле можно вводить только цифры.
		- Учтена возможность ввода/удаления не с клавиатуры.
		- Если введенная цифра не в диапазоне [0,150], то автоматически
		  исправляется на ближайшую допустимую.

			3. JavaScript ->
			0. Practical samples and techniques ->
			2. Events ->
			19. Input filter - age as example


	> Перевод всех символов ввода в верхний регистр:
		- Все вводимые символы переводятся в верхний регистр.
		- Учтена возможность ввода не с клавиатуры.

			3. JavaScript ->
			0. Practical samples and techniques ->
			2. Events ->
			20. Input fulter - to upper case






-------------------------------------------------- */





















