module.exports = function check(str, bracketsConfig) {
   let stack = [];
   let arr_bracets = [].concat(...bracketsConfig); // развернули двумерный массив со скобками в одномерный
   let [open, close] = [...arr_bracets].reduce((pV, char, i) => (pV[i % 2].push(char), pV), [[], []]); // отсортировали скобки по их назначению

   if (str.length % 2 || (close.includes(str[0]) & !open.includes(str[0])) || (open.includes(str[str.length - 1]) & !close.includes(str[str.length - 1]))) {
      // Нечетное кол-во скобок, строка начинается с уникальной закрывающей скобки, или заканчивается уникальной открывающей? 
      // Нечего оперативку изнашивать и процессор греть! Снизим выброс паниковых газов! Спасем пингвинчиков!
      return false;
   }

   for (let i = 0; i < str.length; i++) {

      // Разбираемся с уникальными закрывающими скобками:
      if (close.includes(str[i]) & !open.includes(str[i])) {    // если символ -уникальная закрывающая скобка
         if (stack.length == 0) {      // и стек пуст
            return false;              // уходим
         }
         // если последняя скобка в стеке открывающая и не пара к текущей закрывающей
         if (open.includes(stack[stack.length - 1]) & (open.indexOf(stack[stack.length - 1]) != close.indexOf(str[i]))) {
            return false;              // уходим
         }
         // если последняя скобка в стеке открывающая и пара к закрывающей, удаляем скобку в стеке и бежим к следующей букве
         if (open.includes(stack[stack.length - 1]) & open.indexOf(stack[stack.length - 1]) == close.indexOf(str[i])) {
            stack.pop();
            continue;
         }
      }

      // Разбираемся с уникальными открывающими скобками:
      if (open.includes(str[i]) & !close.includes(str[i])) {    // если символ -уникальная открывающая скобка
         stack.push(str[i]);
      }

      // Добиваем двойные скобки: одинаковые и для открывания и закрывания - || 88 и т.п.
      if (open.includes(str[i]) & close.includes(str[i])) {    // если символ - "двойственная" скобка
         //если стек пуст или последняя скобка не равна текущей "двояковыпуклой" скобке, пушим её в стек, инеаче, удаляем из стека последнюю скобку
         (stack.length == 0 || stack[stack.length - 1] != str[i]) ? stack.push(str[i]) : stack.pop();
      }
   }

   return stack.length ? false : true;
}
