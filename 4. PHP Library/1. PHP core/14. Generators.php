<?php
/* --------------------------------------------------
---------------- О Г Л А В Л Е Н И Е ----------------
Генераторы

> Генератор на примере функции range()





-------------------------------------------------- */

// Генератор на примере функции range()
    function irange($start, $limit, $step = 1) {
        // проверка на ошибку
        if($start < $limit) {
            if($step <= 0) {
                // бросить исключение
                throw new LogicException('Шаг должен быть +ный');
            }

            for($i = $start; $i <= $limit; $i += $step) {
                // вернуть значение (вроде return местного значения)
                yield $i;
            }
        } else {
            if($step >= 0) {
                throw new LogicException('Шаг дожнеб быть -ный');
            }

            for($i = $start; $i >= $limit; $i += $step) {
                yield $i;
            }
        }
    }

    // теперь убедимся, что range() и irange() вернут одинаковый результат
    $arr =  range(0,10,2);    // 0 2 6 8 10
    $iarr = irange(0,10,2);   // 0 2 6 8 10





/* --------------------------------------------------
---------------- И Н Ф О Р М А Ц И Я ----------------

*Примечание: PHPstorm 07.2013 ругается на генераторы, потому в нем еще нет поддержки
             недавно вышедшей PHP 5.5.0.

Генераторы
> Что такое генераторы вообще, на пальцах?
    Допустим, есть гигантский массив или текстовый файл. Мне надо эти данные
    как-то по кусочкам обработать. Но тут есть проблема:
    > Если начать просто обрабатывать этот гигантский массив или файл, то он попадет
      целиком в оперативку, и запросто может привысить доступный лимит.
      > Эту проблему можно решить, реализовав свой класс-итератор от Iterator. Но
        для реализации интерфейса Iterator надо реализовать кучу методов, а делать
        это лень, и пользы особой не приносит.
        > Вот тут на помощь приходят Генераторы - они позволяют реализовать процесс
          итерации малым кодом, используя ключевое слово yield и цикл foreach.
    > Генератор на примере функции range()
      > Встроенная фукнция range() возвращает массив значений от $start до $limit,
        с шагом $step.
      > Она работает так: создает внутри себя массив, забивает его нужными значениями,
        и возвращает. Причем этот массив хранится в оперативной памяти.
        Если задать очень большой диапазон, например (0,10000000000,1), можно запросто
        превысить доступный лимит оперативки.
      > Поэтому напишем функцию irange(), работающую через Генератор.
        > Которая работатет так: создает внутри себя 1 значение, возвращает его,
          затем создает другое значение, возвращает его, и так далее.

> Что такое генератор в техническом плане?
  > Генератор - это функция.
    > Она ничем не отличается от обычной, кроме того, что вместо return в ней yield.
    > Эта функция внутри перебирает какие-то значения, и возвращает по 1-му за раз
      с помощью yield. И запоминает текущее состояние.
    > При каждом следующем запуске функции, она возвращает следующее значение, и так
      до тех пор, пока они не кончатся.
  > Когда функция-генератор вызывается 1-й раз, она возвращает объект внутреннего
    класса Generator, который автоматом реазизует интерфейс Iterator так, как
    для только вперед-итерирующего итератора.
    > Подробное описание объекта Generator можно найти здесь: http://www.php.net/manual/ru/class.generator.php


-------------------------------------------------- */


?> 
