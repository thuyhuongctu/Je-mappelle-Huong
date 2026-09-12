#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh bo bieu tuong ung dung (PWA) tu mot buc anh va mot dong ten.

Truoc day bieu tuong la con dau chu "LR" - doc duoc khi to, nhung o 48px tren
man hinh dien thoai thi chi con mot vet chu. Nay la chan dung dat set cua nhan
vat dat trong vong tron, ben duoi la dong "Je m'appelle Hương": nhin ra mat
nguoi ngay, va van doc duoc ten khi bieu tuong dung o co lon.

Bon dang, moi dang mot viec:

  any        Bieu tuong tren man hinh chinh va trong tab. Vong tron chan dung
             o tren, dong ten o duoi, nen dat nung. He dieu hanh tu bo goc.
  maskable   Android cat toi 20% moi ben (tron hoac vuong bo goc). Ca chan dung
             lan dong ten deu nam trong vong an toan 80% o giua, nen cat kieu
             gi cung khong pham vao mat hay vao chu.
  apple      Nhu "any", khong co kenh trong suot (iOS khong ho tro).
  favicon    16-64px: o co nay chu chi con la vet mo, nen chi lay chan dung.

Chay:  python3 scripts/make-app-icons.py [--apply]
Khong co --apply thi chi ghi ra .icon-preview/ de xem truoc.
"""

import argparse
import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Can Pillow: pip install pillow")

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NGUON = 'assets/img/huong_clay_portrait.webp'
# Khung cat tren anh goc 760x760: lay dau, hoa sen va co ao dai; bo phan le
# tren duoi va dung ngay tren huy hieu co (cat ngang huy hieu trong xau).
KHUNG = (110, 30, 650, 570)

TEN = "Je m'appelle Hương"
# Liberation Serif co san tren may Linux va cung ho chu Times nhu lop du phong
# cua bang chu tren web; no co du dau tieng Viet.
FONT = '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'

DAT_NUNG = (196, 92, 58)      # --accent #C45C3A
GIAY = (246, 241, 231)        # --paper  #F6F1E7

RA = [
    ('icons/icon-192.png', 192, 'any'),
    ('icons/icon-512.png', 512, 'any'),
    ('icons/icon-maskable-192.png', 192, 'maskable'),
    ('icons/icon-maskable-512.png', 512, 'maskable'),
    ('icons/apple-touch-icon.png', 180, 'any'),
]
FAVICON = ('favicon.ico', [16, 32, 48, 64])


def chan_dung():
    im = Image.open(os.path.join(GOC, NGUON)).convert('RGB')
    return im.crop(KHUNG)


def dat_dia(nen, anh, tam, duong_kinh, vanh_ty=0.022):
    """Dan anh vao mot dia tron co vanh giay mong, tam = (x, y)."""
    d = round(duong_kinh)
    vanh = max(1, round(d * vanh_ty))
    dia = Image.new('RGB', (d + 2 * vanh, d + 2 * vanh), GIAY)
    dia.paste(anh.resize((d, d), Image.LANCZOS), (vanh, vanh))
    mat_na = Image.new('L', dia.size, 0)
    ImageDraw.Draw(mat_na).ellipse((0, 0, dia.size[0] - 1, dia.size[1] - 1), fill=255)
    nen.paste(dia, (round(tam[0] - dia.size[0] / 2), round(tam[1] - dia.size[1] / 2)), mat_na)


def viet_ten(nen, canh, tam_y, rong_toi_da):
    """Viet dong ten, tu chon co chu sao cho vua be ngang cho phep."""
    d = ImageDraw.Draw(nen)
    co = round(canh * 0.105)
    while co > 6:
        f = ImageFont.truetype(FONT, co)
        if d.textlength(TEN, font=f) <= rong_toi_da:
            break
        co -= 1
    f = ImageFont.truetype(FONT, co)
    d.text((canh / 2, tam_y), TEN, font=f, fill=GIAY, anchor='mm')
    return co


def ve_any(anh, canh):
    """Vong tron chan dung o tren, dong ten o duoi, nen dat nung."""
    nen = Image.new('RGB', (canh, canh), DAT_NUNG)
    dat_dia(nen, anh, (canh / 2, canh * 0.40), canh * 0.665)
    viet_ten(nen, canh, canh * 0.855, canh * 0.82)
    return nen


def ve_maskable(anh, canh):
    """Nhu tren, nhung thu nho vao trong vong an toan 80% o giua."""
    nen = Image.new('RGB', (canh, canh), DAT_NUNG)
    dat_dia(nen, anh, (canh / 2, canh * 0.40), canh * 0.46)
    # Dong ten nam o 0.685 chieu cao. Day cung cua vong an toan tai do rong
    # khoang 0.70 canh; lay 0.60 de con le hai ben khi Android cat tron.
    viet_ten(nen, canh, canh * 0.685, canh * 0.60)
    return nen


def ve_favicon(anh, canh):
    """Chi chan dung: o 16-64px dong chu chi con la vet mo."""
    vien = max(1, round(canh * 0.035))
    nen = Image.new('RGB', (canh, canh), DAT_NUNG)
    nen.paste(anh.resize((canh - 2 * vien, canh - 2 * vien), Image.LANCZOS), (vien, vien))
    return nen


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true', help='ghi de vao repo')
    ns = ap.parse_args()

    if not os.path.exists(FONT):
        sys.exit('Khong thay font %s' % FONT)

    anh = chan_dung()
    dich = GOC if ns.apply else os.path.join(GOC, '.icon-preview')
    if not ns.apply:
        os.makedirs(os.path.join(dich, 'icons'), exist_ok=True)

    for ten, canh, dang in RA:
        im = ve_any(anh, canh) if dang == 'any' else ve_maskable(anh, canh)
        duong = os.path.join(dich, ten)
        os.makedirs(os.path.dirname(duong), exist_ok=True)
        im.save(duong, 'PNG', optimize=True)
        print('%-34s %3dpx %-9s %6.1f KB' % (ten, canh, dang,
                                             os.path.getsize(duong) / 1024))

    ten, co = FAVICON
    duong = os.path.join(dich, ten)
    ve_favicon(anh, 256).save(duong, 'ICO', sizes=[(c, c) for c in co])
    print('%-34s %-14s %6.1f KB' % (ten, ','.join(str(c) for c in co),
                                    os.path.getsize(duong) / 1024))

    if not ns.apply:
        print('\nXem truoc o .icon-preview/ - chay lai voi --apply de ghi de.')


if __name__ == '__main__':
    main()
