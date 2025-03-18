from django.urls import path, include, re_path
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from . import views
from . import api_views

# Create a router for API views
router = DefaultRouter()

urlpatterns = [
    # Original template-based routes (can be kept for backward compatibility)
    # path('products/', views.product_list, name='product_list'),
    # path('products/<int:pk>/', views.product_detail, name='product_detail'),
    # path('search/', views.search_results, name='search_results'),

    # API Routes
    path('api/', include([
        path('featured-deals/', api_views.FeaturedDealsAPIView.as_view(),
             name='api-featured-deals'),
        path('categories/', api_views.CategoriesAPIView.as_view(),
             name='api-categories'),
        path('categories/<int:parent_id>/subcategories/',
             api_views.SubcategoriesAPIView.as_view(), name='api-subcategories'),
        path('trending-products/', api_views.TrendingProductsAPIView.as_view(),
             name='api-trending-products'),
        path('products/', api_views.ProductListAPIView.as_view(),
             name='api-products-list'),
        path('products/<int:pk>/', api_views.ProductDetailAPIView.as_view(),
             name='api-product-detail'),
        path('products/<int:product_id>/listings/',
             api_views.ProductListingsAPIView.as_view(), name='api-product-listings'),
        path('products/<int:product_id>/price-history/',
             api_views.PriceHistoryAPIView.as_view(), name='api-price-history'),
        path('products/<int:product_id>/reviews/',
             api_views.ProductReviewsAPIView.as_view(), name='api-product-reviews'),
        path('products/<int:product_id>/related/',
             api_views.RelatedProductsAPIView.as_view(), name='api-related-products'),
        path('filter-options/', api_views.filter_options,
             name='api-filter-options'),
        path('search/', api_views.ProductListAPIView.as_view(), name='api-search'),
    ])),

    # React app routes - including root path
    path('', views.react_app_view, name='react-app'),
    path('react/', views.react_app_view, name='react-app-explicit'),
]
