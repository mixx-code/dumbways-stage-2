export interface productInterface {
    id: number,
    productName: string,
    price: number
}

export const products: productInterface[] = [
    { id: 1, productName: "meja kecil", price: 100000 },
    { id: 2, productName: "kursi kantor", price: 750000 },
    { id: 3, productName: "sapu", price: 30000 },
]