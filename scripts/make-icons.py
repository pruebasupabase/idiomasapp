"""Genera los íconos de la app (hoja cuadriculada con margen rojo y las letras A y Я).

Uso: python3 scripts/make-icons.py
Necesita Pillow (pip install pillow) y una fuente con cirílico (DejaVu Serif Bold).
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "icons"
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSerif-Bold.ttf",
    "/Library/Fonts/Georgia Bold.ttf",
    "C:/Windows/Fonts/georgiab.ttf",
]

INK = "#1B2F7A"
PAPER = "#F7F9FC"
GRID = "#DCE4F0"
MARGIN = "#E8939A"
PEN = "#C42F3C"


def load_font(size):
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    raise SystemExit("No encontré una fuente con cirílico. Instalá DejaVu Serif.")


def draw_icon(size, inset):
    scale = 4  # se dibuja grande y se achica para que los bordes queden suaves
    s = size * scale
    img = Image.new("RGB", (s, s), INK)

    pad = int(s * inset)
    inner = s - 2 * pad
    page = Image.new("RGB", (inner, inner), PAPER)
    d = ImageDraw.Draw(page)

    step = inner // 12
    line = max(2, inner // 240)
    for x in range(step, inner, step):
        d.line([(x, 0), (x, inner)], fill=GRID, width=line)
    for y in range(step, inner, step):
        d.line([(0, y), (inner, y)], fill=GRID, width=line)

    margin_x = int(inner * 0.2)
    d.line([(margin_x, 0), (margin_x, inner)], fill=MARGIN, width=max(3, inner // 120))

    font = load_font(int(inner * 0.42))
    text_a, text_ya = "A", "я"
    wa = d.textlength(text_a, font=font)
    wya = d.textlength(text_ya, font=font)
    total = wa + wya + inner * 0.02
    left = margin_x + (inner - margin_x - total) / 2
    baseline = inner * 0.66
    d.text((left, baseline), text_a, font=font, fill=INK, anchor="ls")
    d.text((left + wa + inner * 0.02, baseline), text_ya, font=font, fill=PEN, anchor="ls")
    # subrayado de corrección
    d.line([(left, baseline + inner * 0.06), (left + total, baseline + inner * 0.06)], fill=PEN, width=max(3, inner // 110))

    mask = Image.new("L", (inner, inner), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, inner - 1, inner - 1], radius=int(inner * 0.07), fill=255)
    img.paste(page, (pad, pad), mask)
    return img.resize((size, size), Image.LANCZOS)


def main():
    OUT.mkdir(exist_ok=True)
    draw_icon(192, 0.11).save(OUT / "icon-192.png")
    draw_icon(512, 0.11).save(OUT / "icon-512.png")
    draw_icon(512, 0.19).save(OUT / "icon-maskable-512.png")  # más margen: Android la recorta en círculo
    draw_icon(180, 0.0).save(OUT / "apple-touch-icon.png")  # iOS redondea solo las esquinas
    print("Íconos listos en", OUT)


if __name__ == "__main__":
    main()
