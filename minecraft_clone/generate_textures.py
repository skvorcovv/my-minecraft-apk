from PIL import Image, ImageDraw
import random
import os

def create_texture(filename, base_color, noise_color, size=64):
    img = Image.new("RGB", (size, size), base_color)
    draw = ImageDraw.Draw(img)

    # Add noise
    for x in range(size):
        for y in range(size):
            if random.random() > 0.5:
                # Slight variation
                variation = random.randint(-15, 15)
                r = max(0, min(255, base_color[0] + variation))
                g = max(0, min(255, base_color[1] + variation))
                b = max(0, min(255, base_color[2] + variation))
                draw.point((x, y), fill=(r, g, b))

    img.save(filename)

def main():
    assets_dir = "assets"
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)

    # Dirt texture
    create_texture(os.path.join(assets_dir, "dirt.png"), (134, 96, 67), (100, 70, 50))

    # Grass texture (top)
    create_texture(os.path.join(assets_dir, "grass.png"), (86, 175, 90), (60, 140, 60))

    # Stone texture
    create_texture(os.path.join(assets_dir, "stone.png"), (150, 150, 150), (120, 120, 120))

    # Wood texture
    create_texture(os.path.join(assets_dir, "wood.png"), (160, 104, 52), (130, 80, 40))

    # Brick texture
    create_texture(os.path.join(assets_dir, "brick.png"), (180, 80, 80), (150, 60, 60))

    print("Textures generated.")

if __name__ == "__main__":
    main()
