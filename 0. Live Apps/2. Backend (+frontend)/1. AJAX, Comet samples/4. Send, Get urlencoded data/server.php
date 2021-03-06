<?php


//1. Написать функцию, которая принимает строку в формате urldecoded,
//	 а на выходе возвращает массив декодированных пар имя/значение.
function decoder($urlencoded_string) {

  //Сначала извлечём query string - которая и есть переданное тело-строка
  $body = $urlencoded_string;

  //Теперь надо к каждому значению в $body применить ф-ию urldecode,
  //чтобы перевести его из формата urlencoded в обычный текстовый
  $decoded_body = [];			// это будет массив имя/значение декодированных параметров из $body


    // Разбить $body на массив пар "имя=значение" с разд. '&' $body,
    // в нашем случае в итоге получится всего всего 2 эл-та:
    // [0]: 'name=John'
    // [1]: 'surname=Smith'
    $body_array_pare = explode('&', $body);


    // Пройтись циклом по эл-там $body_array_pare
    foreach($body_array_pare as $pare) {


      // Каждый из эл-тов массива $body_array_pare также разбивается
      // на массив с разделителем '=', и таким образом отделяются имя параметра
      // от его значения, что позволяет:
      // - Применить к значению функцию urldecode
      // - Сохранить пары имя/декодированное_значение в $decoded_body
      $body_array_param = explode('=', $pare);

      // Если в нём что-то есть, записать пару имя/декодированное_значение в $decoded_body
      if($body_array_param) {
        $decoded_body[$body_array_param[0]] = urldecode($body_array_param[1]);
      }

    }

  // Вернуть полученный массив декодированных пар имя/значение
  return $decoded_body;

}




//2. Проверить с помощью функции empty():
//		- если суперглобальный массив $_GET не пуст, то выполнить
//			следующее: [2,3,]
//	 	- если суперглобальный массив $_POST не пуст, то выполнить
//	 		следующее: [2]
if(!empty($_GET)) {


  //3. Вывести в выходной поток следующую информацию:
  //		- Пары имя-значение, извлечённые из query string вручную
  //		- Пары имя-значения из массива $_GET
  //		> Причём, каждая из этих груб должна быть соответствующе помечена,
  //			и отделена от другой.

    // Вывести результат ручного парсинга:
    echo '<h4>Ручной парсинг:</h4>';
    echo '<pre>';
    var_dump(decoder($_SERVER['QUERY_STRING']));
    echo '</pre>';

    // Вывести результат автоматического парсинга:
    echo '<h4>Авто парсинг ($_GET):</h4>';
    echo '<pre>';
    var_dump($_GET);
    echo '</pre>';


}

if(!empty($_POST)) {


  //4. Вывести в выходной поток следующую информацию:
  //		- Пары имя-значение, извлечённые из query string вручную
  //		- Пары имя-значения из массива $_POST
  //		> Причём, каждая из этих груб должна быть соответствующе помечена,
  //			и отделена от другой.

    // Вывести результат ручного парсинга:
    echo '<h4>Ручной парсинг:</h4>';
    echo '<pre>';
    var_dump(decoder(file_get_contents('php://input')));
    echo '</pre>';

    // Вывести результат автоматического парсинга:
    echo '<h4>Авто парсинг ($_POST):</h4>';
    echo '<pre>';
    var_dump($_POST);
    echo '</pre>';


}









