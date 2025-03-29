import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiBarChart2, FiShoppingCart, FiImage } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';
import ProductComparison from './ProductComparison';
import ProductReviews from './ProductReviews';
import ProductSpecifications from './ProductSpecifications';
import ProductPricing from './ProductPricing';

// Mock data for demonstration
const mockProducts = {
  'iphone-15': {
    id: 'iphone-15',
    name: 'Apple iPhone 15',
    brand: 'Apple',
    category: 'phone',
    image: '/images/products/iphone15.jpg',
    price: 799,
    rating: 8.9,
    reviewCount: 2134,
    subRatings: [
      { name: 'Build Quality', value: 8.4 },
      { name: 'Display Quality', value: 9.0 },
      { name: 'Battery Life', value: 8.5 },
      { name: 'Photography', value: 9.1 },
      { name: 'Performance', value: 9.3 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Apple', isKey: true },
              { name: 'Model', value: 'iPhone 15', isKey: true },
              { name: 'Release Date', value: 'September 2023', isKey: true },
              { name: 'Operating System', value: ' iOS 17', isKey: true }
            ]
          }
        ]
      },
      {
        category: 'Hardware',
        groups: [
          {
            name: 'Processor & Memory',
            items: [
              { name: 'Processor', value: 'Apple A16 Bionic', isKey: true },
              { name: 'CPU Cores', value: '6-core (2 performance + 4 efficiency)' },
              { name: 'GPU', value: '5-core' },
              { name: 'RAM', value: '6 GB', isKey: true },
              { name: 'Storage Options', value: '128GB, 256GB, 512GB', isKey: true }
            ]
          },
          {
            name: 'Battery',
            items: [
              { name: 'Capacity', value: '3349 mAh', isKey: true },
              { name: 'Technology', value: 'Lithium-ion' },
              { name: 'Fast Charging', value: 'Yes, up to 50% in 30 minutes (20W)' },
              { name: 'Wireless Charging', value: 'Yes, MagSafe and Qi wireless charging' }
            ]
          }
        ]
      },
      {
        category: 'Display',
        groups: [
          {
            name: 'Screen',
            items: [
              { name: 'Type', value: 'Super Retina XDR OLED', isKey: true },
              { name: 'Size', value: '6.1 inches', isKey: true },
              { name: 'Resolution', value: '2556 x 1179 pixels at 460 ppi' },
              { name: 'Technology', value: 'HDR, True Tone, Wide color (P3)' },
              { name: 'Brightness', value: '1,000 nits (typical), 2,000 nits (peak)' },
              { name: 'Refresh Rate', value: '60 Hz' },
              { name: 'Protection', value: 'Ceramic Shield' }
            ]
          }
        ]
      },
      {
        category: 'Camera',
        groups: [
          {
            name: 'Main Camera',
            items: [
              { name: 'Main Sensor', value: '48 MP, f/1.6, 26mm', isKey: true },
              { name: 'Secondary Sensor', value: '12 MP ultrawide, f/2.4, 120˚' },
              { name: 'Features', value: 'Dual-pixel PDAF, sensor-shift OIS, Smart HDR 4' },
              { name: 'Video Recording', value: '4K@24/30/60fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR' }
            ]
          },
          {
            name: 'Front Camera',
            items: [
              { name: 'Sensor', value: '12 MP, f/1.9, 23mm', isKey: false },
              { name: 'Features', value: 'Face detection, HDR, Photonic Engine' },
              { name: 'Video Recording', value: '4K@24/30/60fps, 1080p@30/60/120fps, gyro-EIS' }
            ]
          }
        ]
      },
      {
        category: 'Design',
        groups: [
          {
            name: 'Physical Specifications',
            items: [
              { name: 'Dimensions', value: '147.6 x 71.6 x 7.8 mm', isKey: false },
              { name: 'Weight', value: '171g', isKey: false },
              { name: 'Build', value: 'Glass front (Ceramic Shield), glass back, aluminum frame' },
              { name: 'SIM', value: 'Nano-SIM and eSIM' },
              { name: 'Water Resistance', value: 'IP68 dust/water resistant (up to 6m for 30 mins)' },
              { name: 'Colors', value: 'Black, Blue, Green, Pink, Yellow', isKey: true }
            ]
          }
        ]
      },
      {
        category: 'Connectivity',
        groups: [
          {
            name: 'Network & Connectivity',
            items: [
              { name: '5G', value: 'Yes' },
              { name: 'Wi-Fi', value: 'Wi-Fi 6 (802.11ax)' },
              { name: 'Bluetooth', value: 'Bluetooth 5.3' },
              { name: 'GPS', value: 'GPS, GLONASS, GALILEO, BDS, QZSS' },
              { name: 'NFC', value: 'Yes' },
              { name: 'USB', value: 'USB-C 2.0' }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Apple Store',
        vendorLogo: '/images/vendors/apple.png',
        vendorRating: 4.8,
        ratingCount: 12543,
        price: 799.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1-2 business days',
        vendorUrl: 'https://www.apple.com/'
      },
      {
        vendorName: 'Amazon',
        vendorLogo: '/images/vendors/amazon.png',
        vendorRating: 4.7,
        ratingCount: 9876,
        price: 789.00,
        originalPrice: 799.00,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1 business day with Prime',
        vendorUrl: 'https://www.amazon.com/'
      },
      {
        vendorName: 'Best Buy',
        vendorLogo: '/images/vendors/bestbuy.png',
        vendorRating: 4.5,
        ratingCount: 7654,
        price: 799.00,
        originalPrice: null,
        freeShipping: false,
        shippingCost: 5.99,
        inStock: true,
        deliveryEstimate: '3-5 business days',
        vendorUrl: 'https://www.bestbuy.com/'
      },
      {
        vendorName: 'Walmart',
        vendorLogo: '/images/vendors/walmart.png',
        vendorRating: 4.3,
        ratingCount: 5421,
        price: 779.00,
        originalPrice: 799.00,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '2-3 business days',
        vendorUrl: 'https://www.walmart.com/'
      }
    ],
    reviews: [
      {
        id: 1,
        username: 'TechEnthusiast',
        avatar: '/images/users/user1.jpg',
        rating: 4.5,
        date: '2023-10-15',
        title: 'Solid upgrade from my iPhone 13',
        text: 'I upgraded from an iPhone 13 and I can definitely notice the improvements. The camera system is significantly better, especially in low light. The A16 chip handles everything I throw at it without a hitch. Battery life seems improved, but not dramatically so. The Dynamic Island is actually more useful than I expected. Overall, very satisfied with the purchase and would recommend it to anyone looking for an upgrade from an older model.',
        helpfulVotes: 45,
        unhelpfulVotes: 3,
        verified: true
      },
      {
        id: 2,
        username: 'MobilePhotographer',
        avatar: '/images/users/user2.jpg',
        rating: 5.0,
        date: '2023-10-12',
        title: 'The camera is phenomenal',
        text: 'As someone who uses their phone primarily for photography, I am blown away by the iPhone 15 camera system. The 48MP main sensor captures incredible detail, and the computational photography features are next level. Portrait mode has improved significantly, and the new photographic styles give you more creative control. Night mode is also better than ever. If you care about mobile photography, this is currently the phone to beat.',
        helpfulVotes: 63,
        unhelpfulVotes: 5,
        verified: true
      },
      {
        id: 3,
        username: 'CasualUser123',
        avatar: null,
        rating: 4.0,
        date: '2023-10-20',
        title: 'Good phone, but incremental upgrade',
        text: 'Coming from an iPhone 14, the differences are subtle. Yes, the camera is better and the processor is faster, but in day-to-day use, you might not notice a huge difference. The switch to USB-C is welcome and long overdue. Build quality is excellent as expected from Apple. If you have last year\'s model, you might want to wait for the next generation unless you really need the latest and greatest.',
        helpfulVotes: 32,
        unhelpfulVotes: 7,
        verified: true
      },
      {
        id: 4,
        username: 'PowerUser2023',
        avatar: '/images/users/user4.jpg',
        rating: 4.5,
        date: '2023-11-02',
        title: 'Great performance, decent battery life',
        text: 'The A16 Bionic chip is an absolute powerhouse. Apps open instantly, games run smoothly, and multitasking is a breeze. iOS 17 feels very polished on this hardware. Battery life is good, though not revolutionary - I can get through a full day of heavy use, but power users will still want to carry a charger for long days. The display is beautiful with excellent color accuracy. My only complaint is that it still has a 60Hz refresh rate when competitors offer 120Hz at similar price points.',
        helpfulVotes: 28,
        unhelpfulVotes: 2,
        verified: true
      },
      {
        id: 5,
        username: 'AndroidConverter',
        avatar: null,
        rating: 3.5,
        date: '2023-10-25',
        title: 'Solid iPhone but missing some Android features',
        text: 'After 8 years on Android, I switched to the iPhone 15. There are things I love: the ecosystem integration with my MacBook is seamless, the camera is excellent, and the build quality is premium. However, I miss the customization options from Android, and the 60Hz display feels dated coming from a 120Hz Android phone. Notification management is still not as good as Android. That said, I\'m enjoying the switch overall and appreciate the stability and long-term software support Apple provides.',
        helpfulVotes: 41,
        unhelpfulVotes: 9,
        verified: false
      }
    ]
  },
  'redmagic10-pro-5g': {
    id: 'redmagic10-pro-5g',
    name: 'RedMagic 10 Pro 5G',
    brand: 'RedMagic',
    category: 'phone',
    image: '/images/products/redmagic10-pro-5g.jpg',
    price: 799,
    rating: 8.8,
    reviewCount: 1876,
    subRatings: [
      { name: 'Build Quality', value: 8.7 },
      { name: 'Display Quality', value: 9.3 },
      { name: 'Battery Life', value: 9.2 },
      { name: 'Photography', value: 8.6 },
      { name: 'Performance', value: 9.5 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'RedMagic', isKey: true },
              { name: 'Model', value: 'RedMagic 10 Pro 5G', isKey: true },
              { name: 'Release Date', value: 'March 2024', isKey: true },
              { name: 'Operating System', value: 'Android 14, RedMagic OS 9.0', isKey: true }
            ]
          }
        ]
      },
      {
        category: 'Hardware',
        groups: [
          {
            name: 'Processor & Memory',
            items: [
              { name: 'Processor', value: 'Snapdragon 8 Gen 3', isKey: true },
              { name: 'CPU Cores', value: '1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520' },
              { name: 'GPU', value: 'Adreno 750' },
              { name: 'RAM', value: '16 GB LPDDR5X', isKey: true },
              { name: 'Storage Options', value: '256GB, 512GB, 1TB UFS 4.0', isKey: true }
            ]
          },
          {
            name: 'Battery',
            items: [
              { name: 'Capacity', value: '6500 mAh', isKey: true },
              { name: 'Technology', value: 'Lithium-ion' },
              { name: 'Fast Charging', value: 'Yes, 165W wired' },
              { name: 'Wireless Charging', value: 'Yes, 15W Qi' }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'RedMagic Store',
        vendorLogo: '/images/vendors/redmagic.png',
        vendorRating: 4.6,
        ratingCount: 7654,
        price: 799.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1-3 business days',
        vendorUrl: 'https://www.redmagic.gg/'
      },
      {
        vendorName: 'Amazon',
        vendorLogo: '/images/vendors/amazon.png',
        vendorRating: 4.7,
        ratingCount: 8543,
        price: 789.00,
        originalPrice: 799.00,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1 business day with Prime',
        vendorUrl: 'https://www.amazon.com/'
      }
    ],
    reviews: [
      {
        id: 1,
        username: 'GamingEnthusiast',
        avatar: '/images/users/user5.jpg',
        rating: 4.8,
        date: '2024-03-10',
        title: 'Ultimate Gaming Smartphone',
        text: 'The RedMagic 10 Pro is a beast for mobile gaming. The 165Hz display with 960Hz touch sampling rate makes every game feel incredibly responsive. The built-in cooling fan actually works - I can play Genshin Impact for hours without thermal throttling. The shoulder triggers are a game-changer for FPS titles. Battery life is outstanding even with heavy gaming sessions. The only downside is the camera, which is good but not flagship-level. If gaming is your priority, this is the phone to get.',
        helpfulVotes: 47,
        unhelpfulVotes: 3,
        verified: true
      },
      {
        id: 2,
        username: 'TechReviewer',
        avatar: '/images/users/user6.jpg',
        rating: 4.5,
        date: '2024-03-15',
        title: 'Performance monster with a few quirks',
        text: 'The RedMagic 10 Pro delivers unmatched performance with the Snapdragon 8 Gen 3 and 16GB RAM. Games run flawlessly at max settings, and the active cooling makes a noticeable difference during extended sessions. The 6500mAh battery is incredible - easily two days of normal use. The 165W charging is mind-blowing, going from 0-100% in about 20 minutes. The software has improved but still has occasional translation issues and bugs. Camera is decent in good lighting but struggles in low light. If you want the absolute best gaming performance and battery life, this is it.',
        helpfulVotes: 38,
        unhelpfulVotes: 5,
        verified: true
      }
    ]
  },
  'pixel9-pro': {
    id: 'pixel9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'phone',
    image: '/images/products/pixel9-pro.jpg',
    price: 899,
    rating: 9.1,
    reviewCount: 1843,
    subRatings: [
      { name: 'Build Quality', value: 8.8 },
      { name: 'Display Quality', value: 9.2 },
      { name: 'Battery Life', value: 8.7 },
      { name: 'Photography', value: 9.7 },
      { name: 'Performance', value: 9.0 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Google', isKey: true },
              { name: 'Model', value: 'Pixel 9 Pro', isKey: true },
              { name: 'Release Date', value: 'October 2023', isKey: true },
              { name: 'Operating System', value: 'Android 14', isKey: true }
            ]
          }
        ]
      },
      {
        category: 'Hardware',
        groups: [
          {
            name: 'Processor & Memory',
            items: [
              { name: 'Processor', value: 'Google Tensor G4', isKey: true },
              { name: 'CPU Cores', value: '1x3.0 GHz Cortex-X4 & 3x2.8 GHz Cortex-A720 & 4x2.0 GHz Cortex-A520' },
              { name: 'GPU', value: 'Adreno 740' },
              { name: 'RAM', value: '12 GB LPDDR5X', isKey: true },
              { name: 'Storage Options', value: '128GB, 256GB, 512GB, 1TB UFS 4.0', isKey: true }
            ]
          },
          {
            name: 'Display',
            items: [
              { name: 'Type', value: 'LTPO OLED', isKey: true },
              { name: 'Size', value: '6.7 inches', isKey: true },
              { name: 'Resolution', value: '1440 x 3120 pixels' },
              { name: 'Refresh Rate', value: '1-120Hz adaptive' },
              { name: 'Brightness', value: '2,400 nits peak' },
              { name: 'Protection', value: 'Gorilla Glass Victus 2' }
            ]
          },
          {
            name: 'Camera',
            items: [
              { name: 'Main Camera', value: '50MP, f/1.7, OIS', isKey: true },
              { name: 'Ultra-wide', value: '48MP, f/1.8, 125° FoV' },
              { name: 'Telephoto', value: '48MP, f/2.8, 5x optical zoom' },
              { name: 'Front Camera', value: '12MP, f/2.2, 4K video' }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Google Store',
        vendorLogo: '/images/vendors/google.png',
        vendorRating: 4.6,
        ratingCount: 7654,
        price: 899.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '2-3 business days',
        vendorUrl: 'https://store.google.com/'
      },
      {
        vendorName: 'Best Buy',
        vendorLogo: '/images/vendors/bestbuy.png',
        vendorRating: 4.5,
        ratingCount: 6543,
        price: 899.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1-2 business days',
        vendorUrl: 'https://www.bestbuy.com/'
      },
      {
        vendorName: 'Amazon',
        vendorLogo: '/images/vendors/amazon.png',
        vendorRating: 4.7,
        ratingCount: 8543,
        price: 879.00,
        originalPrice: 899.00,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1 business day with Prime',
        vendorUrl: 'https://www.amazon.com/'
      }
    ],
    reviews: [
      {
        id: 1,
        username: 'PixelFan',
        avatar: null,
        rating: 4.8,
        date: '2023-11-10',
        title: 'Computational Photography Champion',
        text: 'The Pixel 9 Pro continues Google\'s tradition of offering the best computational photography in the smartphone world. The new 48MP telephoto with 5x optical zoom is incredible - photos at 10x digital zoom still look amazingly detailed. Night Sight has improved dramatically, capturing details in near darkness that other phones simply miss. The Tensor G4 chip handles AI tasks beautifully, with Magic Editor and Best Take features that feel like magic. Battery life has finally caught up to competitors, easily lasting a full day of heavy use. The clean Android experience remains a joy to use, with helpful AI features that don\'t feel gimmicky.',
        helpfulVotes: 52,
        unhelpfulVotes: 3,
        verified: true
      },
      {
        id: 2,
        username: 'TechJournalist',
        avatar: '/images/users/user7.jpg',
        rating: 4.7,
        date: '2023-11-15',
        title: 'Google\'s Most Refined Flagship Yet',
        text: 'After years of refinement, the Pixel 9 Pro feels like Google\'s most complete flagship yet. The camera system is unmatched for still photography, with the 48MP telephoto lens delivering incredible zoom shots. Video has improved dramatically, finally competing with Apple and Samsung. The 120Hz LTPO display is gorgeous with perfect color calibration and excellent outdoor visibility. Performance is smooth with the Tensor G4, though still not quite matching Snapdragon\'s raw power. Battery life is excellent, easily lasting a full day. The biggest improvement is in thermals - the phone stays cool even under load. If you value camera quality and clean software above all else, this is the Android phone to get.',
        helpfulVotes: 47,
        unhelpfulVotes: 4,
        verified: true
      }
    ]
  },
  'macbook-pro-16': {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'laptop',
    image: '/images/products/macbook-pro-16.jpg',
    price: 2499,
    rating: 9.2,
    reviewCount: 1245,
    subRatings: [
      { name: 'Build Quality', value: 9.5 },
      { name: 'Display Quality', value: 9.8 },
      { name: 'Battery Life', value: 9.0 },
      { name: 'Performance', value: 9.6 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Apple', isKey: true },
              { name: 'Model', value: 'MacBook Pro 16"', isKey: true },
              { name: 'Release Date', value: 'October 2023', isKey: true },
              { name: 'Operating System', value: 'macOS Sonoma', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Apple Store',
        vendorLogo: '/images/vendors/apple.png',
        vendorRating: 4.8,
        ratingCount: 12543,
        price: 2499.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1-2 business days',
        vendorUrl: 'https://www.apple.com/'
      }
    ],
    reviews: []
  },
  'dell-xps-15': {
    id: 'dell-xps-15',
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'laptop',
    image: '/images/products/dell-xps-15.jpg',
    price: 1999,
    rating: 8.9,
    reviewCount: 876,
    subRatings: [
      { name: 'Build Quality', value: 9.0 },
      { name: 'Display Quality', value: 9.2 },
      { name: 'Battery Life', value: 8.5 },
      { name: 'Performance', value: 9.1 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Dell', isKey: true },
              { name: 'Model', value: 'XPS 15', isKey: true },
              { name: 'Release Date', value: 'June 2023', isKey: true },
              { name: 'Operating System', value: 'Windows 11', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Dell Store',
        vendorLogo: '/images/vendors/dell.png',
        vendorRating: 4.5,
        ratingCount: 7654,
        price: 1999.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '3-5 business days',
        vendorUrl: 'https://www.dell.com/'
      }
    ],
    reviews: []
  },
  'thinkpad-x1': {
    id: 'thinkpad-x1',
    name: 'Lenovo ThinkPad X1',
    brand: 'Lenovo',
    category: 'laptop',
    image: '/images/products/thinkpad-x1.jpg',
    price: 1699,
    rating: 8.7,
    reviewCount: 654,
    subRatings: [
      { name: 'Build Quality', value: 9.2 },
      { name: 'Display Quality', value: 8.5 },
      { name: 'Battery Life', value: 8.8 },
      { name: 'Performance', value: 8.9 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Lenovo', isKey: true },
              { name: 'Model', value: 'ThinkPad X1', isKey: true },
              { name: 'Release Date', value: 'January 2023', isKey: true },
              { name: 'Operating System', value: 'Windows 11 Pro', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Lenovo Store',
        vendorLogo: '/images/vendors/lenovo.png',
        vendorRating: 4.3,
        ratingCount: 5432,
        price: 1699.00,
        originalPrice: 1899.00,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '2-4 business days',
        vendorUrl: 'https://www.lenovo.com/'
      }
    ],
    reviews: []
  },
  'airpods-pro': {
    id: 'airpods-pro',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'earpods',
    image: '/images/products/airpods-pro.jpg',
    price: 249,
    rating: 8.8,
    reviewCount: 2345,
    subRatings: [
      { name: 'Sound Quality', value: 9.0 },
      { name: 'Noise Cancellation', value: 9.2 },
      { name: 'Battery Life', value: 8.5 },
      { name: 'Comfort', value: 8.7 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Apple', isKey: true },
              { name: 'Model', value: 'AirPods Pro 2', isKey: true },
              { name: 'Release Date', value: 'September 2022', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Apple Store',
        vendorLogo: '/images/vendors/apple.png',
        vendorRating: 4.8,
        ratingCount: 12543,
        price: 249.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '1-2 business days',
        vendorUrl: 'https://www.apple.com/'
      }
    ],
    reviews: []
  },
  'pixel-buds': {
    id: 'pixel-buds',
    name: 'Pixel Buds Pro',
    brand: 'Google',
    category: 'earpods',
    image: '/images/products/pixel-buds.jpg',
    price: 199,
    rating: 8.5,
    reviewCount: 1234,
    subRatings: [
      { name: 'Sound Quality', value: 8.7 },
      { name: 'Noise Cancellation', value: 8.5 },
      { name: 'Battery Life', value: 8.8 },
      { name: 'Comfort', value: 8.6 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Google', isKey: true },
              { name: 'Model', value: 'Pixel Buds Pro', isKey: true },
              { name: 'Release Date', value: 'July 2022', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Google Store',
        vendorLogo: '/images/vendors/google.png',
        vendorRating: 4.6,
        ratingCount: 7654,
        price: 199.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '2-3 business days',
        vendorUrl: 'https://store.google.com/'
      }
    ],
    reviews: []
  },
  'galaxy-watch6': {
    id: 'galaxy-watch6',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung',
    category: 'watch',
    image: '/images/products/galaxy-watch6.jpg',
    price: 399,
    rating: 8.6,
    reviewCount: 987,
    subRatings: [
      { name: 'Build Quality', value: 8.8 },
      { name: 'Display Quality', value: 9.0 },
      { name: 'Battery Life', value: 8.2 },
      { name: 'Features', value: 8.9 }
    ],
    specifications: [
      {
        category: 'General',
        groups: [
          {
            name: 'Basic Information',
            items: [
              { name: 'Brand', value: 'Samsung', isKey: true },
              { name: 'Model', value: 'Galaxy Watch 6', isKey: true },
              { name: 'Release Date', value: 'August 2023', isKey: true }
            ]
          }
        ]
      }
    ],
    pricingData: [
      {
        vendorName: 'Samsung Store',
        vendorLogo: '/images/vendors/samsung.png',
        vendorRating: 4.5,
        ratingCount: 8765,
        price: 399.00,
        originalPrice: null,
        freeShipping: true,
        shippingCost: 0,
        inStock: true,
        deliveryEstimate: '2-4 business days',
        vendorUrl: 'https://www.samsung.com/'
      }
    ],
    reviews: []
  }
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showComparison, setShowComparison] = useState(false);
  const [compareProductId, setCompareProductId] = useState(null);
  const [activeTab, setActiveTab] = useState('specifications');
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const product = mockProducts[productId];
  
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [product]);
  
  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const handleCompareClick = () => {
    setShowComparison(!showComparison);
    setCompareProductId(null);
  };

  const handleProductSelect = (id) => {
    setCompareProductId(id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('Product image failed to load:', e.target.src);
    
    if (product.id === 'redmagic10-pro-5g' || product.id === 'pixel9-pro') {
      e.target.src = `/images/products/${product.id}.jpg`;
    } else {
      e.target.src = '/images/products/placeholder-product.jpg';
    }
    e.target.onerror = null;
    setImageLoaded(true);
  };

  const handleComparisonImageError = (e) => {
    console.error('Comparison image failed to load:', e.target.src);
    
    const path = e.target.src;
    if (path.includes('redmagic10-pro-5g')) {
      e.target.src = '/images/products/redmagic10-pro-5g.jpg';
    } else if (path.includes('pixel9-pro')) {
      e.target.src = '/images/products/pixel9-pro.jpg';
    } else {
      e.target.src = '/images/products/placeholder-small.jpg';
    }
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-placeholder">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back to Products
        </button>
        <h1>{product.name}</h1>
      </div>

      {showComparison && compareProductId ? (
        <ProductComparison 
          product1={product} 
          product2={mockProducts[compareProductId]} 
          onClose={() => {
            setShowComparison(false);
            setCompareProductId(null);
          }}
        />
      ) : (
        <>
          <div className="product-detail-main">
            <div className="product-image-section">
              <div className="product-image-container">
                {!imageLoaded && <div className="loading-placeholder"><FiImage size={48} /></div>}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image" 
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
              
              <div className="product-actions">
                <button className="compare-button" onClick={handleCompareClick}>
                  <FiBarChart2 /> Compare with another product
                </button>
                <button className="buy-now-button">
                  <FiShoppingCart /> Buy Now (${product.price})
                </button>
              </div>
              
              {showComparison && !compareProductId && (
                <div className="comparison-selector">
                  <h3>Select a product to compare with:</h3>
                  <div className="comparison-options">
                    {Object.values(mockProducts)
                      .filter(p => p.id !== product.id && p.category === product.category)
                      .map(p => (
                        <div 
                          key={p.id} 
                          className="comparison-option"
                          onClick={() => handleProductSelect(p.id)}
                        >
                          <img 
                            src={p.image} 
                            alt={p.name}
                            onError={handleComparisonImageError}
                          />
                          <span>{p.name}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
            
            <div className="product-info-section">
              <div className="product-overview">
                <div className="product-brand">{product.brand}</div>
                <h2>{product.name}</h2>
                <div className="product-rating">
                  <span className="rating-value">{product.rating.toFixed(1)}</span>
                  <span className="rating-count">({product.reviewCount} reviews)</span>
                </div>
                <div className="product-price">${product.price}</div>
              </div>
              
              <div className="product-quick-specs">
                <h3>Quick Specifications</h3>
                <div className="specs-grid">
                  {product.specifications[0].groups[0].items.map((item, index) => (
                    <div key={index} className="spec-item">
                      <div className="spec-label">{item.name}</div>
                      <div className="spec-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="product-detail-tabs">
            <button 
              className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              Compare Prices
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              User Reviews
            </button>
          </div>

          <div className="product-detail-content">
            {activeTab === 'specifications' && (
              <ProductSpecifications specifications={product.specifications} />
            )}
            
            {activeTab === 'pricing' && (
              <ProductPricing pricingData={product.pricingData} />
            )}
            
            {activeTab === 'reviews' && (
              <ProductReviews 
                reviews={product.reviews} 
                overallRating={product.rating} 
                subRatings={product.subRatings} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail; 