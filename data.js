'use strict';
/* ================================================================
   MUSEUM DEX DATA — 34 Specimens (9 Fossils | 15 Dinos | 10 Plants)
   Each specimen has: id, name (nickname), latinName, category,
   rarity, emoji, gradientFrom/To, glowColor, imageUrl (Wikipedia),
   continents (for SVG map), description, features, era, location,
   funFact, xp
   ================================================================ */

const SPECIMENS = [

  // ======================================================
  // 🦴 FOSSILS (9)
  // ======================================================

  {
    id: 'ammonite',
    name: 'Ammonite',
    latinName: 'Ammonitida sp.',
    category: 'fossil',
    rarity: 'common',
    emoji: '🌀',
    gradientFrom: '#4A2E1A', gradientTo: '#7A5030',
    glowColor: 'rgba(200,150,90,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ammonite_Asteroceras.jpg/640px-Ammonite_Asteroceras.jpg',
    continents: ['global'],
    description: "Ammonites were spectacular sea creatures with beautiful spiral shells that lived alongside dinosaurs for millions of years! Their coiled shells helped them control their depth — like a built-in submarine ballast tank!",
    features: [
      { icon: '📏', label: 'Size',       value: 'From 1cm tiny to a massive 2 meters wide!' },
      { icon: '🌊', label: 'Home',       value: 'Ancient oceans worldwide' },
      { icon: '🍖', label: 'Diet',       value: 'Carnivore — ate fish & tiny crustaceans' },
      { icon: '⚡', label: 'Superpower', value: 'Could change depth like a real submarine!' }
    ],
    era: 'Devonian to Cretaceous (400–66 million years ago)',
    location: 'Morocco, Madagascar, United Kingdom',
    funFact: "Their spiral shell follows the golden ratio — one of nature's most beautiful mathematical patterns!",
    xp: 30
  },

  {
    id: 'trilobite',
    name: 'Trilobite',
    latinName: 'Trilobita',
    category: 'fossil',
    rarity: 'common',
    emoji: '🦂',
    gradientFrom: '#2E1A0A', gradientTo: '#5C3820',
    glowColor: 'rgba(120,80,50,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Trilobita_Diversity.png/640px-Elrathia_kingi_trilobite.jpg',
    continents: ['global'],
    description: "Trilobites were armoured sea bugs that ruled the oceans for 270 million years — way longer than dinosaurs! They could roll up into a tight defensive ball, just like a roly-poly bug today! Over 20,000 species have been found!",
    features: [
      { icon: '📏', label: 'Size Range',   value: 'From 1mm to a whopping 72cm!' },
      { icon: '👁️', label: 'Crystal Eyes', value: 'Compound eyes made of actual crystal!' },
      { icon: '🛡️', label: 'Defense',      value: 'Could curl into a ball like a roly-poly bug' },
      { icon: '🌍', label: 'Found On',     value: 'Every single continent on Earth' }
    ],
    era: 'Cambrian to Permian (521–252 million years ago)',
    location: 'Every continent on Earth!',
    funFact: 'Trilobites survived THREE mass extinctions before finally going extinct — true ultimate survivors!',
    xp: 30
  },

  {
    id: 'megalodon',
    name: 'Megalodon Tooth',
    latinName: 'Otodus megalodon',
    category: 'fossil',
    rarity: 'rare',
    emoji: '🦷',
    gradientFrom: '#1A2A30', gradientTo: '#3A5A65',
    glowColor: 'rgba(78,205,196,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Megalodon_jaws.jpg/640px-Megalodon_shark_jaws_museum_of_natural_history.jpg',
    continents: ['north-america', 'europe', 'australia'],
    description: "This tooth belonged to MEGALODON — the biggest shark that EVER lived! Longer than a school bus, with a bite stronger than any creature in history, Megalodon was the ocean's ultimate apex predator!",
    features: [
      { icon: '📏', label: 'Shark Size',  value: '18 meters — 3× bigger than a great white!' },
      { icon: '🦷', label: 'Tooth Size',  value: 'Up to 18cm — bigger than your whole hand!' },
      { icon: '💪', label: 'Bite Force',  value: 'Strongest bite of ANY animal EVER!' },
      { icon: '🍖', label: 'Prey',        value: 'Hunted whales and giant sea creatures' }
    ],
    era: 'Miocene to Pliocene (23–3.6 million years ago)',
    location: 'North & South America, Europe, Australia',
    funFact: 'Scientists estimate Megalodon could swallow a great white shark in just 3 bites!',
    xp: 60
  },

  {
    id: 'fern_fossil',
    name: 'Fossil Fern',
    latinName: 'Pecopteris sp.',
    category: 'fossil',
    rarity: 'common',
    emoji: '🌿',
    gradientFrom: '#0F2A0F', gradientTo: '#1E5A1E',
    glowColor: 'rgba(100,200,100,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Pecopteris_villosa.jpg/640px-Pecopteris_miltonii.jpg',
    continents: ['europe', 'north-america'],
    description: "This 300-million-year-old fern impression is like a photograph taken by nature! Ancient ferns were GIANTS — some grew as tall as a 5-story building. The coal in power stations today was once forests of these ferns!",
    features: [
      { icon: '📏', label: 'Ancient Height', value: 'Tree-sized! Up to 15 meters tall' },
      { icon: '☀️', label: 'Era',            value: 'Carboniferous coal swamp forests' },
      { icon: '🌿', label: 'Habitat',        value: 'Warm, steamy swampy forests' },
      { icon: '💡', label: 'Cool Legacy',    value: 'These ferns literally became today\'s coal!' }
    ],
    era: 'Carboniferous Period (359–299 million years ago)',
    location: 'United Kingdom, Germany, Pennsylvania USA',
    funFact: 'The coal that powers electricity today was once a giant fern forest just like this!',
    xp: 30
  },

  {
    id: 'sabertooth_skull',
    name: 'Saber-Tooth Skull',
    latinName: 'Smilodon fatalis',
    category: 'fossil',
    rarity: 'ultra-rare',
    emoji: '💀',
    gradientFrom: '#1E063A', gradientTo: '#5A1A8A',
    glowColor: 'rgba(198,120,221,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Smilodon_pop2_15.jpg/640px-Smilodon_californicus.jpg',
    continents: ['north-america'],
    description: "The Saber-Tooth Tiger had fangs longer than a school ruler and hunted in coordinated packs! Thousands of bones were preserved in the famous La Brea Tar Pits in Los Angeles — nature's perfect prehistoric time capsule!",
    features: [
      { icon: '🦷', label: 'Fang Length', value: '28cm long — bigger than a ruler!' },
      { icon: '💪', label: 'Weight',      value: '160–280 kg — heavier than a male lion' },
      { icon: '🏃', label: 'Speed',       value: 'Could burst to 40 km/h instantly' },
      { icon: '🤝', label: 'Social',      value: 'Hunted together in coordinated packs!' }
    ],
    era: 'Pleistocene Epoch (2.5 million–10,000 years ago)',
    location: 'La Brea Tar Pits, Los Angeles, California, USA',
    funFact: 'Over 2,000 Saber-Tooth individuals have been found preserved in the LA tar pits!',
    xp: 100
  },

  {
    id: 'mastodon',
    name: 'Woolly Mastodon',
    latinName: 'Mammut americanum',
    category: 'fossil',
    rarity: 'rare',
    emoji: '🐘',
    gradientFrom: '#2A1A0A', gradientTo: '#5A3A1A',
    glowColor: 'rgba(180,130,70,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Mammut_americanum_Sergiodlarosa.jpg/640px-Mammut_americanum_Sergiodlarosa.jpg',
    continents: ['north-america'],
    description: "Mastodons were furry elephant-like giants that roamed North America during the Ice Age! Different from Woolly Mammoths, they had lower, flatter skulls and longer, straighter tusks. They lived right alongside early humans!",
    features: [
      { icon: '📏', label: 'Size',        value: '2.3 meters tall and 8 tonnes heavy!' },
      { icon: '🦷', label: 'Tusks',       value: 'Tusks up to 3 meters long!' },
      { icon: '🌿', label: 'Diet',        value: 'Browsed on shrubs, trees and plants' },
      { icon: '🧊', label: 'Era',         value: 'Roamed alongside early humans in the Ice Age' }
    ],
    era: 'Pleistocene (2.5 million–10,000 years ago)',
    location: 'North America — found from Alaska to Mexico',
    funFact: 'Mastodons were hunted by early humans! Stone-tipped spears have been found with their bones!',
    xp: 60
  },

  {
    id: 'dippy',
    name: 'Dippy the Diplodocus',
    latinName: 'Diplodocus carnegii',
    category: 'fossil',
    rarity: 'rare',
    emoji: '🦕',
    gradientFrom: '#0A1A3A', gradientTo: '#1A3A6A',
    glowColor: 'rgba(100,150,230,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/CM_Diplodocus.jpg/640px-Diplodocus_Carnegie_Museum.jpg',
    continents: ['north-america'],
    description: "Dippy is the most famous dinosaur skeleton in Britain! The Natural History Museum's beloved Diplodocus cast has greeted visitors for over 100 years. The real bones were found in Wyoming, USA — but Dippy went on world tour and is loved by millions of kids!",
    features: [
      { icon: '📏', label: 'Length',      value: '26 meters — longer than a blue whale!' },
      { icon: '🦕', label: 'Famous For',  value: 'Longest skeleton in the Natural History Museum!' },
      { icon: '🌿', label: 'Diet',        value: 'Herbivore — hoovered up plants with its long neck' },
      { icon: '🎪', label: 'World Tour',  value: 'Dippy toured 8 cities across the UK!' }
    ],
    era: 'Late Jurassic (154–152 million years ago)',
    location: 'Wyoming, USA (original bones) — on display in London!',
    funFact: 'Dippy\'s skeleton was a gift from steel magnate Andrew Carnegie to King Edward VII in 1905!',
    xp: 60
  },

  {
    id: 'tullimonstrum',
    name: 'Tully Monster',
    latinName: 'Tullimonstrum gregarium',
    category: 'fossil',
    rarity: 'ultra-rare',
    emoji: '👾',
    gradientFrom: '#0A2A3A', gradientTo: '#1A5A7A',
    glowColor: 'rgba(60,200,220,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tullimonstrum_gregarium.jpg/640px-Tullimonstrum_gregarium.jpg',
    continents: ['north-america'],
    description: "The Tully Monster is one of paleontology's greatest unsolved mysteries! This bizarre creature had eyes on stalks, a long snout with a claw at the tip, and scientists STILL can't agree what type of animal it was! Nobody knows if it was a fish, a worm, or something completely new!",
    features: [
      { icon: '👁️', label: 'Eyes',        value: 'Eyes on long stalks like a hammerhead shark!' },
      { icon: '🦷', label: 'Snout',       value: 'Long snout with a claw and teeth at the tip!' },
      { icon: '❓', label: 'Mystery',     value: 'Scientists STILL don\'t know what it was!' },
      { icon: '🏛️', label: 'Famous For',  value: 'Official state fossil of Illinois, USA!' }
    ],
    era: 'Carboniferous Period (307 million years ago)',
    location: 'Mazon Creek, Illinois, USA',
    funFact: 'The Tully Monster is so weird that scientists have reclassified it 5 different times in 60 years!',
    xp: 100
  },

  {
    id: 'coprolite',
    name: 'Fossilised Poop! 💩',
    latinName: 'Coprolite sp.',
    category: 'fossil',
    rarity: 'common',
    emoji: '💩',
    gradientFrom: '#2A1A0A', gradientTo: '#4A3020',
    glowColor: 'rgba(160,110,60,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Tyrannosaurus_rex_Coprolite_Poozeum.jpg/640px-Coprolite_01.jpg',
    continents: ['global'],
    description: "Yes — this is REAL fossilised dinosaur poop! And it's actually incredibly useful to scientists! Coprolites tell us exactly what ancient animals ate. Some contain undigested fish scales, bone fragments, and seeds inside! Some are even polished into gems!",
    features: [
      { icon: '💩', label: 'What Is It',  value: 'Fossilised prehistoric animal poo!' },
      { icon: '🔬', label: 'Science Use', value: 'Reveals exact diets of extinct creatures!' },
      { icon: '💎', label: 'Fun Fact',    value: 'Can be polished into beautiful gemstone-like pieces!' },
      { icon: '📍', label: 'Found In',    value: 'On every continent — even Antarctica!' }
    ],
    era: 'All time periods — earliest examples 500 million years old!',
    location: 'Found on every single continent worldwide',
    funFact: 'The world\'s largest coprolite is 64cm long and was found in Saskatchewan, Canada — from a T-Rex!',
    xp: 30
  },

  // ======================================================
  // 🦖 DINOSAURS (15)
  // ======================================================

  {
    id: 'trex',
    name: 'T-Rex',
    latinName: 'Tyrannosaurus rex',
    category: 'dinosaur',
    rarity: 'ultra-rare',
    emoji: '🦖',
    gradientFrom: '#3A0808', gradientTo: '#8A1A1A',
    glowColor: 'rgba(255,70,40,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/T-Rex.jpg/640px-Tyrannosaurus_Rex_skeleton.jpg',
    continents: ['north-america'],
    description: "THE King of the Dinosaurs! T-Rex had teeth the size of bananas and the most powerful bite of any land animal in history. But here's the secret: its arms were SO tiny it couldn't even scratch its own nose — and its brain was only the size of a banana!",
    features: [
      { icon: '📏', label: 'Body Size',  value: '12–13 meters — as long as 2 school buses!' },
      { icon: '🦷', label: 'Teeth',      value: '60 serrated teeth, each up to 20cm long!' },
      { icon: '💪', label: 'Bite Force', value: '57,000 Newtons — strongest land animal EVER!' },
      { icon: '👃', label: 'Smell',      value: 'Could smell prey from over 1.5 km away!' }
    ],
    era: 'Late Cretaceous Period (68–66 million years ago)',
    location: 'Montana, South Dakota, Wyoming, USA',
    funFact: 'T-Rex\'s brain was the size of a banana, but its smell centres were absolutely enormous!',
    xp: 100
  },

  {
    id: 'triceratops',
    name: 'Triceratops',
    latinName: 'Triceratops horridus',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🦏',
    gradientFrom: '#0A2A0A', gradientTo: '#1A6020',
    glowColor: 'rgba(78,205,196,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Triceratops_BW.jpg/640px-Triceratops_BW.jpg',
    continents: ['north-america'],
    description: "Triceratops had THREE massive horns and a huge bony frill — and it wasn't afraid to charge at T-Rex! This armoured dinosaur tank would fight off predators twice its size. Its frill may have changed colour to communicate with other Triceratops!",
    features: [
      { icon: '📏', label: 'Body Size',  value: '9 meters long, weighing 12 tonnes!' },
      { icon: '🎯', label: 'Horns',      value: '3 horns — the longest up to 1 full meter!' },
      { icon: '🌿', label: 'Diet',       value: 'Herbivore — munched tough plants all day' },
      { icon: '🛡️', label: 'Neck Frill', value: 'Giant bony frill may have changed colours!' }
    ],
    era: 'Late Cretaceous Period (68–66 million years ago)',
    location: 'Western North America — Montana, Wyoming',
    funFact: 'Triceratops and T-Rex lived in the SAME place at the SAME time — real prehistoric rivals!',
    xp: 60
  },

  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    latinName: 'Brachiosaurus altithorax',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🦕',
    gradientFrom: '#0A0A3A', gradientTo: '#1A2A8A',
    glowColor: 'rgba(100,140,255,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Brachiosaurus_altithorax.jpg/640px-Giraffatitan_brancai_skeleton.jpg',
    continents: ['north-america', 'africa'],
    description: "Brachiosaurus was so tall it could peek over a 5-story building! It ate all day long just to fuel its massive body, needing 400 kg of leaves every single day. Its heart had to be the size of a car engine just to pump blood up that enormous neck!",
    features: [
      { icon: '📏', label: 'Height',     value: '16 meters tall — taller than 5 floors!' },
      { icon: '⚖️', label: 'Weight',     value: '56 tonnes — as heavy as 10 elephants!' },
      { icon: '🌿', label: 'Appetite',   value: 'Needed 400 kg of leaves every day!' },
      { icon: '❤️', label: 'Heart',      value: 'Heart was the size of a car engine!' }
    ],
    era: 'Late Jurassic Period (154–153 million years ago)',
    location: 'Colorado USA & Tanzania, Africa',
    funFact: 'Brachiosaurus had nostrils on TOP of its head — scientists once thought it breathed underwater!',
    xp: 60
  },

  {
    id: 'velociraptor',
    name: 'Velociraptor',
    latinName: 'Velociraptor mongoliensis',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🐉',
    gradientFrom: '#2A1000', gradientTo: '#7A3500',
    glowColor: 'rgba(255,150,50,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Velociraptor_dinoguy2.jpg/640px-Velociraptor_dinoguy2.jpg',
    continents: ['asia'],
    description: "Forget what you saw in movies — real Velociraptors were only the size of a turkey! But don't be fooled — they were lightning-fast, super smart, and had a deadly curved sickle claw on each foot that could slice through bone!",
    features: [
      { icon: '📏', label: 'Real Size',    value: 'Only 50cm tall — size of a turkey!' },
      { icon: '🧠', label: 'Intelligence', value: 'One of the smartest dinosaurs ever!' },
      { icon: '⚡', label: 'Speed',        value: 'Could sprint at 40 km/h in short bursts' },
      { icon: '🪶', label: 'Feathers',     value: 'Had feathers like a bird — but couldn\'t fly!' }
    ],
    era: 'Late Cretaceous Period (75–71 million years ago)',
    location: 'Gobi Desert, Mongolia, Central Asia',
    funFact: 'The movie "raptors" were actually based on Deinonychus — Velociraptor\'s much larger cousin!',
    xp: 60
  },

  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    latinName: 'Stegosaurus stenops',
    category: 'dinosaur',
    rarity: 'common',
    emoji: '🦎',
    gradientFrom: '#002A22', gradientTo: '#005A44',
    glowColor: 'rgba(78,205,196,0.35)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Stegosaurus_0684.JPG/640px-Stegosaurus_stenops_IMG_1557.jpg',
    continents: ['north-america'],
    description: "Stegosaurus rocked 17 diamond-shaped bony plates down its back and a fearsome spiked tail weapon called a \'thagomizer\'! Scientists think those colourful back plates flushed with blood to signal emotions — prehistoric mood ring!",
    features: [
      { icon: '🛡️', label: 'Back Plates', value: '17 diamond-shaped bony plates!' },
      { icon: '🌿', label: 'Diet',         value: 'Ate only low-growing plants & ferns' },
      { icon: '🧠', label: 'Brain Size',   value: 'Brain was ONLY the size of a walnut!' },
      { icon: '⚔️', label: 'Tail Weapon',  value: '4 tail spikes (thagomizer) up to 1 meter!' }
    ],
    era: 'Late Jurassic Period (155–150 million years ago)',
    location: 'Colorado, Wyoming, Utah, USA',
    funFact: 'Stegosaurus has the smallest brain-to-body ratio of ANY known dinosaur — walnut-brained giant!',
    xp: 30
  },

  {
    id: 'spinosaurus',
    name: 'Spinosaurus',
    latinName: 'Spinosaurus aegyptiacus',
    category: 'dinosaur',
    rarity: 'ultra-rare',
    emoji: '🐊',
    gradientFrom: '#001A3A', gradientTo: '#003A7A',
    glowColor: 'rgba(50,150,255,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Spinosaurus_aegyptiacus.png/640px-Spinosaurus_restoration.jpg',
    continents: ['africa'],
    description: "Spinosaurus was BIGGER than T-Rex and could SWIM! The largest meat-eating dinosaur ever discovered, it had a giant sail up to 1.8 metres tall on its back and hunted giant fish in prehistoric rivers. Think of it as the ultimate river monster!",
    features: [
      { icon: '📏', label: 'Size',      value: '14–15 meters — bigger than T-Rex!' },
      { icon: '🏄', label: 'Superpower', value: 'Could swim like a crocodile!' },
      { icon: '⛵', label: 'Sail',      value: 'Sail on back up to 1.8 meters tall!' },
      { icon: '🐟', label: 'Diet',      value: 'Mainly ate giant prehistoric fish' }
    ],
    era: 'Cretaceous Period (100–93 million years ago)',
    location: 'Egypt & Morocco, North Africa',
    funFact: 'Spinosaurus could swim using its short hind legs like a duck — no other dinosaur could do this!',
    xp: 100
  },

  {
    id: 'allosaurus',
    name: 'Allosaurus',
    latinName: 'Allosaurus fragilis',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🦖',
    gradientFrom: '#3A1A00', gradientTo: '#8A4400',
    glowColor: 'rgba(220,120,40,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Allosaurus_Revised.jpg/640px-Allosaurus_Revised.jpg',
    continents: ['north-america'],
    description: "Allosaurus was the T-Rex of the Jurassic period — appearing 85 MILLION years before T-Rex! It was the top predator of its era, hunting giant sauropods like Stegosaurus. Scientists have found Allosaurus bones with Stegosaurus tail-spike wounds in them!",
    features: [
      { icon: '📏', label: 'Size',      value: '9–12 meters and 2.5 tonnes heavy!' },
      { icon: '🦷', label: 'Teeth',     value: 'Dozens of sharp, blade-like serrated teeth' },
      { icon: '🎯', label: 'Hunting',   value: 'Hunted Stegosaurus and giant sauropods!' },
      { icon: '✋', label: 'Hands',     value: 'Three-fingered hands with huge sickle claws' }
    ],
    era: 'Late Jurassic Period (156–145 million years ago)',
    location: 'Utah, Colorado, Wyoming, USA',
    funFact: 'Fossil evidence shows Allosaurus hunted in packs — like wolves but much, MUCH bigger!',
    xp: 60
  },

  {
    id: 'iguanodon',
    name: 'Iguanodon',
    latinName: 'Iguanodon bernissartensis',
    category: 'dinosaur',
    rarity: 'common',
    emoji: '🦎',
    gradientFrom: '#1A3A0A', gradientTo: '#3A6A1A',
    glowColor: 'rgba(120,200,80,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Iguanodon_skeleton_NHM.JPG/640px-Iguanodon_NHM.jpg',
    continents: ['europe'],
    description: "Iguanodon was one of the FIRST dinosaurs ever discovered — way back in 1822! It could walk on both two legs AND four legs, switching between them like we switch between running and crawling. It had a powerful thumb spike that it used like a sharp weapon!",
    features: [
      { icon: '📏', label: 'Size',       value: '10 meters long and 3 tonnes heavy!' },
      { icon: '👣', label: 'Walking',    value: 'Could walk on 2 legs OR 4 legs!' },
      { icon: '👍', label: 'Thumb Spike', value: 'Sharp conical thumb spike as a weapon!' },
      { icon: '🌿', label: 'Diet',       value: 'Herbivore — ate plants and tough vegetation' }
    ],
    era: 'Early Cretaceous Period (126–122 million years ago)',
    location: 'Bernissart, Belgium & UK, Europe',
    funFact: '38 complete Iguanodon skeletons were found together in a Belgium coal mine in 1878!',
    xp: 30
  },

  {
    id: 'therizinosaurus',
    name: 'Scythe Claws',
    latinName: 'Therizinosaurus cheloniformis',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🦕',
    gradientFrom: '#0A2A1A', gradientTo: '#1A5A3A',
    glowColor: 'rgba(80,200,150,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Therizinosaurus_arms.jpg/640px-Therizinosaurus_cheloniformis_mmartyniuk_wiki.png',
    continents: ['asia'],
    description: "Scythe Claws (Therizinosaurus) had the longest claws of ANY animal that EVER lived — up to 1 meter long! Those terrifying scythes look like a monster's weapon, but surprise — this enormous dinosaur was actually a gentle plant-eater! It used its giant claws to grab branches!",
    features: [
      { icon: '🔪', label: 'Claw Length', value: 'Claws up to 1 METER long — the longest EVER!' },
      { icon: '📏', label: 'Height',      value: 'Up to 10 meters tall — taller than a house!' },
      { icon: '🌿', label: 'Diet',        value: 'Surprisingly a gentle plant-eater!' },
      { icon: '🦷', label: 'Teeth',       value: 'Small leaf-shaped teeth for stripping leaves' }
    ],
    era: 'Late Cretaceous Period (70 million years ago)',
    location: 'Gobi Desert, Mongolia, Central Asia',
    funFact: 'Therizinosaurus claws are so big that scientists first thought they were turtle shell ribs!',
    xp: 60
  },

  {
    id: 'giganotosaurus',
    name: 'Giganotosaurus',
    latinName: 'Giganotosaurus carolinii',
    category: 'dinosaur',
    rarity: 'ultra-rare',
    emoji: '🦖',
    gradientFrom: '#3A0808', gradientTo: '#7A1A1A',
    glowColor: 'rgba(220,60,40,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Giganotosaurus_carolinii_by_durbed.jpg/640px-Giganotosaurus_carolinii_by_durbed.jpg',
    continents: ['south-america'],
    description: "Giganotosaurus was the South American answer to T-Rex — and it was even BIGGER! Found in Patagonia, Argentina, this giant hunted massive sauropod dinosaurs and lived 30 million years before T-Rex. Scientists even found evidence it hunted in packs!",
    features: [
      { icon: '📏', label: 'Size',      value: '12–13 meters — BIGGER than T-Rex!' },
      { icon: '🦷', label: 'Teeth',     value: 'Banana-shaped teeth for slicing through flesh!' },
      { icon: '🏃', label: 'Speed',     value: 'Could run at 14 km/h despite its giant size' },
      { icon: '🌍', label: 'Location',  value: 'Argentina, South America — a New World giant!' }
    ],
    era: 'Late Cretaceous Period (99–97 million years ago)',
    location: 'Neuquén Province, Patagonia, Argentina',
    funFact: 'Giganotosaurus\'s brain was smaller than T-Rex\'s despite being bigger — but it was faster!',
    xp: 100
  },

  {
    id: 'mosasaurus',
    name: 'Sea Monster',
    latinName: 'Mosasaurus hoffmannii',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🐊',
    gradientFrom: '#001A2A', gradientTo: '#003A5A',
    glowColor: 'rgba(40,180,220,0.5)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mosasaurus_missouriensis.jpg/640px-Mosasaurus_missouriensis.jpg',
    continents: ['north-america', 'europe'],
    description: "The Sea Monster! While T-Rex ruled the land, Mosasaurus ruled the oceans! Not actually a dinosaur but a giant sea lizard (related to modern monitor lizards), this ocean beast was 17 meters long and could swallow sharks whole! It\'s the real Loch Ness Monster!",
    features: [
      { icon: '📏', label: 'Size',       value: '17 meters — longest ocean predator ever!' },
      { icon: '🦈', label: 'Diet',       value: 'Ate sharks, fish, sea turtles and giant squids' },
      { icon: '🐍', label: 'Relative',   value: 'Related to modern Komodo dragons!' },
      { icon: '🌊', label: 'Habitat',    value: 'Ruled all the world\'s oceans at once!' }
    ],
    era: 'Late Cretaceous Period (70–66 million years ago)',
    location: 'Netherlands, USA, Africa & worldwide oceans',
    funFact: 'When Mosasaurus was first discovered in 1764, people thought it was a crocodile or sea dragon!',
    xp: 60
  },

  {
    id: 'halszkaraptor',
    name: 'Duck Raptor',
    latinName: 'Halszkaraptor escuilliei',
    category: 'dinosaur',
    rarity: 'rare',
    emoji: '🦆',
    gradientFrom: '#1A2A3A', gradientTo: '#3A5A7A',
    glowColor: 'rgba(100,180,220,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Halszkaraptor_escuilliei.jpg/640px-Halszkaraptor_escuilliei.jpg',
    continents: ['asia'],
    description: "Meet the weirdest dinosaur ever — the Duck Raptor! Halszkaraptor could swim like a duck AND hunt like a raptor! It had a swan-like neck, flipper-like arms for swimming, AND raptor claws for hunting. Scientists think it lived both on land AND in water — like a prehistoric duck-raptor hybrid!",
    features: [
      { icon: '🦆', label: 'Swimming',   value: 'Flipper-like arms let it swim like a penguin!' },
      { icon: '🦢', label: 'Neck',       value: 'Had a long swan-like neck for catching fish' },
      { icon: '⚡', label: 'Hunting',    value: 'Raptor claws for hunting on land too!' },
      { icon: '📏', label: 'Size',       value: 'About 50cm tall — surprisingly small!' }
    ],
    era: 'Late Cretaceous Period (75–71 million years ago)',
    location: 'Gobi Desert, Mongolia, Asia',
    funFact: 'Scientists discovered Halszkaraptor was amphibious by scanning the fossil with a particle accelerator!',
    xp: 60
  },

  {
    id: 'argentavis',
    name: 'Giant Terror Bird',
    latinName: 'Argentavis magnificens',
    category: 'dinosaur',
    rarity: 'ultra-rare',
    emoji: '🦅',
    gradientFrom: '#2A1A00', gradientTo: '#6A4A00',
    glowColor: 'rgba(220,170,50,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/MEF_Argentavis.jpg/640px-Argentavis_magnificens_by_durbed.jpg',
    continents: ['south-america'],
    description: "Argentavis was the largest bird that EVER FLEW — with wings spanning 7 meters! That\'s wider than a school bus standing on its end! This giant soared over prehistoric Argentina like a living hang-glider, barely flapping its wings for hours. Nothing like it has ever been seen since!",
    features: [
      { icon: '🪶', label: 'Wingspan',   value: '7 meters — widest wingspan of ANY bird EVER!' },
      { icon: '⚖️', label: 'Weight',     value: '70–80 kg — as heavy as a large person!' },
      { icon: '🌬️', label: 'Flying',    value: 'Soared on thermals like a modern condor' },
      { icon: '🦅', label: 'Beak',      value: 'Hooked beak 50cm long — could bite heads off!' }
    ],
    era: 'Late Miocene (6–8 million years ago)',
    location: 'Patagonia & Pampas, Argentina, South America',
    funFact: 'Argentavis could barely take off from the ground — it had to run downhill or launch from cliffs!',
    xp: 100
  },

  {
    id: 'quetzalcoatlus',
    name: 'Sky Giant',
    latinName: 'Quetzalcoatlus northropi',
    category: 'dinosaur',
    rarity: 'ultra-rare',
    emoji: '🦅',
    gradientFrom: '#1A0A2A', gradientTo: '#4A2A7A',
    glowColor: 'rgba(180,120,240,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Quetzalcoatlus_northropi.jpg/640px-Quetzalcoatlus_northropi_model.jpg',
    continents: ['north-america'],
    description: "Quetzalcoatlus was as tall as a GIRAFFE when standing — and it could FLY! The largest flying animal of all time, this pterosaur had a wingspan the size of a small airplane. It could fly at 130 km/h for days at a time! Imagine a flying giraffe — TERRIFYING!",
    features: [
      { icon: '🪶', label: 'Wingspan',   value: '10–11 meters — size of a small airplane!' },
      { icon: '🦒', label: 'Height',     value: 'As tall as a giraffe when standing on ground!' },
      { icon: '✈️', label: 'Speed',      value: 'Could fly at 130 km/h for thousands of km!' },
      { icon: '🧠', label: 'Launch',     value: 'Pole-vaulted into the air using its wings!' }
    ],
    era: 'Late Cretaceous Period (68–66 million years ago)',
    location: 'Texas, USA — Big Bend National Park',
    funFact: 'Quetzalcoatlus could fly across the Atlantic Ocean in a single journey without stopping!',
    xp: 100
  },

  {
    id: 'pteranodon',
    name: 'Pteranodon',
    latinName: 'Pteranodon longiceps',
    category: 'dinosaur',
    rarity: 'common',
    emoji: '🦅',
    gradientFrom: '#0A1A3A', gradientTo: '#1A3A6A',
    glowColor: 'rgba(80,130,220,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Pteranodon_longiceps.jpg/640px-Pteranodon_longiceps.jpg',
    continents: ['north-america'],
    description: "Pteranodon means \'toothless flyer\' — and despite what movies show, it was NOT a dinosaur! It was a flying reptile called a pterosaur. It probably scooped fish from the sea like a giant pelican, using its impressive head crest to steer through the air like a rudder!",
    features: [
      { icon: '🪶', label: 'Wingspan',   value: '6 meters — bigger than any bird alive today!' },
      { icon: '🦷', label: 'No Teeth',   value: 'Had NO teeth — Pteranodon means toothless flyer!' },
      { icon: '🎭', label: 'Head Crest', value: 'Dramatic head crest used for steering in flight!' },
      { icon: '🐟', label: 'Food',       value: 'Scooped fish from the sea like a giant pelican!' }
    ],
    era: 'Late Cretaceous Period (86–84 million years ago)',
    location: 'Kansas, Nebraska, Wyoming — inland sea of USA',
    funFact: 'Pteranodon wasn\'t a dinosaur at all! It was a flying reptile — as different from dinos as bats are from eagles!',
    xp: 30
  },

  // ======================================================
  // 🌿 ANCIENT PLANTS (10)
  // ======================================================

  {
    id: 'cycad',
    name: 'Cycad Palm',
    latinName: 'Cycas revoluta',
    category: 'plant',
    rarity: 'common',
    emoji: '🌴',
    gradientFrom: '#0F2A05', gradientTo: '#285A10',
    glowColor: 'rgba(140,210,80,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cycas_revoluta_-_1.jpg/640px-Cycas_revoluta_in_Hackney.jpg',
    continents: ['asia', 'africa', 'australia'],
    description: "Cycads are the ultimate living fossils — they look EXACTLY the same as they did 280 million years ago when the first dinosaurs were just evolving! You might even have one in your neighbourhood garden today — a real dinosaur-era plant hiding in plain sight!",
    features: [
      { icon: '⏳', label: 'Unchanged For', value: '280 million years — dinosaur design!' },
      { icon: '🦕', label: 'Dino Snack',    value: 'Stegosaurus & other dinos munched on these!' },
      { icon: '📍', label: 'Found In',       value: 'Tropical & subtropical regions worldwide' },
      { icon: '⚠️', label: 'Danger!',        value: 'Seeds are HIGHLY TOXIC to modern animals!' }
    ],
    era: 'Permian Period to Present (280 million years ago)',
    location: 'Tropics worldwide — still very much alive today!',
    funFact: 'Cycads are one of the very few plants to survive ALL known mass extinctions on Earth!',
    xp: 30
  },

  {
    id: 'horsetail',
    name: 'Giant Horsetail',
    latinName: 'Calamites sp.',
    category: 'plant',
    rarity: 'common',
    emoji: '🎋',
    gradientFrom: '#0A3010', gradientTo: '#1A6025',
    glowColor: 'rgba(80,180,80,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Equisetum_hyemale.jpg/640px-Equisetum_hyemale.jpg',
    continents: ['europe', 'north-america'],
    description: "Ancient horsetails were skyscrapers of the plant kingdom — growing 30 meters tall! Today\'s horsetails are tiny weeds, but their ancient ancestors formed vast swamp forests that eventually became the coal we mine and burn today. They shrunk 99% from their former glory!",
    features: [
      { icon: '📏', label: 'Ancient Height', value: '30 meters — as tall as a 10-story building!' },
      { icon: '🌿', label: 'Today\'s Size',  value: 'Modern descendants are only 1–1.5 meters' },
      { icon: '🏭', label: 'Their Legacy',   value: 'Their remains formed today\'s coal deposits!' },
      { icon: '🌊', label: 'Habitat',        value: 'Vast swampy, waterlogged ancient forests' }
    ],
    era: 'Carboniferous Period (359–299 million years ago)',
    location: 'Europe and North America (coal-belt regions)',
    funFact: 'The coal that powers electric grids today was once a giant horsetail forest!',
    xp: 30
  },

  {
    id: 'ginkgo',
    name: 'Ginkgo Tree',
    latinName: 'Ginkgo biloba',
    category: 'plant',
    rarity: 'rare',
    emoji: '🍂',
    gradientFrom: '#3A2800', gradientTo: '#7A5500',
    glowColor: 'rgba(230,185,50,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ginkgo_biloba_010.JPG/640px-Ginkgo_biloba_in_late_autumn.jpg',
    continents: ['asia'],
    description: "The Ginkgo is possibly the toughest plant to ever exist — scientists call it a \'living fossil\'! Unchanged for 200 million years, it outlived the dinosaurs, multiple ice ages, AND survived an atomic bomb blast! It\'s basically a plant superhero!",
    features: [
      { icon: '⏳', label: 'Unchanged For',   value: '200 million years — survived the dinos!' },
      { icon: '☢️', label: 'Atomic Survivor', value: 'Survived the 1945 Hiroshima bomb!' },
      { icon: '🧠', label: 'Medicine',        value: 'Used in brain health medicines worldwide' },
      { icon: '🍃', label: 'Unique Leaves',   value: 'Fan-shaped leaves on NO other tree!' }
    ],
    era: 'Triassic Period to Present (200 million years ago)',
    location: 'Originally from China — now planted worldwide',
    funFact: 'Six Ginkgo trees in Hiroshima survived the 1945 atomic bomb and are STILL ALIVE today!',
    xp: 60
  },

  {
    id: 'araucaria',
    name: 'Monkey Puzzle Tree',
    latinName: 'Araucaria araucana',
    category: 'plant',
    rarity: 'rare',
    emoji: '🌲',
    gradientFrom: '#0A2A10', gradientTo: '#155A28',
    glowColor: 'rgba(60,180,100,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Araucaria_araucana.jpg/640px-Araucaria_araucana_09.jpg',
    continents: ['south-america'],
    description: "The Monkey Puzzle Tree got its legendary nickname because even a monkey would struggle to climb its razor-sharp, scaly branches! Long-necked dinosaurs like Brachiosaurus feasted on its huge, nutritious seeds. Some alive today are over 1,000 years old!",
    features: [
      { icon: '⏳', label: 'Ancient Age',  value: '200 million years old!' },
      { icon: '📏', label: 'Height',       value: 'Can reach 50 meters into the sky!' },
      { icon: '🦕', label: 'Dino Buffet',  value: 'Long-neck dinos feasted on its branches!' },
      { icon: '🛡️', label: 'Self Defence', value: 'Razor-sharp scale-like leaves deter predators!' }
    ],
    era: 'Triassic Period to Present (200 million years ago)',
    location: 'Patagonia, Argentina & Chile, South America',
    funFact: 'Some living Monkey Puzzle trees today were already ancient saplings in medieval times!',
    xp: 60
  },

  {
    id: 'club_moss',
    name: 'Giant Club Moss',
    latinName: 'Lepidodendron sp.',
    category: 'plant',
    rarity: 'ultra-rare',
    emoji: '🌵',
    gradientFrom: '#08083A', gradientTo: '#20208A',
    glowColor: 'rgba(140,90,255,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Lepidodendron_aculeatum.jpg/640px-Lepidodendron_aculeatum.jpg',
    continents: ['europe', 'north-america'],
    description: "Giant Club Mosses were 16-story skyscrapers of prehistoric forests — 50 meters tall with gorgeous diamond-pattern bark! They ruled the Earth for millions of years before flowering plants existed. Now completely EXTINCT, leaving only tiny 30cm descendants!",
    features: [
      { icon: '📏', label: 'Height',         value: 'Up to 50 meters — like a 16-story building!' },
      { icon: '🌳', label: 'Unique Bark',    value: 'Beautiful diamond-pattern bark!' },
      { icon: '🌿', label: 'Tiny Relatives', value: 'Modern descendants are tiny 30cm plants' },
      { icon: '⚡', label: 'Coal Legacy',    value: 'Their remains formed enormous coal deposits!' }
    ],
    era: 'Carboniferous Period (359–299 million years ago)',
    location: 'European coal swamps (now extinct globally)',
    funFact: 'Ancient Club Moss forests had 35% more oxygen than today — insects grew ENORMOUS because of it!',
    xp: 100
  },

  {
    id: 'scale_tree',
    name: 'Scale Tree Fossil',
    latinName: 'Lepidodendron aculeatum',
    category: 'plant',
    rarity: 'common',
    emoji: '🌲',
    gradientFrom: '#1A1A0A', gradientTo: '#3A3A1A',
    glowColor: 'rgba(180,170,80,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lepidodendron_reconstrucción.jpg/640px-Lepidodendron_trunk.jpg',
    continents: ['europe', 'north-america', 'asia'],
    description: "The Scale Tree is famous for its stunning diamond-patterned bark — each diamond mark is where a leaf once attached! Fossilised Scale Tree stumps are sometimes found standing UPRIGHT in coal mines, still rooted where they stood 300 million years ago! Like finding Pompeii but for trees!",
    features: [
      { icon: '💎', label: 'Bark Pattern', value: 'Stunning diamond-leaf-scar patterns on bark!' },
      { icon: '🌍', label: 'Found As',     value: 'Upright fossilised stumps in coal mines!' },
      { icon: '📍', label: 'Found In',     value: 'Coal mines across Europe, Asia & America' },
      { icon: '⏳', label: 'Age',          value: '300+ million years old' }
    ],
    era: 'Carboniferous Period (359–299 million years ago)',
    location: 'Coal mines of Europe, North America & Asia',
    funFact: 'Scale Tree stumps found standing upright in mines show us entire ancient forests exactly as they stood!',
    xp: 30
  },

  {
    id: 'glossopteris',
    name: 'Gondwana Leaf',
    latinName: 'Glossopteris sp.',
    category: 'plant',
    rarity: 'rare',
    emoji: '🍃',
    gradientFrom: '#0A2A1A', gradientTo: '#1A5A3A',
    glowColor: 'rgba(80,200,140,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Glossopteris_sp.,_seed_ferns,_Permian_-_Triassic_-_Houston_Museum_of_Natural_Science_-_DSC01765.JPG/640px-Glossopteris_browniana.jpg',
    continents: ['south-america', 'africa', 'australia', 'antarctica'],
    description: "Glossopteris was the plant that helped prove that CONTINENTS MOVE! The same Glossopteris fossils were found in India, Australia, South America, Africa AND Antarctica — proving these landmasses were once all joined in a giant supercontinent called GONDWANA! One leaf, five continents!",
    features: [
      { icon: '🌍', label: 'Found In',    value: 'India, Africa, Australia, S. America, Antarctica!' },
      { icon: '🔬', label: 'Discovery',   value: 'Proved the theory of continental drift!' },
      { icon: '🌿', label: 'Appearance',  value: 'Tongue-shaped glossy leaves with veins' },
      { icon: '🌡️', label: 'Climate',    value: 'Grew in cold climates near the South Pole' }
    ],
    era: 'Permian Period (299–252 million years ago)',
    location: 'India, Australia, South America, Africa, Antarctica',
    funFact: 'Finding Glossopteris in Antarctica proved to scientists that it was once a warm, forested land!',
    xp: 60
  },

  {
    id: 'prototaxites',
    name: 'Mystery Giant Fungus',
    latinName: 'Prototaxites loganii',
    category: 'plant',
    rarity: 'ultra-rare',
    emoji: '🍄',
    gradientFrom: '#2A0A1A', gradientTo: '#5A1A3A',
    glowColor: 'rgba(200,100,180,0.55)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Prototaxites_apex.jpg/640px-Prototaxites_restoration.jpg',
    continents: ['north-america', 'europe', 'africa'],
    description: "Prototaxites is one of the BIGGEST mysteries in all of paleontology! This organism grew up to 8 meters tall — taller than a 2-story house — but scientists STILL don\'t know if it was a fungus, a lichen, or something completely unknown to science! It was the tallest thing on land before trees existed!",
    features: [
      { icon: '📏', label: 'Height',     value: '8 meters tall — when nothing else was that big!' },
      { icon: '❓', label: 'Mystery',    value: 'Scientists STILL don\'t know what it really was!' },
      { icon: '⏳', label: 'Age',        value: '420 million years old — before trees existed!' },
      { icon: '🌍', label: 'Found On',   value: 'Every continent except Antarctica!' }
    ],
    era: 'Silurian to Devonian Period (420–350 million years ago)',
    location: 'North America, Europe, Middle East, Saudi Arabia',
    funFact: 'Prototaxites was the tallest known living thing on land for over 40 million years!',
    xp: 100
  },

  {
    id: 'welwitschia',
    name: 'Desert Survivor',
    latinName: 'Welwitschiophyllum',
    category: 'plant',
    rarity: 'rare',
    emoji: '🌵',
    gradientFrom: '#3A2A00', gradientTo: '#6A5000',
    glowColor: 'rgba(200,170,60,0.45)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Welwitschia_mirabilis.jpg/640px-Welwitschia_mirabilis.jpg',
    continents: ['africa'],
    description: "The ancient relative of today\'s weirdest-looking plant! Modern Welwitschia in Namibia grows only TWO leaves in its ENTIRE LIFETIME — and they keep growing forever, shredding in the desert wind. Some living Welwitschia plants are over 1,500 years old and have never grown a third leaf!",
    features: [
      { icon: '🍃', label: 'Leaves',      value: 'Grows exactly 2 leaves — FOREVER!' },
      { icon: '⏳', label: 'Lifespan',    value: 'Can live over 1,500 years!' },
      { icon: '🏜️', label: 'Survival',    value: 'Survives on coastal fog — no rain needed!' },
      { icon: '🌵', label: 'Size',        value: 'Leaves can grow 4+ meters long over centuries' }
    ],
    era: 'Jurassic Period to Present (200 million years ago)',
    location: 'Namib Desert, Namibia & Angola, Africa',
    funFact: 'A Welwitschia in Namibia is officially the oldest living plant individual on Earth — 1,500+ years old!',
    xp: 60
  },

  {
    id: 'sphenophyllum',
    name: 'Wedge Leaf',
    latinName: 'Sphenophyllum emarginatum',
    category: 'plant',
    rarity: 'common',
    emoji: '🍀',
    gradientFrom: '#0A2A0A', gradientTo: '#1A5A1A',
    glowColor: 'rgba(100,200,100,0.4)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Sphenophyllum_miravallis.jpg/640px-Sphenophyllum_emarginatum.jpg',
    continents: ['europe', 'north-america'],
    description: "Sphenophyllum was a small climbing plant that scrambled up the giant trunks of ancient trees! Its beautiful wedge-shaped leaves arranged in perfect star patterns are preserved in stunning detail in coal deposits. It\'s like finding a perfect pressed flower from 300 million years ago!",
    features: [
      { icon: '🌿', label: 'Leaf Shape',  value: 'Beautiful wedge-shaped leaves in star patterns!' },
      { icon: '🌿', label: 'Growth',      value: 'Climbing plant that grew up ancient tree trunks' },
      { icon: '💎', label: 'Preservation', value: 'Preserved in beautiful detail in coal beds' },
      { icon: '📏', label: 'Size',         value: 'Grew up to 1 meter long, climbing higher' }
    ],
    era: 'Carboniferous Period (359–299 million years ago)',
    location: 'Europe and North America (coal-belt regions)',
    funFact: 'Sphenophyllum fossils are so beautifully preserved that every tiny leaf vein is visible!',
    xp: 30
  }
];

/* ================================================================
   ACHIEVEMENTS — updated for 34 specimens
   ================================================================ */
const FOSSIL_IDS   = ['ammonite','trilobite','megalodon','fern_fossil','sabertooth_skull','mastodon','dippy','tullimonstrum','coprolite'];
const DINO_IDS     = ['trex','triceratops','brachiosaurus','velociraptor','stegosaurus','spinosaurus','allosaurus','iguanodon','therizinosaurus','giganotosaurus','mosasaurus','halszkaraptor','argentavis','quetzalcoatlus','pteranodon'];
const PLANT_IDS    = ['cycad','horsetail','ginkgo','araucaria','club_moss','scale_tree','glossopteris','prototaxites','welwitschia','sphenophyllum'];
const TOTAL        = FOSSIL_IDS.length + DINO_IDS.length + PLANT_IDS.length; // 34

const ACHIEVEMENTS = [
  {
    id: 'first_catch',
    name: 'First Hunter!',
    description: 'Caught your very first specimen',
    emoji: '🎯',
    condition: (c) => c.length >= 1
  },
  {
    id: 'rare_hunter',
    name: 'Rare Hunter',
    description: 'Caught a rare specimen',
    emoji: '💎',
    condition: (c) => c.some(id => { const s = SPECIMENS.find(sp => sp.id === id); return s && s.rarity === 'rare'; })
  },
  {
    id: 'ultra_hunter',
    name: 'Ultra Rare Hunter!',
    description: 'Caught an ultra rare specimen!',
    emoji: '⭐',
    condition: (c) => c.some(id => { const s = SPECIMENS.find(sp => sp.id === id); return s && s.rarity === 'ultra-rare'; })
  },
  {
    id: 'fossil_collector',
    name: 'Fossil Finder',
    description: `Collected all ${FOSSIL_IDS.length} fossils!`,
    emoji: '🦴',
    condition: (c) => FOSSIL_IDS.every(id => c.includes(id))
  },
  {
    id: 'dino_master',
    name: 'Dino Master!',
    description: `Caught all ${DINO_IDS.length} dinosaurs!`,
    emoji: '🦖',
    condition: (c) => DINO_IDS.every(id => c.includes(id))
  },
  {
    id: 'plant_whisperer',
    name: 'Plant Whisperer',
    description: `Harvested all ${PLANT_IDS.length} ancient plants!`,
    emoji: '🌿',
    condition: (c) => PLANT_IDS.every(id => c.includes(id))
  },
  {
    id: 'halfway',
    name: 'Halfway There!',
    description: `Collected ${Math.ceil(TOTAL/2)}+ specimens`,
    emoji: '🏃',
    condition: (c) => c.length >= Math.ceil(TOTAL / 2)
  },
  {
    id: 'museum_legend',
    name: 'Museum Legend!',
    description: `Caught ALL ${TOTAL} specimens!`,
    emoji: '👑',
    condition: (c) => c.length >= TOTAL
  }
];

/* ================================================================
   AVATARS & RANKS
   ================================================================ */
const AVATARS = ['🧒', '👧', '🧒🏽', '👧🏽', '🧒🏿', '👧🏿', '🧒🏻', '👧🏻'];

const RANKS = [
  { name: 'Rookie Explorer',  minXP: 0,   color: '#A8E063' },
  { name: 'Field Researcher', minXP: 100, color: '#4ECDC4' },
  { name: 'Fossil Hunter',    minXP: 300, color: '#F5A623' },
  { name: 'Dino Expert',      minXP: 600, color: '#FF6B6B' },
  { name: 'Museum Legend',    minXP: 1000, color: '#C678DD' }
];
