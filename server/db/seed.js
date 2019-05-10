const faker = require('faker');

// console.log("faker in seed.js", faker.lorem.paragraph());
console.log('faker in seed.js', faker.random.number(1, 5));

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateReviews = () => {
  const reviews = [];
  const fakeReview = () => {
    return {
      rating: getRandomNum(2, 5),
      review: faker.lorem.paragraph(),
      productId: getRandomNum(1, 24),
      userId: getRandomNum(1, 5),
    };
  };
  for (let i = 0; i < 100; i++) {
    reviews.push(fakeReview());
  }
  return reviews;
};

const seedReviews = generateReviews();

// {
//   rating: 5,
//   review:
//     "If you are comfortable with Pilates and using a Reformer solo, this machine is great given the price point. Every time I look at it, I fall in love. I subscribe to the website Pilates Anytime and do rigorous workouts. Their are some advanced moves you will be unable to do (like Snake) but you won't feel like you are missing out on performing different positions. After paying $110 for private sessions for years, buying this Reformer made complete sense. Very happy with this purchase.",
//   productId: 3,
//   userId: 1
// }

const seedCategories = [
  { name: 'Accessories', color: '#eaeb4e' },
  { name: 'Boxing', color: '#9161e8' },
  { name: 'Cardio', color: '#7cc245' },
  { name: 'Pilates', color: '#91c7f9' },
  { name: 'Free weights', color: '#01A4A4' },
  { name: 'Smart fitness', color: '#ee2a82' },
  { name: 'Yoga', color: '#f46854' },
  { name: 'Resistance', color: '#00A1CB' },
];

const seedUsers = [
  {
    username: 'JaneD',
    firstname: 'Jane',
    lastname: 'DiMagio',
    email: 'jane@email.com',
    password: '12345',
    creditcard: '1234 5678 9012 3456',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  },
  {
    username: 'JoeD',
    firstname: 'Joe',
    lastname: 'DiMagio',
    email: 'joe@email.com',
    password: '12345',
    creditcard: '1234 5678 9012 3456',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  },
  {
    username: 'owner',
    firstname: 'Preston',
    lastname: 'Chaplin',
    email: 'owner@email.com',
    password: '54321',
    isAdmin: true,
    creditcard: '1234 5678 9012 3456',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  },
  {
    username: 'Jim',
    firstname: 'Jim',
    lastname: 'Dartanian',
    email: 'jim@email.com',
    password: '12345',
    creditcard: '1234 5678 9012 3456',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  },
  {
    username: 'Bob',
    firstname: 'Bob',
    lastname: 'Expialidocious',
    email: 'bob@email.com',
    password: '12345',
    creditcard: '1234 5678 9012 3456',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  },
];

const seedOrders = [
  {
    userId: 1,
    status: 'pending',
  },
  {
    userId: 1,
    status: 'purchased',
  },
  {
    userId: 2,
    status: 'cancelled',
  },
  {
    userId: 2,
    status: 'shipped',
  },
];

const seedLineItems = [
  {
    quantity: 3,
    productId: 12,
    orderPrice: 32.95,
    netTotalCost: 32.95,
    orderId: 1,
  },
  {
    quantity: 1,
    productId: 19,
    orderPrice: 332.94,
    discount: -30,
    netTotalCost: 302.94,
    orderId: 1,
  },
  {
    quantity: 1,
    productId: 24,
    orderPrice: 38.07,
    netTotalCost: 38.07,
    orderId: 1,
  },
  {
    quantity: 2,
    productId: 3,
    orderPrice: 9.99,
    netTotalCost: 9.99,
    orderId: 2,
  },
  {
    quantity: 4,
    productId: 6,
    orderPrice: 14.99,
    netTotalCost: 14.99,
    orderId: 2,
  },
  {
    quantity: 1,
    productId: 11,
    orderPrice: 945,
    discount: -50,
    netTotalCost: 895,
    orderId: 3,
  },
  {
    quantity: 1,
    productId: 20,
    orderPrice: 79,
    netTotalCost: 79,
    orderId: 4,
  },
];

const seedProducts = [
  {
    title: 'Gaiam Coreplus Reformer',
    categoryId: 4,
    price: 29.98,
    quantity: 3,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71L%2BsG45SeL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71L%2BsG45SeL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61gEkerHsHL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51lu7mZTG0L._SX679_.jpg',
    ],
    description:
      'Coreplus reformer resistance band with four loops and comfort-cushion grips. Full length 45-Minute coreplus reformer workout DVD',
  },
  {
    title: 'Stamina AeroPilates Pro Reformer',
    categoryId: 4,
    price: 750.0,
    quantity: 3,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71W1iUr5-lL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71W1iUr5-lL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/712LT01XP1L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71F9tMtyLeL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81Vs0Vm%2BZhL._SX679_.jpg',
    ],
    description:
      'Adjustable resistance with 4 heavy-duty, elastic bungee cords. Elevated built in silver steel frame raised 15 off the floor with oak wood trim. Padded, flared black platform (23.5 wide); Longer (5) aluminum rails with ball bearing wheels; Larger silver Cardio Rebounder. Flared, padded, wider, removable and adjustable foot bar with 3 positions; High density foam shoulder pads; Padded, 3-position adjustable head rest; Comfortable hand & foot straps 2 DVD with 3 Workouts: Introduction to AeroPilates, AeroPilates Level 1 Pure Pilates and AeroPilates Level 1 Simply Cardio. AeroPilates full-color workout wall chart; Supports up to 300 lbs',
  },
  {
    title: 'Shock Doctor Mouthguard',
    categoryId: 2,
    price: 9.99,
    quantity: 31,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41FyBzAF74L.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/41FyBzAF74L.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/41ianPQq3PL.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81b%2Bo6fCPdL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61%2BrNG5jeYL._SX679_.jpg',
    ],
    description:
      'CUSTOM COMFORT & FIT - Gel-fit Liner Technology is easy to fit, silicone mold forms specifically to your teeth and gums, providing a comfortable fit for extended use, available in a variety of customized colors. BREATHABLE - Integrated breathing channels make it easy to breathe while wearing the guard and maximize your performance. PROFESSIONAL DENTAL PROTECTION - Heavy duty Exoskeletal Shock Frame provides full mouth protection during the hardest impacts, protects cheek and tongue, teeth grinding, and secures teeth in place. DURABLE - Crafted using heavy duty silicone, combined in our Triple Layer Design for added protection and durability. RECOMMENDED SPORTS - Suitable for all contact sports where a mouth guard is required or recommended including football, wrestling, boxing, and more! Includes a detachable helmet strap for football.',
  },
  {
    title: 'Everlast 40LB Heavy Bag',
    categoryId: 2,
    price: 49.99,
    quantity: 19,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51DjJL-Z%2BiL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/51DjJL-Z%2BiL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51DjJL-Z%2BiL._SX679_.jpg',
    ],
    description:
      'Premium synthetic leather with reinforced webbing provides long lasting durability. Specially blended filler mix of sanitized synthetic and natural. Fibers provides resilient shock absorbency. Heavy duty nylon straps provide security and safety. Double end loop provides increased functionality.',
  },
  {
    title: 'Everlast Pro Training Gloves',
    categoryId: 2,
    price: 86.73,
    quantity: 12,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/912sbqRH%2BWL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/912sbqRH%2BWL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/912sbqRH%2BWL._SX679_.jpg',
    ],
    description:
      'Patented Thumb-Lok feature, Premium synthetic leather along with superior construction increases durability, Natural shape conforms to hand. Everfresh treatment helps prevent offensive odors, keeping your products smelling fresh, Full mesh palm ensures breathability and comfort. Improved curved anatomical grip and fit. Ideal for sparring, heavy bag workouts, and mitt work. Wrap-around hook and loop strap closure. Available in 12- or 14-ounce weight sizes. Patented Thumb-Lok feature. Natural shape conforms to hand.',
  },
  {
    title: 'Gaiam Yoga Block',
    categoryId: 7,
    price: 14.99,
    quantity: 27,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71SOPMLXfIL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71SOPMLXfIL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/814SliU7MpL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81xwu3-Cd3L._SX679_.jpg',
    ],
    description:
      'High-density cushion, joint protection, unmatched support. Standard: 7.5 lbs; 71 x 26; 6 mm thick. Long: 9.5 lbs; 85 x 26. To Store, Roll Manduka PRO mats with the top side (-finish) facing outwards. To Break In, the surface texture of Manduka PRO mats improves with use. The best way to break in your mat is practice, practice, practice. To Keep your mat in the best condition by wiping it down after every practice with Manduka All-Purpose Mat Wash. Its specially formulated to clean your mat without damaging the surface. Closed-cell surface prevents sweat from seeping into the mat. Non-toxic, emissions-free manufacturing, 100% latex free.',
  },
  {
    title: 'Manduka PRO Yoga Mat',
    categoryId: 7,
    price: 90.0,
    quantity: 7,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91KT6PEnEWL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/91KT6PEnEWL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71HmY5EUU4L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81v2x8IEw2L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71HBtDEAgEL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51b2tHlKJAL._SX679_.jpg',
    ],
    description:
      'High-density cushion, joint protection, unmatched support. Standard: 7.5 lbs; 71 x 26; 6 mm thick. Long: 9.5 lbs; 85 x 26. To Store, Roll Manduka PRO mats with the top side (-finish) facing outwards. To Break In, the surface texture of Manduka PRO mats improves with use. The best way to break in your mat is practice, practice, practice. To Keep your mat in the best condition by wiping it down after every practice with Manduka All-Purpose Mat Wash. Its specially formulated to clean your mat without damaging the surface. Closed-cell surface prevents sweat from seeping into the mat. Non-toxic, emissions-free manufacturing, 100% latex free.',
  },
  {
    title: 'Bowflex Weight Bench',
    categoryId: 8,
    price: 229.0,
    quantity: 10,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/8104o354qFL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/8104o354qFL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81Iv-eToHlL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81BNZzzBPVL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71BU4RkeisL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81PrWJR62dL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81khCNW9h7L._SX679_.jpg',
    ],
    description:
      'The Bowflex 5.1S Stowable Bench is our top of the line weight bench. Adjusts to six different positions, 17-degree decline to 90-degree incline. Folds up and wheels away for easy storage .Comes standard with a removable leg hold-down brace for added decline position support. Built strong to last long with heavy-duty commercial quality steel. 600-pound load capacity.',
  },
  {
    title: 'Cap 10-Pound Dumbbell',
    categoryId: 5,
    price: 13.99,
    quantity: 10,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/8122KMrWLQL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/8122KMrWLQL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/714qipG8QCL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71SEwLP9veL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81MUb6wiXlL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81vqGn30bTL._SX679_.jpg',
    ],
    description:
      'VERSATILE - Dumbbells offer the ability to target specific muscle groups or attain a full body workout. CONSTRUCTION - Heads are made from ASTM A48 Class 20 grey iron coated in a proprietary 90 shore hardness urethane joined together by a solid 1018 cold rolled steel chromed handle. FEATURES – Original Hex Shaped heads prevent rolling. The medium depth knurling on the urethane infused gripping surface on the ergo handle provides essential grip and security during use. Urethane coating is extremely durable. No odor or greasy feel. FUNCTIONAL - Perfect for isos, full body, functional training and HIIT workouts. CHOICES – This dumbbell group from CAP is available in sizes from 5 - 50 lb in 5 lb increments. Sold individually.',
  },
  {
    title: 'Fitbit Ionic Watch',
    categoryId: 6,
    price: 219.99,
    quantity: 2,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81c7bH9KipL._UX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/81c7bH9KipL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71sSyaf-luL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61bqhd8rMZL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61%2BS%2BEWdcXL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71YmPFqbvLL._UX679_.jpg',
    ],
    description:
      'Low impact workout that engages all major muscle groups; work legs, core and arms with a smooth, high calorie-burning motion Track your progress with real-time reliable data; the Performance Monitor 5 (included) self-calibrates for comparable results; connect wirelessly to heart rate belts and apps (not included) Designed to fit most users: 14-inch seat height, adjustable footrests and ergonomic handleSeparates easily into two pieces for storage; caster wheels make it mobile; easy to assemble with only eight screws. Space Recommendations- Assembled- 8 ft x 2 ft (244 cm x 61 cm). For Storage- 25 in x 33 in x 54 in (63.5 cm x 83.8 cm x 137.2 cm) Space recommended for use is 9 x 4 feet; 500-pound user capacity; 5-year frame warranty included.Seat Height:14 inches',
  },
  {
    title: 'Concept2 Indoor Rowing Machine',
    categoryId: 3,
    price: 945.0,
    quantity: 3,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/517wbxG6btL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/517wbxG6btL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/612KA-wPMvL._SL1000_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/618QlI2QaqL._SL1000_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51OSdTLA-5L._SL1000_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51jRUI%2B2y5L._SL1000_.jpg',
    ],
    description:
      'Low impact workout that engages all major muscle groups; work legs, core and arms with a smooth, high calorie-burning motion Track your progress with real-time reliable data; the Performance Monitor 5 (included) self-calibrates for comparable results; connect wirelessly to heart rate belts and apps (not included) Designed to fit most users: 14-inch seat height, adjustable footrests and ergonomic handleSeparates easily into two pieces for storage; caster wheels make it mobile; easy to assemble with only eight screws. Space Recommendations- Assembled- 8 ft x 2 ft (244 cm x 61 cm). For Storage- 25 in x 33 in x 54 in (63.5 cm x 83.8 cm x 137.2 cm) Space recommended for use is 9 x 4 feet; 500-pound user capacity; 5-year frame warranty included.Seat Height:14 inches',
  },
  {
    title: 'TRX Training Slam Ball',
    categoryId: 1,
    price: 32.95,
    quantity: 9,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71Wixfq1e8L._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71Wixfq1e8L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71HxTYmL5fL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61FJ4H6njNL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61cg%2BEWSPvL._SX679_.jpg',
    ],
    description:
      'UNLEASH YOUR POWER: TRX Slam Balls will help you unleash your power! Engage your entire body in a high-intensity TRX Slam Ball workout that builds strength, cardio and explosive power. EASY-GRIP TEXTURED SURFACE: The TRX Slam Ball features a rugged, textured surface that provides easy gripping and helps you keep a sure handle on the Ball during your workout. DURABLE RUBBER SHELL: Designed to survive your toughest workouts, the TRX Slam Ball features a thick, ultra-durable rubber shell that absorbs impact from every core-strengthening dead bounce. MULTIPLE WEIGHT OPTIONS: TRX Slam Balls are sold individually and are available in 6, 8, 10, 15, 20, 25, 30, 40 and 50 lb weights, allowing you to select the right size for your workout or fitness level. All TRX Slam Balls are covered by a one year warranty.',
  },
  {
    title: 'The Step Original Aerobic Platform',
    categoryId: 1,
    price: 27.48,
    quantity: 18,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/717WYFthHPL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/717WYFthHPL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71rjClONtAL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81NadqiKtTL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81JBzhmI0qL._SX679_.jpg',
    ],
    description:
      'Made in the United States from durable, recyclable high-density polyethylene. Includes full-size (43” L x 16” W x 4” H) grey aerobic platform and 4 original black risers. Platform features premium nonslip, comfort cushion top and supports up to 350 lbs. Four nonskid feet on each riser and platform prevents sliding or scratching floors. Vary workout difficulty by adjusting platform height from 4” to 6” to 8” using risers',
  },
  {
    title: 'Battle Exercise Training Rope',
    categoryId: 1,
    price: 74.99,
    quantity: 8,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91U8X%2BYbymL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/91U8X%2BYbymL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/91w1TW23m-L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81kqrxHIdRL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/810FTQM3csL._SX679_.jpg',
    ],
    description:
      '2-inch exercise rope for strength training—works hands, arms, shoulders, back, abs, core, and legs. 3-strand-thick design made of durable polyester blend; high tensile strength prevents breaking, fraying, or coming lose. Can be used for undulation, pulling, or climbing exercises, alone or as part of a team. Rolls up for take-anywhere portability and compact storage. Measures 30 feet long; backed by an AmazonBasics limited one-year warranty',
  },
  {
    title: 'NordicTrack T 6.5 Series',
    categoryId: 3,
    price: 899.0,
    quantity: 1,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/710XQC8XqpL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/710XQC8XqpL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71DtI-GBvOL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61sssp5JoKL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71SWVZU%2BKOL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61yOgrT7owL._SX679_.jpg',
    ],
    description:
      '10" full color capacitive touch display, Includes 1-Year iFit Membership ($396 value). 2.6 chp drive system, walking belt 20 x 55, easy lift assist. Quick speed control 0-10 mph, Quick incline control 0-10%, 20 preset workouts, EKG grip pulse. 300 lb. user capacity, lifetime frame & motor warranty 1 year parts & labor warranty. Please note: NordicTrack is the only manufacturer and amazon is the only authorized seller for this product on this marketplace. We do not guarantee quality, authenticity or size if purchased from other sellers',
  },
  {
    title: 'YOSUDA Stationary Bike',
    categoryId: 3,
    price: 315.45,
    quantity: 6,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61IxYeaw07L._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/61IxYeaw07L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61bczxpe9YL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/713BCoi8lRL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61IergmJwxL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61J6UW-pK4L._SX679_.jpg',
    ],
    description:
      '10" full color capacitive touch display, Includes 1-Year iFit Membership ($396 value). 2.6 chp drive system, walking belt 20 x 55, easy lift assist. Quick speed control 0-10 mph, Quick incline control 0-10%, 20 preset workouts, EKG grip pulse. 300 lb. user capacity, lifetime frame & motor warranty 1 year parts & labor warranty. Please note: NordicTrack is the only manufacturer and amazon is the only authorized seller for this product on this marketplace. We do not guarantee quality, authenticity or size if purchased from other sellers',
  },
  {
    title: 'ProsourceFit Pilates Resistance Ring',
    categoryId: 4,
    price: 13.99,
    quantity: 15,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71L4klnO%2B0L._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71L4klnO%2B0L._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/611sajwcmDL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81mf1iexHxL._SX679_.jpg',
    ],
    description:
      'TOTAL BODY CONDITIONING – Designed to create gentle resistance for a variety of toning exercises for arms, legs & core. IMPROVED FITNESS – Ideal for Pilates and improving balance & posture, strengthening core, increasing flexibility. REHABILITATION - Great for users with diminished capacity or for rehab, as well as beginners to slowly build strength. DURABLE DESIGN - Made out of steel and covered by durable rubber, the 14” ring withstands pressure and heavy use. PADDED HANDLES - Soft foam handles are padded on both the inside and outside of the ring for a comfortable, firm grip',
  },
  {
    title: 'Bowflex SelectTech Dumbbells',
    categoryId: 5,
    price: 299.0,
    quantity: 2,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61gyx32%2BpWL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/61gyx32%2BpWL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81kS2IxhoEL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81OYAT19mYL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81iqQEK-24L._SX679_.jpg',
    ],
    description:
      'Each dumbbell adjusts from 5 to 52.5 pounds; adjusts in 2.5-pound increments up to the first 25 pounds. Lets you rapidly switch from one exercise to the next. Combines 15 sets of weights into one, using a unique dial system. Eliminates the need for multiple dumbbells cluttering your workout space. Two year warranty on weight plates and parts',
  },
  {
    title: 'CAP Barbell Set',
    categoryId: 5,
    price: 332.94,
    quantity: 1,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51lBaIiinyL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/51lBaIiinyL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51gbQjpQtdL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/5137-5nNuQL._SX679_.jpg',
    ],
    description:
      'High Quality Design: Weights stay tight and do not detach, rubber coating will not damage floor or other surfaces. Materials: Solid cast iron, chrome plated handle & rubber coated weights. Versatile: Designed for use with curls, lifts, squats, press, and more. Safe: Flat hexagonal surfaces will prevent rolling and knurled handle prevents slipping. Durable: No maintenance required, long lasting finish prevents rust',
  },
  {
    title: 'Fitbit Ace',
    categoryId: 6,
    price: 79.0,
    quantity: 5,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/710-4aLJ7OL._UX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/710-4aLJ7OL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71Zs5IgD7eL._UX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71tmk0LIWpL._UX679_.jpg',
    ],
    description:
      'Tracks steps, active minutes and sleep and shows stats on a bright, tap display. Rewards kids for hitting goals with celebratory messages and achievement badges. Kids can challenge others to step competitions plus send each other messages or cheers. A showerproof tracker that survives splashes and spills with a secure, adjustable wristband for growing kids (one size). Designed for wrist sizes up to 155 mm/6.10 in. Syncs stats wirelessly and automatically to iOS & Android devices and has a battery life up to 5 days (varies with use and other factors). In the Fitbit app, parents create an account for their child under a family account (family account and parental consent required for children 12 and under',
  },
  {
    title: 'VEFSU BMI Health Monitor',
    categoryId: 6,
    price: 18.12,
    quantity: 45,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51vUbOiqxEL._SX522_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/51vUbOiqxEL._SX522_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61KsPD93M-L._SX522_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51FsxyPSe2L._SX522_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/516XIXuc3IL._SX522_.jpg',
    ],
    description:
      'Tracks steps, active minutes and sleep and shows stats on a bright, tap display. Rewards kids for hitting goals with celebratory messages and achievement badges. Kids can challenge others to step competitions plus send each other messages or cheers. A showerproof tracker that survives splashes and spills with a secure, adjustable wristband for growing kids (one size). Designed for wrist sizes up to 155 mm/6.10 in. Syncs stats wirelessly and automatically to iOS & Android devices and has a battery life up to 5 days (varies with use and other factors). In the Fitbit app, parents create an account for their child under a family account (family account and parental consent required for children 12 and under',
  },
  {
    title: 'BalanceFrom GoYoga',
    categoryId: 7,
    price: 32.19,
    quantity: 16,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61h29aaX2vL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/61h29aaX2vL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61ddQ6%2BrQWL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51HAxR5FAwL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51Fr-g7LA3L.jpg',
    ],
    description:
      'BalanceFrom GoYoga Series 7-piece set includes: 1 yoga mat with carrying strap, 2 yoga blocks, 1 yoga mat towel, 1 yoga hand towel, 1 stretch strap, 1 yoga knee pad. 2 Styles to choose from: set with 1/2 thick mat and set with 1/4 thick mat. 1/2 thick mat dimension: 71 long 24 wide; 1/4 thick mat dimension: 68 long 24 wide. With double sided non-slip surfaces, Both mats come with an excellent slip resistant advantage to prevent injuries. Moisture resistant Technology makes the mat to be easily washed with soap and water. Our 72x24 and 24”x15” yoga towels are made of 100% microfiber and feature prime absorption to provide slip-resistant and sweat-free workouts. 100% machine washable',
  },
  {
    title: 'Yes4All Kettlebell Weights',
    categoryId: 8,
    price: 11.99,
    quantity: 19,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71hoobO8oQL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/71hoobO8oQL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71Nsbu415lL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81bc1cPg5OL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71FhcNhKqhL._SX679_.jpg',
    ],
    description:
      '10 LBS HIGH-QUALITY SOLID CAST IRON KETTLEBELL: Built to last - constructed of solid cast iron with no welds, weak spots, or seams. Great for training indoor & outdoor. BLACK PAINT FINISH: Painted to prevent corrosion and increase durability & give you better grip strength with no slipping in your hand like a glossy finish. WIDE, SMOOTH HANDLE: Smooth, slightly textured handle to provide a comfortable & secure grip for high reps, makes chalk unnecessary for both men & women. FLAT BOTTOM FOR STABILITY: Enable upright storage, ideal for renegade rows, handstands, mounted pistol squats & other exercises requiring a kettlebell with a flat bottom. MOST VERSATILE & FUNCTIONAL FITNESS EQUIPMENT: Used for swings, deadlifts, squats, lifting, get-ups & snatches to workout & increase strength of many muscle groups & body parts including biceps, shoulders, legs, & more',
  },
  {
    title: 'CAP Barbell 2-Inch Olympic Grip Plate',
    categoryId: 8,
    price: 38.07,
    quantity: 3,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91mNqMJBoAL._SX679_.jpg',
    detailImages: [
      'https://images-na.ssl-images-amazon.com/images/I/91mNqMJBoAL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/91-4PArB%2BvL._SX679_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/31qwG6f43zL.jpg',
    ],
    description:
      'CONSTRUCTION – Made of solid cast iron with a machined hole and a durable, black baked enamel finish. These weights have a 2-inch center hole to fit on Olympic bars. FEATURES –Each weight features grip holes to provide a secure grip during use. The baked enamel coating ensures a durable, reliable weight that will last through grueling workouts & the raised numbers help to easily identify weight sizes. VERSATILE – Weight plates can be used to perform muscle strengthening exercises and endurance training, and to increase flexibility and balance. A single weight plate can also be used for warm-up exercises. CHOICES – These weight plates are available in 2.5, 5, 10, 25 and 45 lbs. There are grip holes for each weight size to provide a secure grip when loading and unloading the weights. TRUST– Trust experience. CAP has been a pioneer in the fitness industry for over 30 years with locations worldwide. Chances are, if you have ever worked out before you have used a CAP product.',
  },
];

module.exports = {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
  seedLineItems,
  seedReviews,
};
