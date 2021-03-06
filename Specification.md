# Техническое задание на Кекстаграм

Кекстаграм — сервис просмтора изображений. Пользователям предоставлена возможность загружать свои фотографии или просматривать фотографии, загруженные ранее другими пользователями.

## Описание функциональности
### Сценарий поведения пользователя на сайте:
- загрузка нового изображения
  - изменение масштаба изображения
  - изменение положения изображения перетаскиванием
  - применение одного из заранее заготовленных фильтров
  - выбор глубины фильтра с помощью ползунка
  - добавление текстового комментария
- просмотр и фильтрация изображений, загруженных другими пользователями

Загрузка нового изображения осуществляется перетаскиванием изображения на логотип или выбором файла изображения вручную с помощью стандартного контрола загрузки файла, который стилизован под букву «О» в логотипе. После выбора изображения показывается форма применения фильтра и кадрирования изображения.

Реализация загрузки изображения перетаскиванием, изменения положения изображения и выбора глубины фильтра необязательна

### Ограничения накладываемы на поля
- Масштаб
  - задается в диапазоне от 25 до 100
  - значение изменяется с шагом 25
  - начальное значение 100
- Фильтр
  - на изображение может накладываться только один фильтр

### Просмотр загруженных изображений
Все загруженные изображения показаны на главной странице в виде миниатюр. При наведении на миниатюру можно увидеть кол-во комментариев и лайков. При нажатии на миниатюру показывается полноэкранное изображение с количеством лайков и комментариев.

### Фильтрация изображений
- Популярные — фотографии в том порядке, в котором они были загружены с сервера.
- Новые — 10 случайных фотографий из списка. Фотографии ни в коем случае не должны повторяться.
- Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев
