#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3.1-flash-image-preview';
const STYLE = 'Editorial magazine photography, premium brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition, muted warm professional colors, no text or typography, no logos, horizontal 16:9 composition.';

const IMGS = [
  { slug: 'korean-nail-salon-website-guide', prompt: `Modern Korean-American nail salon interior with rose gold accents. A manicure station in sharp focus with perfectly done gel nails displayed on a hand model. Soft pink and white palette, crystal-clear gel bottles in background. ${STYLE}` },
  { slug: 'korean-dental-practice-website-guide', prompt: `Clean modern dental office waiting room with warm wood accents. A tablet on the reception desk showing a patient portal. Fresh flowers, comfortable chairs, soft natural light. Professional medical yet welcoming. ${STYLE}` },
  { slug: 'korean-law-firm-website-guide', prompt: `An elegant law office desk with legal books, a leather portfolio, a fountain pen, and a laptop showing a professional bilingual website. Dark wood, brass lamp, city view through window. Authoritative and trustworthy. ${STYLE}` },
  { slug: 'korean-real-estate-agent-website', prompt: `A real estate agent's hand holding a house key in front of a beautiful suburban home. Soft golden hour light, manicured front yard visible, warm and aspirational feeling. ${STYLE}` },
  { slug: 'korean-church-website-guide', prompt: `Interior of a modern Korean church sanctuary with warm wood pews, a cross lit softly from behind, and morning sunlight streaming through tall windows. Peaceful, welcoming, community feeling. ${STYLE}` },
  { slug: 'korean-tutoring-sat-prep-website', prompt: `A bright study room with a student's desk showing SAT prep books, highlighters, a tablet with practice problems, and a coffee cup. Warm desk lamp, motivational but focused atmosphere. ${STYLE}` },
  { slug: 'korean-medspa-aesthetic-clinic-website', prompt: `A premium Korean med spa treatment room with white marble surfaces, elegant skincare products lined up, a facial treatment bed, and soft indirect lighting. Luxurious K-beauty spa aesthetic. ${STYLE}` },
  { slug: 'korean-hair-salon-website-guide', prompt: `A Korean hair salon styling station with a large round mirror, professional styling tools arranged neatly, and a model with a beautiful K-style layered haircut visible from behind. Modern minimalist salon interior. ${STYLE}` },
  { slug: 'korean-insurance-financial-services-website', prompt: `A professional financial advisor's desk with a calculator, printed portfolio charts, a family photo frame, and a pen on financial documents. Warm ambient light, trustworthy and established feeling. ${STYLE}` },
];

async function gen(prompt) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } }),
  });
  const b = await r.json();
  const img = b.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!img) throw new Error(b.error?.message || 'no image');
  return Buffer.from(img.inlineData.data, 'base64');
}

(async () => {
  const out = path.join(__dirname, '../../public/blog');
  console.log(`\n🎨 Phase 2: ${IMGS.length} images...\n`);
  for (const { slug, prompt } of IMGS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const buf = await gen(prompt);
        fs.writeFileSync(path.join(out, `${slug}.png`), buf);
        console.log(`  ✅ ${slug}.png (${(buf.length/1024).toFixed(0)}KB)`);
        break;
      } catch (e) {
        if (attempt === 3) console.log(`  ❌ ${slug}: ${e.message.slice(0,80)}`);
        else await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
})();
