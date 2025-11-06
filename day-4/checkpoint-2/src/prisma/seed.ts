import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    console.log("Memulai proses seeding...");

    // --- Hapus semua data yang ada untuk memulai dari awal ---
    await prisma.productSupplier.deleteMany();
    await prisma.stock.deleteMany();
    await prisma.product.deleteMany();
    await prisma.supplier.deleteMany();

    // --- Data statis untuk Suppliers ---
    const supplierData = [
        { nameSupplier: "PT ABC", email: "abc@example.com" },
        { nameSupplier: "CV CDE", email: "cde@example.com" },
        { nameSupplier: "PT FGH", email: "fgh@example.com" },
    ];

    // --- Masukkan data Supplier dan simpan hasilnya ---
    const createdSuppliers = await Promise.all(
        supplierData.map((data) => prisma.supplier.create({ data }))
    );
    console.log(`Berhasil membuat ${createdSuppliers.length} pemasok.`);

    // --- Data statis untuk Products dan Stocks ---
    const productStockData = [
        {
            nameProduct: "Buku Tulis A5",
            price: 15000,
            stockAmount: 100,
            supplierEmails: ["abc@example.com"],
        },
        {
            nameProduct: "Pensil Mekanik",
            price: 7500,
            stockAmount: 250,
            supplierEmails: ["abc@example.com", "fgh@example.com"],
        },
        {
            nameProduct: "Pulpen Gel Hitam",
            price: 12000,
            stockAmount: 150,
            supplierEmails: ["cde@example.com"],
        },
        {
            nameProduct: "Penggaris Plastik 30cm",
            price: 5000,
            stockAmount: 80,
            supplierEmails: ["abc@example.com", "cde@example.com"],
        },
    ];

    // --- Masukkan data Product, Stock, dan relasinya ---
    for (const item of productStockData) {
        const newProduct = await prisma.product.create({
            data: {
                nameProduct: item.nameProduct,
                price: item.price,
                // Relasi one-to-one dengan Stock
                stock: {
                    create: {
                        stockAmount: item.stockAmount,
                    },
                },
                // Relasi many-to-many dengan Supplier
                suppliers: {
                    create: item.supplierEmails.map((email) => ({
                        supplier: {
                            // Gunakan ID, bukan email, untuk koneksi yang lebih andal
                            connect: {
                                // Temukan supplier yang sesuai dari array yang sudah dibuat
                                id: createdSuppliers.find(s => s.email === email)!.id
                            },
                        },
                    })),
                },
            },
        });
        console.log(`Produk "${newProduct.nameProduct}" dan stok terkait berhasil dibuat.`);
    }
}


main()
    .then(() => {
        console.log("Seeding success✅");
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })