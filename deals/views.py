from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.views.generic import ListView, DetailView
from django.conf import settings
from .models import Product, ProductListing, Category, Retailer


# Original template-based views (kept for backward compatibility)
def home(request):
    # Get the 10 products with the highest discount
    featured_deals = ProductListing.objects.filter(
        in_stock=True
    ).order_by('-discount_percentage')[:10]

    # Get the main categories
    categories = Category.objects.filter(parent=None)[:8]

    # The latest added products
    trending_products = Product.objects.all().order_by(
        '-created_at')[:8]

    context = {
        'featured_deals': featured_deals,
        'categories': categories,
        'trending_products': trending_products,
    }
    return render(request, 'deals/home.html', context)


class ProductListView(ListView):
    model = Product
    template_name = 'deals/product_list.html'
    context_object_name = 'products'
    paginate_by = 20

    def get_queryset(self):
        queryset = super().get_queryset()

        # Search feature
        search_query = self.request.GET.get('q', '')
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(brand__icontains=search_query) |
                Q(description__icontains=search_query)
            )

        # Category filtering
        category_id = self.request.GET.get('category', '')
        if category_id and category_id.isdigit():
            queryset = queryset.filter(categories__id=category_id)

        # Price filtering (using the lowest price)
        min_price = self.request.GET.get('min_price', '')
        max_price = self.request.GET.get('max_price', '')
        if min_price and min_price.isdigit():
            queryset = queryset.filter(listings__price__gte=min_price)
        if max_price and max_price.isdigit():
            queryset = queryset.filter(listings__price__lte=max_price)

        # Brand filtering
        brand = self.request.GET.get('brand', '')
        if brand:
            queryset = queryset.filter(brand__iexact=brand)

        # Sorting
        sort_by = self.request.GET.get('sort_by', 'newest')
        if sort_by == 'price_low':
            queryset = queryset.order_by('listings__price')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-listings__price')
        elif sort_by == 'discount':
            queryset = queryset.order_by('-listings__discount_percentage')
        else:  # newest
            queryset = queryset.order_by('-created_at')

        return queryset.distinct()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add data needed by filters
        context['categories'] = Category.objects.filter(parent=None)
        context['brands'] = Product.objects.order_by(
            'brand').values_list('brand', flat=True).distinct()
        context['retailers'] = Retailer.objects.filter(is_active=True)

        # Save current query parameters for pagination
        context['current_query'] = self.request.GET.copy()
        if 'page' in context['current_query']:
            del context['current_query']['page']

        return context


class ProductDetailView(DetailView):
    """Product detail view"""
    model = Product
    template_name = 'deals/product_detail.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        product = self.get_object()

        # Get the price of the product at each retailer
        context['listings'] = product.listings.filter(
            in_stock=True).order_by('price')

        # Get price history data
        if product.listings.exists():
            main_listing = product.listings.order_by('price').first()
            # The last 30 price records
            context['price_history'] = main_listing.price_history.all()[:30]

        # Get related products
        context['related_products'] = Product.objects.filter(
            categories__in=product.categories.all()
        ).exclude(id=product.id).distinct()[:6]

        # Reviews
        context['reviews'] = product.reviews.all().order_by('-created_at')

        return context


def search_results(request):
    """Search results view"""
    query = request.GET.get('q', '')

    if not query:
        return render(request, 'deals/search_results.html', {'products': []})

    products = Product.objects.filter(
        Q(name__icontains=query) |
        Q(brand__icontains=query) |
        Q(description__icontains=query)
    ).distinct()

    context = {
        'products': products,
        'query': query
    }
    return render(request, 'deals/search_results.html', context)


# React SPA view
def react_app_view(request, *args, **kwargs):
    """
    This view serves the React SPA. It will be the default view for all routes 
    that aren't handled by other views (in production mode).
    """
    return render(request, 'react/index.html', {
        'debug': settings.DEBUG
    })


# Define views for accessing Django from React
product_list = ProductListView.as_view()
product_detail = ProductDetailView.as_view()
