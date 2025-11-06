import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    //bersihkan data lama
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()

    const users = await prisma.user.createMany({
        data:[
            {name: "rizki", email:"rizki@mail.com", points: 500},
            {name: "kiki", email:"kiki@mail.com", points: 1000},
            {name: "dia", email:"dia@mail.com", points: 800},
        ]
    })

    const products = await prisma.product.createMany({
        data:[
            {nameProduct: "mouse", price: 350_000, stock: 100},
            {nameProduct: "keyboard", price: 650_000, stock: 20},
            {nameProduct: "monitor", price: 1_500_000, stock: 100},
        ]
    })

    const getUsers = await prisma.user.findMany()
    const getProducts = await prisma.product.findMany()

    const orders = await prisma.order.createMany({
        data: [
             {
            qty: 2,
            userId: getUsers[0].id,      
            productId: getProducts[0].id 
        },
        {
            qty: 1,
            userId: getUsers[1].id,      
            productId: getProducts[0].id 
        },
        {
            qty: 2,
            userId: getUsers[1].id,      
            productId: getProducts[0].id 
        },
        {
            qty: 5,
            userId: getUsers[1].id,      
            productId: getProducts[1].id 
        },
        {
            qty: 1,
            userId: getUsers[0].id,      
            productId: getProducts[2].id 
        },
        {
            qty: 4,
            userId: getUsers[0].id,      
            productId: getProducts[2].id 
        },
        ]
    })

}


main()
    .then(() => {
        console.log("Seeding success✅");
    })
    .catch((e) =>{
        console.error(e);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    })