from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Retailer(models.Model):
    """Retailer model"""
    name = models.CharField(max_length=100)
    website = models.URLField()
    # logo = models.ImageField(
    #     upload_to="retailer_logos/", blank=True, null=True)
    logo = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Retailer"
        verbose_name_plural = "Retailers"


class Category(models.Model):
    """Product category model"""
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Product(models.Model):
    """Product base information model"""
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    # image = models.ImageField(
    #     upload_to="product_images/", blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name="products")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"


class ProductListing(models.Model):
    """Product listing with price information at specific retailer"""
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="listings")
    retailer = models.ForeignKey(
        Retailer, on_delete=models.CASCADE, related_name="listings")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)
    currency = models.CharField(max_length=3, default="USD")
    url = models.URLField()
    affiliate_url = models.URLField(blank=True, null=True)
    in_stock = models.BooleanField(default=True)
    free_shipping = models.BooleanField(default=False)
    estimated_delivery_days = models.PositiveIntegerField(
        blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_price_check = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.product.name} - {self.retailer.name}: {self.price} {self.currency}"

    def save(self, *args, **kwargs):
        # Auto-calculate discount percentage
        if self.original_price and self.original_price > 0:
            self.discount_percentage = (
                (self.original_price - self.price) / self.original_price) * 100
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Product Listing"
        verbose_name_plural = "Product Listings"
        unique_together = ('product', 'retailer')


class PriceHistory(models.Model):
    """Price history record"""
    product_listing = models.ForeignKey(
        ProductListing, on_delete=models.CASCADE, related_name="price_history")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product_listing.product.name} - {self.product_listing.retailer.name}: {self.price} on {self.timestamp}"

    class Meta:
        verbose_name = "Price History"
        verbose_name_plural = "Price Histories"
        ordering = ['-timestamp']


class Review(models.Model):
    """User review model"""
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField(
        choices=[(i, i) for i in range(1, 6)])  # 1-5 stars
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s review of {self.product.name} - {self.rating}★"

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        unique_together = ('product', 'user')

class PriceAlert(models.Model):
    user = models.ForeignKey(User, related_name='price_alerts', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='price_alerts', on_delete=models.CASCADE)
    target_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alert for {self.user.username} on {self.product.name}"
