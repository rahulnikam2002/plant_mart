import style from "@/styles/verticalOrderProduct.module.css";
import Image from "next/image";

const VerticalOrderProduct = ({ image, quantity, sku, productName }) => {
    return (
        <div className={style.productName}>
            <div className={style.img}>
                <Image
                    src={image}
                    width={75}
                    height={75}
                />
            </div>
            <div className={style.productDetails}>
                <p style={{ fontWeight: "var(--w700)" }}>{productName}</p>
                <p style={{ fontSize: "var(--font14)" }}>
                    SKU: <span style={{ color: "var(--primary" }}>{sku}</span>
                </p>
                <p style={{ fontSize: "var(--font14)" }}>
                    Qauntity: <span>{quantity}</span>
                </p>
            </div>
        </div>
    );
};

export default VerticalOrderProduct;
