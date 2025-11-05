import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
    { nameCategory: 'Teknologi' },
    { nameCategory: 'Gaya Hidup' },
    { nameCategory: 'Kuliner' },
];

const hitungCommentPerPost = [3, 15, 8, 2];

async function main() {
    console.log(`Start seeding ...`);

    await prisma.comment.deleteMany();
    await prisma.postCategory.deleteMany();
    await prisma.post.deleteMany();
    await prisma.category.deleteMany();

    const categories = await Promise.all(
        categoriesData.map(c => prisma.category.create({ data: c }))
    );
    console.log(`Seeded 3 categories.`);

    const posts = [];
    for (let i = 1; i <= 10; i++) {
        const post = await prisma.post.create({
            data: {
                title: `Post ke-${i}`,
                content: `Ini adalah konten untuk postingan yang ke-${i}.`,
            },
        });
        posts.push(post);
    }
    console.log(`Seeded 10 posts.`);

    await Promise.all([
        prisma.postCategory.create({
            data: { postId: posts[0].id, categoryId: categories[0].id },
        }),
        prisma.postCategory.create({
            data: { postId: posts[0].id, categoryId: categories[2].id },
        }),

        prisma.postCategory.create({
            data: { postId: posts[1].id, categoryId: categories[1].id },
        }),
        prisma.postCategory.create({
            data: { postId: posts[1].id, categoryId: categories[2].id },
        }),

        prisma.postCategory.create({
            data: { postId: posts[2].id, categoryId: categories[0].id },
        }),
    ]);
    console.log(`Seeded post-category relations.`);

    for (let i = 0; i < posts.length; i++) {
        const jumlahComment = hitungCommentPerPost[i % hitungCommentPerPost.length];
        for (let j = 1; j <= jumlahComment; j++) {
            await prisma.comment.create({
                data: {
                    textComment: `Ini komentar ke-${j} di postingan ${posts[i].id}.`,
                    postId: posts[i].id,
                },
            });
        }
    }
    console.log(`Seeded comments for posts.`);

    console.log(`Seeding finished.`);
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
