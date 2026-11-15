"""Renames a subset of Encode Sans to Horizon Sans, as the SIL Open Font License of Encode Sans
requires of a modified version: "Encode Sans" is its Reserved Font Name. Only the names a font is
known by change (family, full name, PostScript name, unique ID and typographic family); the
copyright, trademark and licence entries, and every other table, are kept as they are. A one-off
tool, run with fontTools (see the README's Fonts section), not part of the build.

Usage: python rename-horizon-sans.py <EncodeSans-*.woff2> <HorizonSans-*.woff2>
"""

import sys

from fontTools.ttLib import TTFont

source, target = sys.argv[1:]
# The modification time is kept, so the same input gives the same file.
font = TTFont(source, recalcTimestamp=False)
for record in font["name"].names:
    text = record.toUnicode()
    if record.nameID in (1, 4, 16):  # family, full name, typographic family
        text = text.replace("Encode Sans", "Horizon Sans")
    elif record.nameID == 6:  # PostScript name
        text = text.replace("EncodeSans", "HorizonSans")
    elif record.nameID == 3:  # unique ID: version;vendor;PostScript name
        version, _, postscript = text.split(";")
        text = f"{version};NONE;{postscript.replace('EncodeSans', 'HorizonSans')}"
    else:
        continue
    record.string = text
font.flavor = "woff2"
font.save(target)
