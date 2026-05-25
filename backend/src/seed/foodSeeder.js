import mongoose from "mongoose";
import Food from "../models/Food.model.js";
import dotenv from "dotenv";

dotenv.config();

  const food_list = [
  {
    name: "Greek salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1778051545/food_1_zfkqcw.webp",
    price: 12,
    description: "Fresh Greek salad with olives, cucumber, tomato, and feta cheese.",
    category: "Salad"
  },
  {
    name: "Veg salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986513/food-items/gljxfiddjkq1qjt9ua1u.webp",
    price: 18,
    description: "A crunchy mixed vegetable salad with fresh, healthy ingredients.",
    category: "Salad"
  },
  {
    name: "Clover Salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986529/food-items/xjcusdqodqigq57r15i8.webp",
    price: 16,
    description: "Light and refreshing clover salad with a special dressing.",
    category: "Salad"
  },
  {
    name: "Chicken Salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986535/food-items/mlspfdaia4aewqdqfvcj.webp",
    price: 24,
    description: "Protein-rich chicken salad with fresh greens and creamy sauce.",
    category: "Salad"
  },

  {
    name: "Lasagna Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986536/food-items/buxhqv2y7qserwr49ako.webp",
    price: 14,
    description: "Cheesy lasagna rolls packed with rich Italian flavor.",
    category: "Rolls"
  },
  {
    name: "Peri Peri Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986538/food-items/sg88qkrov1ovm2zlco7q.png",
    price: 12,
    description: "Spicy peri peri rolls with a bold and fiery taste.",
    category: "Rolls"
  },
  {
    name: "Chicken Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986539/food-items/tbmibk9x7anh1i4dxl8d.webp",
    price: 20,
    description: "Juicy chicken rolls wrapped in soft, crispy layers.",
    category: "Rolls"
  },
  {
    name: "Veg Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986540/food-items/plvz3rqgzeebqvjkab4f.webp",
    price: 15,
    description: "Crispy vegetable rolls filled with flavorful mixed veggies.",
    category: "Rolls"
  },

  {
    name: "Ripple Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986543/food-items/pz70fwrxphti33ubk3ja.webp",
    price: 14,
    description: "Creamy ripple ice cream with rich chocolate swirls.",
    category: "Deserts"
  },
  {
    name: "Fruit Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991771/food-items/a5fuoh69z06qjdglvwrm.webp",
    price: 22,
    description: "Refreshing fruit ice cream made with real fruit flavors.",
    category: "Deserts"
  },
  {
    name: "Jar Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991773/food-items/ti2vmu36nxjppnbfoihv.webp",
    price: 10,
    description: "Layered jar ice cream topped with sweet, creamy goodness.",
    category: "Deserts"
  },
  {
    name: "Vanilla Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991774/food-items/bu7py5go0ftuwdokrwe5.webp",
    price: 12,
    description: "Classic vanilla ice cream with a smooth creamy texture.",
    category: "Deserts"
  },

  {
    name: "Chicken Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991775/food-items/ckvdtbmcmlkyfqdrgdp1.webp",
    price: 12,
    description: "Grilled chicken sandwich with fresh veggies and sauce.",
    category: "Sandwich"
  },
  {
    name: "Vegan Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991776/food-items/e89ggrqtg9idb90vwtow.webp",
    price: 18,
    description: "Healthy vegan sandwich filled with fresh plant ingredients.",
    category: "Sandwich"
  },
  {
    name: "Grilled Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991777/food-items/a2vlchy4bykcpbnih1yo.webp",
    price: 16,
    description: "Golden grilled sandwich filled with cheesy goodness.",
    category: "Sandwich"
  },
  {
    name: "Bread Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991778/food-items/tzvnwqg8snuqqzumtvuf.webp",
    price: 24,
    description: "Soft bread sandwich layered with delicious fillings.",
    category: "Sandwich"
  },

  {
    name: "Cup Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991780/food-items/jq0r5yugthpkjsq6mc3t.webp",
    price: 14,
    description: "Soft and fluffy cupcake topped with creamy frosting.",
    category: "Cake"
  },
  {
    name: "Vegan Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991781/food-items/mvrbdedyus92tfdxcgek.webp",
    price: 12,
    description: "Delicious vegan cake made without dairy ingredients.",
    category: "Cake"
  },
  {
    name: "Butterscotch Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991782/food-items/pb96eroxe4scxndggoai.webp",
    price: 20,
    description: "Rich butterscotch cake layered with crunchy caramel bits.",
    category: "Cake"
  },
  {
    name: "Sliced Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991784/food-items/xt7sjz31drfy0wnpnev6.webp",
    price: 15,
    description: "Freshly sliced cake with soft sponge and sweet cream.",
    category: "Cake"
  },

  {
    name: "Garlic Mushroom",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991785/food-items/cwgverxdef2us4ymkkk3.webp",
    price: 14,
    description: "Garlic butter mushrooms cooked with flavorful herbs.",
    category: "Pure Veg"
  },
  {
    name: "Fried Cauliflower",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991786/food-items/wuve0jdwvkohqgjmzked.webp",
    price: 22,
    description: "Crispy fried cauliflower served with spicy seasoning.",
    category: "Pure Veg"
  },
  {
    name: "Mix Veg Pulao",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991787/food-items/suvv2odlxxprwexnpxtq.webp",
    price: 10,
    description: "Aromatic mix veg pulao cooked with fresh vegetables.",
    category: "Pure Veg"
  },
  {
    name: "Rice Zucchini",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991789/food-items/nchx6x9zojruarhgk6qq.webp",
    price: 12,
    description: "Healthy zucchini rice dish with light flavorful spices.",
    category: "Pure Veg"
  },

  {
    name: "Cheese Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991790/food-items/zsyxm0kkrnnbtmaqcbt9.webp",
    price: 12,
    description: "Creamy cheese pasta loaded with rich cheesy flavor.",
    category: "Pasta"
  },
  {
    name: "Tomato Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991791/food-items/uvndgfq5eis1fokuwrs5.webp",
    price: 18,
    description: "Classic tomato pasta cooked in tangy Italian sauce.",
    category: "Pasta"
  },
  {
    name: "Creamy Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991792/food-items/oazlkwrjj8wzhunjaltg.webp",
    price: 16,
    description: "Smooth creamy pasta tossed with herbs and cheese.",
    category: "Pasta"
  },
  {
    name: "Chicken Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991794/food-items/zuykismispcklvcqkwmg.webp",
    price: 24,
    description: "Delicious chicken pasta mixed with creamy rich sauce.",
    category: "Pasta"
  },

  {
    name: "Butter Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991795/food-items/wv8nncggroethh4msjxs.webp",
    price: 14,
    description: "Soft butter noodles tossed with flavorful seasonings.",
    category: "Noodles"
  },
  {
    name: "Veg Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991797/food-items/dvueeaqsx0kk2johcyjg.webp",
    price: 12,
    description: "Veg noodles loaded with crunchy vegetables and sauces.",
    category: "Noodles"
  },
  {
    name: "Somen Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991799/food-items/bro3szwxtva2ybqxy7h3.webp",
    price: 20,
    description: "Authentic somen noodles served with savory flavors.",
    category: "Noodles"
  },
  {
    name: "Cooked Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991800/food-items/fwoi7jmgfot7hfu98ned.webp",
    price: 15,
    description: "Hot cooked noodles stir-fried with tasty ingredients.",
    category: "Noodles"
  }
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Food.deleteMany({});
    console.log("Old data removed");

    await Food.insertMany(food_list);
    console.log("Food inserted");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log("Seeder Error:", error);
    process.exit(1);
  }
};

seedFoods();