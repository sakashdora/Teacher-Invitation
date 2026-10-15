import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

assets_dir = r"c:\Teacher_Fresher\assets"
os.makedirs(assets_dir, exist_ok=True)

# 1. Auditorium Seating (Deep blue & warm gold lit auditorium)
w, h = 600, 340
im_aud = Image.new('RGB', (w, h), (14, 20, 38))
draw = ImageDraw.Draw(im_aud)
# stage light glow
for r in range(180, 0, -2):
    alpha = int(90 * (1 - r / 180))
    draw.ellipse([(w//2 - r*2, 20 - r//2), (w//2 + r*2, 60 + r)], fill=(212, 175, 55, alpha))
# seating rows perspective
for row in range(12):
    y = 110 + row * 18
    color = (25 + row * 2, 35 + row * 3, 60 + row * 4)
    draw.line([(0, y + 20), (w, y + 20)], fill=color, width=8)
    for seat in range(24):
        sx = 25 + seat * 24 + (row % 2) * 8
        draw.rounded_rectangle([(sx, y), (sx + 16, y + 14)], radius=3, fill=(45 + row*3, 20 + row*2, 50 + row*4))
im_aud = im_aud.filter(ImageFilter.GaussianBlur(1.2))
# Stage on top
draw = ImageDraw.Draw(im_aud)
draw.rectangle([(w//4, 30), (3*w//4, 75)], fill=(212, 175, 55))
draw.rectangle([(w//4 + 10, 35), (3*w//4 - 10, 70)], fill=(30, 15, 20))
im_aud.save(os.path.join(assets_dir, 'auditorium.jpg'), quality=95)

# 2. Keynote Speaker on Podium
im_spk = Image.new('RGB', (w, h), (26, 10, 35))
draw = ImageDraw.Draw(im_spk)
# Blue/purple backdrop
for y in range(h):
    interp = y / h
    c = (int(30 + 15 * interp), int(10 + 20 * interp), int(45 + 50 * interp))
    draw.line([(0, y), (w, y)], fill=c)
# Big screen on right: "TEJAS '26 The Fresh Bloom"
draw.rounded_rectangle([(w//2 + 20, 40), (w - 20, h - 50)], radius=8, fill=(18, 5, 28), outline=(212, 175, 55), width=2)
# Speaker silhouette at wooden podium on left
draw.rectangle([(w//6, h - 140), (w//6 + 110, h - 20)], fill=(120, 70, 35)) # podium
draw.rectangle([(w//6 - 5, h - 148), (w//6 + 115, h - 140)], fill=(160, 95, 45))
# speaker figure
draw.ellipse([(w//6 + 35, h - 230), (w//6 + 75, h - 190)], fill=(20, 20, 25)) # head
draw.polygon([(w//6 + 15, h - 150), (w//6 + 95, h - 150), (w//6 + 75, h - 190), (w//6 + 35, h - 190)], fill=(35, 45, 75)) # suit
im_spk = im_spk.filter(ImageFilter.GaussianBlur(0.8))
im_spk.save(os.path.join(assets_dir, 'speaker.jpg'), quality=95)

# 3. Refreshments (Juice glasses & cupcakes)
im_ref = Image.new('RGB', (w, h), (245, 235, 220))
draw = ImageDraw.Draw(im_ref)
# wooden banquet table
draw.rectangle([(0, h//2), (w, h)], fill=(180, 135, 95))
draw.line([(0, h//2), (w, h//2)], fill=(220, 180, 140), width=4)
# Juice glasses
for i in range(3):
    gx = 180 + i * 55
    draw.rounded_rectangle([(gx, h//2 - 90), (gx + 40, h//2 + 30)], radius=4, fill=(245, 170, 20)) # orange juice
    draw.rectangle([(gx + 3, h//2 - 90), (gx + 37, h//2 - 20)], fill=(255, 195, 40))
# Cupcakes on right
for i in range(4):
    cx = 360 + i * 50
    draw.polygon([(cx, h//2 + 25), (cx + 40, h//2 + 25), (cx + 35, h//2), (cx + 5, h//2)], fill=(100, 50, 30))
    draw.ellipse([(cx + 2, h//2 - 25), (cx + 38, h//2 + 5)], fill=(240, 160, 180)) # pink frosting
    draw.ellipse([(cx + 16, h//2 - 32), (cx + 24, h//2 - 24)], fill=(180, 20, 40)) # cherry
im_ref = im_ref.filter(ImageFilter.GaussianBlur(0.8))
im_ref.save(os.path.join(assets_dir, 'refreshments.jpg'), quality=95)

# 4. Concert & Celebration Crowd
im_con = Image.new('RGB', (w, h), (10, 5, 20))
draw = ImageDraw.Draw(im_con)
# purple laser beams
for i in range(6):
    draw.line([(w//2, 20), (i * 120, h)], fill=(160, 40, 220), width=3)
    draw.line([(w//2, 20), (w - i * 120, h)], fill=(70, 150, 255), width=3)
# crowd silhouette with raised hands
for i in range(35):
    hx = 15 + i * 17
    hy = h - 60 - (i % 5) * 12
    draw.ellipse([(hx, hy), (hx + 18, hy + 22)], fill=(5, 3, 10))
    # raised hands
    draw.line([(hx + 5, hy + 10), (hx - 4, hy - 18)], fill=(5, 3, 10), width=4)
    draw.line([(hx + 12, hy + 10), (hx + 22, hy - 16)], fill=(5, 3, 10), width=4)
draw.rectangle([(0, h - 45), (w, h)], fill=(5, 3, 10))
im_con = im_con.filter(ImageFilter.GaussianBlur(0.8))
im_con.save(os.path.join(assets_dir, 'concert.jpg'), quality=95)

print("Generated all 4 supplementary schedule card images.")
