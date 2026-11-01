const fs = require('fs');
const path = require('path');

const root = __dirname;
const variantsDir = path.join(root, 'variants');
const metaVariantsDir = path.join(root, 'data-varianten');
const streamDir = path.join(root, 'stream');
const dataDir = path.join(root, 'data');
const choicesFile = path.join(root, 'keuze.json');

const categories = fs.readdirSync(variantsDir).filter(name => fs.statSync(path.join(variantsDir, name)).isDirectory());
const metaVariants = fs.readdirSync(metaVariantsDir);

function copyTree(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);

    if (entry.isDirectory()) copyTree(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (process.argv[2] === 'lijst') {
  const choices = fs.existsSync(choicesFile) ? JSON.parse(fs.readFileSync(choicesFile, 'utf8')) : {};

  console.log(`\nmeta (nu: ${choices.meta || 'niets gekozen'})`);
  for (const variant of metaVariants) console.log(`  ${variant}`);

  for (const category of categories) {
    console.log(`\n${category} (nu: ${choices[category] || 'niets gekozen'})`);

    for (const variant of fs.readdirSync(path.join(variantsDir, category))) console.log(`  ${variant}`);
  }

  process.exit(0);
}

const choices = JSON.parse(fs.readFileSync(choicesFile, 'utf8'));

if (!metaVariants.includes(choices.meta)) {
  console.error(`meta: "${choices.meta}" bestaat niet. Kies uit: ${metaVariants.join(', ')}`);
  process.exit(1);
}

fs.rmSync(path.join(dataDir, 'dlc'), { recursive: true, force: true });
copyTree(path.join(metaVariantsDir, choices.meta), dataDir);
console.log(`meta: ${choices.meta}`);

fs.mkdirSync(streamDir, { recursive: true });

for (const file of fs.readdirSync(streamDir)) {
  if (file.toLowerCase().endsWith('.ycd')) fs.unlinkSync(path.join(streamDir, file));
}

let copied = 0;

for (const category of categories) {
  const variant = choices[category];

  if (!variant) {
    console.log(`${category}: niets gekozen, de standaardanimaties van GTA blijven.`);
    continue;
  }

  const source = path.join(variantsDir, category, variant);

  if (!fs.existsSync(source)) {
    console.error(`${category}: "${variant}" bestaat niet. Kies uit: ${fs.readdirSync(path.join(variantsDir, category)).join(', ')}`);
    process.exit(1);
  }

  for (const file of fs.readdirSync(source)) {
    fs.copyFileSync(path.join(source, file), path.join(streamDir, file));
    copied++;
  }

  console.log(`${category}: ${variant}`);
}

console.log(`\n${copied} animatiebestanden in stream/. Herstart de resource (spelers die al online zijn moeten opnieuw verbinden).`);
