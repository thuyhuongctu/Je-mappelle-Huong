#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh bo bieu tuong ung dung (PWA) tu mot buc anh.

Truoc day bieu tuong la con dau chu "LR" - doc duoc khi to, nhung o 48px tren
man hinh dien thoai thi chi con mot vet chu. Nay lay thang chan dung dat set
cua nhan vat: khuon mat nhan ra duoc ngay ca khi rat nho, va giong voi hinh
dai dien dang dung o dau trang chu.

Ba dang bieu tuong, moi dang mot viec:

  any        anh trong tron khung, co vien dat nung mong de con nhin thay canh
             khi nen man hinh sang. He dieu hanh tu bo goc.
  maskable   Android cat theo hinh tron hoac vuong bo goc, cat toi 20% moi
             ben. Nen dat nung phu kin, mat nguoi nam gon trong vong an toan
             (74% duong kinh) nen cat kieu gi cung khong pham vao mat.
  apple      giong "any", khong co kenh trong suot (iOS khong ho tro).

Chay:  python3 scripts/make-app-icons.py [--apply]
Khong co --apply thi chi ghi ra thu muc tam de xem truoc.
"""

import argparse
import os
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Can Pillow: pip install pillow")

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NGUON = 'assets/img/huong_clay_portrait.webp'
# Khung cat tren anh goc 760x760: lay dau, hoa sen va co ao dai; bo phan le
# tren duoi va huy hieu co o duoi (cat ngang huy hieu trong nhin xau).
KHUNG = (110, 30, 650, 570)

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


def ve_any(anh, canh):
    """Anh trong khung, them vien dat nung mong o ria."""
    n = anh.resize((canh, canh), Image.LANCZOS)
    vien = max(2, round(canh * 0.035))
    nen = Image.new('RGB', (canh, canh), DAT_NUNG)
    trong = n.resize((canh - 2 * vien, canh - 2 * vien), Image.LANCZOS)
    nen.paste(trong, (vien, vien))
    return nen


def ve_maskable(anh, canh):
    """Nen dat nung phu kin; mat nguoi nam trong vong tron 74% o giua."""
    nen = Image.new('RGB', (canh, canh), DAT_NUNG)
    d = round(canh * 0.74)
    trong = anh.resize((d, d), Image.LANCZOS)

    # vien giay mong quanh vong tron cho tach khoi nen
    vanh = max(2, round(canh * 0.012))
    dia = Image.new('RGB', (d + 2 * vanh, d + 2 * vanh), GIAY)
    dia.paste(trong, (vanh, vanh))

    mat_na = Image.new('L', dia.size, 0)
    ImageDraw.Draw(mat_na).ellipse((0, 0, dia.size[0] - 1, dia.size[1] - 1), fill=255)

    goc = ((canh - dia.size[0]) // 2, (canh - dia.size[1]) // 2)
    nen.paste(dia, goc, mat_na)
    return nen


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true', help='ghi de vao repo')
    ns = ap.parse_args()

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
    ve_any(anh, 256).save(duong, 'ICO', sizes=[(c, c) for c in co])
    print('%-34s %-14s %6.1f KB' % (ten, ','.join(str(c) for c in co),
                                    os.path.getsize(duong) / 1024))

    if not ns.apply:
        print('\nXem truoc o .icon-preview/ - chay lai voi --apply de ghi de.')


if __name__ == '__main__':
    main()
