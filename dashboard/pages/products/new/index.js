import { IconInput, TextArea, TextInput } from "@/components/Inputs/Inputs";
import { Button, IconButton, LinkButton } from "@/components/buttons/buttons";
import styles from "@/styles/newproduct.module.css";
import { generateImageUsingAI } from "@/utils/ai/generate/image";
import { generateProductDescriptionUsingAI } from "@/utils/ai/generate/productDescription";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import { errorToast, successToast, warningToast } from "@/utils/helper/toasts/toasts.messages";
import { uploadImage } from "@/utils/helper/upload/images/uploadImages";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const CustomCircularLoading = () => (
    <ClipLoader
        size={15}
        cssOverride={{
            position: "relative",
            top: "1px",
            marginLeft: "10px"
        }}
        color="var(--primary)"
    />
);

const NewProductPage = () => {
    const router = useRouter();

    const [prodCat, setProdCat] = useState("");
    const [aiGeneratedImgs, setAiGeneratedImgs] = useState();
    const [loading, setLoading] = useState(false);
    const [createBtnText, setCreateBtnText] = useState("Add Product");

    const [productImgs, setProductImgs] = useState({
        1: {
            img: null,
            raw: null
        },
        2: {
            img: null,
            raw: null
        },
        3: {
            img: null,
            raw: null
        }
    });

    const [productDetails, setProductDetails] = useState({
        productName: null,
        scientificName: null,
        productDescription: null,
        featuredImages: [],
        categories: null,
        productQuantity: null,
        productSKU: null,
        productWeight: null,
        productHeight: null,
        productSpread: null,
        productMaxHeight: null,
        salePrice: null,
        originalPrice: null
    });

    console.log(productDetails);

    const handleAddProduct = async () => {
        try {
            // const validateData = validateAllInputs({ ...productDetails, ...productImgs });
            const validateData = true;
            if (validateData) {
                const allSecureLinks = await uploadAllImages();
                setCreateBtnText("Creating new product...");

                /**
                 **  Creating cat. array from string
                 *  */
                productDetails.categories =
                    typeof productDetails.categories === "object"
                        ? productDetails.categories.join(",").replace(/\s/g, "").split(",")
                        : productDetails.categories.replace(/\s/g, "").split(",");

                /**
                 ** Adding all images to array
                 */
                productDetails.featuredImages = allSecureLinks;

                const createNewProduct = await axios.post("http://localhost:3000/api/products/new", productDetails);
                console.log({ res: createNewProduct.data });
                setCreateBtnText("Add Product");
                successToast("New product created");
            }
        } catch (error) {
            console.log({ error });
            setCreateBtnText("Add Product");
            errorToast("Product not added, try again");
        }
    };

    const uploadAllImages = async () => {
        const images = [];
        setCreateBtnText("Uploading images...");
        for (const img in productImgs) {
            const uploadImg = await uploadImage(productImgs[img].img);
            images.push(uploadImg);
        }
        return images;
    };

    const handleImgState = (event, stateNo) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        if (file) {
            if (isImageFile(file)) {
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setProductImgs((prev) => ({
                            ...prev,
                            [stateNo]: {
                                ...prev[stateNo],
                                img: file,
                                raw: reader.result
                            }
                        }));
                    }
                };
                reader.readAsDataURL(file);
            } else {
                errorToast("Only img format is accepted!");
            }
        }
    };

    const isImageFile = (file) => {
        console.log("inside");
        console.log(file.type.startsWith("image/"));
        return file.type.startsWith("image/");
    };

    const handleInputSubmit = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setProductDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    console.log(productDetails);

    return (
        <div className={styles.main}>
            <div className={styles.pageTitle}>
                <div className={styles.headerGrp}>
                    <IconButton
                        onClick={() => router.push("/products")}
                        bgColor={"#f5f7f9"}
                        padding={"0px 10px"}
                        leftIcon={
                            <i
                                style={{ color: "#000" }}
                                class="fi fi-rr-arrow-small-left"></i>
                        }
                        width={"fit-content"}
                    />
                    <div className={styles.textGrp}>
                        <div className={styles.topTxt}>
                            <p>Back to product list</p>
                        </div>
                        <div className={styles.bottomTxt}>
                            <p>Add New Product</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.addProduct}>
                <div className={styles.col1}>
                    <div>
                        <p className={styles.title}>Description</p>
                        <div className={styles.prodDes}>
                            <div className={styles.innerProdNameInput}>
                                <TextInput
                                    name="productName"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"Product name"}
                                    placeholder={"Product name"}
                                    value={productDetails.productName}
                                />
                            </div>
                            <div className={styles.innerProdNameInput}>
                                <TextInput
                                    name="scientificName"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"Scientific name"}
                                    placeholder={"Scientific name"}
                                    value={productDetails.scientificName}
                                />
                            </div>
                            <div
                                style={{ position: "relative" }}
                                className={styles.innerProdDescInput}>
                                <TextArea
                                    name="productDescription"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"Description"}
                                    placeholder={"Description"}
                                    value={productDetails.productDescription}
                                />
                                {/* <span
                                    style={{
                                        color: "var(--primary)",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        marginLeft: "5px",
                                        position: "absolute",
                                        top: 0,
                                        right: 0
                                    }}>
                                    {!loading.aiDescription ? (
                                        <p onClick={() => generateDescription()}>Generate using AI</p>
                                    ) : (
                                        <p>
                                            Generating, Hold on! <CustomCircularLoading />
                                        </p>
                                    )}
                                </span> */}
                            </div>
                        </div>
                    </div>

                    <div className={styles.prodCatArea}>
                        <p className={styles.title}>Category</p>
                        <div className={styles.prodCat}>
                            <div className={styles.innerProdInput}>
                                <TextInput
                                    value={productDetails.categories}
                                    name="categories"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"Product Category"}
                                    placeholder={"Separate using commas (,)"}
                                />
                            </div>
                            {/* <div className={styles.innerProdInput}>
                                <TextInput
                                    label={"Product Category"}
                                    placeholder={"Beauty"}
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.inventory}>
                        <p className={styles.title}>Inventory</p>
                        <div className={styles.inventoryinfo}>
                            <div className={styles.quantity}>
                                <TextInput
                                    type="number"
                                    value={productDetails.productQuantity}
                                    name="productQuantity"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"Quantity"}
                                    placeholder={1020}
                                />
                            </div>
                            <div className={styles.sku}>
                                <TextInput
                                    value={productDetails.productSKU}
                                    name="productSKU"
                                    setText={(e) => handleInputSubmit(e)}
                                    label={"SKU"}
                                    placeholder={"uu-br-br-05"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                        className={styles.title}>
                        <span>Product Images</span>{" "}
                        {/* <span
                            style={{
                                color: "var(--primary)",
                                cursor: "pointer",
                                marginLeft: "5px"
                            }}>
                            {!loading.aiImages ? (
                                <span onClick={() => generateImages()}>Generate using AI</span>
                            ) : (
                                <span>
                                    Generating, Hold on
                                    <CustomCircularLoading />
                                </span>
                            )}
                        </span> */}
                    </div>
                    <div className={[styles.productimg, !aiGeneratedImgs && styles.height166].join(" ")}>
                        <div className={styles.grid1}>
                            <label htmlFor="productImg1">
                                <div style={{ height: "100%" }}>
                                    {productImgs[1].raw ? (
                                        <div
                                            style={{
                                                height: "100%",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `url(${productImgs[1].raw})`
                                            }}></div>
                                    ) : (
                                        <div className={styles.selectImgIconContainer}>
                                            <i class="fi fi-rr-images"></i>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="productImg1"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleImgState(e, 1)}
                                />
                            </label>
                        </div>
                        <div className={styles.grid2}>
                            <label htmlFor="productImg2">
                                {productImgs[2].raw ? (
                                    <div
                                        style={{
                                            height: "100%",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url(${productImgs[2].raw})`
                                        }}></div>
                                ) : (
                                    <div className={styles.selectImgIconContainer}>
                                        <i class="fi fi-rr-images"></i>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="productImg2"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleImgState(e, 2)}
                                />
                            </label>
                        </div>
                        <div className={styles.grid3}>
                            <label htmlFor="productImg3">
                                {productImgs[3].raw ? (
                                    <div
                                        style={{
                                            height: "100%",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url(${productImgs[3].raw})`
                                        }}></div>
                                ) : (
                                    <div className={styles.selectImgIconContainer}>
                                        <i class="fi fi-rr-images"></i>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="productImg3"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleImgState(e, 3)}
                                />
                            </label>
                        </div>
                    </div>
                    <p className={styles.title}>Shipping and delivery</p>
                    <div className={styles.shippingdelivery}>
                        <div className={styles.itemWeight}>
                            <IconInput
                                value={productDetails.productWeight}
                                name={"productWeight"}
                                onChange={(e) => handleInputSubmit(e)}
                                label={"Plant weight"}
                                placeholder={12.0}
                                rightIcon={<p>k g</p>}
                            />
                        </div>
                        <div className={styles.plantSize}>
                            <IconInput
                                value={productDetails.productHeight}
                                name={"productHeight"}
                                onChange={(e) => handleInputSubmit(e)}
                                label={"Height"}
                                placeholder={12}
                                rightIcon={<p>ft</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                            <IconInput
                                value={productDetails.productSpread}
                                name={"productSpread"}
                                onChange={(e) => handleInputSubmit(e)}
                                label={"Plant Spread"}
                                placeholder={12}
                                rightIcon={<p>cm</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                            <IconInput
                                value={productDetails.productMaxHeight}
                                name={"productMaxHeight"}
                                onChange={(e) => handleInputSubmit(e)}
                                label={"Maximum Height"}
                                placeholder={12}
                                rightIcon={<p>ft</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                        </div>
                    </div>
                    <p className={styles.title}>Pricing</p>
                    <div className={styles.pricing}>
                        <IconInput
                            value={productDetails.salePrice}
                            name={"salePrice"}
                            onChange={(e) => handleInputSubmit(e)}
                            label={"Pricing"}
                            placeholder={345}
                            leftIcon={<p>₹</p>}
                            leftIconCSS={{
                                position: "absolute",
                                top: "62%",
                                left: "7%"
                            }}
                        />
                        <IconInput
                            value={productDetails.originalPrice}
                            name={"originalPrice"}
                            onChange={(e) => handleInputSubmit(e)}
                            label={"Compare at price"}
                            placeholder={555}
                            leftIcon={<p>₹</p>}
                            leftIconCSS={{
                                position: "absolute",
                                top: "62%",
                                left: "7%"
                            }}
                        />
                    </div>
                    <div className={styles.callToactions}>
                        <Button
                            padding={"10px"}
                            width={"25%"}
                            title="Discard"
                            onClick={() => router.push("/products")}
                        />
                        <Button
                            onClick={() => handleAddProduct()}
                            bg="var(--primary)"
                            color={"var(--white)"}
                            padding={"10px"}
                            // width={"25%"}
                            title={createBtnText}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductPage;

export const getServerSideProps = async (ctx) => {
    try {
        const myCookie = ctx.req?.cookies || "";
        const res = await adminVerification(myCookie.token);
        console.log(res);
        if (res.code === 0) {
            return {
                redirect: {
                    destination: "/login?redirectTo=/products/new",
                    permanent: false
                }
            };
        }
        return {
            props: {
                isLogin: true
            }
        };
    } catch (err) {
        // console.log(err)
        return {
            redirect: {
                destination: "/login?redirectTo=/products/new",
                permanent: false
            }
        };
    }
};

const validateAllInputs = (data) => {
    console.log(data);
    if (typeof data.productName !== "string" || data.productName.trim() === "") {
        warningToast("Please provide a valid product name.");
        return false;
    }

    if (typeof data.productDescription !== "string" || data.productDescription.trim() === "") {
        warningToast("Please provide a valid product description.");
        return false;
    }

    if (typeof data.categories !== "string" || data.categories.trim() === "") {
        warningToast("Please select a valid category for the product.");
        return false;
    }

    if (typeof data.productQuantity !== "number" || isNaN(data.productQuantity) || data.productQuantity <= 0) {
        warningToast("Please enter a valid product quantity.");
        return false;
    }

    if (typeof data.productSKU !== "string" || data.productSKU.trim() === "") {
        warningToast("Please provide a valid product SKU.");
        return false;
    }

    if (typeof data.productWeight !== "number" || isNaN(data.productWeight) || data.productWeight <= 0) {
        warningToast("Please enter a valid product weight.");
        return false;
    }

    if (typeof Number(data.productHeight) !== "number" || isNaN(Number(data.productHeight)) || Number(data.productHeight) <= 0) {
        warningToast("Please enter a valid product height.");
        return false;
    }

    if (typeof data.productSpread !== "number" || isNaN(data.productSpread) || data.productSpread <= 0) {
        warningToast("Please enter a valid product spread.");
        return false;
    }

    if (typeof data.productMaxHeight !== "number" || isNaN(data.productMaxHeight) || data.productMaxHeight <= 0) {
        warningToast("Please enter a valid maximum product height.");
        return false;
    }

    if (typeof data.salePrice !== "number" || isNaN(data.salePrice) || data.salePrice <= 0) {
        warningToast("Please enter a valid sale price.");
        return false;
    }

    if (typeof data.originalPrice !== "number" || isNaN(data.originalPrice) || data.originalPrice <= 0) {
        warningToast("Please enter a valid origin price.");
        return false;
    }

    if (!data[1].img && !data[1].img && !data[1].img) {
        warningToast("Please add product images.");
        return false;
    }
};

// const generateImages = async () => {
//     setLoading((prev) => ({ ...prev, aiImages: true }));
//     const data = await generateImageUsingAI(productname);
//     const response = data.data;
//     setLoading((prev) => ({ ...prev, aiImages: false }));
//     setAiGeneratedImgs(response);
// };

// const generateDescription = async () => {
//     setLoading((prev) => ({ ...prev, aiDescription: true }));
//     const data = await generateProductDescriptionUsingAI(productname);
//     console.log(data);
//     // setDescription(data.response.choices[0].message.content);
//     setLoading((prev) => ({ ...prev, aiDescription: false }));
//     // console.log(data.response.choices[0].message.content);
// };
