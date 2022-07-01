module.exports = function check(str, bracketsConfig) {
   let stack = [];
   let arr_bracets = [].concat(...bracketsConfig); // развернули двумерный массив со скобками в одномерный
   let [open, close] = [...arr_bracets].reduce((pV, char, i) => (pV[i % 2].push(char), pV), [[], []]); // отсортировали скобки по их назначению


   if (str.length % 2 || close.includes(str[0]) || open.includes(str[str.length - 1])) {
      // Нечетное кол-во скобок, строка начинается с закрывающей скобки, или заканчивается открывающей? Нечего оперативку изнашивать!   
      return false;
   }

   // В принципе, работает, осталось разобраться с одинаковыми скобками - ||, 88, и т.п.

   for (let i = 0; i < str.length; i++) {
      if (close.includes(str[i])) {    // если символ -закрывающая скобка
         if (stack.length == 0) {      // и стек пуст
            return false;              // уходим
         }
         // если последняя скобка в стеке открывающая и не пара к закрывающей
         if (open.includes(stack[stack.length - 1]) & open.indexOf(stack[stack.length - 1]) != close.indexOf(str[i])) {
            return false;              // уходим
         }
         // если последняя скобка в стеке открывающая и пара к закрывающей, удаляем скобку в стеке
         if (open.includes(stack[stack.length - 1]) & open.indexOf(stack[stack.length - 1]) == close.indexOf(str[i])) {
            stack.pop();
         }
      }
      if (open.includes(str[i])) {    // если символ открывающая скобка
         stack.push(str[i]);
      }
   }

   return stack.length ? false : true;
}