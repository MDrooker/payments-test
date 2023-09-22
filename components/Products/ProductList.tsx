import React from 'react'
import ProductCard from './ProductCard'
function ProductList({ products }: { products: any }) {
    return (
        products.map((product: any) => {
            if (product.product.active === false) return (<div></div>)
            return <ProductCard key={product.id} product={product} />
        })
    )
}

export default ProductList