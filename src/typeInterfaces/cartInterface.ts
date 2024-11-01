export interface cartItemInterface {
    _id?: string,
    release_id: string,
    user_email: string,
    user_id: string,
    artistName: string,
    coverArt: string,
    price: number,
    releaseType: string,
    title: string
}



// interface responseCartItemInterface {
//     type: string,
//     name: string,
//     price: number,
//     _id: string
// }

// export interface add2cartResponseInterface {
//     email: string,
//     items: responseCartItemInterface[],
//     total: number,
//     _id: string,
//     createdAt: string,
// }

// export interface applyPromoResponseInterface {
//     cart: {
//         _id: string,
//         email: string,
//         items: responseCartItemInterface[],
//         total: number,
//         createdAt: string,
//     },
//     originalPrice: number
// }
