# Test
Задание №1.
Для проверки задание перейдите в папку 1/ и выполните слудущие команды:
1.
cd \*var/www/html
ls -d */

2. 
touch ../all.txt 
find ./ -name "*.txt" | xargs cat >> ../all.txt

3.
cat main.txt

4.
cd images
find ~ -iname '\*.jpg'

5.
cd -
cd logs
echo -n > /access.txt

6.
cd - 
cd images
find ~ -iname -size +2mb

=== GIT ===

git remote add origin https://github.com/git@example.com:example/test.git
git branch -M master
git push -u origin master

Задание №2
Перейдите в папку \*/DevItTest/2
И открой файл index.html в браузере

Задание №3
Перейдите в папку \*/DevItTest/3
И открой файл index.html в браузере
Что бы проверить корректность работы функций вы можете вызвать их из консоли в браузере или в файле \*DevItTest/2/app.js раскомментировать строки содержащие console.log(\*) (где \* это имя функции)
