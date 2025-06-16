import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd5XgiSAj7Os1nwBy-UWg8Z6ZhkAf11G8",
  authDomain: "agro-30117.firebaseapp.com",
  projectId: "agro-30117",
  storageBucket: "agro-30117.firebasestorage.app",
  messagingSenderId: "234443552877",
  appId: "1:234443552877:web:953e1101458bd1a295e764"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const crops = [
  {
    id: "cafe",
    name: "Café",
    icon: "☕",
    description: "Cultura do café, uma das principais commodities agrícolas do Brasil."
  },
  {
    id: "milho",
    name: "Milho",
    icon: "🌽",
    description: "Cultura do milho, importante para alimentação e produção de ração."
  },
  {
    id: "soja",
    name: "Soja",
    icon: "🌿",
    description: "Cultura da soja, principal commodity agrícola brasileira."
  }
];

const activeIngredients = [
  {
    name: "Glifosato",
    category: "herbicida",
    crops: ["cafe", "milho", "soja"],
    description: "Herbicida sistêmico não seletivo, usado para controle de plantas daninhas."
  },
  {
    name: "2,4-D",
    category: "herbicida",
    crops: ["milho", "soja"],
    description: "Herbicida seletivo para controle de plantas daninhas de folha larga."
  },
  {
    name: "Imidacloprido",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida sistêmico do grupo dos neonicotinoides."
  },
  {
    name: "Tiametoxam",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida sistêmico para controle de pragas sugadoras e mastigadoras."
  },
  {
    name: "Mancozebe",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida protetor para controle de doenças foliares."
  },
  {
    name: "Azoxistrobina",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida sistêmico para controle de doenças foliares."
  },
  {
    name: "Atrazina",
    category: "herbicida",
    crops: ["milho"],
    description: "Herbicida seletivo para controle de plantas daninhas em milho."
  },
  {
    name: "Fipronil",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida de contato e ingestão para controle de pragas."
  },
  {
    name: "Ciproconazol",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida sistêmico para controle de doenças foliares."
  },
  {
    name: "Clorpirifós",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida organofosforado para controle de pragas."
  }
];

async function migrate() {
  try {
    // Migrar culturas
    console.log("Migrando culturas...");
    const cropsRef = collection(db, "crops");
    for (const crop of crops) {
      await addDoc(cropsRef, crop);
      console.log(`Cultura ${crop.name} migrada com sucesso!`);
    }

    // Migrar princípios ativos
    console.log("\nMigrando princípios ativos...");
    const activeIngredientsRef = collection(db, "activeIngredients");
    for (const ingredient of activeIngredients) {
      await addDoc(activeIngredientsRef, ingredient);
      console.log(`Princípio ativo ${ingredient.name} migrado com sucesso!`);
    }

    console.log("\nMigração concluída com sucesso!");
  } catch (error) {
    console.error("Erro durante a migração:", error);
  }
}

migrate(); 