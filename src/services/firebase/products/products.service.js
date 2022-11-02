import { collection, query, where, getDocs, limit, startAfter, doc, getDoc } from "firebase/firestore"
import { firestoreRef } from "../../../configs/firebase.config"
import { getAllRecords } from "../common"
import { isProductInFiltered } from "../../../functions"

export const getProductDetail = async(productId) => {
    const productDoc = await getDoc(doc(firestoreRef, "products", productId)); 
    return productDoc.exists() && productDoc.data();
}

export const getProductRefferences = async() => { 
    const res = await Promise.all(["categories", "brands"].map((refTitle) => getAllRecords(refTitle)));
    return [
        {
            title: "Category", 
            urlParam: "category",
            filtersList: res[0]   
        },
        {
            title: "Brands", 
            urlParam: "brand",
            filtersList: res[1]   
        },
        {
            title: 'Prices', 
            urlParam: 'price',
            filtersList: [
               { id: "rp1", min: undefined, max: 50 }, 
               { id: "rp2", min: 50, max: 100 }, 
               { id: "rp3", min: 100, max: 150 },
               { id: "rp4", min: 150, max: 200 },
               { id: "rp5", min: 200, max: 300 }, 
               { id: "rp6", min: 300, max: 500 }, 
               { id: "rp7", min: 500, max: 1000 }, 
               { id: "rp8", min: 1000, max: undefined }
            ]
        }
    ];
}

export const getFilteredProducts = async(filterDetail, resLimit = 10) => {
    let resProducts = []; 
    const firstProductsQuery = await getDocs(
        query (
            collection(firestoreRef, "products"), 
            limit(resLimit)
        )
    );
    firstProductsQuery.forEach((productDoc) => { 
        resProducts = [ ...resProducts, { ...productDoc.data(), id: productDoc.id } ] 
    });
    return resProducts.filter((product) => isProductInFiltered(product, filterDetail))
}

export const loadMoreFilteredProducts = async(currentProducts, filterDetail, resLimit = 10) => {
    let resProducts = []; 
    const lastCurrentProductDoc = await getDoc(
        doc (
            collection(firestoreRef, "products"), 
            currentProducts[currentProducts.length - 1].id
        )
    );
    const nextProductsQuery = await getDocs(
        query (
            collection(firestoreRef, "products"), 
            startAfter(lastCurrentProductDoc), 
            limit(resLimit)
        )
    ); 
    nextProductsQuery.forEach((productDoc) => { 
        resProducts = [ ...resProducts, { ...productDoc.data(), id: productDoc.id }]
    });        
    return resProducts.filter((product) => isProductInFiltered(product, filterDetail));
}
