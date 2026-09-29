# Headless Blender scene for the zoelumos hero image sequence.
# Usage: Blender -b -P hero.py -- <set: desktop|mobile> <out_dir> <count> <samples> [scale%] [p,p,...]
import bpy, bmesh, math, sys, os
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index('--') + 1:]
SET, OUT, COUNT, SAMPLES = argv[0], argv[1], int(argv[2]), int(argv[3])
SCALE = int(argv[4]) if len(argv) > 4 else 100
PLIST = [float(x) for x in argv[5].split(',')] if len(argv) > 5 else None
REPO = '/Users/steve/.claude/jobs/a22560ff/tmp/zl-keynote/public/portfolio'
MOBILE = SET == 'mobile'

def clamp(v, a=0.0, b=1.0): return min(b, max(a, v))
def lerp(a, b, t): return a + (b - a) * t
def ease(t): return t * t * (3 - 2 * t)
def span(p, a, b): return ease(clamp((p - a) / (b - a)))
def vlerp(a, b, t): return a.lerp(b, t)

# ── reset ─────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene

# ── helpers ──────────────────────────────────────────────────────
def rrect(w, d, r, seg=14):
    pts = []
    for cx, cy, a0 in ((w/2-r, d/2-r, 0), (-w/2+r, d/2-r, 90), (-w/2+r, -d/2+r, 180), (w/2-r, -d/2+r, 270)):
        for i in range(seg + 1):
            a = math.radians(a0 + 90 * i / seg)
            pts.append((cx + r*math.cos(a), cy + r*math.sin(a)))
    return pts

def link(obj, parent=None):
    sc.collection.objects.link(obj)
    if parent: obj.parent = parent
    return obj

def slab(name, w, d, h, r, bevel=0.0, seg=14, bseg=5, mat=None, parent=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, 0)) for x, y in rrect(w, d, r, seg)]
    f = bm.faces.new(vs)
    ext = bmesh.ops.extrude_face_region(bm, geom=[f])
    top = [e for e in ext['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=top, vec=(0, 0, h))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    ob = link(bpy.data.objects.new(name, me), parent)
    if bevel > 0:
        m = ob.modifiers.new('bev', 'BEVEL')
        m.width = bevel; m.segments = bseg; m.limit_method = 'ANGLE'
        m.angle_limit = math.radians(40); m.harden_normals = True
    me.shade_smooth()
    # Flat caps stay flat-shaded: a smooth-shaded n-gon (esp. after the keyboard-well boolean) shows triangulation creases.
    for poly in me.polygons:
        if abs(poly.normal.z) > 0.99: poly.use_smooth = False
    if mat: me.materials.append(mat)
    return ob

def plate(name, w, d, r, mat, parent=None, down=False, uv=True, seg=12):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, 0)) for x, y in rrect(w, d, r, seg)]
    f = bm.faces.new(vs)
    if down: f.normal_flip()
    if uv:
        lay = bm.loops.layers.uv.new()
        for lp in f.loops:
            x, y = lp.vert.co.x, lp.vert.co.y
            lp[lay].uv = ((x + w/2) / w, (y + d/2) / d)
    bm.to_mesh(me); bm.free()
    me.materials.append(mat)
    return link(bpy.data.objects.new(name, me), parent)

def node_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links

def principled(name, color, metal=0.0, rough=0.5, coat=0.0, coat_rough=0.03, aniso=0.0):
    m, n, l = node_mat(name)
    b = n['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    b.inputs['Coat Weight'].default_value = coat
    b.inputs['Coat Roughness'].default_value = coat_rough
    b.inputs['Anisotropic'].default_value = aniso
    return m, b, n, l

# ── materials ─────────────────────────────────────────────────────
alu, alu_b, an, al = principled('alu', (0.050, 0.052, 0.056), metal=1.0, rough=0.32, aniso=0.0)
# brushed grain: stretched noise into roughness + a whisper of bump
tc = an.new('ShaderNodeTexCoord'); mp = an.new('ShaderNodeMapping')
mp.inputs['Scale'].default_value = (60, 2400, 60)
nz = an.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.0; nz.inputs['Detail'].default_value = 2
mr = an.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = 0.28; mr.inputs['To Max'].default_value = 0.37
bump = an.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.012
al.new(tc.outputs['Object'], mp.inputs['Vector']); al.new(mp.outputs['Vector'], nz.inputs['Vector'])
al.new(nz.outputs['Fac'], mr.inputs['Value']); al.new(mr.outputs['Result'], alu_b.inputs['Roughness'])
al.new(nz.outputs['Fac'], bump.inputs['Height']); al.new(bump.outputs['Normal'], alu_b.inputs['Normal'])

keycap, kb_, *_ = principled('key', (0.003, 0.003, 0.0035), rough=0.55)
kb_.inputs['Specular IOR Level'].default_value = 0.06
well, wb_, *_ = principled('well', (0.002, 0.002, 0.0025), rough=0.7)
wb_.inputs['Specular IOR Level'].default_value = 0.2
glass, *_ = principled('glass', (0.003, 0.003, 0.004), rough=0.03, coat=1.0, coat_rough=0.01)
hingemat, *_ = principled('hinge', (0.015, 0.015, 0.016), metal=0.8, rough=0.35)
pad, *_ = principled('pad', (0.034, 0.035, 0.038), metal=0.9, rough=0.26, coat=0.25, coat_rough=0.12)
padgap, *_ = principled('padgap', (0.004, 0.004, 0.004), rough=0.8)
camdot, *_ = principled('camdot', (0.02, 0.022, 0.03), rough=0.1, coat=1.0)
titan, *_ = principled('titan', (0.11, 0.11, 0.115), metal=1.0, rough=0.24)

# speaker grille: dot pattern punched as dark holes
grille, gb, gn, gl = principled('grille', (0.050, 0.052, 0.056), metal=1.0, rough=0.34)
gt = gn.new('ShaderNodeTexCoord'); gm = gn.new('ShaderNodeMapping'); gm.inputs['Scale'].default_value = (18, 78, 1)
fr = gn.new('ShaderNodeVectorMath'); fr.operation = 'FRACTION'
sub = gn.new('ShaderNodeVectorMath'); sub.operation = 'SUBTRACT'; sub.inputs[1].default_value = (0.5, 0.5, 0)
ln = gn.new('ShaderNodeVectorMath'); ln.operation = 'LENGTH'
lt = gn.new('ShaderNodeMath'); lt.operation = 'LESS_THAN'; lt.inputs[1].default_value = 0.30
mix = gn.new('ShaderNodeMix'); mix.data_type = 'RGBA'
mix.inputs[6].default_value = (0.050, 0.052, 0.056, 1); mix.inputs[7].default_value = (0.0, 0.0, 0.0, 1)
gl.new(gt.outputs['UV'], gm.inputs['Vector']); gl.new(gm.outputs['Vector'], fr.inputs[0])
gl.new(fr.outputs['Vector'], sub.inputs[0]); gl.new(sub.outputs['Vector'], ln.inputs[0])
gl.new(ln.outputs['Value'], lt.inputs[0]); gl.new(lt.outputs['Value'], mix.inputs['Factor'])
gl.new(mix.outputs[2], gb.inputs['Base Color'])
rmx = gn.new('ShaderNodeMath'); rmx.operation = 'MULTIPLY_ADD'; rmx.inputs[1].default_value = 0.5; rmx.inputs[2].default_value = 0.34
gl.new(lt.outputs['Value'], rmx.inputs[0]); gl.new(rmx.outputs['Value'], gb.inputs['Roughness'])

# screen: emission of the site image (cover-fit, top-anchored) + a thin glossy layer; lumos mixes from off-glass
IMGS = {k: bpy.data.images.load(os.path.join(REPO, f)) for k, f in
        (('tj', 'tj-flowers.jpg'), ('endo', 'endopia.jpg'), ('salt', 'salt-polish.jpg'), ('mochi', 'mochinut.jpg'))}
for im in IMGS.values(): im.colorspace_settings.name = 'sRGB'
scr, sn, sl = node_mat('screen')
for nd in list(sn): sn.remove(nd)
out = sn.new('ShaderNodeOutputMaterial')
suv = sn.new('ShaderNodeTexCoord'); smap = sn.new('ShaderNodeMapping')
simg = sn.new('ShaderNodeTexImage'); simg.interpolation = 'Cubic'; simg.extension = 'EXTEND'
emi = sn.new('ShaderNodeEmission'); emi.inputs['Strength'].default_value = 1.0
glos = sn.new('ShaderNodeBsdfGlossy'); glos.inputs['Roughness'].default_value = 0.08; glos.inputs['Color'].default_value = (0.008, 0.008, 0.008, 1)
add = sn.new('ShaderNodeAddShader')
off = sn.new('ShaderNodeBsdfPrincipled'); off.inputs['Base Color'].default_value = (0.002, 0.002, 0.003, 1)
off.inputs['Roughness'].default_value = 0.03; off.inputs['Coat Weight'].default_value = 1.0
lum = sn.new('ShaderNodeMixShader'); lum.inputs['Fac'].default_value = 0.0
sl.new(suv.outputs['UV'], smap.inputs['Vector']); sl.new(smap.outputs['Vector'], simg.inputs['Vector'])
sl.new(simg.outputs['Color'], emi.inputs['Color']); sl.new(emi.outputs[0], add.inputs[0]); sl.new(glos.outputs[0], add.inputs[1])
sl.new(off.outputs[0], lum.inputs[1]); sl.new(add.outputs[0], lum.inputs[2]); sl.new(lum.outputs[0], out.inputs['Surface'])

SCREEN_ASPECT = None  # set after geometry
def set_screen(key):
    im = IMGS[key]; simg.image = im
    ai = im.size[0] / im.size[1]; asr = SCREEN_ASPECT
    if ai >= asr:
        s = asr / ai; smap.inputs['Scale'].default_value = (s, 1, 1); smap.inputs['Location'].default_value = ((1 - s) / 2, 0, 0)
    else:
        k = ai / asr; smap.inputs['Scale'].default_value = (1, k, 1); smap.inputs['Location'].default_value = (0, 1 - k, 0)

# ── laptop ────────────────────────────────────────────────────────
W, D, H, T = 0.3556, 0.2481, 0.0104, 0.0062   # 16" proportions (m)
laptop = link(bpy.data.objects.new('laptop', None))
# keyboard well (real 0.9 mm recess) built as clean topology — inset the deck, reshape the inner loop to the well
# outline, extrude it down — so the deck stays one quad ring with no boolean seams.
KW, KD, KY = 0.2760, 0.1130, 0.036
def base_with_well():
    me = bpy.data.meshes.new('base'); bm = bmesh.new()
    vs = [bm.verts.new((x, y, 0)) for x, y in rrect(W, D, 0.0105, 14)]
    bot = bm.faces.new(vs)
    ext = bmesh.ops.extrude_face_region(bm, geom=[bot])
    bmesh.ops.translate(bm, verts=[e for e in ext['geom'] if isinstance(e, bmesh.types.BMVert)], vec=(0, 0, H))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    rim = [e for e in bm.edges if len(e.link_faces) == 2 and e.link_faces[0].normal.angle(e.link_faces[1].normal) > math.radians(40)]
    bmesh.ops.bevel(bm, geom=rim, offset=0.0022, segments=5, profile=0.5, affect='EDGES', clamp_overlap=True)
    bm.faces.ensure_lookup_table()
    top = max((f for f in bm.faces if f.normal.z > 0.99), key=lambda f: f.calc_area())
    bmesh.ops.inset_region(bm, faces=[top], thickness=0.004, depth=0)
    inner = [l.vert for l in top.loops]
    tgt = [(x, y + KY) for x, y in rrect(KW + 0.004, KD + 0.004, 0.0035, 14)]
    assert len(inner) == len(tgt), (len(inner), len(tgt))
    ang = lambda x, y, cy: math.atan2(y - cy, x)
    inner.sort(key=lambda v: ang(v.co.x, v.co.y, 0)); tgt.sort(key=lambda q: ang(q[0], q[1], KY))
    for v, (x, y) in zip(inner, tgt): v.co.x, v.co.y = x, y
    ex2 = bmesh.ops.extrude_face_region(bm, geom=[top])
    bmesh.ops.delete(bm, geom=[top], context='FACES')
    nv = [e for e in ex2['geom'] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=nv, vec=(0, 0, -0.0009))
    for f in (e for e in ex2['geom'] if isinstance(e, bmesh.types.BMFace)): f.material_index = 1
    for f in bm.faces:
        if any(v in nv for v in f.verts): f.material_index = 1
    bm.to_mesh(me); bm.free()
    me.materials.append(alu); me.materials.append(well)
    me.shade_smooth()
    for poly in me.polygons:
        if abs(poly.normal.z) > 0.99: poly.use_smooth = False
    return link(bpy.data.objects.new('base', me), laptop)
base = base_with_well()

rows = [([1]*14, 0.55), ([1]*13 + [1.5], 1), ([1.5] + [1]*13, 1), ([1.8] + [1]*11 + [1.8], 1),
        ([2.3] + [1]*10 + [2.3], 1), ([1, 1, 1, 1.3, 5.2, 1.3, 1, 1, 1], 1)]
gap = 0.0026
unit = (KW - 13 * gap) / 14.5
rowh = (KD - 5 * gap) / 5.55
z = KY + KD / 2
for widths, hf in rows:
    hh = rowh * hf
    tot = sum(widths) * unit + (len(widths) - 1) * gap
    x = -tot / 2
    for wu in widths:
        kw = wu * unit
        k = slab('key', kw, hh, 0.0011, 0.0012, bevel=0.00035, seg=6, bseg=3, mat=keycap, parent=laptop)
        k.location = (x + kw / 2, z - hh / 2, H - 0.0013)
        x += kw + gap
    z -= hh + gap

for sx in (-1, 1):
    g = plate('grille', 0.026, KD, 0.002, grille, parent=laptop)
    g.location = (sx * (KW / 2 + 0.0205), KY, H + 0.00003)

TPW, TPD, TPY = 0.158, 0.094, -0.071
pg = plate('padgap', TPW + 0.0012, TPD + 0.0012, 0.0062, padgap, parent=laptop); pg.location = (0, TPY, H + 0.00004)
tp = plate('trackpad', TPW, TPD, 0.0056, pad, parent=laptop); tp.location = (0, TPY, H + 0.00008)

# hinge + lid; lid local: back edge on the hinge axis, extends toward -Y when closed, screen faces -Z
hinge = link(bpy.data.objects.new('hinge', None), laptop)
hinge.location = (0, D / 2 - 0.0035, H + 0.0005)
barrel = bpy.data.meshes.new('barrel')
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=48, radius1=0.0033, radius2=0.0033, depth=W * 0.78)
bm.to_mesh(barrel); bm.free(); barrel.shade_smooth(); barrel.materials.append(hingemat)
bo2 = link(bpy.data.objects.new('barrel', barrel), laptop)
bo2.rotation_euler = (0, math.radians(90), 0); bo2.location = (0, D / 2 - 0.0035, H - 0.0006)

LD = D - 0.0015
lid = slab('lid', W, LD, T, 0.0105, bevel=0.0016, mat=alu, parent=hinge)
lid.location = (0, -LD / 2 + 0.0035, 0.0003)
bz = plate('bezel', W - 0.0028, LD - 0.0028, 0.0092, glass, parent=hinge, down=True, uv=False)
bz.location = (0, -LD / 2 + 0.0035, 0.00022)
SIDE, TOP, BOTTOM = 0.0068, 0.0082, 0.0158        # bezel widths: sides, top (far edge), bottom (hinge side)
SW = W - 2 * SIDE; SH = LD - TOP - BOTTOM
SCREEN_ASPECT = SW / SH
screen = plate('screen', SW, SH, 0.0085, scr, parent=hinge, down=False)
# plate UV v=1 at +y; screen top is the far edge (-y), so rotate 180° about Z and flip to face -Z
screen.rotation_euler = (math.radians(180), 0, 0)
screen.location = (0, 0.0035 - BOTTOM - SH / 2 - 0.0015 + 0.0015, 0.00012)
screen.location.y = -LD + 0.0035 + TOP + SH / 2
cd = plate('camdot', 0.0022, 0.0022, 0.0011, camdot, parent=hinge, down=True, uv=False)
cd.location = (0, -LD + 0.0035 + TOP / 2, 0.00008)

# ── phone (generic: flat titanium band, black glass, island pill; no marks) ─────────
PHH, PHW, PHD, PHR = 0.1630, 0.0776, 0.00825, 0.0118
phone = link(bpy.data.objects.new('phone', None))
band = slab('pband', PHW, PHH, PHD, PHR, bevel=0.0009, seg=18, mat=titan, parent=phone)
band.location = (0, 0, -PHD / 2)
front = plate('pglass', PHW - 0.0012, PHH - 0.0012, PHR - 0.0006, glass, parent=phone, uv=False, seg=18)
front.location = (0, 0, PHD / 2 + 0.00002)
psm, pn, pl = node_mat('pscreen')
for nd in list(pn): pn.remove(nd)
po = pn.new('ShaderNodeOutputMaterial'); pt = pn.new('ShaderNodeTexCoord'); pmap = pn.new('ShaderNodeMapping')
pim = pn.new('ShaderNodeTexImage'); pim.image = IMGS['mochi']; pim.extension = 'CLIP'; pim.interpolation = 'Cubic'
pmx = pn.new('ShaderNodeMix'); pmx.data_type = 'RGBA'; pmx.inputs[6].default_value = (1, 1, 1, 1)
pem = pn.new('ShaderNodeEmission'); pem.inputs['Strength'].default_value = 0.96
pgl = pn.new('ShaderNodeBsdfGlossy'); pgl.inputs['Roughness'].default_value = 0.08; pgl.inputs['Color'].default_value = (0.008, 0.008, 0.008, 1)
pad2 = pn.new('ShaderNodeAddShader')
PSW, PSH = PHW - 0.0062, PHH - 0.0062
# fit the logo crop (x 380..820, y 100..640 of the 1200x750 source) full-width, vertically centred
reg_u0, reg_uw = 380 / 1200, 440 / 1200
reg_v0, reg_vh = 1 - 640 / 750, 540 / 750
reg_h = (PSW / PSH) / (440 / 540)
v0 = 0.53 - reg_h / 2
pmap.inputs['Scale'].default_value = (reg_uw, reg_vh / reg_h, 1)
pmap.inputs['Location'].default_value = (reg_u0, reg_v0 - v0 * reg_vh / reg_h, 0)
pl.new(pt.outputs['UV'], pmap.inputs['Vector']); pl.new(pmap.outputs['Vector'], pim.inputs['Vector'])
pl.new(pim.outputs['Alpha'], pmx.inputs['Factor']); pl.new(pim.outputs['Color'], pmx.inputs[7])
pl.new(pmx.outputs[2], pem.inputs['Color']); pl.new(pem.outputs[0], pad2.inputs[0]); pl.new(pgl.outputs[0], pad2.inputs[1])
pl.new(pad2.outputs[0], po.inputs['Surface'])
ps = plate('pscreen', PSW, PSH, PHR - 0.0031, psm, parent=phone, seg=18)
ps.location = (0, 0, PHD / 2 + 0.00006)
isl = plate('island', 0.0198, 0.0058, 0.0029, glass, parent=phone, uv=False)
isl.location = (0, PHH / 2 - 0.0031 - 0.0055, PHD / 2 + 0.0001)
hb = plate('homebar', 0.024, 0.0011, 0.00055, padgap, parent=phone, uv=False)
hb.location = (0, -PHH / 2 + 0.0031 + 0.0024, PHD / 2 + 0.0001)
for side, y, ln_ in ((-1, 0.047, 0.010), (-1, 0.030, 0.017), (-1, 0.010, 0.017), (1, 0.030, 0.026), (1, -0.022, 0.012)):
    b = slab('btn', 0.0012, ln_, PHD * 0.45, 0.0005, parent=phone, mat=titan, seg=4)
    b.location = (side * (PHW / 2 + 0.00045), y, -PHD * 0.225)
# stands upright: phone local Y up → world Z, face → -Y (toward camera)
phone.rotation_euler = (math.radians(90), 0, 0)

# ── studio ───────────────────────────────────────────────────────
world = bpy.data.worlds.new('w'); sc.world = world; world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.0015, 0.0016, 0.0018, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0

AIM = (0, 0, 0.06)
def area(name, loc, rot, size, energy, color=(1, 1, 1), sizey=None):
    L = bpy.data.lights.new(name, 'AREA'); L.shape = 'RECTANGLE'; L.size = size; L.size_y = sizey or size
    L.energy = energy; L.color = color
    o = link(bpy.data.objects.new(name, L)); o.location = loc
    o.rotation_euler = (Vector(AIM) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    return o

area('key', (-0.55, -0.55, 0.95), (35, 0, -40), 1.2, 22, sizey=0.8)
area('fill', (0.75, -0.35, 0.45), (65, 0, 62), 0.9, 6)
area('rim', (0.05, 0.85, 0.55), (-55, 0, 180), 1.6, 18, color=(0.92, 0.95, 1.0), sizey=0.25)
area('top', (0, 0, 1.3), (0, 0, 0), 1.4, 8, sizey=0.9)

# emissive strip softboxes: only visible in reflections — they draw the long clean highlights on the metal
def strip(name, loc, rot, w, h, s):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
    bm.to_mesh(me); bm.free()
    m, n, l = node_mat(name + 'm'); b = n['Principled BSDF']; n.remove(b)
    e = n.new('ShaderNodeEmission'); e.inputs['Strength'].default_value = s
    l.new(e.outputs[0], n['Material Output'].inputs['Surface']); me.materials.append(m)
    o = link(bpy.data.objects.new(name, me)); o.location = loc; o.scale = (w, h, 1)
    o.rotation_euler = (Vector(AIM) - Vector(loc)).to_track_quat('Z', 'Y').to_euler()
    o.visible_camera = False; o.visible_diffuse = False; o.visible_shadow = False
    return o
strip('s1', (-0.6, -0.2, 0.6), (0, 70, 0), 0.25, 1.4, 1.4)
strip('s2', (0.6, -0.2, 0.6), (0, -70, 0), 0.25, 1.4, 1.1)
strip('s3', (0, -0.9, 0.5), (70, 0, 0), 1.6, 0.18, 0.9)

catcher = bpy.data.meshes.new('floor'); bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=2.0)
bm.to_mesh(catcher); bm.free()
fl = link(bpy.data.objects.new('floor', catcher)); fl.is_shadow_catcher = True

# ── camera ───────────────────────────────────────────────────────
camd = bpy.data.cameras.new('cam'); camd.lens = 50; camd.sensor_width = 36; camd.sensor_fit = 'HORIZONTAL'
camd.clip_start = 0.01
cam = link(bpy.data.objects.new('cam', camd)); sc.camera = cam
HFOV = 2 * math.atan(18 / 50)
def dist_for(width): return width / (2 * math.tan(HFOV / 2))

def look(pos, target, up=Vector((0, 0, 1))):
    fwd = (target - pos).normalized()
    right = fwd.cross(up).normalized(); upv = right.cross(fwd)
    m = Matrix((right, upv, -fwd)).transposed()
    cam.matrix_world = Matrix.Translation(pos) @ m.to_4x4()

# ── story (same beats as lumosStory.ts / lumosScene.ts) ─────────────
BREAKS, ORDER, KEYS = (0.47, 0.62, 0.76), (0, 1, 0, 2), ('tj', 'endo', 'salt')
def pose(p):
    open_ = span(p, 0.02, 0.30)
    zoom_raw = span(p, 0.22, 0.40)
    ph = span(p, 0.76, 0.92)
    lumos = span(p, 0.14, 0.30)
    lid_deg = lerp(lerp(8, 112, open_), 100, zoom_raw * (1 - ph))
    lid_deg = lerp(lid_deg, 110, ph)
    hinge.rotation_euler = (-math.radians(lid_deg), 0, 0)
    laptop.rotation_euler = (0, 0, math.radians(lerp(-33, 0, span(p, 0.02, 0.36)) + ph * 5))
    laptop.location = (lerp(0, -0.080 if MOBILE else -0.075, ph), 0, 0)
    phone.location = (lerp(0.55 if not MOBILE else 0.45, 0.175 if MOBILE else 0.200, ph), -0.150 if MOBILE else -0.045, PHH / 2 + 0.0002)
    phone.rotation_euler = (math.radians(90), 0, math.radians(lerp(-45, -8 if MOBILE else -14, ph)))
    phone.hide_render = ph < 0.001
    beat = sum(1 for b in BREAKS if p >= b)
    set_screen(KEYS[ORDER[beat]])
    lum.inputs['Fac'].default_value = lumos
    bpy.context.view_layer.update()

    # overview camera
    elev = math.radians(lerp(30, 12, span(p, 0.0, 0.30)))
    ov_w = (0.66 if MOBILE else 0.98) if p < 0.2 else lerp(0.66 if MOBILE else 0.98, 0.52 if MOBILE else 0.80, span(p, 0.1, 0.3))
    ov_w = lerp(0.66 if MOBILE else 0.98, 0.52 if MOBILE else 0.80, span(p, 0.08, 0.30))
    tgt = Vector((laptop.location.x, 0.0, lerp(0.02, 0.10, open_)))
    d = dist_for(ov_w)
    ov_pos = tgt + Vector((0, -math.cos(elev), math.sin(elev))) * d
    # close-up: square-on to the display
    mw = screen.matrix_world
    S = mw @ Vector((0, 0, 0))
    n = (mw.to_3x3() @ Vector((0, 0, 1))).normalized()       # plate faces +Z local; rotated 180° about X → faces -Z of lid = viewer
    u = (mw.to_3x3() @ Vector((0, 1, 0))).normalized()
    cw = SW / (0.86 if MOBILE else 0.62)
    dc = dist_for(cw)
    delta = -0.030 if MOBILE else 0.0045
    cl_tgt = S + u * delta
    cl_pos = cl_tgt + n * dc
    # line-up
    lu_tgt = Vector((-0.004 if MOBILE else -0.012, -0.02, 0.085))
    lu_w = 0.56 if MOBILE else 0.70
    le = math.radians(9)
    lu_pos = lu_tgt + Vector((0, -math.cos(le), math.sin(le))) * dist_for(lu_w)
    pos = vlerp(vlerp(ov_pos, cl_pos, zoom_raw), lu_pos, ph)
    tg = vlerp(vlerp(tgt, cl_tgt, zoom_raw), lu_tgt, ph)
    look(pos, tg, up=vlerp(Vector((0, 0, 1)), u, zoom_raw * (1 - ph)).normalized() if zoom_raw * (1 - ph) > 0.001 else Vector((0, 0, 1)))
    # desktop: early frames sit low, under the headline
    camd.shift_y = 0 if MOBILE else lerp(0.10, 0.0, span(p, 0.10, 0.30))

# ── render settings ───────────────────────────────────────────────
sc.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type = 'METAL'; prefs.get_devices()
for dv in prefs.devices: dv.use = True
sc.cycles.device = 'GPU'
sc.cycles.samples = SAMPLES; sc.cycles.use_adaptive_sampling = True; sc.cycles.adaptive_threshold = 0.015
sc.cycles.use_denoising = True; sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.max_bounces = 8; sc.cycles.glossy_bounces = 4; sc.cycles.transparent_max_bounces = 4
sc.render.film_transparent = not os.environ.get('REVIEW')
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'; sc.view_settings.exposure = 0.0
if MOBILE: sc.render.resolution_x, sc.render.resolution_y = 1170, 1300
else: sc.render.resolution_x, sc.render.resolution_y = 1920, 1080
sc.render.resolution_percentage = SCALE
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'; sc.render.image_settings.compression = 15

if os.environ.get('CROP'):
    x0, y0, x1, y1 = [float(v) for v in os.environ['CROP'].split(',')]
    sc.render.use_border = True; sc.render.use_crop_to_border = True
    sc.render.border_min_x, sc.render.border_min_y, sc.render.border_max_x, sc.render.border_max_y = x0, y0, x1, y1
os.makedirs(OUT, exist_ok=True)
ps_ = PLIST if PLIST else [i / (COUNT - 1) for i in range(COUNT)]
for i, p in enumerate(ps_):
    pose(p)
    sc.render.filepath = os.path.join(OUT, f'f{i:02d}.png' if not PLIST else f'p{p:.2f}.png')
    bpy.ops.render.render(write_still=True)
    print('RENDERED', i, p, flush=True)
