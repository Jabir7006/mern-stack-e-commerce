const data = {
  products: [
    {
      title: "Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.",
      slug: "galaxy-tab-s6-lite-10-4-inch-android-tablet-128gb",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 900,

      image: "public/images/products/tp1.jpg",
      // category: "6554c26b71ebb742997a2382",
      category: "smartphone",
      brand: "Samsung",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "Tracker with IP67 Waterproof Pedometer Smart watch.",
      slug: "tracker-with-ip67-waterproof-pedometer-smart-watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 150,

      image: "public/images/products/tp2.jpg",
      // category: "6554c27571ebb742997a2385",
      category: "watch",
      brand: "Rolex",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "Cancelling Headphones Wireless",
      slug: "cancelling-headphones-wireless",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 200,

      image: "public/images/products/tp3.jpg",
      // category: "6554c28f71ebb742997a2388",
      category: "headphone",
      brand: "Apple",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "Professional Camera 4K Digital Video Camera.",
      slug: "professional-camera-4k-digital-video-camera",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 599,

      image: "public/images/products/tp4.jpg",
      // category: "6554eaefbc4b7785f4fbb164",
      category: "camera",
      brand: "Sony",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "Mini Portable PD 22.5W Fast Charging Powerbank.",
      slug: "mini-portable-pd-22-5w-fast-charging-powerbank",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 80,

      image: "public/images/products/tp5.jpg",
      // category: "6554ebcb9e04e0e31eca4321",
      category: "powerbank",
      brand: "Samsung",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "CPU Cooler 2 Heat Pipes 12mm 4 Pin PWM RGB for Intel.",
      slug: "cpu-cooler-2-heat-pipes-12mm-4-pin-pwm-rgb-for-intel",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 400,

      image: "public/images/products/tp6.png",
      // category: "6554ebcb9e04e0e31eca4321",
      category: "accessories",
      brand: "Intel",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 4,
    },
    {
      title: "Playstation 4 2TB Slim Gaming Console.",
      slug: "playstation-4-2tb-slim-gaming-console",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 799,

      image: "public/images/products/tp7.jpg",
      // category: "6554ee5f9a98c6fca7547e1c",
      category: "console",
      brand: "Sony",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
    {
      title: "Mini Portable Mobile Phone Powerbank for iphone.",
      slug: "mini-portable-mobile-phone-powerbank-for-iphone",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi blanditiis quasi incidunt commodi sit mollitia nobis earum minus, ",
      price: 120,

      image: "public/images/products/tp8.jpg",
      category: "powerbank",
      brand: "Apple",
      inStock: true,
      quantity: 1,
      sold: 0,
      totalRatings: 0,
    },
  
    // ===========================================
    //       Other Category Product
    // ===========================================
    
    {
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "slug": "fjallraven-foldsack-no-1-backpack-fits-15-laptops",
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "price": 109.95,
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "category": "backpack",
      "brand": "Fjallraven",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Mens Casual Premium Slim Fit T-Shirts",
      "slug": "mens-casual-premium-slim-fit-t-shirts",
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "price": 22.3,
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "category": "men's clothing",
      "brand": "Puma",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Mens Cotton Jacket",
      "slug": "mens-cotton-jacket",
      "description": "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling, or other outdoors. Good gift choice for you or your family member. A warm-hearted love to Father, husband, or son in this thanksgiving or Christmas Day.",
      "price": 55.99,
      "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "category": "men's clothing",
      "brand": "Puma",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Mens Casual Slim Fit",
      "slug": "mens-casual-slim-fit",
      "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      "price": 15.99,
      "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      "category": "men's clothing",
      "brand": "Puma",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      "slug": "john-hardy-womens-legends-naga-gold-silver-dragon-station-chain-bracelet",
      "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      "price": 695,
      "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      "category": "jewelry",
      "brand": "John Hardy",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Solid Gold Petite Micropave",
      "slug": "solid-gold-petite-micropave",
      "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      "price": 168,
      "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      "category": "jewelry",
      "brand": "Hafeez Center",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "White Gold Plated Princess",
      "slug": "white-gold-plated-princess",
      "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      "price": 9.99,
      "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      "category": "jewelry",
      "brand": "Hafeez Center",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
      "slug": "pierced-owl-rose-gold-plated-stainless-steel-double",
      "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      "price": 10.99,
      "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      "category": "jewelry",
      "brand": "Pierced Owl",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      "slug": "wd-2tb-elements-portable-external-hard-drive-usb-3-0",
      "description": "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system.",
      "price": 64,
      "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      "category": "electronics",
      "brand": "WD",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      "slug": "sandisk-ssd-plus-1tb-internal-ssd-sata-iii-6-gb-s",
      "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores). Boosts burst write performance, making it ideal for typical PC workloads. The perfect balance of performance and reliability. Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
      "price": 109,
      "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      "category": "electronics",
      "brand": "SanDisk",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      "slug": "silicon-power-256gb-ssd-3d-nand-a55-slc-cache-performance-boost-sata-iii-2-5",
      "description": "3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan. 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
      "price": 109,
      "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      "category": "electronics",
      "brand": "Silicon Power",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      "slug": "wd-4tb-gaming-drive-works-with-playstation-4-portable-external-hard-drive",
      "description": "Expand your PS4 gaming experience, Play anywhere. Fast and easy, setup. Sleek design with high capacity. 3-year manufacturer's limited warranty.",
      "price": 114,
      "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      "category": "electronics",
      "brand": "WD",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      "slug": "acer-sb220q-bi-21-5-inches-full-hd-1920-x-1080-ips-ultra-thin",
      "description": "21.5 inches Full HD (1920 x 1080) widescreen IPS display. And Radeon free Sync technology. No compatibility for VESA Mount. Refresh Rate: 75Hz - Using HDMI port. Zero-frame design | ultra-thin | 4ms response time | IPS panel. Aspect ratio - 16: 9. Color Supported - 16.7 million colors. Brightness - 250 nit. Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree. 75 hertz",
      "price": 599,
      "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      "category": "electronics",
      "brand": "Acer",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    { 
      "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor Super Ultrawide Screen QLED ",
      "slug": "samsung-49-inch-chg90-144hz-curved-gaming-monitor-lc49hg90dmnxza-super-ultrawide-screen-qled",
      "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
      "price": 999.99,
      "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      "category": "electronics",
      "brand": "Samsung",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },


    {
      "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      "slug": "biylacresen-women-s-3-in-1-snowboard-jacket-winter-coats",
      "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
      "price": 56.99,
      "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      "category": "women's clothing",
      "brand": "Nike",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      
      "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      "slug": "lock-and-love-women-s-removable-hooded-faux-leather-moto-biker-jacket",
      "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      "price": 29.95,
      "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      "category": "women's clothing",
      "brand": "Adidas",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      
      "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      "slug": "rain-jacket-women-windbreaker-striped-climbing-raincoats",
      "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
      "price": 39.99,
      "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      "category": "women's clothing",
      "brand": "Adidas",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
    
      "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
      "slug": "mbj-women-s-solid-short-sleeve-boat-neck-v",
      "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
      "price": 9.85,
      "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      "category": "women's clothing",
      "brand": "Louis Vuittonike",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
     
      "title": "Opna Women's Short Sleeve Moisture",
      "slug": "opna-women-s-short-sleeve-moisture",
      "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      "price": 7.95,
      "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
      "category": "women's clothing",
      "brand": "Louis Vuittonike",  
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },
    {
      "title": "DANVOUY Womens T Shirt Casual Cotton Short",
      "slug": "danvouy-womens-t-shirt-casual-cotton-short",
      "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      "price": 12.99,
      "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
      "category": "women's clothing",
      "brand": "Hermes",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 0
    },

    {
      "title": "SAMSUNG Galaxy A04e (SM-A042M/DS) Dual SIM 32GB, 6.5&quot; GSM Unlocked, International Version (32GB SD Card Bundle) - Light Blue",
      "slug": "samsung-galaxy-a04e-sm-a042m-ds-dual-sim-32gb-6-5-gsm-unlocked-international-version-32gb-sd-card-bundle-light-blue",
      "description" : "SAMSUNG Galaxy A04e (SM-A042M/DS) Dual SIM 32GB, 6.5&quot; GSM Unlocked, International Version (32GB SD Card Bundle) - Light Blue Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 111.99,
      "image": "https://m.media-amazon.com/images/I/71Nxq2DASeL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Samsung",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 86,
    },

    {
      "title": "TracFone Motorola Moto g Pure, 32GB, Blue - Prepaid Smartphone (Locked)",
      "slug": "tracfone-motorola-moto-g-pure-32gb-blue-prepaid-smartphone-locked",
      "description": "TracFone Motorola Moto g Pure, 32GB, Blue - Prepaid Smartphone (Locked) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 39.99,
      "image": "https://m.media-amazon.com/images/I/71zGrrAe5NL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Motorola",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 2454
    },

    {
      "title": "Motorola Moto G 5G | 2023 | Unlocked | Made for US 4/128GB | 48 MPCamera | Ink Blue, 163.94x74.98x8.39",
      "slug": "motorola-moto-g-5g-2023-unlocked-made-for-us-4-128gb-48-mpcamera-ink-blue",
      "description": "Motorola Moto G 5G | 2023 | Unlocked | Made for US 4/128GB | 48 MPCamera | Ink Blue, 163.94x74.98x8.39 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 179.99,
      "image": "https://m.media-amazon.com/images/I/61vgbLrWDyL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Motorola",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 91
    },
    
    {
      "title": "Apple iPhone SE 2nd Generation, US Version, 64GB, Black - Unlocked (Renewed)",
      "slug": "apple-iphone-se-2nd-generation-us-version-64gb-black-unlocked-renewed",
      "description": "Apple iPhone SE 2nd Generation, US Version, 64GB, Black - Unlocked (Renewed) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 149.00,
      "image": "https://m.media-amazon.com/images/I/813ovO0PGGL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Apple",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 14692
    },
    
    {
      "title": "VTech VS113-3 Extended Range 3 Handset Cordless Phone for Home with Call Blocking, Connect to Cell Bluetooth, 2\" Backlit Screen, Big Buttons, and Answering System, Silver & Black",
      "slug": "vtech-vs113-3-extended-range-3-handset-cordless-phone-silver-black",
      "description": "VTech VS113-3 Extended Range 3 Handset Cordless Phone for Home with Call Blocking, Connect to Cell Bluetooth, 2\" Backlit Screen, Big Buttons, and Answering System, Silver & Black Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 69.97,
      "image": "https://m.media-amazon.com/images/I/81lTDLSqg-L._AC_SX444_SY639_QL65_.jpg",
      "category": "cordless phone",
      "brand": "VTech",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 3620
    },
    
    {
      "title": "Apple iPhone 12, 64GB, Black - Fully Unlocked (Renewed)",
      "slug": "apple-iphone-12-64gb-black-fully-unlocked-renewed",
      "description": "Apple iPhone 12, 64GB, Black - Fully Unlocked (Renewed) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 319.99,
      "image": "https://m.media-amazon.com/images/I/41bIlvE1rdL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Apple",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 13961
    },
    
    {
      "title": "TracFone Samsung Galaxy A03s, 32GB, Black - Prepaid Smartphone (Locked)",
      "slug": "tracfone-samsung-galaxy-a03s-32gb-black-prepaid-smartphone-locked",
      "description": "TracFone Samsung Galaxy A03s, 32GB, Black - Prepaid Smartphone (Locked) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 54.99,
      "image": "https://m.media-amazon.com/images/I/812woqv69CL._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Samsung",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 1336
    },

    {
      "title": "Xiaomi Redmi A1 Unlocked 4G Volte Cellphone,2GB RAM + 32GB ROM,6.52\" Display, 8MP Camera,5000mAh Battery with 10W Fast Charging Smartphone (Blue)",
      "slug": "xiaomi-redmi-a1-unlocked-4g-volte-cellphone-2gb-ram-32gb-rom-blue",
      "description": "Xiaomi Redmi A1 Unlocked 4G Volte Cellphone,2GB RAM + 32GB ROM,6.52\" Display, 8MP Camera,5000mAh Battery with 10W Fast Charging Smartphone (Blue) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore ipsum dolorem quis harum quam! Tempore adipisci cum reiciendis voluptates",
      "price": 87.50,
      "image": "https://m.media-amazon.com/images/I/615O0z6987L._AC_SX444_SY639_QL65_.jpg",
      "category": "smartphone",
      "brand": "Xiaomi",
      "inStock": true,
      "quantity": 1,
      "sold": 0,
      "totalRatings": 1215
    },
    

  ],

  blogs : [
    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515704/ecommerce/blogs/mum091wa6xnr3nijgjtv.jpg",
      title: "The Beauty of Nature",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!",
      author: "65891dc494cbddff63651c27",
      category: "Nature",
      tags: ["nature", "landscape"],
  
    },
    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515706/ecommerce/blogs/njyhxef6wq8pysz810sj.jpg",
      title: "Tech Trends in 2023",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!" ,
      author: "65891dc494cbddff63651c27",
      category: "Technology",
      tags: ["tech", "innovation"],
      
    },
    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515707/ecommerce/blogs/ru64mapwijjgdvnhbqjt.jpg",
      title: "Healthy Habits for a Balanced Life",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!",
      author: "65891dc494cbddff63651c27",
      category: "Health",
      tags: ["wellness", "fitness"],
     
    },

    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515707/ecommerce/blogs/kcshletgg7ag36yeq8nr.jpg",
      title: "Discovering Ancient Civilizations",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!",
      author: "65891dc494cbddff63651c27",
      category: "History",
      tags: ["history", "archaeology"],
     
    },
    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515704/ecommerce/blogs/buftmzwh8vjqslofi7ut.jpg",
      title: "Art and Creativity in Everyday Life",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!",
      author: "65891dc494cbddff63651c27",
      category: "Art",
      tags: ["art", "creativity"],
      
    },
    {
      thumbnail: "https://res.cloudinary.com/dkzqijrkd/image/upload/v1703515704/ecommerce/blogs/zjbhnu59ez3ucsxoi9hc.jpg",
      title: "Exploring Underwater Wonders",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos illo recusandae veritatis porro! Doloribus tempore fugiat distinctio magnam vitae culpa excepturi animi nobis pariatur vero ab architecto maxime veniam facilis, adipisci, saepe dolor autem reprehenderit, voluptatibus consequuntur ullam. Eaque, eius!",
      author: "65891dc494cbddff63651c27",
      category: "Travel",
      tags: ["travel", "underwater"],
    },
  ]
};

module.exports = data;



  
  
  

  