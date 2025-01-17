
function fetchFakeAPI() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 13794,
                    name: "Luna pura",
                    price: "28.930.000",
                    currency: "₫",
                    link: "den-luna-pura/index.html",
                    image: "../wp-content/uploads/2024/11/Occhio_Luna_pura_3-810x969.jpg",
                    shortDescription: `
                        <p><strong>Đèn thả bàn di động</strong></p>
                        <p>Nhiệt độ màu: 2200K-3500K &gt;&gt;X-tra Warm&lt;&lt;</p>
                        <p>CRI: 92</p>
                        <p>Hiệu suất: 7W/160lm</p>
                        <p>Màu sắc: Phantom | Dark chrome</p>
                        <p>Đường kính đèn: ø 12,5 cm</p>
                        <p>Chống vẩy nước IP21</p>
                        <p>Sạc Type-C, thời lượng pin 8 tiếng. Hỗ trợ sạc nhanh 0-80% trong 60 phút.</p>
                    `,
                    quickViewButton: "Quick view",
                    compareButton: "Compare"
                }
            ]);
        }, 1000); // Giả lập độ trễ 1 giây
    });
}





document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.querySelector(".products"); // Container danh sách sản phẩm

    try {
        const products = await fetchFakeAPI(); // Lấy dữ liệu từ API giả

        productContainer.innerHTML = "";
        // Duyệt qua danh sách sản phẩm
        products.forEach(product => {
            const productHTML = `
                <li class="product type-product post-${product.id} status-publish first instock product_cat-den-ban product_cat-occhio has-post-thumbnail featured shipping-taxable purchasable product-type-simple">
                    <a href="${product.link}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                        <span class="featured">Hot</span>
                    </a>
                    <div class="woocommerce-product-inner">
                        <div class="woocommerce-product-header">
                            <a class="woocommerce-product-details" href="${product.link}">
                                <img width="810" height="969" src="${product.image}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="${product.name}" decoding="async" />
                            </a>
                            <div class="woocommerce-product-meta">
                                <div class="woocommerce-btn-item woocommerce-add-to--cart">
                                    <a href="index9603.html?add-to-cart=${product.id}" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="${product.id}" data-product_sku="" aria-label="Add to cart: &ldquo;${product.name}&rdquo;" rel="nofollow">Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div class="woocommerce-product-content">
                            <h6 class="woocommerce-product--title">
                                <a href="${product.link}">${product.name}</a>
                            </h6>
                            <div class="woocommerce-product--price">
                                <span class="price">
                                    <span class="woocommerce-Price-amount amount">
                                        <bdi>${product.price}<span class="woocommerce-Price-currencySymbol">${product.currency}</span></bdi>
                                    </span>
                                </span>
                            </div>
                            <div class="woocommerce-product--excerpt" style="display: none;">
                                <div class="woocommerce-product-details__short-description">
                                    ${product.shortDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;
            productContainer.insertAdjacentHTML("beforeend", productHTML);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
});
