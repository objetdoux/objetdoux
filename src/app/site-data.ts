export const images = {
  hero:
    "https://www.figma.com/api/mcp/asset/c21a4082-5ed3-4a7f-a548-47bbb6ae7b28",
  brand:
    "https://www.figma.com/api/mcp/asset/b8ca37a5-6f2d-4eb0-b547-28858f9887ad",
  collectionOne:
    "https://www.figma.com/api/mcp/asset/18a93cde-ad2a-437e-943a-0a10eaa3f0ec",
  collectionTwo:
    "https://www.figma.com/api/mcp/asset/f7dd8253-d2b4-43ce-af2a-78d89c89621c",
  collectionThree:
    "https://www.figma.com/api/mcp/asset/3b201234-4f56-4ecc-8dc9-6d79eb7966fe",
};

export const shopCategories = [
  {
    title: "Plate",
    subtitle: "매일의 식탁을 정돈하는 기본 형태",
    description:
      "가장 자주 손이 가는 접시를 오브제두의 감도로 다시 해석합니다. 담백한 실루엣과 차분한 유약이 중심입니다.",
    image: images.collectionOne,
  },
  {
    title: "Cup",
    subtitle: "차와 커피가 머무는 작은 그릇",
    description:
      "머그와 찻잔은 손에 닿는 감각이 중요합니다. 가볍고 편안한 사용감, 오래 봐도 질리지 않는 균형을 제안합니다.",
    image: images.collectionTwo,
  },
  {
    title: "Bowl",
    subtitle: "한국 식탁에 자연스럽게 어울리는 깊이",
    description:
      "국물, 디저트, 작은 반찬까지 폭넓게 쓰일 수 있도록 깊이와 비율을 세심하게 설계한 시리즈입니다.",
    image: images.collectionThree,
  },
];

export const shopMenu = ["All", "Plate", "Cup", "Bowl", "Tea Ware", "Object"];

export const shopProducts = [
  {
    slug: "lune-plate",
    name: "Lune Plate",
    category: "Plate",
    priceValue: 38000,
    price: "₩38,000",
    description: "식탁 위 기본이 되는 담백한 메인 플레이트",
    summary: "부드러운 곡선과 넓은 면이 특징인 메인 플레이트",
    material: "Ceramic",
    size: "26cm",
  },
  {
    slug: "soft-rim-plate",
    name: "Soft Rim Plate",
    category: "Plate",
    priceValue: 34000,
    price: "₩34,000",
    description: "가벼운 디저트와 브런치에 어울리는 얕은 접시",
    summary: "얕은 깊이와 넓은 림이 조화를 이루는 디저트 플레이트",
    material: "Ceramic",
    size: "21cm",
  },
  {
    slug: "morning-cup",
    name: "Morning Cup",
    category: "Cup",
    priceValue: 29000,
    price: "₩29,000",
    description: "매일 손이 가는 데일리 컵",
    summary: "차분한 비율로 매일 쓰기 좋은 기본 컵",
    material: "Ceramic",
    size: "300ml",
  },
  {
    slug: "calm-mug",
    name: "Calm Mug",
    category: "Cup",
    priceValue: 32000,
    price: "₩32,000",
    description: "차와 커피 모두 편안하게 담아내는 머그",
    summary: "손에 안정감 있게 잡히는 데일리 머그",
    material: "Ceramic",
    size: "350ml",
  },
  {
    slug: "deep-bowl",
    name: "Deep Bowl",
    category: "Bowl",
    priceValue: 36000,
    price: "₩36,000",
    description: "국물과 면 요리에 어울리는 깊은 볼",
    summary: "깊이감이 있어 다양한 한식 메뉴에 어울리는 볼",
    material: "Ceramic",
    size: "18cm",
  },
  {
    slug: "daily-bowl",
    name: "Daily Bowl",
    category: "Bowl",
    priceValue: 28000,
    price: "₩28,000",
    description: "작은 반찬과 디저트를 담기 좋은 기본 볼",
    summary: "작은 음식과 디저트를 담기 좋은 데일리 볼",
    material: "Ceramic",
    size: "14cm",
  },
  {
    slug: "soft-tea-cup",
    name: "Soft Tea Cup",
    category: "Tea Ware",
    priceValue: 31000,
    price: "₩31,000",
    description: "차를 위한 잔잔한 비율의 티컵",
    summary: "부드러운 손잡이와 차분한 실루엣이 특징인 티컵",
    material: "Ceramic",
    size: "220ml",
  },
  {
    slug: "table-tray",
    name: "Table Tray",
    category: "Object",
    priceValue: 42000,
    price: "₩42,000",
    description: "작은 오브제를 정돈하는 세라믹 트레이",
    summary: "식탁과 선반 위를 단정하게 정리하는 트레이",
    material: "Ceramic",
    size: "28cm",
  },
];

export const shopSortOptions = [
  { value: "latest", label: "최신순" },
  { value: "price-high", label: "가격 높은순" },
  { value: "price-low", label: "가격 낮은순" },
  { value: "name", label: "이름순" },
];

export function getProductBySlug(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}

export const magazineArticles = [
  {
    category: "STORY",
    title: "식탁 위에 오래 남는 형태를 고민합니다",
    description:
      "오브제두가 제품을 기획할 때 가장 먼저 보는 것은 트렌드가 아니라, 오래 두고 써도 질리지 않는 균형입니다.",
  },
  {
    category: "MATERIAL",
    title: "유약의 결이 주는 차분한 분위기",
    description:
      "색감이 강하지 않아도 충분히 인상적인 식기를 만들기 위해 표면의 깊이와 미세한 톤 차이를 연구합니다.",
  },
  {
    category: "TABLE",
    title: "한식과 양식 모두에 자연스럽게 어울리도록",
    description:
      "한국의 식탁은 다양한 형태의 음식을 담습니다. 그래서 오브제두는 실사용에 어울리는 비율을 중요하게 생각합니다.",
  },
];

export const ordinaryNotes = [
  {
    title: "아침의 컵",
    description:
      "빠르게 지나가는 하루의 시작을 조금 천천히 만들 수 있는 작은 머그 하나의 역할.",
  },
  {
    title: "혼자 먹는 식사",
    description:
      "혼자 먹는 한 끼도 단정하게 차려질 때, 일상은 생각보다 많이 달라집니다.",
  },
  {
    title: "선물처럼 남는 그릇",
    description:
      "좋은 식기는 쓰는 사람의 취향을 보여주면서도 오래 함께 남는 물건이 됩니다.",
  },
];
