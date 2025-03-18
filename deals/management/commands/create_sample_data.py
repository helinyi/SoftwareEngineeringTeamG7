import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.models import User
from deals.models import Retailer, Category, Product, ProductListing, PriceHistory, Review


class Command(BaseCommand):
    help = 'Creates sample data for the DealScout application'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        PriceHistory.objects.all().delete()
        Review.objects.all().delete()
        ProductListing.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        Retailer.objects.all().delete()

        # Create sample retailers
        self.stdout.write('Creating retailers...')
        retailers = [
            Retailer(name='Amazon', website='https://amazon.com', is_active=True),
            Retailer(name='Best Buy',
                     website='https://bestbuy.com', is_active=True),
            Retailer(name='Walmart', website='https://walmart.com',
                     is_active=True),
            Retailer(name='Target', website='https://target.com', is_active=True),
            Retailer(name='Newegg', website='https://newegg.com', is_active=True),
            Retailer(name='B&H Photo',
                     website='https://bhphotovideo.com', is_active=True),
            Retailer(name='Apple Store',
                     website='https://apple.com', is_active=True),
            Retailer(name='Costco', website='https://costco.com', is_active=True),
        ]
        Retailer.objects.bulk_create(retailers)

        # Create categories
        self.stdout.write('Creating categories...')
        main_categories = [
            Category(name='Electronics'),
            Category(name='Computers'),
            Category(name='Home & Kitchen'),
            Category(name='Clothing'),
            Category(name='Beauty & Personal Care'),
            Category(name='Sports & Outdoors'),
            Category(name='Toys & Games'),
            Category(name='Books'),
        ]
        Category.objects.bulk_create(main_categories)

        # Create sub-categories
        electronics = Category.objects.get(name='Electronics')
        computers = Category.objects.get(name='Computers')

        sub_categories = [
            Category(name='Smartphones', parent=electronics),
            Category(name='Tablets', parent=electronics),
            Category(name='Headphones', parent=electronics),
            Category(name='TVs', parent=electronics),
            Category(name='Smart Home', parent=electronics),
            Category(name='Laptops', parent=computers),
            Category(name='Desktops', parent=computers),
            Category(name='Computer Accessories', parent=computers),
        ]
        Category.objects.bulk_create(sub_categories)

        # Get all categories for later use
        all_categories = list(Category.objects.all())
        smartphones = Category.objects.get(name='Smartphones')
        laptops = Category.objects.get(name='Laptops')
        headphones = Category.objects.get(name='Headphones')

        # Create sample products
        self.stdout.write('Creating products...')

        random_product_image_urls = [
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/02a18b87-a932-4efe-952a-a9abdf697872.jpg.maxHe.1",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/317b99e1-058d-4162-88c9-051faf76b924.jpg.maxHe.1",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/47537b58-ed79-46ba-b1cd-769f2ad76c8c.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/5821705_rd.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/5835839_rd.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/5a16cc23-ca60-45a9-a35a-50094ca7c1e0.jpg.maxHe.1",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/6482022_sd.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/6577962cv11d.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/6580408_sd.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/a865afc6-df8f-45bd-b39d-e024f8d1d199.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/d19019e7-2189-4d58-8154-5a7b722613e8.jpg.maxHe.1",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/fe9e7176-5aef-4bc7-992d-737e648553a5.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/febf7ab0-81e4-4428-8230-a25dc434aaee.jpg",
            "https://github.com/helinyi/SoftwareEngineeringTeamG7/releases/download/fakeimagestorage/ref2217250-ybbst-lv-cb-ee26a221-cf92-448a-a43a-9979fd7d1d88.png"
        ]

        products = [
            # Smartphones
            Product(name='iPhone 14 Pro', brand='Apple',
                    description='The latest iPhone with Pro camera system, A16 Bionic, and Dynamic Island.', image=random.choice(random_product_image_urls)),
            Product(name='Samsung Galaxy S23 Ultra', brand='Samsung',
                    description='Samsung\'s flagship with S Pen, 200MP camera, and long battery life.', image=random.choice(random_product_image_urls)),
            Product(name='Google Pixel 7 Pro', brand='Google',
                    description='Google\'s best phone with advanced Tensor processing and superior camera.', image=random.choice(random_product_image_urls)),
            Product(name='OnePlus 11', brand='OnePlus',
                    description='Fast charging, smooth performance, and Hasselblad camera tuning.', image=random.choice(random_product_image_urls)),

            # Laptops
            Product(name='MacBook Pro 16', brand='Apple',
                    description='Powerful laptop for professionals with M2 chip and stunning display.', image=random.choice(random_product_image_urls)),
            Product(name='Dell XPS 15', brand='Dell',
                    description='Premium Windows laptop with InfinityEdge display and strong performance.', image=random.choice(random_product_image_urls)),
            Product(name='Lenovo ThinkPad X1 Carbon', brand='Lenovo',
                    description='Business laptop with great keyboard, long battery life, and durability.', image=random.choice(random_product_image_urls)),
            Product(name='HP Spectre x360', brand='HP',
                    description='Convertible 2-in-1 laptop with elegant design and OLED display option.', image=random.choice(random_product_image_urls)),

            # Headphones
            Product(name='Sony WH-1000XM5', brand='Sony',
                    description='Industry-leading noise cancellation and exceptional sound quality.', image=random.choice(random_product_image_urls)),
            Product(name='Apple AirPods Pro 2', brand='Apple',
                    description='Active noise cancellation, transparency mode, and spatial audio.', image=random.choice(random_product_image_urls)),
            Product(name='Bose QuietComfort Ultra', brand='Bose',
                    description='Premium noise cancellation headphones with comfortable design.', image=random.choice(random_product_image_urls)),
            Product(name='Sennheiser Momentum 4', brand='Sennheiser',
                    description='Audiophile-grade sound with very long battery life.', image=random.choice(random_product_image_urls)),
        ]

        # Bulk create products
        Product.objects.bulk_create(products)

        # Assign categories to products
        products = Product.objects.all()

        # Assign smartphones
        for product in products[:4]:
            product.categories.add(smartphones)
            product.categories.add(electronics)

        # Assign laptops
        for product in products[4:8]:
            product.categories.add(laptops)
            product.categories.add(computers)

        # Assign headphones
        for product in products[8:]:
            product.categories.add(headphones)
            product.categories.add(electronics)

        # Create product listings (prices at different retailers)
        self.stdout.write('Creating product listings...')
        retailers = Retailer.objects.all()
        products = Product.objects.all()

        product_listings = []

        for product in products:
            # Generate 3-5 listings per product at different retailers
            num_listings = random.randint(3, 5)
            selected_retailers = random.sample(list(retailers), num_listings)

            # Random base price between $100 and $1500
            base_price = random.randint(100, 1500)

            for retailer in selected_retailers:
                # Vary the price slightly between retailers (±10%)
                price_variation = random.uniform(-0.1, 0.1)
                current_price = base_price * (1 + price_variation)

                # Decide if there's a discount
                has_discount = random.choice([True, False])
                original_price = None
                if has_discount:
                    discount_percent = random.uniform(
                        0.05, 0.3)  # 5% to 30% discount
                    original_price = current_price / (1 - discount_percent)

                # Random shipping options
                free_shipping = random.choice([True, False])
                delivery_days = random.randint(
                    1, 7) if not free_shipping else None

                product_listings.append(ProductListing(
                    product=product,
                    retailer=retailer,
                    price=round(current_price, 2),
                    original_price=round(
                        original_price, 2) if original_price else None,
                    currency='USD',
                    url=f'{retailer.website}/product/{product.id}',
                    # url=random.choice(random_product_urls),
                    affiliate_url=f'{retailer.website}/affiliate/{product.id}?ref=dealscout',
                    # 90% chance it's in stock
                    in_stock=random.choice([True] * 9 + [False]),
                    free_shipping=free_shipping,
                    estimated_delivery_days=delivery_days,
                    last_price_check=timezone.now()
                ))

        # Bulk create product listings
        ProductListing.objects.bulk_create(product_listings)

        # Create price history records
        self.stdout.write('Creating price history...')
        history_entries = []

        for listing in ProductListing.objects.all():
            current_price = listing.price

            # Create price history for the past 30 days
            for days_ago in range(30, 0, -1):
                date = timezone.now() - timedelta(days=days_ago)

                # Random price fluctuation (±5%)
                fluctuation = random.uniform(-0.05, 0.05)
                historic_price = float(current_price) * (1 + fluctuation)

                history_entries.append(PriceHistory(
                    product_listing=listing,
                    price=round(historic_price, 2),
                    timestamp=date
                ))

        # Bulk create price history
        PriceHistory.objects.bulk_create(history_entries)

        # Create sample user for reviews if not exists
        if not User.objects.filter(username='sampleuser').exists():
            User.objects.create_user(
                username='sampleuser',
                email='sample@example.com',
                password='password123'
            )

        sample_user = User.objects.get(username='sampleuser')

        # Create reviews
        self.stdout.write('Creating reviews...')
        reviews = []

        # Create a few more sample users for reviews
        sample_users = []
        for i in range(5):
            username = f'sampleuser{i+1}'
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(
                    username=username,
                    email=f'sample{i+1}@example.com',
                    password='password123'
                )
            sample_users.append(User.objects.get(username=username))

        for product in Product.objects.all():
            # Add 0-3 reviews per product, ensuring different users
            num_reviews = min(random.randint(0, 3), len(sample_users))

            # Randomly select users for this product (no duplicates)
            selected_users = random.sample(sample_users, num_reviews)

            for user in selected_users:
                # Mostly positive reviews (3-5 stars)
                rating = random.randint(3, 5)

                reviews.append(Review(
                    product=product,
                    user=user,
                    rating=rating,
                    comment=f"This is a sample review from {user.username} for {product.name}. I {'really ' if rating >= 4 else ''}like this product!",
                    created_at=timezone.now() - timedelta(days=random.randint(1, 60))
                ))

        # Bulk create reviews
        Review.objects.bulk_create(reviews)

        self.stdout.write(self.style.SUCCESS(
            'Successfully created sample data!'))
        self.stdout.write(self.style.SUCCESS(
            f'Created {Product.objects.count()} products'))
        self.stdout.write(self.style.SUCCESS(
            f'Created {ProductListing.objects.count()} product listings'))
        self.stdout.write(self.style.SUCCESS(
            f'Created {PriceHistory.objects.count()} price history records'))
        self.stdout.write(self.style.SUCCESS(
            f'Created {Review.objects.count()} reviews'))
