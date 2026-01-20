import type { RecipeI } from "@/interfaces";

export const data: Partial<RecipeI>[] = [
  // Apéro
  {
    title: "Bruschetta tomate basilic",
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Pain grillé garni de tomates fraîches, basilic et huile d'olive. L'apéritif italien par excellence.",
    category: "Apéro",
  },
  {
    title: "Mini quiches lardons",
    image:
      "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Petites quiches moelleuses aux lardons fumés et fromage, parfaites pour l'apéritif.",
    category: "Apéro",
  },
  {
    title: "Verrines avocat crevettes",
    image:
      "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Élégantes verrines fraîches associant avocat crémeux et crevettes roses.",
    category: "Apéro",
  },

  // Entrées
  {
    title: "Salade César",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Salade romaine croquante, poulet grillé, parmesan et sa fameuse sauce César maison.",
    category: "Entrées",
  },
  {
    title: "Soupe à l'oignon gratinée",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Soupe d'oignons caramélisés gratinée au fromage, réconfortante et savoureuse.",
    category: "Entrées",
  },
  {
    title: "Carpaccio de bœuf",
    image:
      "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Fines tranches de bœuf cru assaisonnées d'huile d'olive, citron et parmesan.",
    category: "Entrées",
  },

  // Plats
  {
    title: "Risotto aux champignons",
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Riz crémeux aux champignons de Paris et cèpes, relevé de parmesan râpé.",
    category: "Plats",
  },
  {
    title: "Saumon grillé sauce citronnée",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Pavé de saumon grillé accompagné de légumes de saison et sauce au citron.",
    category: "Plats",
  },
  {
    title: "Lasagnes bolognaise",
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Lasagnes traditionnelles à la viande et béchamel, gratinées au four.",
    category: "Plats",
  },
  {
    title: "Poulet rôti aux herbes",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Poulet entier rôti croustillant, parfumé au thym, romarin et ail.",
    category: "Plats",
  },

  // Desserts
  {
    title: "Tarte au citron meringuée",
    image:
      "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Tarte acidulée au citron surmontée d'une meringue légère et dorée.",
    category: "Desserts",
  },
  {
    title: "Fondant au chocolat",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Gâteau au chocolat au cœur coulant, un pur délice pour les amateurs de chocolat.",
    category: "Desserts",
  },
  {
    title: "Tiramisu classique",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Dessert italien aux biscuits imbibés de café et mascarpone crémeux.",
    category: "Desserts",
  },
  {
    title: "Crème brûlée vanille",
    image:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Crème onctueuse à la vanille surmontée d'un caramel croustillant.",
    category: "Desserts",
  },

  // Boissons
  {
    title: "Smoothie fruits rouges",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Smoothie vitaminé aux fraises, framboises et myrtilles, légèrement sucré.",
    category: "Boissons",
  },
  {
    title: "Chocolat chaud maison",
    image:
      "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Chocolat chaud onctueux au vrai chocolat noir, surmonté de chantilly.",
    category: "Boissons",
  },
  {
    title: "Mojito virgin",
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Cocktail sans alcool à la menthe fraîche, citron vert et eau gazeuse.",
    category: "Boissons",
  },

  // Brunch & Petit Déj
  {
    title: "Pancakes moelleux",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Pancakes américains ultra moelleux servis avec sirop d'érable et fruits frais.",
    category: "Brunch & Petit Déj",
  },
  {
    title: "Avocado toast saumon fumé",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=700&fit=crop",
    liked: true,
    description:
      "Toast complet garni d'avocat écrasé et tranches de saumon fumé.",
    category: "Brunch & Petit Déj",
  },
  {
    title: "Œufs brouillés crémeux",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&h=700&fit=crop",
    liked: false,
    description:
      "Œufs brouillés à la française, crémeux et fondants, avec une touche de crème fraîche.",
    category: "Brunch & Petit Déj",
  },
  {
    title: "Granola bowl fruits frais",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&h=700&fit=crop",
    liked: true,
    description: "Bol de granola maison, yaourt grec, fruits frais et miel.",
    category: "Brunch & Petit Déj",
  },
];
