from rest_framework import serializers
from .models import Product, ProductListing, Category, Retailer, PriceHistory, Review


class RetailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retailer
        fields = ['id', 'name', 'website', 'logo']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent']


class ProductListingSerializer(serializers.ModelSerializer):
    retailer_name = serializers.CharField(source='retailer.name', read_only=True)
    retailer_logo = serializers.SerializerMethodField()
    current_price = serializers.DecimalField(source='price', max_digits=10, decimal_places=2)
    last_updated = serializers.DateTimeField(source='updated_at')
    
    class Meta:
        model = ProductListing
        fields = ['id', 'url', 'current_price', 'original_price', 'discount_percentage', 
                  'retailer', 'retailer_name', 'retailer_logo', 'last_updated', 'in_stock']
    
    def get_retailer_logo(self, obj):
        request = self.context.get('request')
        if obj.retailer.logo:
            return obj.retailer.logo
        return None


class ProductListSerializer(serializers.ModelSerializer):
    best_price = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'image', 'categories', 'category_name', 
                  'best_price', 'discount', 'created_at']
    
    def get_category_name(self, obj):
        # Get first category name for display purposes
        category = obj.categories.first()
        return category.name if category else ""
    
    def get_best_price(self, obj):
        listings = obj.listings.filter(in_stock=True).order_by('price')
        return listings.first().price if listings.exists() else None
    
    def get_discount(self, obj):
        listings = obj.listings.filter(in_stock=True).order_by('-discount_percentage')
        return listings.first().discount_percentage if listings.exists() else 0


class ProductDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    listings = ProductListingSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'description', 'image', 'categories', 
                  'listings', 'created_at', 'updated_at']


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'username', 'rating', 'comment', 'created_at']


class PriceHistorySerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(source='product_listing', read_only=True)
    date = serializers.DateTimeField(source='timestamp')
    
    class Meta:
        model = PriceHistory
        fields = ['id', 'listing', 'price', 'date']