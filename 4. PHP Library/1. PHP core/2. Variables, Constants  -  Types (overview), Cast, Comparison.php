<?php
/* --------------------------------------------------
---------------- О Г Л А В Л Е Н И Е ----------------
Константы и переменные  -  Их типы  -  приведение типов  -  сравнение переменных

БАЗА
> Константы
  > Пользовательские константы
    > Создание
    > Применение
  > Волшебные константы
  > Зарезервированные константы

> Переменные
  > Создание
  > Удаление
  > Проверка на наличие содержание пустого empty-значения.
    Отличие empty() от isset().
  > Проверить, является ли переменная числом или строкой,
    содержащей число - is_numeric()
  > Присвоение по ссылке, присвоение по значению
  > Переменные переменных
    > Создание
    > Решение двусмысленности при использовании с массивами

> Типы переменных (обзор)
  > Типы
  > Как быстро проверить тип-значение выражения - var_dump()
  > Как вывести на экран строковое представление переменной - var_export() - которое является полноценным php кодом
  > Как получать человеко-понятное значение типа (например, для отладки) - gettype()
  > Как надо проводить проверку типа в коде

> Приведение типов
  > -> int
  > -> float
  > -> string
  > -> bool

> Сравнение типов
  > гибкое сравнение
  > жесткое сравнение

> Особенности работы со ссылками
  >

-------------------------------------------------- */

// Константы
    // Пользовательские константы
        // Создание
        define("PI",3.14);
        // Применение
        echo "<p>Число ПИ = ". PI . "</p>";                   // Внимание: PI без $ перед ней!

    // Волшебные константы
    echo "<p>__LINE__ = " . __LINE__ . "</p>";             // номер строки
    echo "<p>__FILE__ = " . __FILE__ . "</p>";             // полный путь к файлу
    echo "<p>__DIR__ = " . __DIR__ . "</p>";               // полный путь к директории
    echo "<p>__FUNCTION__ = " . __FUNCTION__ . "</p>";     // имя функции, в которой константа
    echo "<p>__CLASS__ = " . __CLASS__ . "</p>";           // имя и namespace класса, в котором константа
    echo "<p>__TRAIT__ = " . __TRAIT__ . "</p>";           // имя и namespace трейта, в котором константа
    echo "<p>__METHOD__ = " . __METHOD__ . "</p>";         // имя метода класса, в котором константа
    echo "<p>__NAMESPACE__ = " . __NAMESPACE__ . "</p>";   // namespace, в котором константа

    // Предопределенные константы (выборочно)
    echo "<p>Версия PHP (string) = " . PHP_VERSION . "</p>";
    echo "<p>Мажорная версия PHP (int) = " . PHP_MAJOR_VERSION . "</p>";
    echo "<p>Минорная версия PHP (int) = " . PHP_MINOR_VERSION . "</p>";
    echo "<p>Название ОС (string) = " . PHP_OS . "</p>";
    echo "<p>МАХ длина пути к файлу (int) = " . PHP_MAXPATHLEN  . "</p>";
    echo "<p>МАХ размер числа типа int (int) = " . PHP_INT_MAX  . "</p>";
    echo "<p>Сколько байт занимает число типа int (int) = " . PHP_INT_SIZE  . "</p>";
    echo "<p>Константа с кодом последней error (int) = " . E_ERROR  . "</p>";
    echo "<p>Константа с кодом последней warning (int) = " . E_WARNING  . "</p>";
    echo "<p>Зарезервированная константа TRUE (boolean) = " . TRUE  . "</p>";
    echo "<p>Зарезервированная константа FALSE (boolean) = " . FALSE  . "</p>";
    echo "<p>Зарезервированная константа NULL = " . NULL  . "</p>";


// Переменные
    // Создание
        $x = 1;
        $y = 'Текст';
    // Удаление
        unset($y);

    // Проверка на наличие содержание пустого empty-значения.
        //   Отличие empty() от isset().
            // isset()
                $z1 = 1;
                $z2 = NULL;
                $z3;
                echo '<p>isset($z1) = ' . isset($z1) . '</p>';    // 1
                echo '<p>isset($z2) = ' . isset($z2) . '</p>';    // 0
                echo '<p>isset($z3) = ' . isset($z3) . '</p>';    // 0
                echo '<p>isset($abc) = ' . isset($abc) . '</p>';  // 0  (необъявленная переменная)
            // empty()
                $e0 = 1;
                $e1 = ''; $e2 = ""; $e3 = "0";
                $e4 = 0;
                $e5 = 0.0;
                $e6 = NULL;
                $e7 = [];
                $e8;
                echo '<p>empty($e0) = ' . empty($e0) . '</p>';    // 0
                echo '<p>empty($e1) = ' . empty($e1) . '</p>';    // 1
                echo '<p>empty($e2) = ' . empty($e2) . '</p>';    // 1
                echo '<p>empty($e3) = ' . empty($e3) . '</p>';    // 1
                echo '<p>empty($e4) = ' . empty($e4) . '</p>';    // 1
                echo '<p>empty($e5) = ' . empty($e5) . '</p>';    // 1
                echo '<p>empty($e6) = ' . empty($e6) . '</p>';    // 1
                echo '<p>empty($e7) = ' . empty($e7) . '</p>';    // 1
                echo '<p>empty($e8) = ' . empty($e8) . '</p>';    // 1
                echo '<p>empty($abc) = ' . empty($abc) . '</p>';  // 1  (необъявленная переменная)

    // Проверить, является ли переменная числом или строкой, содержащей число - is_numeric()
    echo "<p>is_numeric('13 друзей') = " . is_numeric('13 друзей') . '</p>';  // 0
    echo "<p>is_numeric(5) = " .           is_numeric('5')         . '</p>';  // 1
    echo "<p>is_numeric('ей нет 18') = " . is_numeric('ей нет 18') . '</p>';  // 0
    echo "<p>is_numeric('5555') = "      . is_numeric('5555')      . '</p>';  // 1

    // Присвоение по ссылке, присвоение по значению
        $var1 = 'Василий';
        $var2;
        // По ссылке
            $var2 = &$var1;       // теперь $var2 ссылается (как ярлык) на $var1
            $var2 .= ' Петров';   // меняю $var2, меняется значение $var1
            echo '<p>$var1 = ' . $var1 . '</p>';  // Василий Петров
        // По значению
            $var2 = $var1;       // Василий
            $var2 .= ' Петров';  // Василий Петров, $var1 == 'Василий'

    // Переменные переменных
        // Создание
            $y = 'John';
            $$y = 'Wayne';
            echo "<p>" . $John . '</p>';  // $John == $$y
        // Решение двусмысленности при использовании с массивами
            $$y = ['a','b','c','d','e'];
            echo "<p>Доступ к 0-му элементу массива" . ${$y}[0] . '</p>';  // 'a'
            ${$y[0]} = 'Katty';  // использование $y[0] == 'a' в качестве переменной


// Типы переменных (обзор)
    // Типы
    $x1 = TRUE;            // "boolean" или "bool" (начиная с PHP 4.2.0)
    $x2 = 1;               // "integer" или "int" (начиная с PHP 4.2.0)
    $x3 = 1.5;             // "float" (с PHP 4.2.0) и "double" (до PHP 4.2.0)
    $x4 = 'Строка';        // "string"
    $x5 = array(1,2,3);    // "array"
         $x5 = [1,2,3];    // ... альтернативный способ описания массива
    class o {}
       $x6 = new o;        // "object"
    $x7 = NULL;            // "null"
                           // "resource"

                           // "mixed"
                           // "number"
                           // "callback"

    // Как быстро проверить тип-значение выражения - var_dump()
        // На примере массива
        var_dump($x5);

    // Как вывести на экран строковое представление переменной - var_export() - которое является полноценным php кодом
        // На примере массива
        var_export($x5);

    // Как получать человеко-понятное значение типа (например, для отладки) - gettype()
        // На примере массива
        $whatType = gettype($x5);
        echo '<p>gettype($x5) = ' . gettype($x5) . '</p>';          // array

    // Как надо проводить проверку типа в коде
    echo '<p>' . is_bool($x1)   . '</p>';    // true
    echo '<p>' . is_int($x2)    . '</p>';    // true
    echo '<p>' . is_float($x3)  . '</p>';    // true
    echo '<p>' . is_string($x4) . '</p>';    // true
    echo '<p>' . is_array($x5)  . '</p>';    // true
    echo '<p>' . is_object($x6) . '</p>';    // true
    echo '<p>' . is_null($x7)   . '</p>';    // true

// Приведение типов                        var_dump($r);
    $s = '13 друзей Оушена';
    $i = 5;
    $f = 5.5;
    $b = TRUE;
    $r;  // для результата

    // -> int
        // float -> int (ОПАСНО: проблемы с точностью)
            $r = (int)$f;               // 5
            $r = $f; settype($r,'int'); // 5
            $r = intval($f,10);         // 5
        // string -> int
            $r = (int)$s;               // 13
            $r = +$s;                   // 13
            $r = 1*$s;                  // 13
            $r = intval($s,10);         // 13
        // bool -> int
            $r = (int)$b;               // 1
            $r = $b; settype($r,'int'); // 1
            $r = +$b;                   // 1
            $r = 1*$b;                  // 1
            $r = intval($b,10);         // 1

    // -> float
        // int -> float
            $r = (float)$i;                // 5
            $r = $i; settype($r,'float');  // 5
            $r = floatval($i);             // 5
        // string -> float
            $r = (float)$s;                // 13
            $r = $s; settype($r,'float');  // 13
            $r = 0.0 + $s;                 // 13
            $r = 1.0 * $s;                 // 13
            $r = floatval($s);             // 13
        // bool -> float
            $r = (float)$b;                // 1
            $r = $b; settype($r,'float');  // 1
            $r = 0.0 + $b;                 // 1
            $r = 1.0 * $b;                 // 1
            $r = floatval($b);             // 1

    // -> string
        // int -> string
            $r = "$i";                     // '5'
            $r = (string)$i;               // '5'
            $r = $i; settype($r,'string'); // '5'
            $r = strval($i);               // '5'

        // float -> string
            $r = "$f";                     // '5.5'
            $r = (string)$f;               // '5.5'
            $r = $f; settype($r,'string'); // '5.5'
            $r = strval($f);               // '5.5'

        // bool -> string
            $r = "$b";                     // '1'
            $r = (string)$b;               // '1'
            $r = $b; settype($r,'string'); // '1'
            $r = strval($b);               // '1'

    // -> bool
        // int -> bool
            $r = (bool)$i;                 // 1   (bool)
        // float -> bool
            $r = (bool)$f;                 // 1   (bool)
        // string -> bool
            $r = (bool)$s;                 // 1   (bool)


// Особенности работы со ссылками
    // Присвоение по ссылке
    // > Теперь $a и $b ссылаются на один и тот же объект - значение 10
        $a = 10;
        $b =& $a;

    // Передача по ссылке
    // > Передаче переменной в функцию по ссылке
        function f( &$var ) {
            $var++;
        }
        $a = 5;
        f($a);   // $a = 6  (теперь)

    // Особенности присвоения ссылок глобальным переменным внутри функции
    // > Если переменной global внутри функции будет присвоена ссылка, переменная будет видна
    //   только в функции. Чтобы избежать этого, используй массив $GLOBALS
        unset($a); unset($b);
        $a = 'Переменная 1';
        $b = 'Переменная 2';
        function f1($var) {
            global $a, $b;
            if(!$var) {
                $b =& $a;            // сработает только локально, внутри функции
            } else {
                $GLOBALS['b'] =& $a; // сработает глобально, и во вне функции тоже
            }
        }
        f1(0);
        echo '<br>$b = '.$b;   // 'Переменная 2'
        f1(1);
        echo '<br>$b = '.$b;   // 'Переменная 1'

    // Использование ссылок в foreach для изменения значений
        $arr = [1,2,3];  // этот массив будет изменен последующим циклом foreach
        foreach($arr as $key => &$value) {  // значение передается по ссылке
            $value++;
        }
        var_dump($arr);   //  2, 3, 4

    // Что допустимо передавать по ссылке в функцию
        function f2( &$x ) {}
        function &f3() { $y = 10; return $y; }
        // Можно передавать переменные
            unset($a); $a = 20; f2($a);
        // Можно передавать оператор new
            f2(new DateTime);
        // Можно передавать ссылку, возвращенную другой функцией
            f2(f3());

    // Возвращение по ссылке
        function &collector() {
            static $collection = [];
            return $collection;
        }
        $collection =& collector();
        $collection[] = 5;
        $collection[] = 10;
        $collection[] = 15;
        var_dump($collection);   // 5  10  15

        // Для передачи в другую функцию можно использовать такой синтаксис
            array_push($collection, 'Новое значение');
            var_dump($collection);   // 5  10  15  Новое Значение






/* --------------------------------------------------
---------------- И Н Ф О Р М А Ц И Я ----------------

> Константы
  > О пользовательских константах:
    > Константы нужны, чтобы защитить какое-либо значение
      от изменения.
    > Название констант пишут большими буквами
    > Константой могут стать следующие типы данных:
      > Boolean, integer, float, string.
    > Константы и (global) переменные находятся в разных namespace.
    > Константы находятся в глобальной области видимости, независимо
      от того, где они были созданы.
    > Константу нельзя переопределить или удалить после того, как она создана.

  > Волшебные константы
    > Подробное их описание здесь: http://www.php.net/manual/en/language.constants.predefined.php
    > Всего есть 8 волшебных констант
    > Пишутся они вот так: __ИМЯКОНСТАНТЫ__
    > Волшебные константы меняют свое значение в зависимости от того, где
      они были вызваны. Это их ключевая фишка, поэтому они и волшебные.

  > Зарезервированные константы
    > Есть константы, зарезервированные ядром PHP. Если подключать к нему всякие
      расширения, те тоже могут резервировать свои константы.
    > Список и описания констант ядра PHP здесь: http://www.php.net/manual/en/reserved.constants.php

> Переменные
  > По умолчанию переменные передаются по значению
    > В PHP можно передать и по ссылке, если поставить перед передаваемой
      переменной &
      > По ссылке можно передать только именованную переменную
  > Проверка на наличие и пустоту. В чем отличие empty() от isset()
    > empty()
      > более широкая функция, включающая в себя все функции isset()
      > проверяет переменную на наличие empty значения (одного из следующих):
        > "" или '' или "0"
        > 0
        > 0.0
        > NULL
        > FALSE
        > array()
        > $var;    | переменная объявлена, но значение не присвоено
    > isset()
      > проверяет только 2 вещи:
        > объявлена ли переменная? Например, $var;
        > содержит ли переменная значение NULL?

> Типы переменных (обзорно)
  > В PHP 8 простых типов и 3 псевдотипа.
  > В PHP программист не устанавливает тип переменной, PHP устанавливает
    его сама автоматически.
  > Простые типы
    > bool    | логический тип
      > возможные значения  -  truE | False  -  регистронезависимы
    > int     | целые числа
      > Если значение переменной int превышает масимально допустимое, то
        тип переменной автоматически меняется на float.
    > float   | дробные числа
      > Точность рациональных чисел ограничена, поэтому их надо перед проведением
        каких-либо операции приводить к целому.
    > string  | строка
      > В PHP нет встроенной поддержки UNICODE
      > В PHP 1 символ соответствует 1-му байту
      > Строка в PHP представляет собой набор байт и 1-байтового символа в конце,
        обозначающего общее количество байт в строке. Пустая строка '' содержит
        в себе как раз этот символ, равный 0.
      > Никаких данных о кодировке и о способе преобразования в символы строка не
        содержит, предоставляя полную свободу программисту.
      > '' не обрабатывает управляющие последовательности и не разворачивает переменные
        > Можно только заэкранировать кавычку \' или косую черту \\
      > "" обратабывает большое кол-во управляющиех последовательностей, например \r\n,
        и разворачивает переменные выводя их значения.
    > array         | массив переменных
    > resource      |
    > null          |
    > resource      |
  > Псевдотипы
    > mixed         | говорит о том, что это может быть любой тип
    > number        | говорит о том, что это либо int, либо float
    > callback      | говорит о том, что это может быть исполняемым кодом
      > Подробнее смотри википедию: ru.wikipedia.org/wiki/Callback_(программирование)
  > Отсутствие типа:
    > void          | отсутствие типа
      > Возвращаемый void-результат бесполезен
      > Void в списке параметров означает, что параметры не принимаются

> Сравнние типов
  > Наглядно иллюстрирует ниженаписанные правила таблица сравнения типов:
    > Найти ее можно по адресу: http://www.php.net/manual/ru/types.comparisons.php
  > Гибкое сравнение
    > Обозначается: ==
    > При гибком сравнеии происходит попытка автоматического приведения типов.
    > Типы приводятся по принципу: найти операнд с типом, у которого самый
      высокий приоритет, привести все остальные операнды к этому типу,
      а затем уже сравнить. Приоритеты расставлены следующим образом
      (от большего к меньшему):
      > bool -> float -> int -> string -> ...
  > Жесткое сравнение
    > Обозначается: ===
    > При жестком сравнении автоматического приведения типов операндов
      не происходит.
    > Например, TRUE === TRUE и только. Выражение TRUE === 1 вернет FALSE.

> Особенности работы со ссылками
  > Пример того, как работают ссылки в PHP:
    > http://www.php.net/manual/ru/language.references.unset.php
  > Что такое ссылки?
    > В PHP имя переменной и её содержимое - разные вещи. У оного содержимого
      может быть несколько имен. Все они ссылаются на это содержимое.
  > 3 основные операции с использованием ссылок:
    > Присвоение по ссылке
    > Передача по ссылке
    > Возврат по ссылке
  > Особенность передачи аргумента по ссылке в функцию:
    > При вызове такой функции не нужно указывать & у соответствующих аргументов,
      иначе будет ошибка. Достаточно того, что & указана в определении функции.
    > По ссылке в функцию в качестве аргумента можно передавать только:
      > Переменные
      > Оператор new, например foo( new foobar())
      > Ссылки, возвращаемые функцией
  > Возвращение по ссылке
    > Возвращать по ссылке можно только переменную, и ничего больше. Например,
      возвращать выражение нельзя.
    > Методика состоит из 2-х шагов:
      > При определении функции или метода нужно поставить &. Это означает, что
        данный метод возвращает значение по ссылке. Например:
        > function &myfunc() {};
      > Присвоение возвращаемого значения функции или метода тоже должно происходить
        по ссылке. Например:
        > $x =& myfunc();






-------------------------------------------------- */
?>

