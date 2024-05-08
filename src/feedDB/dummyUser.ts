import { User } from "../models/user";
import { hashPassword } from "../utils/auth";

const Users = [
  {
    username: "chris@hotmail.com",
    password: "chrispass",
    firstName: "Chris",
    lastName: "Evans",
    about:
      "I am a chef specializing in modern cuisine. I have a passion for creating innovative dishes that blend flavors from different cultures. I enjoy experimenting with ingredients and techniques to deliver exceptional dining experiences.",
  },
  {
    username: "laura@gmail.com",
    password: "laurapass",
    firstName: "Laura",
    lastName: "Anderson",
    about:
      "I am a software engineer with a focus on artificial intelligence. I am fascinated by machine learning and its applications in various industries. I enjoy developing algorithms and building intelligent systems that solve complex problems.",
  },
  {
    username: "alex@yahoo.com",
    password: "alexpass",
    firstName: "Alex",
    lastName: "Garcia",
    about:
      "I am a teacher passionate about fostering creativity in young minds. I specialize in art education and enjoy organizing workshops that encourage self-expression through different art forms. I believe in the power of art to inspire and empower individuals.",
  },
  {
    username: "nina@gmail.com",
    password: "ninapass",
    firstName: "Nina",
    lastName: "Adams",
    about:
      "I am a wildlife photographer capturing the beauty of nature. I travel to remote locations to photograph animals in their natural habitats. I aim to raise awareness about conservation through my photography.",
  },
  {
    username: "max@yahoo.com",
    password: "maxpass",
    firstName: "Max",
    lastName: "Thompson",
    about:
      "I am a software tester with a keen eye for detail. I specialize in ensuring the quality and reliability of software products. I enjoy identifying bugs and providing valuable feedback to improve user experiences.",
  },
];

const seedUserDB = async () => {
  for (let user of Users) {
    user.password = await hashPassword(user.password);
  }
  try {
    await User.insertMany(Users);
    console.log("Dummy users Seeded Successfully");
  } catch (err: any) {
    console.error("Error while seeding the users", err);
  }
};

export default seedUserDB;
