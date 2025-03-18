from rest_framework import viewsets, generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Min, Max, Count
from .models import Product, ProductListing, Category, Retailer, PriceHistory, Review
from .serializers import (
    ProductListSerializer, ProductDetailSerializer, ProductListingSerializer,
    CategorySerializer, RetailerSerializer, PriceHistorySerializer, ReviewSerializer
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


class FeaturedDealsAPIView(generics.ListAPIView):
    """Returns products with highest discount percentages"""
    serializer_class = ProductListSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        return Product.objects.filter(
            listings__discount_percentage__gt=10,
            listings__in_stock=True
        ).distinct().order_by('-listings__discount_percentage')[:10]


class CategoriesAPIView(generics.ListAPIView):
    """Returns all parent categories"""
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer


class SubcategoriesAPIView(generics.ListAPIView):
    """Returns subcategories for a specific parent category"""
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        parent_id = self.kwargs.get('parent_id')
        return Category.objects.filter(parent_id=parent_id)


class TrendingProductsAPIView(generics.ListAPIView):
    """Returns the most recently added products"""
    serializer_class = ProductListSerializer
    
    def get_queryset(self):
        return Product.objects.all().order_by('-created_at')[:8]


class ProductListAPIView(generics.ListAPIView):
    """Returns a filtered list of products"""
    serializer_class = ProductListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand', 'description']
    ordering_fields = ['created_at', 'listings__price', 'listings__discount_percentage']
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Apply filters
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(categories__id=category)
        
        brand = self.request.query_params.get('brand')
        if brand:
            queryset = queryset.filter(brand=brand)
        
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price and max_price:
            queryset = queryset.filter(listings__price__gte=min_price,
                                      listings__price__lte=max_price)
        elif min_price:
            queryset = queryset.filter(listings__price__gte=min_price)
        elif max_price:
            queryset = queryset.filter(listings__price__lte=max_price)
        
        # Apply sorting
        sort_by = self.request.query_params.get('sort_by', '-created_at')
        if sort_by == 'price_low':
            queryset = queryset.annotate(
                min_price=Min('listings__price')
            ).order_by('min_price')
        elif sort_by == 'price_high':
            queryset = queryset.annotate(
                min_price=Min('listings__price')
            ).order_by('-min_price')
        elif sort_by == 'discount':
            queryset = queryset.annotate(
                max_discount=Max('listings__discount_percentage')
            ).order_by('-max_discount')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        
        return queryset.distinct()


class ProductDetailAPIView(generics.RetrieveAPIView):
    """Returns detailed information for a specific product"""
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductListingsAPIView(generics.ListAPIView):
    """Returns price listings for a specific product"""
    serializer_class = ProductListingSerializer
    
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return ProductListing.objects.filter(
            product_id=product_id, 
            in_stock=True
        ).order_by('price')


class PriceHistoryAPIView(generics.ListAPIView):
    """Returns price history for a specific product listing"""
    serializer_class = PriceHistorySerializer
    
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        # Get the best/default listing for the product
        listing = ProductListing.objects.filter(
            product_id=product_id,
            in_stock=True
        ).order_by('price').first()
        
        if listing:
            return PriceHistory.objects.filter(product_listing=listing).order_by('timestamp')
        return PriceHistory.objects.none()


class ProductReviewsAPIView(generics.ListAPIView):
    """Returns reviews for a specific product"""
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product_id=product_id).order_by('-created_at')


class RelatedProductsAPIView(generics.ListAPIView):
    """Returns products related to a specific product"""
    serializer_class = ProductListSerializer
    
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        product = Product.objects.get(id=product_id)
        return Product.objects.filter(
            categories__in=product.categories.all()
        ).exclude(id=product_id).order_by('-created_at')[:6]


@api_view(['GET'])
def filter_options(request):
    """Returns filtering options for the product list page"""
    categories = Category.objects.filter(parent=None)
    brands = Product.objects.values_list('brand', flat=True).distinct()
    retailers = Retailer.objects.filter(listings__isnull=False).distinct()
    price_range = ProductListing.objects.aggregate(
        min_price=Min('price'),
        max_price=Max('price')
    )
    
    return Response({
        'categories': CategorySerializer(categories, many=True).data,
        'brands': list(brands),
        'retailers': RetailerSerializer(retailers, many=True).data,
        'price_range': price_range
    })