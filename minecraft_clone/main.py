from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController

app = Ursina()

# --- Настройки игры ---
# Загрузка текстур
grass_texture   = load_texture('assets/grass.png')
stone_texture   = load_texture('assets/stone.png')
brick_texture   = load_texture('assets/brick.png')
dirt_texture    = load_texture('assets/dirt.png')
wood_texture    = load_texture('assets/wood.png')

# Текущий выбранный блок
block_pick = 1

# --- Интерфейс пользователя (UI) ---
# Отображение активного блока на экране (справа снизу или посередине внизу)
def update_hand_texture():
    if block_pick == 1:
        hand.texture = grass_texture
    elif block_pick == 2:
        hand.texture = stone_texture
    elif block_pick == 3:
        hand.texture = brick_texture
    elif block_pick == 4:
        hand.texture = dirt_texture
    elif block_pick == 5:
        hand.texture = wood_texture

# Рука игрока (показывает выбранный блок)
hand = Entity(
    parent = camera.ui,
    model = 'cube',
    texture = grass_texture,
    scale = 0.2,
    rotation = Vec3(150, -10, 0),
    position = Vec2(0.5, -0.4)
)

def update():
    global block_pick

    # Анимация руки
    if held_keys['left mouse'] or held_keys['right mouse']:
        hand.position = Vec2(0.4, -0.5)
    else:
        hand.position = Vec2(0.5, -0.4)

    # Выбор блока с помощью клавиш 1-5
    if held_keys['1']: block_pick = 1
    if held_keys['2']: block_pick = 2
    if held_keys['3']: block_pick = 3
    if held_keys['4']: block_pick = 4
    if held_keys['5']: block_pick = 5

    update_hand_texture()

# --- Класс Вокселя (Блока) ---
class Voxel(Button):
    def __init__(self, position=(0,0,0), texture=grass_texture):
        super().__init__(
            parent = scene,
            position = position,
            model = 'cube',
            origin_y = 0.5,
            texture = texture,
            color = color.color(0, 0, random.uniform(0.9, 1.0)), # Небольшая вариация яркости
            highlight_color = color.lime,
            scale = 1
        )

    def input(self, key):
        if self.hovered:
            if key == 'left mouse down':
                # Удалить блок
                destroy(self)

            if key == 'right mouse down':
                # Поставить новый блок
                if block_pick == 1: voxel = Voxel(position=self.position + mouse.normal, texture=grass_texture)
                if block_pick == 2: voxel = Voxel(position=self.position + mouse.normal, texture=stone_texture)
                if block_pick == 3: voxel = Voxel(position=self.position + mouse.normal, texture=brick_texture)
                if block_pick == 4: voxel = Voxel(position=self.position + mouse.normal, texture=dirt_texture)
                if block_pick == 5: voxel = Voxel(position=self.position + mouse.normal, texture=wood_texture)

# --- Генерация мира ---
for z in range(15):
    for x in range(15):
        voxel = Voxel(position=(x,0,z), texture=grass_texture)

# --- Игрок ---
player = FirstPersonController()

# --- Запуск приложения ---
app.run()
