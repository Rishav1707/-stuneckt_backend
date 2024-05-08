import { User } from "../models/user";
import { Post } from "../models/posts";

const Posts = [
  {
    userId: "",
    image:
      "https://foyr.com/learn/wp-content/uploads/2021/10/rules-for-interior-designers-1024x656.png",
    title: "Interior Design",
    content:
      "Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space. It involves planning, designing, and furnishing spaces with attention to functionality and aesthetics.",
  },
  {
    userId: "",
    image:
      "https://m.foolcdn.com/media/dubs/images/how-blockchain-works-infographic.width-880.png",
    title: "Blockchain Technology",
    content:
      "Blockchain technology is a decentralized digital ledger that records transactions across multiple computers. It is the underlying technology behind cryptocurrencies like Bitcoin and Ethereum, enabling secure and transparent peer-to-peer transactions.",
  },
  {
    userId: "",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-75624943a1dabe05f179de0d3fe93992-lq",
    title: "Health and Fitness",
    content:
      "Health and fitness involve activities that promote physical and mental well-being. This includes exercise, nutrition, mindfulness, and overall lifestyle choices to improve health and quality of life.",
  },
  {
    userId: "",
    image:
      "https://jdinstituteoffashiontechnology.com/wp-content/uploads/2021/07/participating-as-fashion-designer.jpg",
    title: "Fashion Design",
    content:
      "Fashion design is the art of applying design, aesthetics, and natural beauty to clothing and accessories. Fashion designers create original garments and accessories based on cultural and social influences, trends, and personal style.",
  },
  {
    userId: "",
    image:
      "https://rcm.ac.in/wp-content/uploads/2022/04/TravelTourism-copy.jpg",
    title: "Travel and Tourism",
    content:
      "Travel and tourism involve the movement of people to different geographical locations for leisure, business, or other purposes. It encompasses transportation, accommodation, attractions, and activities related to exploring new destinations.",
  },
];

const seedPostsDB = async () => {
  try {
    const users = await User.find({});

    for (let i = 0; i < Posts.length; i++) {
      if (i < users.length) {
        const randomIndex = Math.floor(Math.random() * users.length);
        Posts[i].userId = users[randomIndex]._id.toString();
      }
    }

    if (users.length > 0) {
      await Post.insertMany(Posts);
      console.log("Dummy posts seeded successfully");
    } else {
      console.log(
        "No users found to associate with posts, Dummy posts not seeded."
      );
    }
  } catch (err) {
    console.log("Error while seeding the dummy posts:", err);
  }
};

export default seedPostsDB;
