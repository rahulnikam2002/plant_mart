import style from '@/styles/verticalOrderProduct.module.css'
import Image from 'next/image';

const VerticalOrderProduct = () => {
    return (
        <div className={style.productName}>
            <div className={style.img}>

                <Image src="https://images.unsplash.com/photo-1621872507418-e158640eee49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" width={75} height={75} />
            </div>
            <div className={style.productDetails}>
                <p style={{ fontWeight: "var(--w700)" }}>Mango Plant</p>
                <p style={{ fontSize: "var(--font14)" }}>SKU: <span style={{ color: "var(--primary" }}>ic56g0dfs-9</span></p>
                <p style={{ fontSize: "var(--font14)" }}>Qauntity: <span>3</span></p>
            </div>
        </div>
    )
}

export default VerticalOrderProduct;