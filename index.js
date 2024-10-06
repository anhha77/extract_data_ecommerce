const fs = require("fs");
const FileSystem = require("fs");
const { error } = require("console");
const path = require("path");

// const result = [];

// fs.createReadStream("./fashion.csv")
//   .pipe(csvParser())
//   .on("data", (data) => {
//     if (data.Category === "Apparel") {
//       result.push(data);
//     }
//   })
//   .on("end", () => {
//     FileSystem.writeFile("fashion.json", JSON.stringify(result), (error) => {
//       if (error) throw error;
//     });
//   });

// let fashionData = fs.readFileSync("fashion.json", "utf8");
// fashionData = JSON.parse(fashionData);

// const subCategory = [];
// const genderType = [];
// const categoryWithProductType = {};

// fashionData.forEach((data) => {
//   if (!genderType.includes(data.ProductType)) {
//     genderType.push(data.ProductType);
//     categoryWithProductType[data.Gender] = [];
//   }
//   if (!subCategory.includes(data.SubCategory)) {
//     subCategory.push(data.SubCategory);
//     categoryWithProductType[data.SubCategory] = [];
//   }
// });

// fashionData.forEach((data) => {
//   if (!categoryWithProductType[data.Gender].includes(data.ProductType)) {
//     categoryWithProductType[data.Gender].push(data.ProductType);
//   }

//   if (!categoryWithProductType[data.SubCategory].includes(data.ProductType)) {
//     categoryWithProductType[data.SubCategory].push(data.ProductType);
//   }
// });

// FileSystem.writeFileSync(
//   "category.json",
//   JSON.stringify(categoryWithProductType),
//   (error) => {
//     if (error) throw error;
//   }
// );

// Image upload to firebase

const { initializeApp } = require("firebase/app");
const {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKhDwn_Wnb70qbqvTv79ZQEZqYlnyrTGM",
  authDomain: "e-commerce-61367.firebaseapp.com",
  projectId: "e-commerce-61367",
  storageBucket: "e-commerce-61367.appspot.com",
  messagingSenderId: "29487615266",
  appId: "1:29487615266:web:e3ed18063c2a38abd7a97b",
  measurementId: "G-NW08JKVMHL",
};

// Initialize Firebase
const fireBaseExtension = initializeApp(firebaseConfig);

const fireBaseUpload = async (fireBase, name, image) => {
  const storage = getStorage(fireBase);
  const storageRef = ref(storage, image);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);
  console.log(downloadURL);
  return downloadURL;
};

const fireBaseUrls = [];
let fashionData = fs.readFileSync("./fashion.json", "utf-8");
fashionData = JSON.parse(fashionData);

// fashionData = fashionData.map((item, index) => ({ ...item, id: index }));
// fs.writeFileSync("./fashion.json", JSON.stringify(fashionData), "utf-8");

const uploadData = async (item) => {
  const data = fs.readFileSync(
    `./Apparel/${item.Gender}/Images/images_with_product_ids/${item.ProductId}.jpg`
  );

  const metadata = {
    contentType: "image/jpeg",
  };

  const storage = getStorage(fireBaseExtension);
  const storageRef = ref(storage, `clothes/${item.ProductId}`);
  await uploadBytes(storageRef, data, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const processData = async () => {
  const promises = fashionData.map(async (item, index) => {
    if (item.firebase) {
      return item;
    }
    if (index >= 1300 && index < 1326) {
      const fireBaseUrl = await uploadData(item);
      return { ...item, firebase: fireBaseUrl };
    }
    return item;
  });

  fashionData = await Promise.all(promises);
  fs.writeFileSync("./fashion.json", JSON.stringify(fashionData), "utf-8");
};

processData();
