export interface orderInterface {
    id: number,
    idProduct: number,
    jumlahOrder: number,
    totalPrice: number
}

export const orders: orderInterface[] = [
    { id: 1, idProduct: 1, jumlahOrder: 2, totalPrice: 200000 },
    { id: 2, idProduct: 2, jumlahOrder: 1, totalPrice: 750000 },
]